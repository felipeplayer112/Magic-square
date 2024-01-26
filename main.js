noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    canvas = createCanvas(450, 450);
    canvas.position(100, 150);
    video = createCapture(VIDEO);
    video.size(450, 450);
    video.position(800, 150)
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Modelo carregado.");
    window.alert("Modelo carregado.");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("pulso esquerdo = " + leftWristX + "pulso direito = " + rightWristX);
    }
}

function draw() {
    background('grey');
    document.getElementById("squareSize").innerHTML = "largura e altura serão = " + difference + "px.";
    fill('cyan');
    stroke('darkblue');
    square(noseX, noseY, difference);
}