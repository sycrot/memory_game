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
        
        const divPlayers = document.querySelector('.memorygame-players')

        cardBoard.innerHTML = cardHTML + cardHTML
        
        const cards = document.querySelectorAll('.memory-card')
        let firstCard, secondCard
        let lockCards = false
        let points = 0
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
        
        let player = 0
        function checkForMatch() {
            let isMatch = firstCard.dataset.card === secondCard.dataset.card

            if (!isMatch) {
                if (player >= players.length - 1) {
                    player = -1
                }
                player+=1
                playerSelect(player)
            } else {
                addPointsPlayer(player)
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
                points++
            }
            [firstCard, secondCard, lockCards] = [null, null, false]
        }
        
        cards.forEach(card => card.addEventListener('click', flipCard))
    }
}