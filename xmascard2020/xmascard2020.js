function preload(){
  slidertext = loadImage('data/slidertext.png');
  star = loadImage('data/star.png');
  decortext = loadImage('data/decortext.png');
  download = loadImage('data/saveimage.png');
  startover = loadImage('data/startover.png');
  xmas = loadImage('data/merryxmas.png');
  year = loadImage('data/2020.png');
}
//canvas
//center
var cx;
var cy;
//width
var cw;
//height
var ch;

//COLOR SLIDER
var slidestart;
var slideheight;
var slidelength;
var button;
var colorb;
var hue;

//panel
var panelstartX;
var panelstartY;
var panellength;
var panelheight;
var space;
//brushes
var size;
var bright;
var bulbsat;
var bulb;

//download button
var img2W;
var img2x;
var img2y;
//start over button
var img3x;
var img3y;

//type
var mode=0;

//tree
var treesize;

function setup() {
createCanvas(windowWidth,windowHeight);

background(0);
 
slideheight = height/3.5;
slidelength = width/5;
slidestart = width/20+10;
//colorb = slidestart+slidelength/2;
colorb = random(slidestart,slidestart+slidelength);

panelstartX = slidestart+slidelength/2;
panelstartY = slideheight+height/6;
panellength = slidelength+2*(width/20);
panelheight = height/2;

cx = width * 0.6;
cy = height/2;
ch = height*0.8;
cw = constrain(ch*1.33,0,width-(panelstartX+panellength));

colorMode(HSB,360,100,100,100);

var base = cw;
//treesize=30;
treesize=constrain(cw/20,20,30);
var branches = 10;
var treehue=110;
for(let b=0; b<branches; b++){
  var treespace = (ch/branches)*0.95;
  var treeY = (height-ch+treespace)/2 + treespace*b;
  var wide = (cw/12)*b;
  var start = cx-wide/2;
  treehue=treehue+4;
    for(let ll=0; ll<treesize; ll++){
    alpha=11/2;
     stroke(treehue,85,80,alpha);
     strokeWeight(ll);
     line(start,treeY,start+wide,treeY);
        }   
  }
  
rectMode(CENTER);
noFill();
stroke(100);
strokeWeight(4);
//frame
rect(cx,cy,cw,ch,10);
//MERRY
imageMode(CENTER);
var xmasw = panellength*2;
var xmash = xmasw/10.6666;
var xmasx = cx;
var xmasy = xmash/2-(xmash*0.2);
var yeary = height-xmash/2;
image(xmas,xmasx,xmasy,xmasw,xmash);
image(year,xmasx,yeary,xmasw,xmash);
}


