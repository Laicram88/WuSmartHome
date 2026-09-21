/* =========================
   Carrossel
========================= */
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;

// Criar os dots dinamicamente
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(index) {
  currentIndex = index;
  showSlide(currentIndex);
}

// autoplay com fade
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 4000);

/* =========================
   Chatbox da IA
========================= */
const iaAgent = document.getElementById("ia-agent");
const iaMessages = document.getElementById("ia-messages");
const iaInput = document.getElementById("ia-input");
const iaClose = document.getElementById("ia-close");

// Função para adicionar mensagens
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = sender + ": " + text;
  iaMessages.appendChild(msg);
  iaMessages.scrollTop = iaMessages.scrollHeight;
}

// Resposta inicial (aparece quando o chat é aberto)
function mensagemInicial() {
  addMessage(
    "WuSmart",
    "Olá! Eu sou sua assistente WuSmart. Posso te apresentar os serviços e benefícios da automação. O que você gostaria de conhecer?",
  );
}

// Enviar mensagem ao pressionar Enter
iaInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const userText = iaInput.value.trim();
    if (userText) {
      addMessage("Você", userText);
      iaInput.value = "";

      // respostas básicas
      if (userText.toLowerCase().includes("serviços")) {
        addMessage(
          "WuSmart",
          "Oferecemos automação residencial, monitoramento por câmeras, climatização inteligente e muito mais.",
        );
      } else if (userText.toLowerCase().includes("benefícios")) {
        addMessage(
          "WuSmart",
          "A automação traz economia de energia, segurança reforçada e ambientes que se adaptam à sua rotina.",
        );
      } else if (userText.toLowerCase().includes("contato")) {
        addMessage(
          "WuSmart",
          "Você pode clicar em 'Vamos Conversar' no menu para falar diretamente conosco.",
        );
      } else {
        addMessage(
          "WuSmart",
          "Posso te mostrar os serviços, benefícios ou como entrar em contato. Qual você prefere?",
        );
      }
    }
  }
});

/* =========================
   Botão inteligente
========================= */
const botaoInteligente = document.querySelector(".botao-inteligente");

// Ao clicar no botão inteligente, abre/fecha o chat
botaoInteligente.addEventListener("click", () => {
  if (iaAgent.style.display === "none" || iaAgent.style.display === "") {
    iaAgent.style.display = "block";
    iaAgent.style.opacity = "1";
    iaMessages.innerHTML = ""; // limpa mensagens anteriores
    mensagemInicial();
  } else {
    iaAgent.style.opacity = "0";
    setTimeout(() => (iaAgent.style.display = "none"), 400);
  }
});

// Ao clicar no botão de fechar (X), fecha o chat
iaClose.addEventListener("click", () => {
  iaAgent.style.opacity = "0";
  setTimeout(() => (iaAgent.style.display = "none"), 400);
});

// Botao "Inicie o seu projeto"

const btnProjeto = document.getElementById("btn-projeto");
const modalProjeto = document.getElementById("modal-projeto");
const modalClose = document.getElementById("modal-close");

btnProjeto.addEventListener("click", () => {
  modalProjeto.style.display = "block"; // mostra o modal
});

modalClose.addEventListener("click", () => {
  modalProjeto.style.display = "none"; // fecha ao clicar no X
});

window.addEventListener("click", (event) => {
  if (event.target === modalProjeto) {
    modalProjeto.style.display = "none"; // fecha ao clicar fora
  }
});

/* Envio do formulário de orçamento via EmailJS */

emailjs.init("HlH7yYWjzGVeOoQDf");

const formOrcamento = document.getElementById("form-orcamento");

formOrcamento.addEventListener("submit", async (event) => {
  event.preventDefault(); // evita recarregar a página

  const dados = {
    nome: formOrcamento.nome.value,
    email: formOrcamento.email.value,
    telefone: formOrcamento.telefone.value,
    descricao: formOrcamento.descricao.value,
  };

  try {
    await emailjs.send("service_ezwyl1q", "template_5t710kd", dados);
    alert("Orçamento enviado com sucesso!");
    formOrcamento.reset();
    document.getElementById("modal-projeto").style.display = "none";
  } catch (error) {
    alert("Erro ao enviar. Tente novamente.");
    console.error(error);
  }
});
