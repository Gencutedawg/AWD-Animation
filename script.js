const lungs = document.getElementById('lungs');
const indicator = document.getElementById('indicator');
const backgroundMusic = document.getElementById('backgroundMusic');
const toggleMusicButton = document.getElementById('toggleMusicButton');
const changeBackgroundButton = document.getElementById('changeBackgroundButton');
const body = document.body;
const backgroundImages = [
    'background1.jpg',
];

let isInhalePhase = true;
let breathInterval;
let animationActive = false;
let currentBackgroundIndex = 0;
let isMusicPlaying = false;

function startBreathing() {
    if (!animationActive) {
        lungs.classList.add('animation'); 
        breathInterval = setInterval(() => {
            breathe();
            adjustLungsSize();
            togglePhase();
        }, 1000);

        animationActive = true;
    }
}

function stopBreathing() {
    clearInterval(breathInterval);
    lungs.classList.remove('animation');  
    animationActive = false;
}

function breathe() {
    const currentScale = parseFloat(getComputedStyle(lungs).transform.split(',')[3]);
    const newScale = isInhalePhase ? 1.5 : 1;
    lungs.style.transform = `scale(${newScale})`;
}

function togglePhase() {
    isInhalePhase = !isInhalePhase;
}

function adjustLungsSize() {
    if (isInhalePhase) {
        lungs.style.transform = 'scale(1.2)';
    } else {
        lungs.style.transform = 'scale(0.8)';
    }
}

function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;
    toggleMusicButton.innerText = isMusicPlaying ? 'Turn Off Music' : 'Turn On Music';
}

function showInstructions() {
    const instructions = "Welcome to the Breathe website!\n\n" +
        "1. Click the 'Start' button if you want to follow lungs' animation to help you breathing.\n" +
        "2. Click the 'Stop' button to pause the animation.\n" +
        "4. Use earphones and close your eyes for better experience\n" +
        "5. Enjoy a relaxing breathing experience!";
    window.alert(instructions);
}

function changeBackground() {
    body.classList.add('changing-background');
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    const newBackgroundImage = backgroundImages[currentBackgroundIndex];
    body.style.backgroundImage = `url('${newBackgroundImage}')`;

    setTimeout(() => {
        body.classList.remove('changing-background');
    }, 1000);
}
changeBackgroundButton.addEventListener('click', changeBackground);