function draw() { 
hue = ((colorb - slidestart)/slidelength)*360;
size=constrain(cw/10,10,40);
imageMode(CENTER);
var imgW = panellength;
var imgH = imgW/5;

//canvas
rectMode(CENTER);
noFill();
stroke(100);
strokeWeight(4);
//frame
//rect(cx,cy,cw,ch,10);


//panel
fill(0);
noStroke();
rect(panelstartX, panelstartY, panellength, panelheight, 10);
//modes
space = panelheight/4;
var mode1x=slidestart;
var mode1y=slideheight+1.5*space;
//BUTTONS
//one
for(let n = 0; n<size ; n++){
  fill(hue,100-n,60+n);
  ellipse(mode1x,mode1y,size-n,size-n);
  }
if(dist(mouseX,mouseY,mode1x,mode1y)<space/2 && mouseIsPressed){
  mode=1;
}
//two
var mode2x=mode1x+slidelength/2;
for(let l=0; l<size; l++){
var glow=l/size*60;
bright=100;
bulbsat = 30;
  fill(hue,100,bright,glow-l);
  ellipse(mode2x,mode1y,size-l,size-l);
    }
bulb = constrain(size/5,3,50);
fill(hue,bulbsat,100);
ellipse(mode2x,mode1y,bulb,bulb);

if(dist(mouseX,mouseY,mode2x,mode1y)<space/2 && mouseIsPressed){
  mode=2;
}
//THREE
var mode3x = slidestart+slidelength;
  push();
var hue2 = hue;
var x = mode3x;
var y = mode1y;
var starsize = constrain(cw/8, 30,100);
var alphas = 100;
for(st = 0; st<3; st++){
    tint(hue2,100,100,alphas);
    image(star,x,y,starsize,starsize);
    x=x+2;
    y=y+3;
    starsize = constrain(starsize-5, 10,100);
    alphas = alphas-10;
    hue2=hue2+10;
    }
   pop();
if(dist(mouseX,mouseY,mode3x,mode1y)<space/2 && mouseIsPressed){
  mode=3;
}
//DOWNLOAD
img2W=slidelength/2;
img2x=slidestart+slidelength-img2W/3;
img2y=mode1y+space*2;
image(download, img2x,img2y,img2W,img2W);
//START OVER
img3x=slidestart;
img3y= img2y;
image(startover,img3x,img3y,img2W,img2W);


//slider
image(slidertext,panelstartX,slideheight-imgH/2,imgW,imgH);
stroke(360);
strokeWeight(4);
line(slidestart,slideheight,slidestart+slidelength,slideheight);
//SLIDER BUTTON
noStroke();
fill(hue,100,90);
ellipse(colorb,slideheight,30,30);
if(mouseX>slidestart && mouseX<slidestart+slidelength && mouseY>slideheight-25 && mouseY<slideheight+25 && mouseIsPressed){
  colorb=constrain(mouseX,slidestart,slidestart+slidelength);
  }


//BOXES AROUND PREVIEWS
push();
stroke(100);
  strokeWeight(4);
  noFill();
if(mode===1){
  
  rect(mode1x,mode1y,space,space,4);
}
if(mode===2){
  rect(mode2x,mode1y,space,space,4);
}
if(mode===3){
  rect(mode3x,mode1y,space,space,4);
}
pop();

//text
image(decortext,panelstartX,mode1y-imgH*.75,imgW,imgH);
}

function mousePressed(){

//DOWNLOAD
   if(dist(img2x,img2y,mouseX,mouseY)<space){
var sidespace = cw/20;
var savex=cx-cw/2-sidespace/2;
var savey = 0;
var savew=cw+sidespace;
var saveh=height;
let pic = get(savex,savey,savew,saveh);
  pic.save('MerryXmasFromTheBinders.png');
  noLoop();
  }else{
    loop();
  }

if(mouseX>cx-cw/2 && mouseX<cx+cw/2 && mouseY>cy-ch/2 && mouseY<cy+ch/2){
//ROUND ORNAMENT
  if (mode===1){
  push();
 noStroke();
for(let i = 0; i<size ; i++){
  fill(hue,100-i,60+i);
  ellipse(mouseX,mouseY,size-i,size-i);
  }
 pop();
    }
//LIGHT 
  if(mode===2){
  for(let l=0; l<size; l++){
  var glow=l/size*60;
    fill(hue,100,bright,glow-l);
    ellipse(mouseX,mouseY,size-l,size-l);
      }
  bulb = constrain(size/5,3,50);
  fill(hue,bulbsat,100);
  ellipse(mouseX,mouseY,bulb,bulb);
    }
    
//STAR
if(mode===3){
  push();
var hue2 = hue;
var x = mouseX;
var y = mouseY;
var starsize = constrain(cw/8, 30,100);
var alphas = 100;
for(s = 0; s<15; s++){
    tint(hue2,100,100,alphas);
    image(star,x,y,starsize,starsize);
    x=x+2;
    y=y+3;
    starsize = constrain(starsize-5, 10,100);
    alphas = alphas-10;
    hue2=hue2+10;
    }
   pop();
  }
  }

//START OVER
if(dist(mouseX,mouseY,img3x,img2y)<space/2){
  createCanvas(windowWidth,windowHeight);

background(0);
 
slideheight = height/3.5;
slidelength = width/5;
slidestart = width/20+10;


panelstartX = slidestart+slidelength/2;
panelstartY = slideheight+height/6;
panellength = slidelength+2*(width/20);
panelheight = height/2;

cx = width * 0.6;
cy = height/2;
ch = height*0.8;
cw = constrain(ch*1.33,0,width-(panelstartX+panellength));

colorMode(HSB,360,100,100,100);

var base = cw;
//treesize=30;
treesize=constrain(cw/20,20,30);
var branches = 10;
var treehue=110;
for(let b=0; b<branches; b++){
  var treespace = (ch/branches)*0.95;
  var treeY = (height-ch+treespace)/2 + treespace*b;
  var wide = (cw/12)*b;
  var start = cx-wide/2;
  treehue=treehue+4;
    for(let ll=0; ll<treesize; ll++){
    alpha=11/2;
     stroke(treehue,85,80,alpha);
     strokeWeight(ll);
     line(start,treeY,start+wide,treeY);
        }   
  }
  
rectMode(CENTER);
noFill();
stroke(100);
strokeWeight(4);
//frame
rect(cx,cy,cw,ch,10);
//MERRY
imageMode(CENTER);
var xmasw = panellength*2;
var xmash = xmasw/10.6666;
var xmasx = cx;
var xmasy = xmash/2-(xmash*0.2);
var yeary = height-xmash/2;
image(xmas,xmasx,xmasy,xmasw,xmash);
image(year,xmasx,yeary,xmasw,xmash);


}
  
}

