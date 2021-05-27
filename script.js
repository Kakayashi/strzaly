const canvas = document.getElementById("xd");
const ctx = canvas.getContext("2d");
const score = document.getElementById('score');

var ilosc = 0;
var ilosc2 = 0;
const tab = [];
const tab2 = [];
var kierunek = 0;

let x=460;
let y=740;

let px;
let py;
let wynik = 0;

var cooldown = false;
var trafiony = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

ctx.fillRect(x, y, 30, 60);

document.addEventListener("keypress", e => {
   // console.log("Klawisz: " + e.key);
    if(e.key=="a") moveLeft();
    else if(e.key=="d") moveRight();
    //if(e.key==" ") shot(x+10,y-20,0);
});
document.addEventListener("keyup", e => {
    if(e.key==" " && cooldown==false){
        shot(x+10,y-20,0);
        cooldown = true
        setTimeout(function(){cooldown=false},700)
    } 
});

function moveLeft(){
    ctx.clearRect(x, y, 30, 60);
    x=x-12;
    ctx.fillRect(x, y, 30, 60);
}
function moveRight(){
    ctx.clearRect(x, y, 30, 60);
    x=x+12;
    ctx.fillRect(x, y, 30, 60);
}
function shot(a,b,i){
    ctx.clearRect(a, b, 10, 20);
    py = b-10;
    px = a;
    
    //console.log(py);
    ctx.fillRect(a, py, 10, 20);
    if(i<73 && trafiony == false) setTimeout(shot,10,a,py,i+1);
    if(trafiony==true){
        trafiony = false
        ctx.clearRect(px, py, 10, 30);
    }
}
ctx.beginPath();
ctx.lineWidth = 5;

function ruch(xx,yy,a=0,b=0,e,numer)
{
    let aa=a
    let bb=b
    
    ctx.clearRect(xx-50, yy-50, 100, 100);
    if(aa) yy=yy+10;
    else yy=yy-10;
    if(bb) xx=xx+10;
    else xx=xx-10;
    
    if(xx>=950) bb=0;
    else if(xx<=50) bb=1;

    if(yy>=750) aa=0;
    else if(yy<=50) aa=1;

    ctx.beginPath();
    ctx.arc(xx,yy,50,0,2*Math.PI);
    ctx.fill();

    if((xx-79<x) && (xx+35>x) && yy>720 ){
        console.log("Game over");
        gameOver();
    }

    tab[numer].x = xx; 
    tab[numer].y = yy;
    tab[numer].a = aa;
    tab[numer].b = bb;

    if((px>xx-50 && px<xx+50) && (py<yy+50 && py>yy-50)){
        tab[numer].e=0;
        ctx.clearRect(xx-50, yy-50, 100, 100);
        wynik++;
        score.innerText = "Wynik: " + wynik;
        py=-20;
        cooldown=false;
        trafiony = true;
        nowa2(xx-30,yy)
        nowa2(xx+30,yy)
    }

    if(tab[numer].e==1) setTimeout(ruch,50,xx,yy,aa,bb,e,numer);
}


class ball{
    constructor(x,y,a,b,e){
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
        this.e = e;
        
    }

}
class ball2{
    constructor(x,y,a,b,e){
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
        this.e = e;
        
    }

}


function nowa(){
    var nazwa ="b"+ilosc;
    nazwa.toString;
    
    var nazwa = new ball(Math.floor(Math.random() * 1000),200,Math.floor(Math.random() * 2),Math.floor(Math.random() * 2),1);
    console.log(nazwa);
    
    tab.push(nazwa);
    ruch(nazwa.x,nazwa.y,nazwa.a,nazwa.b,nazwa.e,ilosc);
    ilosc++;
    
}

function nowa2(x,y){
    var nazwa ="b"+ilosc2;
    nazwa.toString;
    
    var nazwa = new ball2(x,y,Math.floor(Math.random() * 2),kierunek,1);
    kierunek ? kierunek=0 : kierunek = 1;
    console.log(nazwa);
    
    tab2.push(nazwa);
    ruch2(nazwa.x,nazwa.y,nazwa.a,nazwa.b,nazwa.e,ilosc2);
    ilosc2++;
    
}

function ruch2(xx,yy,a=0,b=0,e,numer)
{
    let aa=a
    let bb=b
    
    ctx.clearRect(xx-25, yy-25, 50, 50);
    if(aa) yy=yy+10;
    else yy=yy-10;
    if(bb) xx=xx+10;
    else xx=xx-10;
    
    if(xx>=975) bb=0;
    else if(xx<=25) bb=1;

    if(yy>=775) aa=0;
    else if(yy<=25) aa=1;

    ctx.beginPath();
    ctx.arc(xx,yy,25,0,2*Math.PI);
    ctx.fill();

    if((xx-40<x) && (xx+17>x) && yy>720 ){
        console.log("Game over");
        gameOver();
    }

    tab2[numer].x = xx; 
    tab2[numer].y = yy;
    tab2[numer].a = aa;
    tab2[numer].b = bb;

    if((px>xx-25 && px<xx+25) && (py<yy+25 && py>yy-25)){
        tab2[numer].e=0;
        ctx.clearRect(xx-25, yy-25, 50, 50);
        wynik++;
        score.innerText = "Wynik: " + wynik;
        py=-20;
        cooldown=false;
        trafiony = true;
    }

    if(tab2[numer].e==1) setTimeout(ruch2,35,xx,yy,aa,bb,e,numer);
}

const button = document.getElementById('button');
const field = document.getElementById('fild');
const sterowanie = document.getElementById('sterowanie');
const Over = document.getElementById('gameOver');
const wynik2 = document.getElementById('wynik2');
button.onclick = function(){
    button.remove()
    sterowanie.remove();
    field.style.visibility = "visible"
    tworzenie();
}

function tworzenie(){
    nowa()
    setTimeout(tworzenie,3000)
}
function gameOver(){
    field.remove();
    score.remove();
    Over.style.visibility= "visible";
    wynik2.innerText="Wynik: " + wynik;
}