'use strict';

const cardsBoxInner = document.querySelector('.cards-box__inner');
const select = document.querySelector('select');
const showAll = document.querySelector('.search-all');


const init = () => {
    getData();
}

function getCorrectName(string) {
    let newStr = '';
    for (let i = 0; i < string.length; i++) {
        if (i === 0) {
            newStr += string[0].toUpperCase();
        } else if
            (string[i].toUpperCase() == string[i]) {
            newStr += ` ${string[i]}`
        } else {
            newStr += string[i]
        }
    }
    return newStr;
};


function createItems(hero, display) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cards-item');
    cartItem.classList.add('hero');
    cartItem.style.display = display;
    cartItem.insertAdjacentHTML('afterbegin', `
        <div class="hero-img">
            <img src="${hero.photo}" alt="">
        </div>
        `);
    const cartInfo = document.createElement('div');
    cartInfo.classList.add('hero-info');

    for (let info in hero) {
        if (info !== 'photo' && info !== 'movies') {
            cartInfo.insertAdjacentHTML('beforeend', `
           <div class='row'>   
           <div class="hero-info__title row-${info}">${getCorrectName(info)}</div>
           <div class='hero-info_text ${info}'>${hero[info]}</div>
           </div>    
        `);
        } else if (info === 'movies') {
            cartInfo.insertAdjacentHTML('beforeend', `
           <div class='row'>   
           <div class="hero-info__title row-${info}">${getCorrectName(info)}</div>
           <div class='hero-info_text ${info}'>${hero[info].join(`, <br>`)}</div>
           </div>    
        `);
        }
    };
    cartItem.append(cartInfo);
    cardsBoxInner.append(cartItem);
};

function createSelectItems(data) {
    select.addEventListener('input', () => {
        cardsBoxInner.innerHTML = '';
        for (let heroes of data) {
            if (heroes.movies) {
                let res = heroes.movies.find(item => item === select.value);
                if (res) {
                    createItems(heroes, "flex")
                } else {
                    createItems(heroes, "none")
                }
            }
        };
    });
};

function showAllItems(data) {
    showAll.addEventListener('click', () => {
        cardsBoxInner.innerHTML = '';
        for (let heroes of data) {
            createItems(heroes, "flex")
        };
    })
};


function generateSelect(data) {
    let arrFilms = [];
    for (let heroes of data) {
        if (heroes.movies) {
            heroes.movies.forEach(movie => {
                if (arrFilms.length === 0) {
                    arrFilms.push(movie)
                } else if (arrFilms.indexOf(movie) === -1) {
                    arrFilms.push(movie)
                }
            });
        };
    };

    arrFilms.sort().forEach(film => {
        let option = document.createElement('option');
        option.value = film;
        option.textContent = film;
        select.append(option)
    })
};



function getData() {
    const firstReq = new XMLHttpRequest();

    firstReq.addEventListener('load', function () {

        const data = JSON.parse(this.responseText);

        for (let heroes of data) {
            createItems(heroes, "flex")
        };

        createSelectItems(data);
        showAllItems(data);
        generateSelect(data);
    });

    firstReq.addEventListener('error', () => console.log('error'));
    firstReq.open('GET', '../dbHeroes.json');
    firstReq.send();
};


init();
