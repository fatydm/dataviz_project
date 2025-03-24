// import {scene} from './visualmap.js';

function displaySentence() {
    const divSentences = document.getElementById('tongue_transitions');

    const sentences = [
        "",
        "What are we eating today?",
        "我们今天吃什么?",
        "Što jedemo danas?",
        "Wat eten we vandaag?",
        "هناكل ايه النهاردة؟",
        "Anong kakainin natin ngayon?", 
        "Qu'est-ce qu'on mange aujourd'hui ?",
        "Τι τρώμε σήμερα?",
        "आज हम क्या खा रहे हैं?" ,
        "Cad a bheas muid ag ithe inniu?",
        "Cosa mangiamo oggi?",
        "Weh wi a eat today?",
        "今日は何を食べますか？",
        "Tutakula nini leo?",
        "Apa kita makan hari ini?",
        "¿Qué comemos hoy?",
        "Co jemy dzisiaj?",
        "O que vamos comer hoje?",
        "Что мы едим сегодня?",
        "วันนี้เรากินอะไร?",
        "Bu gün ne yiyoruz?",
        "Що ми їмо сьогодні?",
    ];
 

    for (let i = 0; i < sentences.length; i++) {

        const divEachP = document.createElement("div");
        divEachP.classList.add('sentence-wrapper');
    
        const paraSentence = document.createElement("p");
        paraSentence.classList.add('items', "ml2");
        
        const spanElement = document.createElement("span");
        spanElement.classList.add('sentence', );
        spanElement.innerText = sentences[i]; 
        // spanElement.style.color = getRandomLinearGradient();
        
        paraSentence.appendChild(spanElement);
    
        divEachP.appendChild(paraSentence);
    
        divSentences.appendChild(divEachP);
    }
    animate()
}
displaySentence();


function animate() {
    const textWrappers = document.querySelectorAll('.sentence-wrapper');
  
    textWrappers.forEach((wrapper, index) => {
      const spanElements = wrapper.querySelectorAll('.sentence');
  
      spanElements.forEach((span, i) => {

        span.innerHTML = span.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        const letters = span.querySelectorAll('.letter');
  
        anime.timeline({ loop: true })
          .add({
            targets: letters,
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i + (index * 1000) 
          })
          .add({
            targets: span,
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
          });
      });
    });
  }
  
  animate();

