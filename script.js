// import {scene} from './visualmap.js';

const itemCount = 22;
const batchSize = 4;
let currentBatchStart = 1;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function animateBatch(start, end) {
    for (let i = start; i <= end; i++) {
        const item = document.querySelector(`.item-${i}`);

        const randomColor = getRandomColor();

        //     0%, 15% { left: ${Math.random() * 100}%; bottom: ${Math.random() * 20}%; opacity: 0; }
        //     15%, 30% {left: ${Math.random() * 100}%; top: ${Math.random() * 50}%; opacity: 0.5; }
        //     30%, 50% { left: ${Math.random() * 100}%; bottom: ${Math.random() * 50}%; opacity: 1; }
        //     50%, 70% { left: ${Math.random() * 100}%;top: ${Math.random() * 50}%; opacity: 0.5; }
        //     70%, 85% { left: ${Math.random() * 100}%; bottom: ${Math.random() * 50}%; opacity: 1; }
        //     90%, 100% { left: ${Math.random() * 100 + 100}%; bottom: ${Math.random() * 50}%; opacity: 0; }
        // }`;

        const keyframes = `@keyframes anim-${i} {
            0%, 15% {
                left: ${Math.random() * -50}%; 
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
                top: ${Math.random() * 50}%; 
                opacity: 0.5;
            }
            70%, 85% {
                left: ${Math.random() * 20}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 1;
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
        tongueTransition.appendChild(item)
        tongueTransition.appendChild(styleSheet);

        item.style.animationName = `anim-${i}`;
        item.style.opacity = 1;
    }
}

function fadeOutBatch(start, end) {
    for (let i = start; i <= end; i++) {
        const item = document.querySelector(`.item-${i}`);
    item.style.opacity = 0; // Faire disparaître l'élément
    }
}

function animateNextBatch() {
    const batchEnd = Math.min(currentBatchStart + batchSize - 1, itemCount);
    if (currentBatchStart > 1) {

        // Faire disparaître le lot précédent
        const prevBatchStart = currentBatchStart - batchSize;
        const prevBatchEnd = batchEnd - batchSize;
        fadeOutBatch(prevBatchStart, prevBatchEnd);
    }
    animateBatch(currentBatchStart, batchEnd);
    currentBatchStart = batchEnd + 1;
    if (currentBatchStart <= itemCount) {
        setTimeout(animateNextBatch, 20000);
    }
}
animateNextBatch();