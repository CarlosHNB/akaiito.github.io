// =======================
// MUSICA
// =======================

const music = document.getElementById("music");

window.addEventListener("load", () => {

    music.volume = 0.3;

    music.play().catch(()=>{
        document.body.addEventListener("click",()=>{
            music.play();
        },{once:true});
    });

});



// =======================
// CANVAS
// =======================

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// =======================
// ESTRELAS
// =======================

const stars = [];

for(let i=0;i<200;i++){

    stars.push({

        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        size:Math.random()*2

    });

}



// =======================
// SIRIUS
// =======================

const sirius = {

    x:canvas.width*0.7,
    y:canvas.height*0.3,

    pulse:0,

    baseSize:3,

    pulseSpeed:0.05

};



// =======================
// METEOROS
// =======================

const meteors = [];

function createMeteor(){

    meteors.push({

        x:-50,
        y:Math.random()*canvas.height*0.6,

        speed:6,

        size:2

    });

}

setInterval(createMeteor,2000);



// =======================
// AKAI ITO CONFIG
// =======================

let threadActive=false;

let leftProgress=0;
let rightProgress=0;

let heartProgress=0;

const centerX=canvas.width/2;
const centerY=canvas.height/2;

const leftStart={

    x:-50,
    y:centerY+100

};

const rightStart={

    x:canvas.width+50,
    y:centerY-100

};



// =======================
// DESENHAR FIO
// =======================

function drawThread(startX,startY,endX,endY,progress){

    ctx.strokeStyle="red";
    ctx.lineWidth=2;

    ctx.beginPath();

    for(let t=0;t<=progress;t+=0.01){

        const x=startX+(endX-startX)*t;

        const y=startY+(endY-startY)*t
        -Math.sin(t*Math.PI)*80;

        if(t===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

}



// =======================
// DESENHAR CORAÇÃO
// =======================

function drawHeart(progress){

    ctx.strokeStyle="red";
    ctx.lineWidth=2;

    ctx.beginPath();

    for(let t=0;t<=Math.PI*2*progress;t+=0.02){

        const scale=10;

        const x=centerX
        +scale*16*Math.pow(Math.sin(t),3);

        const y=centerY
        -scale*(

            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t)

        );

        if(t===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

}



// =======================
// TEXTO CENTRO
// =======================

function drawCenterText(){

    const glow=
    0.6+Math.sin(Date.now()*0.004)*0.4;

    ctx.fillStyle=`rgba(255,255,255,${glow})`;

    ctx.font="28px Segoe UI";

    ctx.textAlign="center";

    ctx.fillText(
        "CARLOS + ELEN",
        centerX,
        centerY+30
    );

}



// =======================
// AKAI ITO SISTEMA
// =======================

function drawAkaiIto(){

    if(!threadActive) return;


    if(leftProgress<1)
        leftProgress+=0.004;

    if(rightProgress<1)
        rightProgress+=0.004;


    drawThread(
        leftStart.x,
        leftStart.y,
        centerX,
        centerY,
        leftProgress
    );

    drawThread(
        rightStart.x,
        rightStart.y,
        centerX,
        centerY,
        rightProgress
    );


    if(leftProgress>=1 && rightProgress>=1){

        if(heartProgress<1)
            heartProgress+=0.01;

        drawHeart(heartProgress);

        if(heartProgress>=1){

            drawCenterText();

        }

    }

}



// =======================
// ANIMAÇÃO
// =======================

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);


    // estrelas
    ctx.fillStyle="white";

    stars.forEach(star=>{

        ctx.fillRect(
            star.x,
            star.y,
            star.size,
            star.size
        );

    });


    // sirius
    sirius.pulse+=sirius.pulseSpeed;

    const size=
    sirius.baseSize+
    Math.sin(sirius.pulse)*1.5;

    ctx.beginPath();

    ctx.arc(
        sirius.x,
        sirius.y,
        size,
        0,
        Math.PI*2
    );

    ctx.fill();


    // meteoros
    meteors.forEach((meteor,index)=>{

        meteor.x+=meteor.speed;
        meteor.y+=meteor.speed*0.3;

        ctx.beginPath();

        ctx.arc(
            meteor.x,
            meteor.y,
            meteor.size,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.beginPath();

        ctx.moveTo(meteor.x,meteor.y);

        ctx.lineTo(
            meteor.x-25,
            meteor.y-6
        );

        ctx.strokeStyle="white";

        ctx.stroke();


        if(meteor.x>canvas.width+50)
            meteors.splice(index,1);

    });


    // akai ito
    drawAkaiIto();


    requestAnimationFrame(animate);

}

animate();



// =======================
// MENSAGENS
// =======================

const messages=[

"Oi, meu amor.",

"Eu queria criar algo especial pra você.",

"Algo tão único quanto você.",

"Então eu criei este céu.",

"Cada estrela representa um momento nosso.",

"E aquela mais brilhante é Sirius.",

"Porque mesmo entre bilhões...",

"você ainda é a que mais brilha.",

"E desde o dia 22 de fevereiro de 2026..."

];



let currentMessage=0;

const textElement=document.getElementById("text");
const nextBtn=document.getElementById("nextBtn");



function showMessage(index){

    textElement.style.opacity=0;

    setTimeout(()=>{

        textElement.innerHTML=messages[index];

        textElement.style.opacity=1;

    },500);

}



nextBtn.onclick=()=>{

    currentMessage++;

    if(currentMessage<messages.length){

        showMessage(currentMessage);

    }else{

        nextBtn.style.display="none";

        startCounter();

        setTimeout(()=>{

            threadActive=true;

        },2000);

    }

};

showMessage(0);



// =======================
// CONTADOR
// =======================

const startDate=
new Date("2026-02-22 00:00:00");



function getCounter(){

    const now=new Date();

    const diff=now-startDate;

    const days=Math.floor(diff/86400000);

    const hours=Math.floor(diff/3600000)%24;

    const minutes=Math.floor(diff/60000)%60;

    const seconds=Math.floor(diff/1000)%60;

    return `
Estamos juntos há<br>
${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos ❤️
`;

}



function startCounter(){

    textElement.style.opacity=0;

    setTimeout(()=>{

        function update(){

            textElement.innerHTML=getCounter();

        }

        update();

        setInterval(update,1000);

        textElement.style.opacity=1;

    },500);

}