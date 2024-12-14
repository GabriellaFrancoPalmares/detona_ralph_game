const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        timerId: null,
        velocidadeDeJogo: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 61,
    }
};


function contarTempo() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime; // Atualiza o contador de tempo no DOM

    if (state.values.currentTime < 0) {
        clearInterval(state.values.contarTempoId); // Para o contador
        clearInterval(state.values.timerId); // Para o movimento do inimigo
        tocarAudio("gameover");
    }
}

function sortearQuadradoInimigo(){

    // Remover a classe enemy de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    // Escolher um quadrado aleatório
        let numeroAleatorio = Math.floor(Math.random() * 9);
        let quadradoAleatorio = state.view.squares[numeroAleatorio];

    // Adicionar a classe enemy no quadrado aleatorio escolhido
        quadradoAleatorio.classList.add('enemy');

    // definir Hitbox

    state.values.hitPosition = quadradoAleatorio.id;
}
function moverInimigo(){
    state.values.timerId = setInterval(sortearQuadradoInimigo, state.values.velocidadeDeJogo);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
    square.addEventListener('click', (
    ) => {
        if (square.id == state.values.hitPosition) {
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            tocarAudio("hit");
        }
    })
    });
}

function tocarAudio(nomeDoAudio) {
    let audio = new Audio(`/audios/${nomeDoAudio}.mp3`);
    audio.volume = 0.1;
    audio.play();
}

function init(){
    moverInimigo();
    addListenerHitBox();
    contarTempo();
    state.values.contarTempoId = setInterval(contarTempo, 1000); // Inicia o contador de tempo
    tocarAudio("trilhaSonora")
}

init();