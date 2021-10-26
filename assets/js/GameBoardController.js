class GameBoard {
    constructor(gridNumber, numberPlayers) {
        this.init()
        gridNumber
        numberPlayers
    }

    init() {
        const imagesRandom = () => {
            const images = [
                'fas fa-apple-alt',
                'fas fa-anchor',
                'fab fa-android',
                'fab fa-angellist',
                'fas fa-baby-carriage',
                'fas fa-basketball-ball',
                'fas fa-bell',
                'fas fa-biking',
                'fas fa-biohazard',
                'fab fa-bluetooth',
                'fas fa-angry',
                'fas fa-baby',
                'fas fa-bacteria',
                'fas fa-bed',
                'fas fa-beer',
                'fab fa-bitcoin'
            ]
    
            for (let i = images.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                let temp = images[i]
    
                images[i] = images[j]
                images[j] = temp
            }
    
            return images
        }
        
        const getImages = () => {
            let cardHTML = ''
            imagesRandom().slice(0,gridNumber).forEach(img => {
                cardHTML += `
                    <div class="memory-card" data-card="${img}">
                        <i id="front-face" class="${img}"></i>
                        <i id="back-face" class="fas fa-minus"></i>
                    </div>
                `
            })
    
            cardBoard.innerHTML = cardHTML + cardHTML
        }
        getImages()
        
        const cards = document.querySelectorAll('.memory-card')
        let firstCard, secondCard
        let lockCards = false
        let players = []

        const getPlayers = () => {
            let divPlayer = '' 
            
            for (let i=0; i<numberPlayers; i++) {
                divPlayer += `
                    <div class="gamecontainer-player">
                        <p class="player-name">Player ${i}</p>
                        <div class="player-points">
                            <p class="points-title">points</p>
                            <p class="points">0</p>
                        </div>
                    </div>
                `
                players.push({
                    id: i,
                    points: 0
                })
            }
            divPlayers.innerHTML = divPlayer
        }
        getPlayers()
        
        function flipCard() {
            if (lockCards) return false
        
            this.classList.add('flip')
        
            if (!firstCard) {
                firstCard = this
                firstCard.style.pointerEvents = 'none'
                return false
            }
        
            secondCard = this
            firstCard.style.pointerEvents = 'visible'
            checkForMatch()
        }
        
        let currentPlayer = 0

        function checkForMatch() {
            let isMatch = firstCard.dataset.card === secondCard.dataset.card

            if (!isMatch) {
                if (currentPlayer >= players.length - 1) {
                    currentPlayer = -1
                }
                currentPlayer+=1
                playerSelect(currentPlayer)
            } else {
                addPointsPlayer(currentPlayer)
            }
        
            !isMatch ? disableCards() : resetCards(isMatch)
        }

        let divPlayer = document.querySelectorAll('.gamecontainer-player')
        divPlayer[0].classList.add('gc-player-active')
        function playerSelect(player) {
            divPlayer.forEach(e => {
                e.classList.remove('gc-player-active')
            })
            divPlayer[player].classList.add('gc-player-active')
        }

        function addPointsPlayer(player) {
            players[player].points += 1
            let pointsPlayer = divPlayer[player].querySelector('.points')
            pointsPlayer.innerHTML = players[player].points

            if (document.querySelectorAll('.memory-card.flip').length >= cards.length) winningPlayer()
        }

        const divWinningPlayer = document.querySelector('.memorygame-winningplayer')
        function winningPlayer() {
            const winningPlayerContent = document.querySelector('.winningplayer-content')
            const buttonRestart = document.querySelector('.winninplayer-btn')
            let numPoints = []

            players.map((e, index) => {
                numPoints.push(e.points)
            })
            let highestScore = Math.max.apply(null, numPoints)
            let winningPlayer = players.filter(e => e.points === highestScore)

            if (winningPlayer.length > 1) {
                let players = []
                winningPlayer.forEach(e => players.push(e.id))
                winningPlayerContent.innerHTML = `
                    <p class="winningplayer-points">com ${winningPlayer[0].points} pontos</p>
                    <h3 class="winningplayer-title">o Player ${players.join(', e Player ')} <br> empataram!</h3>
                `
            } else {
                winningPlayer.forEach(e => {
                    winningPlayerContent.innerHTML = `
                        <p class="winningplayer-points">com ${e.points} pontos</p>
                        <h3 class="winningplayer-title">o Player ${e.id} <br> é o vencedor!</h3>
                    `
                })
            }
            
            setTimeout(() => {
                cardBoard.style.display = 'none'
                divPlayers.style.display = 'none'
                divWinningPlayer.style.display = 'flex'
                buttonRestart.addEventListener('click', restartGame)
            }, 1500)
        }

        function restartGame() {
            initContainer.style.display = 'flex'
            divWinningPlayer.style.display = 'none'
        }
        
        function disableCards() {
            lockCards = true
            setTimeout(() => {
                firstCard.classList.remove('flip')
                secondCard.classList.remove('flip')
        
                resetCards()
            }, 1000)
            
        }
        
        (function shuffle() {
            cards.forEach( card => {
                let rand = Math.floor(Math.random() * 12)
                card.style.order = rand
            })
        })()
        
        function resetCards(isMatch) {
            if (isMatch) {
                firstCard.removeEventListener('click', flipCard)
                secondCard.removeEventListener('click', flipCard)
            }
            [firstCard, secondCard, lockCards] = [null, null, false]
        }
        
        cards.forEach(card => card.addEventListener('click', flipCard))
    }
}