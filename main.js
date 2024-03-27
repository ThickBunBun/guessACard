
let valuesofcards = [];
let idofcards = [];
let score = 0;
let paircount = 0;
let gameseconds = 10;

function htmlElemGen(html) {

  const template = document.createElement('template');

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
};

function shuffle(arr) {
  let currentIndex = arr.length;
  let randomIndex = 0;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  };

  return arr;
};

let timerId;
//game timer

function cardGen() {
  document.getElementById('cardfield').innerHTML = ''

  let card_content = [];

  for (let index = 0; index <= 7; index++) {
    card_content.push(Math.floor(Math.random() * 20) + 1);
  }

  card_content = card_content.concat(card_content);
  card_content = shuffle(card_content)

  // console.log(card_content);
  // console.log(document.getElementById('cardfield'))

  for (let index = 0; index <= 15; index++) {
    // console.log(item);
    let card = htmlElemGen(`
      <div class="cardinstance" id="crd_${index}" onclick="reveal(this.id)">
        <div class="card">
          <div class="cardhead"></div>
          <div class="clickbody">
            <p class="cardback"></p>
            <p class="cardface">${card_content[index]}</p>
          </div>
        </div>
      </div>
    `);

    // console.log(index)
    document.getElementById('cardfield').appendChild(card);
  };
};

const startbutton = htmlElemGen(`
      <button class="fieldbuttons" id="startbutton" onclick="start(0,0,90)">Play</button>
`);

function startTimer(gameseconds, timerEl) {
  let minutes = Math.floor(gameseconds / 60);
  let seconds = gameseconds % 60;
  timerId = setInterval(() => {
    gameseconds--;
    minutes = Math.floor(gameseconds / 60);
    seconds = gameseconds % 60;
    if (gameseconds <= 0) {
      clearInterval(timerId)
      document.getElementById('cardfield').innerHTML = '';
      document.getElementById('cardfield').appendChild(startbutton);
      document.getElementById('score_num').innerText = `Your final score is ${document.getElementById('score_num').innerText}`
      minutes = Math.floor(gameseconds / 60);
      seconds = gameseconds % 60;
    };
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `${minutes}:${seconds}`;
  }, 1000);

};
function stopTimer() {
  clearInterval(timerId)

};

const timerEl = document.getElementById('timer');

function load_game(score = 0) {
  valuesofcards = [];
  idofcards = [];
  document.getElementById('score_num').innerText = score;
  // console.log('loading');
  stopTimer();
  document.getElementById('cardfield').innerHTML = '';
  document.getElementById('cardfield').appendChild(startbutton);
  timerEl.innerHTML = `1:30`;

};
window.start = function start_game() {
  score = 0;
  gameseconds = 90;
  cardGen();
  paircount = 0;
  document.getElementById('score_num').innerText = score;
  startTimer(gameseconds, timerEl);
};

// refreshes the field
function refresh() {
  setTimeout(() => {
    cardGen();
  }, 500);
};


//reset button func
function reset() {
  load_game();
};




// gamelogic
function reveal(id) {
  // declaring elemet links
  const cardface = document.getElementById(id).getElementsByClassName("cardface");
  const cardback = document.getElementById(id).getElementsByClassName("cardback");
  const card = document.getElementById(id).getElementsByClassName("card");
  // console.log(cardface[0].style.display = 'block');

  if (cardface[0].style.display == '' || cardface[0].style.display == 'none') {
    cardback[0].style.display = 'none';
    cardface[0].style.display = 'block';
    card[0].style.background = '#e1efe1'

    if (valuesofcards.length <= 2) {
      valuesofcards.push(cardface[0].innerText);
      idofcards.push(document.getElementById(id).id);
    };
    //checking the amoung of cards that've been clicked, if 2, compare the values 
    if (valuesofcards.length == 2) {
      let cardinstances = document.querySelectorAll('.cardinstance')
      cardinstances.forEach(element => {
        element.removeAttribute('onclick');
      });
      if (valuesofcards[0] === valuesofcards[1]) {
        document.getElementById(idofcards[0]).style.border = "#6beaa2 5px solid";
        document.getElementById(idofcards[0]).getElementsByClassName("cardhead")[0].style.backgroundColor = "#6beaa2";
        document.getElementById(idofcards[1]).style.border = "#6beaa2 5px solid";
        document.getElementById(idofcards[1]).getElementsByClassName("cardhead")[0].style.backgroundColor = "#6beaa2";
        idofcards = [];
        valuesofcards = [];
        score++;
        paircount++;
        // console.log(paircount)
        if (paircount == 8) {
          paircount = 0;
          refresh();
        };
        cardinstances.forEach(element => {
          element.setAttribute('onclick', "reveal(this.id)")
        });

        document.getElementById('score_num').innerText = score;
      }
      else {
        setTimeout(() => {
          document.getElementById(idofcards[0]).getElementsByClassName("cardback")[0].style.display = 'block'
          document.getElementById(idofcards[0]).getElementsByClassName("cardface")[0].style.display = 'none'
          document.getElementById(idofcards[0]).getElementsByClassName("card")[0].style.background = '#64b6c9'
          document.getElementById(idofcards[1]).getElementsByClassName("cardback")[0].style.display = 'block'
          document.getElementById(idofcards[1]).getElementsByClassName("cardface")[0].style.display = 'none'
          document.getElementById(idofcards[1]).getElementsByClassName("card")[0].style.background = '#64b6c9'
          idofcards = [];
          valuesofcards = [];
          cardinstances.forEach(element => {
            element.setAttribute('onclick', "reveal(this.id)")
          });
        }, 300);

      };
    };
    //debuggin section
    // console.log(valuesofcards);
    // console.log(idofcards);
    return cardface.innerText;
  };
  // else {
  //   cardback[0].style.display = 'block';
  //   cardface[0].style.display = 'none';
  // };
};


