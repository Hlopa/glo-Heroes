'use strict';

const init = () =>{
    getData();
}



//Получаю данные из json файла

const getData = () => {
   const firstReq = new XMLHttpRequest();

firstReq.addEventListener('load', function(){
    console.log('It work!');
    const data = JSON.parse(this.responseText);
    for(let heroes of data){
      console.log(heroes.name)  
    }
    
});

firstReq.addEventListener('error', ()=> console.log('error'));
firstReq.open('GET', '../dbHeroes.json');
firstReq.send();
console.log('Request send!!'); 

};


//


init();