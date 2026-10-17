// CONFIGURACIÓN DE CODECK: completa tu número y las redes oficiales.
const CONFIG = {
  brand: "CODECK",
  whatsapp: "50492927987", // Cambia por tu número real, sin +, espacios ni guiones.
  social: {
    TikTok: "https://www.tiktok.com/@codeck_hn?_r=1&_t=ZS-9AdnOj3tcTG",
    Facebook: "https://www.facebook.com/",
    Instagram: "https://www.instagram.com/"
  }
};

const faq = [
  { q: "¿Cuánto cuesta una página web?", a: "En CODECK tenemos tres planes: Estándar por L700, Profesional por L1,200 y Premium por L1,500. Escríbenos para confirmar qué incluye tu proyecto." },
  { q: "¿Qué incluye el plan estándar?", a: "Incluye diseño moderno, adaptación a celular y computadora, información de tu negocio, botón de WhatsApp y enlaces a redes sociales." },
  { q: "¿Qué diferencia hay con el profesional?", a: "El Profesional incluye lo del Estándar y agrega más secciones, galería, preguntas frecuentes y chatbot de preguntas rápidas." },
  { q: "¿Qué incluye el plan premium?", a: "Incluye lo del Profesional, diseño más personalizado, secciones adicionales según lo acordado, efectos visuales y prioridad de atención." },
  { q: "¿Cuánto tardan en hacer la web?", a: "El tiempo depende del contenido y las funciones. Escríbenos con tu idea y te daremos un plazo estimado antes de comenzar." },
  { q: "¿Se verá bien en celular?", a: "¡Sí! Las páginas se diseñan para adaptarse a celulares, tabletas y computadoras." },
  { q: "¿Incluye dominio y alojamiento?", a: "El dominio y alojamiento pueden tener costos aparte. Te lo aclaramos antes de iniciar el proyecto." },
  { q: "¿Puedo poner mi logo y mis fotos?", a: "¡Claro! Puedes enviarnos tu logo, fotos, colores, textos y enlaces para personalizar tu página." },
  { q: "¿Pueden poner WhatsApp y redes sociales?", a: "Sí. Podemos agregar botones de WhatsApp y enlaces a TikTok, Facebook, Instagram y otras redes." },
  { q: "¿Cómo contrato?", a: "Pulsa un botón de Contratar o el botón de WhatsApp. Cuéntanos qué tipo de página necesitas y te orientaremos." }
];

const $ = selector => document.querySelector(selector);
function openWhatsApp(message) {
  const number = CONFIG.whatsapp.replace(/\D/g, "");
  if (!number || number.includes("XXXXXXXX")) {
    alert("Configura tu número de WhatsApp en script.js. Reemplaza 504XXXXXXXX por tu número real.");
    return;
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
$("#year").textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle"), mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.querySelectorAll("[data-plan]").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp(`Hola CODECK, quiero contratar el plan ${link.dataset.plan}. ¿Me pueden dar más información?`);
}));
$("#contactMain").addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp("¡Hola CODECK! Quiero información para crear una página web para mi negocio.");
});

const chatWindow = $("#chatWindow"), chatLauncher = $("#chatLauncher"), messages = $("#chatMessages");
const quickQuestions = $("#quickQuestions");
function toggleChat(open) {
  chatWindow.classList.toggle("open", open);
  chatWindow.setAttribute("aria-hidden", String(!open));
  chatLauncher.style.display = open ? "none" : "flex";
  if (open) $("#chatInput").focus();
}
chatLauncher.addEventListener("click", () => toggleChat(true));
$("#chatClose").addEventListener("click", () => toggleChat(false));

function addMessage(text, type) {
  const bubble = document.createElement("div");
  bubble.className = `message ${type === "user" ? "user-message" : "bot-message"}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}
function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function findAnswer(question) {
  const normalized = normalize(question);
  if (/\b(hola|buenas|buenos dias|buenas tardes)\b/.test(normalized)) {
    return "¡Hola! 👋 ¡Con gusto te contesto! Soy la asistente virtual de CODECK. Puedes preguntarme por precios, planes, tiempos de entrega o contacto.";
  }
  if (normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("contrat")) {
    return "¡Claro! Pulsa el botón de WhatsApp que aparece abajo del chat y podrás hablar directamente con el equipo de CODECK.";
  }
  const ranked = faq.map(item => {
    const terms = normalize(item.q + " " + item.a).replace(/[¿?¡!.,]/g, "").split(/\s+/).filter(word => word.length > 3);
    return {...item, score: terms.filter(term => normalized.includes(term)).length};
  }).sort((a,b) => b.score - a.score);
  return ranked[0].score < 2
    ? "¡Gracias por tu pregunta! Para darte una respuesta exacta, escríbenos por WhatsApp con el botón de abajo. El equipo de CODECK te ayudará."
    : ranked[0].a;
}
function ask(question) {
  if (!question.trim()) return;
  addMessage(question.trim(), "user");
  const answer = findAnswer(question);
  window.setTimeout(() => addMessage(answer, "bot"), 220);
}
faq.forEach(item => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = item.q;
  button.addEventListener("click", () => ask(item.q));
  quickQuestions.appendChild(button);
});
$("#chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#chatInput");
  ask(input.value);
  input.value = "";
});
$("#chatWhatsApp").addEventListener("click", () => openWhatsApp("Hola CODECK, estaba usando el asistente de la web y quiero hablar con una persona sobre crear una página web."));
