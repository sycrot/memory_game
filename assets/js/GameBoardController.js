class GameBoard {
    constructor(gridNumber, numberPlayers) {
        this.init()
        gridNumber
        numberPlayers
    }

    init() {
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
            'fab fa-bluetooth'
        ]
        
        let cardHTML = ''
        
        images.slice(0,gridNumber).forEach(img => {
            cardHTML += `
                <div class="memory-card" data-card="${img}">
                    <i id="front-face" class="${img}"></i>
                    <i id="back-face" class="fas fa-minus"></i>
                </div>
            `
        })

        cardBoard.innerHTML = cardHTML + cardHTML
        
        const cards = document.querySelectorAll('.memory-card')
        let firstCard, secondCard
        let lockCards = false
        let players = []

        function getPlayers() {
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
        
                return false
            }
        
            secondCard = this
        
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

        const memoryCards = cardBoard.querySelectorAll('.memory-card')
        function addPointsPlayer(player) {
            players[player].points += 1
            let pointsPlayer = divPlayer[player].querySelector('.points')
            pointsPlayer.innerHTML = players[player].points

            if (document.querySelectorAll('.memory-card.flip').length >= memoryCards.length) winningPlayer()
        }

        function winningPlayer() {
            const divWinningPlayer = document.querySelector('.memorygame-winningplayer')
            let numPoints = []
            let winningPlayerContent = ''

            players.map((e, index) => {
                numPoints.push(e.points)
            })
            let highestScore = Math.max.apply(null, numPoints)
            let winningPlayer = players.filter(e => e.points === highestScore)

            winningPlayer.forEach(e => {
                winningPlayerContent = `
                    <div class="winnigplayer-content">
                        <p class="winningplayer-points">com ${e.points} pontos</p>
                        <h3 class="winningplayer-title">o Player ${e.id} <br> é o vencedor</h3>
                    </div>
                `
                divWinningPlayer.innerHTML += winningPlayerContent
            })
            
            setInterval(() => {
                cardBoard.style.display = 'none'
                divPlayers.style.display = 'none'
                divWinningPlayer.style.display = 'flex'
            }, 1500)
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