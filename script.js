let button_timer = document.getElementById("button-timer")
let button = document.getElementById("button")
let score_label = document.getElementById("score")
let game = document.getElementById("game")
let start = document.getElementById("start")
let start_button = document.getElementById("start-button")
let start_countdown = document.getElementById("start-countdown")
let score = 0
let game_countdown_number = 30
let timerId = null
let standart_duration = 5

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function add_score() {
    score+=1
    score_label.innerHTML = score
}

async function start_game() {
    score = 0
    score_label.innerHTML = score
    document.getElementById("end-game").style.display = "none"
    start_button.style.display = "none"
    start_countdown.style.display = "block"
    for (let i = 3; i > 0; i--) { 
        start_countdown.innerHTML = i
        await sleep(1000)
    }
    start_countdown.style.display = "none"
    game.style.display = "block"
    game.style.setProperty("--duration", standart_duration)
    timerId = setInterval(() => {
        game.style.display = "none"
        start_button.style.display = "block"
        document.getElementById("end-game").style.display = "block"
        document.getElementById("end-score").innerHTML = score
        set_score(score)
        clearInterval(timerId)
    }, standart_duration * 1000);
    start_button.innerHTML = "Спробувати ще раз"
}


async function game_countdown() {
    if (game_countdown_number > 0) {
        game_countdown_number--
    }
    else {
        clearInterval(timerId)
    }
}


start_button.addEventListener("click", start_game)
button.addEventListener("click", add_score)

function get_params() {
    url = new URL(window.location.href)
    return {
        "uid": url.searchParams.get("uid"),
        "cid": url.searchParams.get("cid"),
        "msg_id": url.searchParams.get("msg_id"),
        "inline_msg_id": url.searchParams.get("inline_msg_id"),
    }
}

function set_score(scr) {
    const xhr = new XMLHttpRequest();
    let params = get_params()
    let force = false
    let sd = {}
    if (params.inline_msg_id) {
        sd['user_id'] = params.uid
        sd['inline_message_id'] = params.inline_msg_id
    }
    else if(params.msg_id) {
        sd['user_id'] = params.uid
        sd['message_id'] = params.msg_id
        sd['chat_id'] = params.cid
    }
    sd['score'] = scr
    sd['force'] = force
    if (scr > 0 && params.uid) {   
        xhr.open("POST", ("https://api.telegram.org/bot").concat((parseInt(document.getElementsByTagName("tnum")[0].innerHTML) + parseInt(document.getElementsByTagName("tnum")[1].innerHTML) - 102222599), ":AAG9mloIMWGME", "Fm5sh5AJauwLxzyWiNP02U", "/setGameScore"))
        console.log(xhr.responseURL)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(JSON.stringify(sd))
    }
}

