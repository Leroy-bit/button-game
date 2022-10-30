let button_timer = document.getElementById('button-timer')
let button = document.getElementById('button')
let score_label = document.getElementById('score')
let game = document.getElementById('game')
let start = document.getElementById('start')
let start_button = document.getElementById('start-button')
let start_countdown = document.getElementById('start-countdown')
let score = 0
let game_countdown_number = 30
let timerId = null
let standart_duration = 3

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function add_score() {
    score+=1
    score_label.innerHTML = score
}

async function start_game() {
    score = 0
    document.getElementById('end-game').style.display = 'none'
    start_button.style.display = 'none'
    start_countdown.style.display = 'block'
    for (let i = 3; i >= 0; i--) { 
        start_countdown.innerHTML = i
        await sleep(1000)
    }
    start_countdown.innerHTML = 'Гра почалась!'
    await sleep(500)
    start_countdown.style.display = 'none'
    game.style.display = 'block'
    game.style.setProperty('--duration', standart_duration)
    timerId = setInterval(() => {
        game.style.display = 'none'
        start_button.style.display = 'block'
        document.getElementById('end-game').style.display = 'block'
        document.getElementById('end-score').innerHTML = score
        console.log('hello')
        clearInterval(timerId)
    }, standart_duration * 1000);
}


async function game_countdown() {
    if (game_countdown_number > 0) {
        game_countdown_number--
    }
    else {
        clearInterval(timerId)
    }
}


start_button.addEventListener('click', start_game)
button.addEventListener('click', add_score)
