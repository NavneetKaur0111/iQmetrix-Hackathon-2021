const bot = document.querySelector('.bot i');
console.log(bot);
bot.addEventListener("click", (e)=> 
{
  if(e.target.classList[1] === 'fa-robot'){
      e.target.classList.remove('fa-robot');
      e.target.classList.add('fa-times');
    }
  else if(e.target.classList[1] === 'fa-times'){
      e.target.classList.remove('fa-times');
      e.target.classList.add('fa-robot');
  }
})