const cards =  document.querySelectorAll('.card');
const livesDisplay = document.querySelector('#lives');
const scoreDisplay = document.querySelector('#score');
const cardImages = document.querySelectorAll('.card-image');
const modal = document.querySelector('#modal');
const modalMessage = modal.querySelector('#message');
const modalScore = modal.querySelector('#getScore');

let searchingPhase = false;

let previousCard;

let matches = 0;

let lives = 8;

livesDisplay.innerHTML = lives;

scoreDisplay.innerHTML = matches;

const images = [
    'angular.png',
    'vue.png',
    'react.png',
    'vue.png',
    'react.png',
    'angular.png',
    'javascript.png',
    'nodejs.png',
    'css.png',
    'javascript.png',
    'nodejs.png',
    'css.png'
];


//
//Function to shuffle the cards
//
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;

}

shuffle(images);

for (var i = 0; i < cardImages.length; i++){

    cardImages[i].src = images[i];

}

//
/*Function to check selected card*/
//
function selectCard(e){

    this.style.opacity = 1;

    if (!searchingPhase){

        searchingPhase = true;

        this.removeEventListener('click', selectCard);

        previousCard = this;


    } else if (searchingPhase){

        if(this.src === previousCard.src){

            console.log('It matches!');

            searchingPhase = false;

            setTimeout(() => {

                this.parentNode.style.visibility = 'hidden';

                previousCard.parentNode.style.visibility= 'hidden';

            }, 400);

            matches += 300;

            scoreDisplay.innerHTML = matches;

            console.log(matches);

            if(matches === 1800){

                setTimeout(function(){

                    modal.style.display = 'block';

                    modalMessage.innerHTML = 'Congratulations! You Won!';

                    modalMessage.style.color = 'green';

                    modalScore.innerHTML = matches;

                }, 1000);

            }


        } else if (this.src !== previousCard.src){

            console.log('It doesn\'t match');

            searchingPhase = false;

            setTimeout(() => {

                this.style.opacity = 0;

                previousCard.style.opacity = 0;

            }, 500);

            previousCard.addEventListener('click', selectCard);

            lives--;

            livesDisplay.innerHTML = lives;

            console.log(lives);


            if(lives === 0){

                setTimeout(function(){

                    modal.style.display = 'block';

                    modalMessage.innerHTML = 'GAME OVER';

                    modalMessage.style.color = 'red';

                    modalScore.innerHTML = matches;

                }, 1000);

            }

        }

    }

}


cardImages.forEach(cardImage => cardImage.addEventListener('click', selectCard));
