var status = "";
var object = [];

function preload(){
	// alert = loadSound("alert.wav");
}

function setup(){
	canvas = createCanvas(600,400);
	canvas.center();

	video = createCapture(VIDEO);
	video.size(600,400);
	video.hide();

	objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
	image(video,0,0,600,400);
	if (status == "true" && object.length>0){
		for(i=0; i<object.lenght; i++){
			document.getElementById('Status').innerHTML = "Status: Object Detected";

			percent = floor(object[i].confidense*100);
			text(object[i].lable + " " + percent + "%",object[i].x + 15, object[i].y + 15);
			fill('red');
			noFill();
			stroke('red');
			rect(object[i].x,object[i].y,object[i].width,object[i].height);
		}
	}
}

function modelLoaded(){
	status = "true";
	console.log("The cocossd model is loaded...");
	objectDetector.detect(video,gotResult);
	document.getElementById('Status').innerHTML = "Status: Object Detecting...";
}

function gotResult(error,results){
	if(error){
		console.log(error);
	} else{
		console.log(results);
		object = results;
	}
}