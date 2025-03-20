// import {scene} from './visualmap.js';


function getRandomLinearGradient() {
    const r = Math.floor(Math.random(20) * 80);
    const g = Math.floor(Math.random(100) * 190);
    const b = Math.floor(Math.random(80) * 120);

    return `rgb(${r}, ${g}, ${b})`;
}

function animateBatch(start, end) {
    for (let i = start; i <= end; i++) {
        const item = document.querySelector(`.item-${i}`);
    
        
       item.style.color = getRandomLinearGradient();
        

        const keyframes = `@keyframes anim-${i} {
            0%, 15% {
                left: ${Math.random() * 50}%; 
                bottom: ${Math.random() * 20}%; 
                opacity: 0;
            }
            15%, 30% {
                left: ${Math.random() * 100}%; 
                top: ${Math.random() * 50}%; 
                opacity: 0.5;
            }
            30%, 50% {
                left: ${Math.random() * 100}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 1;
            }
            50%, 70% {
                left: ${Math.random() * 80}%; 
                top: ${Math.random() * 100}%; 
                opacity: 0.5;
            }
            70%, 85% {
                left: ${Math.random() * 20}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 0;
            }
            90%, 100% {
                left: ${Math.random() * 120 + 80}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 0;
            }
        }`;


        const styleSheet = document.createElement("style");
        styleSheet.innerText = keyframes;

        const tongueTransition = document.getElementById('tongue_transitions')
        tongueTransition.appendChild(styleSheet);

        item.style.animationName = `anim-${i}`;
        
    }
}

function resetAnimation() {
    for (let i = 1; i <= 22; i++) {
        const item = document.querySelector(`.item-${i}`);
        item.style.animationName = ""; // ca fait que ca s'enleve l'item d'avant
    }
}

let currentBatchStart = 1;

function animateNextBatch() {
    resetAnimation();
    const itemCount = 22;
    const batchSize = 4;
    if (currentBatchStart >= itemCount) {
        currentBatchStart = 1;
    }
    const batchEnd = Math.min(currentBatchStart + batchSize - 1, itemCount);
    console.log(batchEnd)
    animateBatch(currentBatchStart, batchEnd);
    currentBatchStart = batchEnd + 1;
    
    setTimeout(animateNextBatch, 10000);
}


animateNextBatch();





