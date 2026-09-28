/* =========================
   1. Carrossel
========================= */
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;

if (dotsContainer && slides.length > 0) {
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

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

if (slides.length > 0) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 4000);
}

/* =========================
   2. Chatbox da IA WuSmart (Sem Backend)
========================= */
const OPENAI_API_KEY = "";

const iaAgent = document.getElementById("ia-agent");
const iaMessages = document.getElementById("ia-messages");
const iaInput = document.getElementById("ia-input");
const iaClose = document.getElementById("ia-close");
const botaoInteligente = document.querySelector(".botao-inteligente");

let conversationHistory = [];

function appendMessage(sender, text) {
  const msgContainer = document.createElement("div");
  msgContainer.classList.add(
    "ia-msg",
    sender === "Você" ? "ia-msg-user" : "ia-msg-bot",
  );

  const senderSpan = document.createElement("strong");
  senderSpan.innerText = `${sender}: `;

  const textNode = document.createTextNode(text);

  msgContainer.appendChild(senderSpan);
  msgContainer.appendChild(textNode);

  iaMessages.appendChild(msgContainer);
  iaMessages.scrollTop = iaMessages.scrollHeight;
}

function showTypingIndicator() {
  const typingElement = document.createElement("div");
  typingElement.classList.add("ia-msg", "ia-msg-bot", "ia-typing");
  typingElement.id = "ia-typing-indicator";
  typingElement.innerHTML = "<em>WuSmart está digitando...</em>";
  iaMessages.appendChild(typingElement);
  iaMessages.scrollTop = iaMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById("ia-typing-indicator");
  if (indicator) indicator.remove();
}

function mensagemInicial() {
  if (iaMessages.children.length === 0) {
    const welcomeText =
      "Olá! Sou o assistente WuSmart. Posso te ajudar com dúvidas sobre automação de iluminação, climatização, segurança, áudio e vídeo. O que gostaria de saber?";
    appendMessage("WuSmart", welcomeText);
    conversationHistory.push({ role: "assistant", content: welcomeText });
  }
}

async function handleUserMessage() {
  const userText = iaInput.value.trim();
  if (!userText) return;

  appendMessage("Você", userText);
  iaInput.value = "";
  conversationHistory.push({ role: "user", content: userText });

  showTypingIndicator();

  setTimeout(async () => {
    let botReply = "";

    if (OPENAI_API_KEY !== "") {
      try {
        botReply = await fetchOpenAIResponse();
      } catch (error) {
        console.error("Erro na API OpenAI:", error);
        botReply = getLocalAgentReply(userText);
      }
    } else {
      botReply = getLocalAgentReply(userText);
    }

    removeTypingIndicator();
    appendMessage("WuSmart", botReply);
    conversationHistory.push({ role: "assistant", content: botReply });
  }, 600);
}

