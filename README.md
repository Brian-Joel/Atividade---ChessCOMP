# Cruzadinha & Minigame de Arquitetura Computacional (ChessCOMP)

## Descrição
Projeto interativo desenvolvido em HTML, CSS e JavaScript puros para treinar e consolidar conceitos de **Arquitetura Computacional**. O site reúne dois módulos principais: a **Cruzadinha Temática** e o minigame **Duelo de Clock & CPI**.

---

## Módulos do Projeto

### 1. Cruzadinha de Arquitetura Computacional
- **Objetivo:** Preencher o tabuleiro com 12 termos essenciais de Arquitetura Computacional (como CPU, ULA, RAM, CACHE, DMA, barramentos, etc.).
- **Como jogar:**
  - Digite 1 letra por casa (conversão automática para maiúsculas).
  - Use as pistas listadas à direita (dividia em Horizontais e Verticais).
  - Clique em **"Conferir"** para validar as palavras (destacadas em verde para correto e vermelho para incorreto).
  - Clique em **"Reiniciar"** para limpar o tabuleiro.

### 2. Minigame: Duelo de Clock & CPI (Xadrez & Desempenho)
- **Objetivo:** Testar e comparar o desempenho de processadores aplicando as fórmulas fundamentais de arquitetura:
  $$P = \frac{1}{f} \quad (\text{ns quando } f \text{ está em GHz})$$
  $$T = \text{CPI} \times P$$
- **Modos de Jogo:**
  - **♘ Modo Desafio:** Duelo tático entre as *Peças Brancas (CPU A)* e *Peças Pretas (CPU B)*. Analise a frequência ($f$), o $\text{CPI}$ e a animação do pulso de clock para acertar qual CPU executa a instrução em menor tempo ($T$). Conta com placar de vitórias, sequência e resolução matemática explicada a cada rodada.
  - **⚙ Calculadora Livre:** Digite valores personalizados de frequência ($\text{MHz}$ ou $\text{GHz}$) e $\text{CPI}$ para simular o desempenho de duas CPUs e conferir o resultado em tempo real.

---

## Arquivos Principais
- `index.html` — Estrutura da página, tabuleiro e container do minigame.
- `style.css` — Estilização visual temática (tons de madeira, pergaminho e dourado).
- `script.js` — Lógica do tabuleiro, validações, animações de clock e cálculos de desempenho.
- `README.md` — Documentação do projeto.

---

## Palavras Usadas (no Tabuleiro) e Pistas
1. **DUALCORE (H)** — Processador que possui dois núcleos de execução no mesmo chip.
2. **ULA (H)** — Parte do processador responsável por cálculos e operações lógicas.
3. **RAM (H)** — Memória volátil que armazena temporariamente programas e dados em execução.
4. **CACHE (V)** — Memória pequena e rápida que mantém dados frequentemente acessados pelo processador.
5. **DMA (V)** — Recurso que transfere dados entre periféricos e memória sem intervenção contínua do processador.
6. **ADDRESSBUS (H)** — Conjunto de fios que indica o endereço de leitura ou escrita na memória.
7. **EEPROM (V)** — Memória não volátil que permite salvar configurações mesmo sem alimentação elétrica.
8. **UC (V)** — Parte do processador que decodifica instruções e coordena operações.
9. **FLASH (H)** — Memória regravável e não volátil que pode armazenar programas.
10. **CPU (H)** — Componente que interpreta e executa instruções de programas.
11. **ROM (H)** — Memória não volátil que armazena instruções essenciais de inicialização.
12. **DATABUS (V)** — Conjunto de fios que transporta dados entre os componentes do computador.

---

## Link do Site
🔗 [https://brian-joel.github.io/Atividade---ChessCOMP/](https://brian-joel.github.io/Atividade---ChessCOMP/)
