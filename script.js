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

const grid = Array.from({ length: LINHAS }, () => Array(COLUNAS).fill(null));

function criarTabuleiro() {
  const tab = document.getElementById('tabuleiro');
  tab.innerHTML = '';

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
      input.addEventListener('input', () => {
        input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      });

      cel.appendChild(input);
      tab.appendChild(cel);
    }
  }

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

      const idx = r * COLUNAS + c;
      const cellDiv = document.querySelector(`#tabuleiro .celula:nth-child(${idx + 1})`);
      if (cellDiv) cellDiv.classList.add('ativa');
    }

    const index = r0 * COLUNAS + c0;
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

  const h = palavras.filter(p => p.direcao === 'H').sort((a, b) => a.numero - b.numero);
  const v = palavras.filter(p => p.direcao === 'V').sort((a, b) => a.numero - b.numero);

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
      cd.classList.remove('certa', 'errada');
      cd.classList.add(ok ? 'certa' : 'errada');
    });
  });
  document.getElementById('contador').textContent = `${certas} de ${palavras.length} palavras`;
}

function reiniciar() {
  document.querySelectorAll('#tabuleiro input').forEach(i => i.value = '');
  document.querySelectorAll('.celula').forEach(c => c.classList.remove('certa', 'errada'));
  document.getElementById('contador').textContent = `0 de ${palavras.length} palavras`;
}

/* =========================================================
   MINIGAME: DUELO DE CLOCK & CPI (P = 1 / f  |  T = CPI * P)
   ========================================================= */

const cenariosDuelo = [
  {
    a: { freqVal: 500, unit: "MHz", cpi: 3, desc: "Pipeline Enxuto" },
    b: { freqVal: 1, unit: "GHz", cpi: 8, desc: "Clock Alto, CPI Alto" }
  },
  {
    a: { freqVal: 2, unit: "GHz", cpi: 4, desc: "Núcleo Equilibrado" },
    b: { freqVal: 2.5, unit: "GHz", cpi: 5, desc: "Frequência Superior" }
  },
  {
    a: { freqVal: 1, unit: "GHz", cpi: 4, desc: "Arquitetura RISC" },
    b: { freqVal: 2, unit: "GHz", cpi: 8, desc: "Instruções Complexas" }
  },
  {
    a: { freqVal: 4, unit: "GHz", cpi: 6, desc: "Alta Frequência" },
    b: { freqVal: 2, unit: "GHz", cpi: 2, desc: "Baixa Latência" }
  },
  {
    a: { freqVal: 800, unit: "MHz", cpi: 2, desc: "Ciclos Otimizados" },
    b: { freqVal: 1.6, unit: "GHz", cpi: 5, desc: "Dobro do Clock" }
  },
  {
    a: { freqVal: 2.5, unit: "GHz", cpi: 5, desc: "Unidade Padrão" },
    b: { freqVal: 1, unit: "GHz", cpi: 3, desc: "Execução Rápida" }
  },
  {
    a: { freqVal: 1, unit: "GHz", cpi: 6, desc: "Tempo de 6 ns" },
    b: { freqVal: 2, unit: "GHz", cpi: 12, desc: "Tempo de 6 ns" }
  }
];

let ultimoIndiceCenario = -1;
let dueloAtual = null;
let vitorias = 0;
let sequencia = 0;
let rodadaRespondida = false;

function calcularMetricas(freqVal, unit, cpi) {
  const freqGHz = unit === "MHz" ? freqVal / 1000 : freqVal;
  const periodoNs = 1 / freqGHz;
  const tempoNs = cpi * periodoNs;
  return { freqGHz, periodoNs, tempoNs };
}

function formatarNum(n) {
  return Number(n.toFixed(2)).toString().replace('.', ',');
}

function renderizarOnda(elementoId, freqGHz) {
  const container = document.getElementById(elementoId);
  container.innerHTML = '';
  const barras = Math.min(20, Math.max(6, Math.round(freqGHz * 6)));
  const duracao = Math.max(0.25, 1.2 / Math.max(0.5, freqGHz));

  for (let i = 0; i < barras; i++) {
    const bar = document.createElement('div');
    bar.className = 'pulso-barra';
    bar.style.animationDuration = `${duracao}s`;
    bar.style.animationDelay = `${(i % 2) * (duracao / 2)}s`;
    container.appendChild(bar);
  }
}

function sortearIndiceCenario() {
  if (cenariosDuelo.length <= 1) return 0;
  let idx = Math.floor(Math.random() * cenariosDuelo.length);
  if (idx === ultimoIndiceCenario) {
    idx = (idx + 1) % cenariosDuelo.length;
  }
  ultimoIndiceCenario = idx;
  return idx;
}

