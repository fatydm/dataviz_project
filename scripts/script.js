// import {scene} from './visualmap.js';


function getRandomLinearGradient() {
    const r = Math.floor(Math.random(200) * 265);
    const g = Math.floor(Math.random(100) * 200);
    const b = Math.floor(Math.random(0) * 100);

    return `rgb(${r}, ${g}, ${b})`;
}


function displaySentence() {
    const divSentences = document.getElementById('tongue_transitions');

    const sentences = [
        "",
        "What are we eating tonight?",
        "我们今晚吃什么",
        "Što jedemo večeras?",
        "Wat eten we vanavond?",
        "هناكل ايه النهاردة بالليل؟",
        "Anong kakainin natin ngayong gabi?",
        "Qu'est-ce qu'on mange ce soir?",
        "Τι τρώμε απόψε?",
        "आज रात हम क्या खा रहे हैं?",
        "Cad a bheas muid ag ithe anocht?",
        "Cosa mangiamo stasera?",
        "Weh wi a eat tonight?",
        "今夜は何を食べますか？",
        "Tutakula nini usiku wa leo?",
        "Apa kita makan malam ini?",
        "¿Qué vamos a cenar esta noche?",
        "Co jemy dziś wieczorem?",
        "O que vamos comer hoje à noite?",
        "Что мы едим сегодня вечером?",
        "คืนนี้เรากินอะไรกัน?",
        "Bu akşam ne yiyoruz?",
        "Що ми їмо сьогодні ввечері?"
    ];
 

    for (let i = 0; i < sentences.length; i++) {

        const divEachP = document.createElement("div");
        divEachP.classList.add('sentence-wrapper');
    
        const paraSentence = document.createElement("p");
        paraSentence.classList.add('items', "ml2");
        
        const spanElement = document.createElement("span");
        spanElement.classList.add('sentence', );
        spanElement.innerText = sentences[i]; 
        spanElement.style.color = getRandomLinearGradient();
        
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

            anime.timeline({ loop: true })
                .add({
                    targets: span,
                    scale: [1, 1],
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 2000,
                    delay: (el, i) => 70 * i + (index * 1000)
                });
        });
    });
}

