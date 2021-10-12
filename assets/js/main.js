const initContainer = document.querySelector('.memorygame-initcontainer')
const spBtn = document.querySelectorAll('.sp-btn')
const gridBtn = document.querySelectorAll('.grid-btn')

let numberPlayers = 0
let gridNumber = 0

spBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        numberPlayers = +btn.getAttribute('data-value')
        spBtn.forEach(e => e.classList.remove('btn-mg-active'))
        btn.classList.add('btn-mg-active')
    })
})

gridBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        gridNumber = +btn.getAttribute('data-value')
        gridBtn.forEach(e => e.classList.remove('btn-mg-active'))
        btn.classList.add('btn-mg-active')
    })
})

const buttonInit = document.querySelector('.ib-buttoninit')

const cardBoard = document.querySelector('#memorygame-gamecontainer')

buttonInit.addEventListener('click', () => {
    initContainer.style.display = 'none'
    cardBoard.style.display = 'flex'
    if (gridNumber == 0) {
        gridNumber = 4
    }
    if (numberPlayers == 0) {
        numberPlayers == 1
    }
    window.gameBoard = new GameBoard(gridNumber)
})