function carregarRodada() {
  rodadaRespondida = false;
  const idx = sortearIndiceCenario();
  const base = cenariosDuelo[idx];

  const metA = calcularMetricas(base.a.freqVal, base.a.unit, base.a.cpi);
  const metB = calcularMetricas(base.b.freqVal, base.b.unit, base.b.cpi);

  dueloAtual = { ...base, metA, metB };

  document.getElementById('desc-cpu-a').textContent = base.a.desc;
  document.getElementById('freq-a').textContent =
    base.a.unit === "MHz"
      ? `${base.a.freqVal} MHz (${formatarNum(metA.freqGHz)} GHz)`
      : `${formatarNum(base.a.freqVal)} GHz`;
  document.getElementById('cpi-a').textContent = `${base.a.cpi} ciclos`;

  document.getElementById('desc-cpu-b').textContent = base.b.desc;
  document.getElementById('freq-b').textContent =
    base.b.unit === "MHz"
      ? `${base.b.freqVal} MHz (${formatarNum(metB.freqGHz)} GHz)`
      : `${formatarNum(base.b.freqVal)} GHz`;
  document.getElementById('cpi-b').textContent = `${base.b.cpi} ciclos`;

  renderizarOnda('onda-a', metA.freqGHz);
  renderizarOnda('onda-b', metB.freqGHz);

  const cardA = document.getElementById('card-cpu-a');
  const cardB = document.getElementById('card-cpu-b');
  cardA.classList.remove('vencedor', 'perdedor', 'empate');
  cardB.classList.remove('vencedor', 'perdedor', 'empate');

  document.getElementById('res-a').classList.add('oculto');
  document.getElementById('res-b').classList.add('oculto');
  document.getElementById('feedback-duelo').classList.add('oculto');

  document.querySelectorAll('.btn-escolha').forEach(btn => {
    btn.disabled = false;
  });
}

function avaliarEscolha(escolha) {
  if (rodadaRespondida || !dueloAtual) return;
  rodadaRespondida = true;

  const { a, b, metA, metB } = dueloAtual;
  const diff = metA.tempoNs - metB.tempoNs;
  let vencedorReal = 'EMPATE';
  if (Math.abs(diff) > 0.001) {
    vencedorReal = diff < 0 ? 'A' : 'B';
  }

  const acertou = escolha === vencedorReal;

  if (acertou) {
    vitorias++;
    sequencia++;
  } else {
    sequencia = 0;
  }

  document.getElementById('placar-vitorias').textContent = vitorias;
  document.getElementById('placar-sequencia').textContent = sequencia;

  const resA = document.getElementById('res-a');
  const resB = document.getElementById('res-b');
  resA.textContent = `Tempo (T) = ${formatarNum(metA.tempoNs)} ns`;
  resB.textContent = `Tempo (T) = ${formatarNum(metB.tempoNs)} ns`;
  resA.classList.remove('oculto');
  resB.classList.remove('oculto');

  const cardA = document.getElementById('card-cpu-a');
  const cardB = document.getElementById('card-cpu-b');
  cardA.classList.remove('vencedor', 'perdedor', 'empate');
  cardB.classList.remove('vencedor', 'perdedor', 'empate');

  if (vencedorReal === 'A') {
    cardA.classList.add('vencedor');
    cardB.classList.add('perdedor');
  } else if (vencedorReal === 'B') {
    cardB.classList.add('vencedor');
    cardA.classList.add('perdedor');
  } else {
    cardA.classList.add('empate');
    cardB.classList.add('empate');
  }

  const titulo = document.getElementById('feedback-titulo');
  titulo.textContent = acertou
    ? '✔ Resposta correta! Você aplicou bem P = 1 ÷ f e T = CPI × P.'
    : '✘ Não foi dessa vez! Veja o cálculo passo a passo:';

  document.getElementById('feedback-passos').innerHTML = `
    <p>• <strong>Brancas (CPU A):</strong> P = 1 ÷ ${formatarNum(metA.freqGHz)} GHz = <strong>${formatarNum(metA.periodoNs)} ns</strong> → T = ${a.cpi} × ${formatarNum(metA.periodoNs)} = <strong>${formatarNum(metA.tempoNs)} ns</strong></p>
    <p>• <strong>Pretas (CPU B):</strong> P = 1 ÷ ${formatarNum(metB.freqGHz)} GHz = <strong>${formatarNum(metB.periodoNs)} ns</strong> → T = ${b.cpi} × ${formatarNum(metB.periodoNs)} = <strong>${formatarNum(metB.tempoNs)} ns</strong></p>
  `;

  document.getElementById('feedback-duelo').classList.remove('oculto');
  document.querySelectorAll('.btn-escolha').forEach(btn => {
    btn.disabled = true;
  });
}

