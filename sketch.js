//Criar variáveis do jogo
var torre, imgTorre;
var porta, imgPorta, grupoPortas;
var escalador, imgEscalador, grupoEscalador;
var fantasma, imgFantasma;
var blocoInvisivel, grupoInvisivel;

const PLAY = 1;
const END = 0;

var gameState = PLAY;

function preload(){
  
  //Carregar arquivos de imagem do jogo
  imgTorre = loadImage("torre.png");
  imgPorta = loadImage("porta.png");
  imgEscalador = loadImage("grade.png");
  imgFantasma = loadImage("ghost-standing.png");
  
  // Carregar Som
  spookySound = loadSound("spooky.wav");

}

function setup(){
  
  //Criar canvas
  createCanvas(600,500);
  
  
  //Criar Sprite da torre
  torre = createSprite(width/2,0);
  torre.addImage("torre",imgTorre);
  
  
  //Criar Sprite do fantasma
  fantasma = createSprite(width/2,width/2, 50, 50);
  fantasma.scale = 0.3;
  fantasma.addImage("fantasma",imgFantasma);  
  fantasma.debug = true;
  fantasma.setCollider("rectangle",-40,0,200,250);

  grupoEscalador = new Group();
  grupoInvisivel = new Group();
  grupoPortas = new Group();
}

function draw(){
  //Definir background e limpar a tela
  background(0);
textSize(50);
fill(220)
text("GAME OVER", 150,280);


  
  if (gameState === PLAY) {
  fantasma.velocityY= fantasma.velocityY + 0.6

 //spookySound.play();

 torre.velocityY = 2
 
 if (torre.y > 600) {
 torre.y = width/4,0

 }
  //fantasma pula
   if (keyDown("space")) {
  fantasma.velocityY = -10

   }

   if (keyDown("right")) {
   fantasma.x = fantasma.x + 4

   }

   if (keyDown("left")) {
   fantasma.x = fantasma.x - 4

   }
  
    gerarPortas();

    if (fantasma.isTouching(grupoInvisivel)) {
      gameState = END 
       }

  }

  if (gameState === END) {
 fantasma.visible = false;
 torre.visible = false;
 grupoEscalador.destroyEach();
 grupoInvisivel.destroyEach();
 grupoPortas.DestroyEach();




  }


  fantasma.collide(grupoEscalador);

  drawSprites();
  
  
}

function gerarPortas(){
  if (frameCount % 80 === 0) {
 porta = createSprite (200,-50,20,30);
 porta.x = Math.round(random(100,480))
 porta.addImage("door", imgPorta);
 porta.scale = 0.8
 porta.velocityY = 3 
 grupoPortas.add(porta);


 escalador = createSprite(200,-10,10,10);
 escalador.x = porta.x;
 escalador.addImage("grade", imgEscalador);
 escalador.scale = 0.8
 escalador.velocityY = 3
 escalador.lifetime = 200;
 
 grupoEscalador.add(escalador);
 


 blocoInvisivel = createSprite(200,-5,80,5);
 blocoInvisivel.x = escalador.x;
 blocoInvisivel.visible = false
 blocoInvisivel.velocityY = 3
 grupoInvisivel.add(blocoInvisivel);

 
  

  }
}

