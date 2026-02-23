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

// IA Agent
const iaMessages = document.getElementById("ia-messages");
const iaInput = document.getElementById("ia-input");

// Função para adicionar mensagens
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = sender + ": " + text;
  iaMessages.appendChild(msg);
  iaMessages.scrollTop = iaMessages.scrollHeight;
}

// Mensagem inicial
addMessage(
  "WuSmart",
  "Olá! Eu sou sua assistente WuSmart. Posso te apresentar os serviços e benefícios da automação. O que você gostaria de conhecer?",
);

// Respostas simples
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