function atualizarCalculadoraLivre() {
  const fA = parseFloat(document.getElementById('calc-freq-a').value) || 0;
  const uA = document.getElementById('calc-unit-a').value;
  const cA = parseFloat(document.getElementById('calc-cpi-a').value) || 0;

  const fB = parseFloat(document.getElementById('calc-freq-b').value) || 0;
  const uB = document.getElementById('calc-unit-b').value;
  const cB = parseFloat(document.getElementById('calc-cpi-b').value) || 0;

  const saidaA = document.getElementById('saida-calc-a');
  const saidaB = document.getElementById('saida-calc-b');
  const veredito = document.getElementById('veredito-calc');

  if (fA <= 0 || cA <= 0 || fB <= 0 || cB <= 0) {
    saidaA.textContent = 'Preencha valores maiores que zero.';
    saidaB.textContent = 'Preencha valores maiores que zero.';
    veredito.textContent = 'Aguardando valores válidos para comparar.';
    return;
  }

  const mA = calcularMetricas(fA, uA, cA);
  const mB = calcularMetricas(fB, uB, cB);

  saidaA.innerHTML = `
    Frequência: <strong>${formatarNum(mA.freqGHz)} GHz</strong><br>
    Período (P): <strong>${formatarNum(mA.periodoNs)} ns</strong><br>
    Tempo/Instrução (T): <strong>${formatarNum(mA.tempoNs)} ns</strong>
  `;

  saidaB.innerHTML = `
    Frequência: <strong>${formatarNum(mB.freqGHz)} GHz</strong><br>
    Período (P): <strong>${formatarNum(mB.periodoNs)} ns</strong><br>
    Tempo/Instrução (T): <strong>${formatarNum(mB.tempoNs)} ns</strong>
  `;

  if (Math.abs(mA.tempoNs - mB.tempoNs) < 0.001) {
    veredito.textContent = `= Empate técnico! Ambos levam ${formatarNum(mA.tempoNs)} ns por instrução.`;
  } else if (mA.tempoNs < mB.tempoNs) {
    veredito.textContent = `♘ Processador A é mais rápido (${formatarNum(mA.tempoNs)} ns contra ${formatarNum(mB.tempoNs)} ns).`;
  } else {
    veredito.textContent = `♞ Processador B é mais rápido (${formatarNum(mB.tempoNs)} ns contra ${formatarNum(mA.tempoNs)} ns).`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  criarTabuleiro();
  preencherPistas();
  document.getElementById('btn-conferir').addEventListener('click', conferir);
  document.getElementById('btn-reiniciar').addEventListener('click', reiniciar);

  const tabCruz = document.getElementById('tab-cruzadinha');
  const tabMini = document.getElementById('tab-minigame');
  const viewCruz = document.getElementById('view-cruzadinha');
  const viewMini = document.getElementById('view-minigame');
  const subtitulo = document.getElementById('subtitulo-topo');

  tabCruz.addEventListener('click', () => {
    tabCruz.classList.add('ativa');
    tabMini.classList.remove('ativa');
    viewCruz.classList.remove('oculto');
    viewMini.classList.add('oculto');
    subtitulo.textContent = 'Preencha as casas com base nas pistas (letras maiúsculas, sem acento e sem espaço).';
  });

  tabMini.addEventListener('click', () => {
    tabMini.classList.add('ativa');
    tabCruz.classList.remove('ativa');
    viewMini.classList.remove('oculto');
    viewCruz.classList.add('oculto');
    subtitulo.textContent = 'Compare frequência de clock e CPI para descobrir qual processador executa a instrução mais rápido.';
  });

  const btnDesafio = document.getElementById('btn-modo-desafio');
  const btnCalc = document.getElementById('btn-modo-calc');
  const areaDesafio = document.getElementById('area-desafio');
  const areaCalc = document.getElementById('area-calculadora');

  btnDesafio.addEventListener('click', () => {
    btnDesafio.classList.add('ativa');
    btnCalc.classList.remove('ativa');
    areaDesafio.classList.remove('oculto');
    areaCalc.classList.add('oculto');
  });

  btnCalc.addEventListener('click', () => {
    btnCalc.classList.add('ativa');
    btnDesafio.classList.remove('ativa');
    areaCalc.classList.remove('oculto');
    areaDesafio.classList.add('oculto');
    atualizarCalculadoraLivre();
  });

  document.querySelectorAll('.btn-escolha').forEach(btn => {
    btn.addEventListener('click', () => avaliarEscolha(btn.dataset.escolha));
  });

  document.getElementById('btn-proxima-rodada').addEventListener('click', carregarRodada);

  ['calc-freq-a', 'calc-unit-a', 'calc-cpi-a', 'calc-freq-b', 'calc-unit-b', 'calc-cpi-b'].forEach(id => {
    document.getElementById(id).addEventListener('input', atualizarCalculadoraLivre);
    document.getElementById(id).addEventListener('change', atualizarCalculadoraLivre);
  });

  carregarRodada();
  atualizarCalculadoraLivre();
});
