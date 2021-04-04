const bot = document.querySelector('.bot i');
const box = document.querySelector('.bot .chatbox');
const form = document.querySelector('form');
const messageBox = document.querySelector('.message-box');
const message = document.querySelector('.message');

bot.addEventListener("click", (e)=> 
{
  if(e.target.classList[1] === 'fa-robot'){
      e.target.classList.remove('fa-robot');
      e.target.classList.add('fa-times');
      box.classList.remove('invisible');
    }
  else if(e.target.classList[1] === 'fa-times'){
      e.target.classList.remove('fa-times');
      e.target.classList.add('fa-robot');
      box.classList.add('invisible');
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = message.value ;
  message.value = "";
  if(msg !== ""){
    messageBox.insertAdjacentHTML("beforeend", 
    `<p class="outgoing"> ${msg} <p>`);
  }
})