function getLocalAgentReply(text) {
  const t = text.toLowerCase();

  if (t.match(/\b(olá|ola|oi|bom dia|boa tarde|boa noite|fala|e ai)\b/)) {
    return "Olá! Como posso te ajudar hoje com o projeto de automação da sua casa?";
  }
  if (
    t.match(/\b(iluminação|iluminacao|luz|luzes|led|cenarios|fita de led)\b/)
  ) {
    return "Com a automação de iluminação você cria cenários para jantar, cinema ou relaxar, controla tudo por voz (Alexa/Google/Siri) e economiza energia com desligamento automático.";
  }
  if (
    t.match(
      /\b(ar|clima|climatização|climatizacao|ar condicionado|temperatura|termostato)\b/,
    )
  ) {
    return "Integramos seu ar-condicionado para ligar automaticamente antes de você chegar em casa e ajustar a temperatura ideal de acordo com o horário do dia.";
  }
  if (
    t.match(
      /\b(segurança|seguranca|camera|câmera|fechadura|alarme|acesso|portao|portão)\b/,
    )
  ) {
    return "Oferecemos monitoramento por câmeras com acesso no celular, fechaduras biométricas/digitais e sensores de presença integrados para sua tranquilidade.";
  }
  if (
    t.match(
      /\b(som|audio|vídeo|video|home theater|tv|cinema|caixa de som|multiroom)\b/,
    )
  ) {
    return "Projetamos sistemas de som ambiente (multiroom) e Home Theater de alta performance para tocar suas músicas e filmes em qualquer ambiente da casa com um toque.";
  }
  if (
    t.match(
      /\b(preço|preco|valor|quanto custa|orçamento|orcamento|custo|investimento)\b/,
    )
  ) {
    return "O valor depende do tamanho do seu imóvel e das soluções escolhidas. Clique no botão 'Inicie Seu Projeto' no topo do site para solicitar uma estimativa personalizada sem compromisso!";
  }
  if (
    t.match(
      /\b(obra|reforma|planta|pronta|apartamento|casa|sem fio|zigbee|wifi)\b/,
    )
  ) {
    return "Atendemos imóveis na planta, em obra ou já prontos! Para imóveis prontos, utilizamos módulos sem fio de alta estabilidade, sem necessidade de quebrar paredes.";
  }
  if (t.match(/\b(alexa|google|apple|siri|homekit|voz)\b/)) {
    return "Sim! Nossos projetos são totalmente compatíveis com Alexa, Google Home e Apple HomeKit para controle total por comandos de voz.";
  }
  if (
    t.match(/\b(contato|whatsapp|humano|telefone|email|atendente|falar com)\b/)
  ) {
    return "Você pode preencher o formulário clicando em 'Inicie Seu Projeto' no menu superior que nossa equipe técnica entrará em contato diretamente com você!";
  }

  return "Consigo te ajudar com informações sobre Iluminação, Climatização, Som & Vídeo, Segurança e Orçamentos. Sobre qual desses pontos você gostaria de saber mais?";
}

async function fetchOpenAIResponse() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é o WuSmart, assistente virtual especializado em automação residencial. Responda de forma curta, cordial e profissional.",
        },
        ...conversationHistory,
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

/* =========================
   3. Eventos e Controles
========================= */
if (iaInput) {
  iaInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserMessage();
    }
  });
}

if (botaoInteligente) {
  botaoInteligente.addEventListener("click", () => {
    const isHidden =
      iaAgent.style.display === "none" || iaAgent.style.display === "";
    if (isHidden) {
      iaAgent.style.display = "flex";
      iaAgent.style.opacity = "1";
      mensagemInicial();
      iaInput.focus();
    } else {
      iaAgent.style.opacity = "0";
      setTimeout(() => (iaAgent.style.display = "none"), 300);
    }
  });
}

if (iaClose) {
  iaClose.addEventListener("click", () => {
    iaAgent.style.opacity = "0";
    setTimeout(() => (iaAgent.style.display = "none"), 300);
  });
}

/* =========================
   4. Modal & EmailJS
========================= */
const btnProjeto = document.getElementById("btn-projeto");
const modalProjeto = document.getElementById("modal-projeto");
const modalClose = document.getElementById("modal-close");

if (btnProjeto && modalProjeto) {
  btnProjeto.addEventListener("click", () => {
    modalProjeto.style.display = "block";
  });
}

if (modalClose && modalProjeto) {
  modalClose.addEventListener("click", () => {
    modalProjeto.style.display = "none";
  });
}

window.addEventListener("click", (event) => {
  if (event.target === modalProjeto) {
    modalProjeto.style.display = "none";
  }
});

emailjs.init("HlH7yYWjzGVeOoQDf");

const formOrcamento = document.getElementById("form-orcamento");
if (formOrcamento) {
  formOrcamento.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
      nome: formOrcamento.nome.value,
      email: formOrcamento.email.value,
      telefone: formOrcamento.telefone.value,
      descricao: formOrcamento.descricao.value,
    };

    try {
      await emailjs.send("service_ezwyl1q", "template_5t710kd", dados);
      alert("Orçamento enviado com sucesso! Entraremos em contato em breve.");
      formOrcamento.reset();
      modalProjeto.style.display = "none";
    } catch (error) {
      alert("Erro ao enviar orçamento. Por favor, tente novamente.");
      console.error("Erro EmailJS:", error);
    }
  });
}
