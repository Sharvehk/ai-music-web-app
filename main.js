beliver = "beliver.mp3";
harry_potter = "Harry potter.mp3";
video ="";

score_right_wrist = 0;
score_left_wrist = 0;

Song_1 = "";
Song_2 = "";

song_1_status = "";
song_2_status = "";
 
Left_Wrist_X = 0;
Left_Wrist_Y = 0;

Right_Wrist_X = 0;
Right_Wrist_Y = 0;

function preload(){
    Song_1 = loadSound("beliver.mp3");
    Song_2 = loadSound("Harry potter.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose_net = poseNet(video,Modelloaded);
    pose_net.on('pose',gotposes);
}

function draw(){
    image(video,0,0,600,500);
    stroke("red");
    fill("red");
    song_1_status = Song_1.isPlaying();
    song_2_status = Song_2.isPlaying();
    
    if(score_right_wrist > 0.2){
        circle(Right_Wrist_X,Right_Wrist_Y,15);
        Song_1.stop();

        if(song_2_status == false){
           Song_2.play();
           document.getElementById("song_name").innerHTML = "Playing Harry Poter Theme Song";
        }
    }

    if(score_left_wrist > 0.2){
        circle(Left_Wrist_X,Left_Wrist_Y,15);
        Song_2.stop();

        if(song_1_status == false){
           Song_1.play();
           document.getElementById("song_name").innerHTML = "Playing Beliver";
        }
    }
}

function Modelloaded(){
    console.log("Model Is Loaded");
}

function gotposes(results){

    if(results.length > 0){

            console.log(results);

            Left_Wrist_X = results[0].pose.leftWrist.x;
            Left_Wrist_Y = results[0].pose.leftWrist.y;
    
            Right_Wrist_X = results[0].pose.rightWrist.x;
            Right_Wrist_Y = results[0].pose.rightWrist.y;
            
            score_right_wrist = results[0].pose.keypoints[10].score;
            score_left_wrist = results[0].pose.keypoints[9].score;
    }
 }

 function isPlaying(){
    Song_1.isPlaying(); 
 }
