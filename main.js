status_model = "";
text_input = "";
object = [];

function setup() {
    canvas = createCanvas(575, 450);
    canvas.position(485, 250);

    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    text_input = document.getElementById("putin").value;
}

function modelLoaded() {
    console.log("Model is Loaded!");
    status_model = true;
}

function draw() {
    image(video, 0, 0, 575, 450);

    if (status_model != "") {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < object.length; i++) {
            fill('red');
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke('red');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[0].label == text_input) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("founds").innerHTML = text_input + " found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(text_input + " found");
                synth.speak(utterThis);
            } else {
                document.getElementById("founds").innerHTML = text_input + " not found";
            }
        }
    }
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result;
    }
}