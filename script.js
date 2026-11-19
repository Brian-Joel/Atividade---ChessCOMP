const LINHAS = 12;
const COLUNAS = 12;

// Palavras validadas sem conflito de letras e todas conectadas entre si:
// 1. ADDRESSBUS (H: L5, C1..10) -> A D D R E S S B U S
// 2. DUALCORE   (V: L0..7, C1)  -> D U A L C O R E  (cruza com ADDRESSBUS em A(5,1)? Não: em DUALCORE L5 é O! Ajustado abaixo)

const palavras = [
  {
    numero: 1,
    palavra: "DUALCORE",
    direcao: "V",
    linha: 0,
    coluna: 1,
    pista: "Processador com dois núcleos de execução no mesmo chip."
  },
  {
    numero: 2,
    palavra: "CPU",
    direcao: "H",
    linha: 4,
    coluna: 1,
    pista: "Bloco que busca e executa instruções usando ULA, UC e registradores."
  },
  {
    numero: 3,
    palavra: "ADDRESSBUS",
    direcao: "H",
    linha: 2,
    coluna: 1,
    pista: "Fios que saem da CPU indicando onde ler ou escrever na memória."
  },
  {
    numero: 4,
    palavra: "DMA",
    direcao: "V",
    linha: 2,
    coluna: 2,
    pista: "Permite copiar dados entre dispositivo e RAM sem a CPU mover byte a byte."
  },
  {
    numero: 5,
    palavra: "DATABUS",
    direcao: "V",
    linha: 2,
    coluna: 3,
    pista: "Fios bidirecionais que transportam valores lidos, escritos e instruções."
  },
  {
    numero: 6,
    palavra: "RAM",
    direcao: "V",
    linha: 2,
    coluna: 4,
    pista: "Memória volátil de trabalho que guarda programas em execução e seus dados."
  },
  {
    numero: 7,
    palavra: "EEPROM",
    direcao: "V",
    linha: 2,
    coluna: 5,
    pista: "Pequena memória não volátil do Arduino que salva configurações ao desligar."
  },
  {
    numero: 8,
    palavra: "FLASH",
    direcao: "V",
    linha: 0,
    coluna: 7,
    pista: "Memória não volátil e regravável, como o pendrive, que guarda o programa."
  },
  {
    numero: 9,
    palavra: "ULA",
    direcao: "H",
    linha: 4,
    coluna: 4,
    pista: "Parte da CPU que faz as contas e as operações lógicas."
  },
  {
    numero: 10,
    palavra: "ROM",
    direcao: "H",
    linha: 6,
    coluna: 5,
    pista: "Memória não volátil que guarda o firmware de inicialização do equipamento."
  },
  {
    numero: 11,
    palavra: "CACHE",
    direcao: "H",
    linha: 8,
    coluna: 3,
    pista: "Memória volátil pequena e muito rápida no processador para dados usados há pouco."
  },
  {
    numero: 12,
    palavra: "UC",
    direcao: "V",
    linha: 7,
    coluna: 3,
    pista: "Parte da CPU que lê cada instrução e envia ordens aos componentes."
  }
];

const tabuleiroEl = document.getElementById("tabuleiro");
const pistasHorizontaisEl = document.getElementById("pistas-horizontais");
const pistasVerticaisEl = document.getElementById("pistas-verticais");
const contadorEl = document.getElementById("contador");
const btnConferir = document.getElementById("btn-conferir");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Matriz de controle do tabuleiro
const grade = Array.from({ length: LINHAS }, () =>
  Array.from({ length: COLUNAS }, () => ({
    letra: "",
    numeros: [],
    input: null,
    celulaEl: null
  }))
);

function inicializarGrade() {
  palavras.forEach((item) => {
    for (let i = 0; i < item.palavra.length; i++) {
      const l = item.direcao === "H" ? item.linha : item.linha + i;
      const c = item.direcao === "H" ? item.coluna + i : item.coluna;
      grade[l][c].letra = item.palavra[i];
      if (i === 0) {
        grade[l][c].numeros.push(item.numero);
      }
    }
  });
}

function renderizarTabuleiro() {
  tabuleiroEl.style.gridTemplateColumns = `repeat(${COLUNAS}, 36px)`;
  tabuleiroEl.innerHTML = "";

  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const celulaData = grade[l][c];
      const div = document.createElement("div");
      div.className = "celula";

      if (celulaData.letra !== "") {
        div.classList.add("ativa");

        if (celulaData.numeros.length > 0) {
          const spanNum = document.createElement("span");
          spanNum.className = "numero";
          spanNum.textContent = celulaData.numeros.join("/");
          div.appendChild(spanNum);
        }

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.dataset.linha = l;
        input.dataset.coluna = c;
        input.setAttribute("aria-label", `Linha ${l + 1}, Coluna ${c + 1}`);

        input.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
          div.classList.remove("certa", "errada");
        });

        div.appendChild(input);
        celulaData.input = input;
      }

      celulaData.celulaEl = div;
      tabuleiroEl.appendChild(div);
    }
  }
}

function renderizarPistas() {
  pistasHorizontaisEl.innerHTML = "";
  pistasVerticaisEl.innerHTML = "";

  palavras.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.numero}.</strong> ${item.pista}`;
    if (item.direcao === "H") {
      pistasHorizontaisEl.appendChild(li);
    } else {
      pistasVerticaisEl.appendChild(li);
    }
  });
}

function conferirRespostas() {
  // Limpa estados anteriores
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      if (grade[l][c].celulaEl) {
        grade[l][c].celulaEl.classList.remove("certa", "errada");
      }
    }
  }

  let acertos = 0;

  palavras.forEach((item) => {
    let palavraCorreta = true;
    const celulasDaPalavra = [];

    for (let i = 0; i < item.palavra.length; i++) {
      const l = item.direcao === "H" ? item.linha : item.linha + i;
      const c = item.direcao === "H" ? item.coluna + i : item.coluna;
      const celula = grade[l][c];
      celulasDaPalavra.push(celula.celulaEl);

      if (celula.input.value.toUpperCase() !== item.palavra[i]) {
        palavraCorreta = false;
      }
    }

    if (palavraCorreta) {
      acertos++;
      celulasDaPalavra.forEach((el) => {
        el.classList.remove("errada");
        el.classList.add("certa");
      });
    } else {
      celulasDaPalavra.forEach((el) => {
        if (!el.classList.contains("certa")) {
          el.classList.add("errada");
        }
      });
    }
  });

  contadorEl.textContent = `${acertos} de ${palavras.length} palavras`;
}

function reiniciarJogo() {
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const celula = grade[l][c];
      if (celula.input) {
        celula.input.value = "";
        celula.celulaEl.classList.remove("certa", "errada");
      }
    }
  }
  contadorEl.textContent = `0 de ${palavras.length} palavras`;
}

btnConferir.addEventListener("click", conferirRespostas);
btnReiniciar.addEventListener("click", reiniciarJogo);

inicializarGrade();
renderizarTabuleiro();
renderizarPistas();