/*const btn = document.querySelector("button");
const outputme = document.querySelector(".output-you");
const outputbot = document.querySelector(".output-bot");*/
const popup = document.querySelector('.chat-popup');
const chatBtn = document.querySelector('.chat-btn');
const submitBtn = document.querySelector('.send');
const micBtn = document.querySelector('.mic')
const chatArea = document.querySelector('.chat-area');
const inputElm = document.querySelector('input');
const socket = io();

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;

micBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = function (event) {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript;
  console.log(text);

  let temp = `<div class="outgoing-msg">
  <span class="my-msg">${text}</span>
  <img src="img/me.jpg" class="avatar">
  </div>`;
  chatArea.insertAdjacentHTML("beforeend", temp);
  chatArea.scrollTop = chatArea.scrollHeight;
  socket.emit("chat message", text);
};

const botReply = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.pitch = 1;
  utterance.volume = 1;

  synth.speak(utterance);
};

socket.on("bot reply", (text) => {
    let temp = `<div class="incoming-msg">
    <img src="img/bot.jpg" class="avatar">
    <span class="bot-msg">${text}</span>
    </div>`;
    chatArea.insertAdjacentHTML("beforeend", temp);
    chatArea.scrollTop = chatArea.scrollHeight;
    botReply(text);
});

submitBtn.addEventListener('click', ()=> {
    let userInput = inputElm.value;
    let temp = `<div class="outgoing-msg">
    <span class="my-msg">${userInput}</span>
    <img src="img/me.jpg" class="avatar">
    </div>`;

    chatArea.insertAdjacentHTML("beforeend", temp);
    chatArea.scrollTop = chatArea.scrollHeight;
    inputElm.value = "";
    socket.emit("chat message", userInput);
})

chatBtn.addEventListener('click', ()=>{
    popup.classList.toggle('show');
})