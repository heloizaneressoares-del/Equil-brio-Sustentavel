let producao = 50;
let ambiente = 50;
let qualidade = 50;

let tempo = 120;
let ultimoSegundo = 0;

let eventos = [];
let gameOver = false;
let venceu = false;

function setup() {
  createCanvas(900, 600);
  textFont('Arial');

  criarEvento();
}

function draw() {
  background(135, 206, 235);

  desenharCenario();

  if (!gameOver && !venceu) {

    if (millis() - ultimoSegundo > 1000) {
      tempo--;
      ultimoSegundo = millis();

      if (tempo <= 0) {
        venceu = true;
      }
    }

    verificarFim();
  }

  painel();

  if (gameOver) {
    telaGameOver();
  }

  if (venceu) {
    telaVitoria();
  }
}

function desenharCenario() {

  // chão
  fill(90, 180, 90);
  rect(0, 400, width, 200);

  // fazenda
  fill(200, 80, 60);
  rect(120, 280, 150, 120);

  fill(120);
  triangle(100, 280, 195, 200, 290, 280);

  // árvores
  for (let i = 0; i < 5; i++) {
    fill(120, 70, 20);
    rect(500 + i * 60, 300, 15, 80);

    fill(30, 150, 50);
    ellipse(507 + i * 60, 270, 60);
  }

  // plantação
  fill(200, 180, 60);

  for (let x = 350; x < 850; x += 30) {
    rect(x, 430, 10, 40);
  }

  // sol
  fill(255, 220, 0);
  circle(750, 100, 80);
}

function painel() {

  fill(255);
  rect(0, 0, width, 120);

  textSize(20);
  fill(0);

  text("🌾 Produção: " + producao, 20, 35);
  text("🌳 Meio Ambiente: " + ambiente, 20, 65);
  text("😊 Qualidade de Vida: " + qualidade, 20, 95);

  textSize(24);
  text("Tempo: " + tempo + " s", 700, 50);

  if (!gameOver && !venceu) {

    for (let i = 0; i < eventos.length; i++) {

      let e = eventos[i];

      fill(240);
      rect(e.x, e.y, 300, 180, 10);

      fill(0);
      textSize(16);
      text(e.texto, e.x + 15, e.y + 40, 270);

      fill(100, 200, 100);
      rect(e.x + 20, e.y + 120, 100, 40, 5);

      fill(200, 100, 100);
      rect(e.x + 180, e.y + 120, 100, 40, 5);

      fill(255);
      textAlign(CENTER, CENTER);

      text("SIM", e.x + 70, e.y + 140);
      text("NÃO", e.x + 230, e.y + 140);

      textAlign(LEFT, BASELINE);
    }
  }
}

function criarEvento() {

  let lista = [

    {
      texto: "Instalar irrigação inteligente?",
      sim: [10, 5, 5],
      nao: [-5, -5, -5]
    },

    {
      texto: "Criar corredor ecológico para animais?",
      sim: [-5, 15, 10],
      nao: [10, -15, -5]
    },

    {
      texto: "Investir em energia solar rural?",
      sim: [5, 10, 10],
      nao: [0, -10, -5]
    },

    {
      texto: "Aumentar uso de fertilizantes químicos?",
      sim: [15, -20, -10],
      nao: [-5, 5, 5]
    },

    {
      texto: "Implantar agricultura de precisão?",
      sim: [15, 10, 5],
      nao: [-10, -5, -5]
    },

    {
      texto: "Recuperar nascente da propriedade?",
      sim: [-5, 20, 10],
      nao: [5, -15, -10]
    }
  ];

  let escolhido = random(lista);

  eventos = [{
    x: 290,
    y: 180,
    ...escolhido
  }];
}

function mousePressed() {

  if (gameOver || venceu) {
    reiniciar();
    return;
  }

  for (let e of eventos) {

    // botão SIM
    if (
      mouseX > e.x + 20 &&
      mouseX < e.x + 120 &&
      mouseY > e.y + 120 &&
      mouseY < e.y + 160
    ) {

      aplicar(e.sim);
      criarEvento();
    }

    // botão NÃO
    if (
      mouseX > e.x + 180 &&
      mouseX < e.x + 280 &&
      mouseY > e.y + 120 &&
      mouseY < e.y + 160
    ) {

      aplicar(e.nao);
      criarEvento();
    }
  }
}

function aplicar(v) {

  producao += v[0];
  ambiente += v[1];
  qualidade += v[2];

  producao = constrain(producao, 0, 100);
  ambiente = constrain(ambiente, 0, 100);
  qualidade = constrain(qualidade, 0, 100);
}

function verificarFim() {

  if (
    producao <= 0 ||
    ambiente <= 0 ||
    qualidade <= 0
  ) {
    gameOver = true;
  }
}

function telaGameOver() {

  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER);

  textSize(40);
  text("FIM DE JOGO", width/2, 250);

  textSize(24);
  text(
    "O equilíbrio sustentável foi perdido.",
    width/2,
    320
  );

  text("Clique para reiniciar", width/2, 380);
}

function telaVitoria() {

  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);

  textAlign(CENTER);

  textSize(38);
  text(
    "PARABÉNS!",
    width/2,
    230
  );

  textSize(24);

  text(
    "Você construiu uma fazenda sustentável do futuro!",
    width/2,
    300
  );

  text(
    "Produção + Meio Ambiente + Sociedade em equilíbrio",
    width/2,
    350
  );

  text(
    "Clique para jogar novamente",
    width/2,
    420
  );
}

function reiniciar() {

  producao = 50;
  ambiente = 50;
  qualidade = 50;

  tempo = 120;

  gameOver = false;
  venceu = false;

  criarEvento();
}
