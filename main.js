
prediction_1="";

Webcam.set({
width:350, 
height:350, 
imageformat:'png', 
png_quality:90
});

camera= document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="result_image" src="'+ data_uri +'">';
    });
}

console.log("ml5 version: ", ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1Waa21FQI/model.json", modelLoaded);
function modelLoaded(){
    console.log("Hello. Good Job YOur Model has Successfully Loaded!!")
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is"+ prediction_1;  
     var utterthis= new SpeechSynthesisUtterance(speak_data_1);
     synth.speak(utterthis);
}

function check(){
    img= document.getElementById("result_image");
    classifier.classify(img, gotResult );
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
         document.getElementById("result_gesture_name").innerHTML= results[0].label;
         prediction_1=results[0].label;
         speak();

         if(results[0].label=="Thumbs Up"){
             document.getElementById("update_gesture").innerHTML="&#128077;";
         }
         if(results[0].label=="Thumbs Down"){
            document.getElementById("update_gesture").innerHTML="&#128078;";
        }
        if(results[0].label=="Amazing"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }
        if(results[0].label=="Raised Fist"){
            document.getElementById("update_gesture").innerHTML="&#9994;";
        }
        if(results[0].label=="Victory"){
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }
        if(results[0].label=="Clap"){
            document.getElementById("update_gesture").innerHTML="&#128079;";
        }
        if(results[0].label=="Bye"){
            document.getElementById("update_gesture").innerHTML="&#128075;";
        }

    }
}