
const LINHAS = 12;
const COLUNAS = 17;

const palavras = [
  {
    numero: 1,
    palavra: "DUALCORE",
    direcao: "H",
    linha: 1,
    coluna: 10,
    pista: "Processador que possui dois núcleos de execução no mesmo chip."
  },
  {
    numero: 6,
    palavra: "ADDRESSBUS",
    direcao: "H",
    linha: 7,
    coluna: 5,
    pista: "Conjunto de fios que indica o endereço de leitura ou escrita na memória."
  },
  {
    numero: 9,
    palavra: "FLASH",
    direcao: "H",
    linha: 9,
    coluna: 1,
    pista: "Memória regravável e não volátil que pode armazenar programas."
  },
  {
    numero: 2,
    palavra: "ULA",
    direcao: "H",
    linha: 2,
    coluna: 8,
    pista: "Parte do processador responsável por cálculos e operações lógicas."
  },
  {
    numero: 5,
    palavra: "DMA",
    direcao: "V",
    linha: 7,
    coluna: 3,
    pista: "Recurso que transfere dados entre periféricos e memória sem intervenção contínua do processador."
  },
  {
    numero: 3,
    palavra: "RAM",
    direcao: "H",
    linha: 4,
    coluna: 9,
    pista: "Memória volátil que armazena temporariamente programas e dados em execução."
  },
  {
    numero: 7,
    palavra: "EEPROM",
    direcao: "V",
    linha: 7,
    coluna: 9,
    pista: "Memória não volátil que permite salvar configurações mesmo sem alimentação elétrica."
  },
  {
    numero: 11,
    palavra: "ROM",
    direcao: "H",
    linha: 11,
    coluna: 8,
    pista: "Memória não volátil que armazena instruções essenciais de inicialização."
  },
  {
    numero: 1,
    palavra: "DATABUS",
    direcao: "V",
    linha: 1,
    coluna: 10,
    pista: "Conjunto de fios que transporta dados entre os componentes do computador."
  },
  {
    numero: 4,
    palavra: "CACHE",
    direcao: "V",
    linha: 6,
    coluna: 5,
    pista: "Memória pequena e rápida que mantém dados frequentemente acessados pelo processador."
  },
  {
    numero: 10,
    palavra: "CPU",
    direcao: "H",
    linha: 9,
    coluna: 8,
    pista: "Componente que interpreta e executa instruções de programas."
  },
  {
    numero: 8,
    palavra: "UC",
    direcao: "V",
    linha: 7,
    coluna: 13,
    pista: "Parte do processador que decodifica instruções e coordena operações."
  }
];

// mapa da grade: null ou objeto { letra, indices: [{r,c,idxInWord}], roles }
const grid = Array.from({ length: LINHAS }, () => Array(COLUNAS).fill(null));

function criarTabuleiro() {
  const tab = document.getElementById('tabuleiro');
  tab.innerHTML = '';

  // criar células
  for (let r = 0; r < LINHAS; r++) {
    for (let c = 0; c < COLUNAS; c++) {
      const cel = document.createElement('div');
      cel.className = 'celula';
      cel.dataset.linha = r + 1;
      cel.dataset.coluna = c + 1;

      const input = document.createElement('input');
      input.maxLength = 1;
      input.dataset.r = r + 1;
      input.dataset.c = c + 1;
      input.addEventListener('input', () => input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));

      cel.appendChild(input);
      tab.appendChild(cel);
    }
  }

  // posicionar palavras no grid lógico
  palavras.forEach(p => {
    const len = p.palavra.length;
    const r0 = p.linha - 1;
    const c0 = p.coluna - 1;

    for (let i = 0; i < len; i++) {
      const r = p.direcao === 'H' ? r0 : r0 + i;
      const c = p.direcao === 'H' ? c0 + i : c0;

      if (r < 0 || r >= LINHAS || c < 0 || c >= COLUNAS) continue;

      if (!grid[r][c]) grid[r][c] = { letters: [], words: [] };
      grid[r][c].letters.push(p.palavra[i]);
      grid[r][c].words.push(p.numero);

      // marcar a célula visualmente como ativa
      const idx = r * COLUNAS + c;
      const cellDiv = document.querySelector(`#tabuleiro .celula:nth-child(${idx + 1})`);
      if (cellDiv) cellDiv.classList.add('ativa');
    }

    // marcar número na primeira célula da palavra
    const numeroR = r0;
    const numeroC = c0;
    const index = numeroR * COLUNAS + numeroC;
    const firstCell = document.querySelector(`#tabuleiro .celula:nth-child(${index + 1})`);
    if (firstCell && !firstCell.querySelector('.numero')) {
      const num = document.createElement('span');
      num.className = 'numero';
      num.textContent = p.numero;
      firstCell.appendChild(num);
    }
  });
}

function preencherPistas() {
  const horiz = document.getElementById('pistas-horizontais');
  const vert = document.getElementById('pistas-verticais');
  horiz.innerHTML = '';
  vert.innerHTML = '';

  // ordenar por número e direção
  const h = palavras.filter(p => p.direcao === 'H').sort((a,b)=>a.numero-b.numero);
  const v = palavras.filter(p => p.direcao === 'V').sort((a,b)=>a.numero-b.numero);

  h.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.numero}. ${p.pista}`;
    horiz.appendChild(li);
  });

  v.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.numero}. ${p.pista}`;
    vert.appendChild(li);
  });
}

function getWordCells(p) {
  const cells = [];
  const len = p.palavra.length;
  const r0 = p.linha - 1;
  const c0 = p.coluna - 1;
  for (let i = 0; i < len; i++) {
    const r = p.direcao === 'H' ? r0 : r0 + i;
    const c = p.direcao === 'H' ? c0 + i : c0;
    const idx = r * COLUNAS + c;
    const cellDiv = document.querySelector(`#tabuleiro .celula:nth-child(${idx + 1})`);
    if (cellDiv) cells.push(cellDiv);
  }
  return cells;
}

function conferir() {
  let certas = 0;
  palavras.forEach(p => {
    const cells = getWordCells(p);
    const tentativa = cells.map(cd => (cd.querySelector('input').value || '').toUpperCase()).join('');
    const correta = p.palavra.toUpperCase();
    const ok = tentativa === correta;
    if (ok) certas++;
    cells.forEach(cd => {
      cd.classList.remove('certa','errada');
      cd.classList.add(ok ? 'certa' : 'errada');
    });
  });
  const contador = document.getElementById('contador');
  contador.textContent = `${certas} de ${palavras.length} palavras`;
}

function reiniciar() {
  document.querySelectorAll('#tabuleiro input').forEach(i => i.value = '');
  document.querySelectorAll('.celula').forEach(c => c.classList.remove('certa','errada'));
  document.getElementById('contador').textContent = `0 de ${palavras.length} palavras`;
}

document.addEventListener('DOMContentLoaded', () => {
  criarTabuleiro();
  preencherPistas();
  document.getElementById('btn-conferir').addEventListener('click', conferir);
  document.getElementById('btn-reiniciar').addEventListener('click', reiniciar);
});
