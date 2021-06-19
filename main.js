var speechRecognition = window.webkitSpeechRecognition;
var Recognition = new speechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML="";
    Recognition.start();
}
Recognition.onresult = function(event)
{
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    console.log(content);
    if (content == "take my selfie")
    {
        console.log("Taking selfie in 5 seconds");
        speak();
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds"
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

camera = document.getElementById("camera");
Webcam.set({
    width:360, height:250, image_format:'jpeg', jpeg_quality:100
});

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}

function save()
{
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}