function touchStarted(){
  //DOWNLOAD
   if(dist(img2x,img2y,mouseX,mouseY)<space){
var sidespace = cw/20;
var savex=cx-cw/2-sidespace/2;
var savey = 0;
var savew=cw+sidespace;
var saveh=height;
let pic = get(savex,savey,savew,saveh);
  pic.save('MerryXmasFromTheBinders.png');
  noLoop();
  }else{
    loop();
  }

if(mouseX>cx-cw/2 && mouseX<cx+cw/2 && mouseY>cy-ch/2 && mouseY<cy+ch/2){
//ROUND ORNAMENT
  if (mode===1){
  push();
 noStroke();
for(let i = 0; i<size ; i++){
  fill(hue,100-i,60+i);
  ellipse(mouseX,mouseY,size-i,size-i);
  }
 pop();
    }
//LIGHT 
  if(mode===2){
  for(let l=0; l<size; l++){
  var glow=l/size*60;
    fill(hue,100,bright,glow-l);
    ellipse(mouseX,mouseY,size-l,size-l);
      }
  bulb = constrain(size/5,3,50);
  fill(hue,bulbsat,100);
  ellipse(mouseX,mouseY,bulb,bulb);
    }
    
//STAR
if(mode===3){
  push();
var hue2 = hue;
var x = mouseX;
var y = mouseY;
var starsize = constrain(cw/8, 30,100);
var alphas = 100;
for(s = 0; s<15; s++){
    tint(hue2,100,100,alphas);
    image(star,x,y,starsize,starsize);
    x=x+2;
    y=y+3;
    starsize = constrain(starsize-5, 10,100);
    alphas = alphas-10;
    hue2=hue2+10;
    }
   pop();
  }
  }

//START OVER
if(dist(mouseX,mouseY,img3x,img2y)<space/2){
  createCanvas(windowWidth,windowHeight);

background(0);
 
slideheight = height/3.5;
slidelength = width/5;
slidestart = width/20+10;


panelstartX = slidestart+slidelength/2;
panelstartY = slideheight+height/6;
panellength = slidelength+2*(width/20);
panelheight = height/2;

cx = width * 0.6;
cy = height/2;
ch = height*0.8;
cw = constrain(ch*1.33,0,width-(panelstartX+panellength));

colorMode(HSB,360,100,100,100);

var base = cw;
//treesize=30;
treesize=constrain(cw/20,20,30);
var branches = 10;
var treehue=110;
for(let b=0; b<branches; b++){
  var treespace = (ch/branches)*0.95;
  var treeY = (height-ch+treespace)/2 + treespace*b;
  var wide = (cw/12)*b;
  var start = cx-wide/2;
  treehue=treehue+4;
    for(let ll=0; ll<treesize; ll++){
    alpha=11/2;
     stroke(treehue,85,80,alpha);
     strokeWeight(ll);
     line(start,treeY,start+wide,treeY);
        }   
  }
  
rectMode(CENTER);
noFill();
stroke(100);
strokeWeight(4);
//frame
rect(cx,cy,cw,ch,10);
//MERRY
imageMode(CENTER);
var xmasw = panellength*2;
var xmash = xmasw/10.6666;
var xmasx = cx;
var xmasy = xmash/2-(xmash*0.2);
var yeary = height-xmash/2;
image(xmas,xmasx,xmasy,xmasw,xmash);
image(year,xmasx,yeary,xmasw,xmash);
    }
}
