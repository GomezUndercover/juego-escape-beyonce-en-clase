const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio')
audio.volume = 0.5

let playerSpeed = 35
let beyonceSpeed = 1

let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

/**
 * Esta función detecta cuando Beyonce ya te alcanzó
 */
function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 50 && deltaY <= 50) {
        if(confirm('Beyonce te atrapó! Rápido, dale las gracias para salvar tu vida')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
        } else {
            alert('Perdiste :(')
            isPlaying = false
            audio.pause()
        }
    }
}

function gameLoop () {
    moveBeyonce()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision()
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 25) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition()
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

function settingsListener(){
    // ajustes del jugador
    $('#player-size').on('input', function(){
        let newSize = $(this).val()
        $('#player').css('height', newSize)
        $('#player').css('width', newSize)
        $('#ref-player-size').text(newSize + 'px')
    })

    $('#player-speed').on('input', function(){
        playerSpeed = $(this).val()
        $('#ref-player-speed').text(playerSpeed)
    })

    // ajustes de beyonce
    $('#beyonce-size').on('input', function(){
        let newSize = $(this).val()
        $('#beyonce').css('height', newSize)
        $('#beyonce').css('width', newSize)
        $('#ref-beyonce-size').text(newSize + 'px')
    })

    $('#beyonce-speed').on('input', function(){
        beyonceSpeed = $(this).val()
        $('#ref-beyonce-speed').text(beyonceSpeed)
    })

    // play area bg color
    $('#setting-area-color').on('change', function(){
        $('#game-area').css('background-color', $(this).val())
        $('#chosen-color').text($(this).val())
    })

    // audio volume

    $('#volume').on('input', function(){
        audio.volume = $(this).val()
    })

    //stop beyonce button
    $('#stop').on('click', function(){
        beyonceSpeed = 0
        audio.volume = 0
    })
}

window.addEventListener('keydown', movePlayer)
window.addEventListener('load', () => {
    audio.play()
    gameLoop()
    settingsListener()
})