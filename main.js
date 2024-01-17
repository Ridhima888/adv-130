song= "";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
score_leftwrist=0;
score_rightwrist=0;

function preload(){
    song= loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is Initialised");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_rightwrist= results[0].pose.keypoints[17].score;
        score_leftwrist= results[0].pose.keypoints[8].score;
        console.log("score of left wrist = " + score_leftwrist +"score of right wrist is "+ score_rightwrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Left wrist x = " +leftWristX+ "Left wrist y = "+ leftWristY);
        console.log("Right wrist x = " +rightWristX+ "Right wrist y = "+ rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(score_rightwrist>0.2){
    circle(rightWristX,rightWristY,20);

    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML= "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML= "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML= "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML= "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML= "Speed = 2.5x";
        song.rate(2.5);
    }
    }

    if(score_leftwrist>0.2){
    circle(leftWristX,leftWristY,20);

    InNumberleftWristY= Number(leftWristY);
    remove_decimals= floor(InNumberleftWristY);
    volume= remove_decimals/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML= "Volume = " + volume;
    }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}