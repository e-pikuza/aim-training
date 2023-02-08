const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = 
    [['#16d9e3', '#30c7ec', '#46aef7'],
    ['#F1D66A', '#E3BA16', '#C7A003'],
    ['#F16AC9', '#E316A6', '#B6107D'],
    ['#6AF1B4', '#16E387', '#0E8E54']]
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decriseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decriseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)    
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setRandomColor(circle)
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * ((max - min) + min))
}

function setRandomColor(circle) {
    const index = Math.floor(Math.random() * colors.length)
    circle.style.background = `linear-gradient(90deg, ${colors[index][0]} 0%, ${colors[index][1]} 47%, ${colors[index][2]} 100%)`
}

//can be used in console for cheating
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')

        if(circle) {
            circle.click()
        }
    }

    setInterval(kill, 75)
}