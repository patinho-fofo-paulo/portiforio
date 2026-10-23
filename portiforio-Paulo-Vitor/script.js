// =========================================
// SELEÇÃO DOS ELEMENTOS PRINCIPAIS
// =========================================
const botaoTema = document.getElementById("botao-tema");
const iconeTema = botaoTema.querySelector("i");

const botaoMenu = document.getElementById("botao-menu");
const iconeMenu = botaoMenu.querySelector("i");
const navegacao = document.getElementById("navegacao");
const linksMenu = document.querySelectorAll(".link-menu");

const textoDigitado = document.getElementById("texto-digitado");
const botaoTopo = document.getElementById("botao-topo");
const anoAtual = document.getElementById("ano-atual");

const elementosRevelar = document.querySelectorAll(".revelar");

// =========================================
// ALTERNÂNCIA DE TEMA
// O tema escolhido é salvo no localStorage.
// =========================================
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  localStorage.setItem("tema-preferido", tema);

  if (tema === "escuro") {
    iconeTema.className = "bi bi-sun";
    botaoTema.setAttribute("aria-label", "Ativar modo claro");
  } else {
    iconeTema.className = "bi bi-moon-stars";
    botaoTema.setAttribute("aria-label", "Ativar modo escuro");
  }
}

function alternarTema() {
  const temaAtual = document.documentElement.getAttribute("data-tema");
  const novoTema = temaAtual === "escuro" ? "claro" : "escuro";

  aplicarTema(novoTema);
}

// Ao abrir o site, verificamos se já existe uma preferência salva.
const temaSalvo = localStorage.getItem("tema-preferido");
aplicarTema(temaSalvo === "escuro" ? "escuro" : "claro");

botaoTema.addEventListener("click", alternarTema);

// =========================================
// MENU HAMBÚRGUER
// =========================================
function alternarMenu() {
  const menuEstaAberto = navegacao.classList.toggle("aberto");

  botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
  botaoMenu.setAttribute(
    "aria-label",
    menuEstaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
  );

  iconeMenu.className = menuEstaAberto ? "bi bi-x-lg" : "bi bi-list";
}

botaoMenu.addEventListener("click", alternarMenu);

// Fecha o menu ao clicar em um link interno.
linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    navegacao.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
    iconeMenu.className = "bi bi-list";
  });
});

// =========================================
// EFEITO MÁQUINA DE ESCREVER
// =========================================
const textosParaDigitar = [
  "Estudante de Desenvolvimento Full Stack",
  "Focado em Front-end",
  "Aprendendo todos os dias"
];

let indiceTexto = 0;
let indiceCaractere = 0;
let apagandoTexto = false;

function escreverTexto() {
  const textoAtual = textosParaDigitar[indiceTexto];

  if (!apagandoTexto) {
    textoDigitado.textContent = textoAtual.slice(0, indiceCaractere + 1);
    indiceCaractere++;

    if (indiceCaractere === textoAtual.length) {
      apagandoTexto = true;
      setTimeout(escreverTexto, 1800);
      return;
    }

    setTimeout(escreverTexto, 70);
  } else {
    textoDigitado.textContent = textoAtual.slice(0, indiceCaractere - 1);
    indiceCaractere--;

    if (indiceCaractere === 0) {
      apagandoTexto = false;
      indiceTexto = (indiceTexto + 1) % textosParaDigitar.length;
    }

    setTimeout(escreverTexto, 35);
  }
}

// Inicia a animação apenas se o usuário não preferir menos movimento.
const prefereMenosMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefereMenosMovimento) {
  textoDigitado.textContent = textosParaDigitar[0];
} else {
  escreverTexto();
}

// =========================================
// BOTÃO VOLTAR AO TOPO
// =========================================
function verificarBotaoTopo() {
  const paginaRolada = window.scrollY > 400;

  botaoTopo.classList.toggle("visivel", paginaRolada);
}

botaoTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefereMenosMovimento ? "auto" : "smooth"
  });
});

window.addEventListener("scroll", verificarBotaoTopo);
verificarBotaoTopo();

// =========================================
// ANIMAÇÕES AO ROLAR
// O IntersectionObserver observa quando um
// elemento entra na tela e adiciona a classe "visivel".
// =========================================
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

elementosRevelar.forEach((elemento) => {
  observador.observe(elemento);
});

// =========================================
// NAVEGAÇÃO SUAVE
// O CSS já usa "scroll-behavior: smooth",
// mas este código evita o comportamento padrão
// e garante uma rolagem mais controlada.
// =========================================
linksMenu.forEach((link) => {
  link.addEventListener("click", (evento) => {
    const destino = document.querySelector(link.getAttribute("href"));

    if (destino) {
      evento.preventDefault();

      destino.scrollIntoView({
        behavior: prefereMenosMovimento ? "auto" : "smooth",
        block: "start"
      });
    }
  });
});

// =========================================
// ANO AUTOMÁTICO DO RODAPÉ
// =========================================
anoAtual.textContent = new Date().getFullYear();