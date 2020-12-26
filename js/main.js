'use strict';

const cardsBoxInner = document.querySelector('.cards-box__inner');

const init = () => {
    getData();
}

const getCorrectName = (string) => {
   let newStr = '';
   for(let i = 0; i<string.length; i++){
    if(i === 0){
        newStr+= string[0].toUpperCase();
    } else if  

    (string[i].toUpperCase()== string[i]){
        newStr+=` ${string[i]}`
    } else {
        newStr+=string[i]
    }
   } 

  return newStr;
}


//Получаю данные из json файла

const getData = () => {
    const firstReq = new XMLHttpRequest();

    firstReq.addEventListener('load', function () {
        console.log('It work!');
        const data = JSON.parse(this.responseText);
        for (let heroes of data) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cards-item');
            cartItem.classList.add('hero');
            cartItem.insertAdjacentHTML('afterbegin', `
                <div class="hero-img">
                    <img src="${heroes.photo}" alt="">
                </div>
                `);
            const cartInfo = document.createElement('div');
            cartInfo.classList.add('hero-info');

            for(let info in heroes){
                if(info !== 'photo'){
                   cartInfo.insertAdjacentHTML('beforeend', `
                   <div class='row'>   
                   <div class="hero-info__title row-${info}">${getCorrectName(info)}</div>
                   <div class='hero-info_text ${info}'>${heroes[info]}</div>
                   </div>    
                `);  
                }
            };

            cartItem.append(cartInfo);
            cardsBoxInner.append(cartItem);
            
        }

    });

    firstReq.addEventListener('error', () => console.log('error'));
    firstReq.open('GET', '../dbHeroes.json');
    firstReq.send();
    console.log('Request send!!');

};


//Отрисосываю все карточки


init();