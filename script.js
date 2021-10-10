'use strict';

// form.addEventListener('submit', (event) => {
  

//   // const language = 'ENG';
// }) 
  

function caesarCipher(word, key, language, mode) {
  const engUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const engLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const english = [engUp, engLow];
  
  const ukrUp = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я'];
  const ukrLow = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'];
  const ukrainian = [ukrUp, ukrLow];

  const numbers = [[],['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']];
  
  if (key < 0) {
    return caesarShift(word, key + 26);
  }

  // if (mode = 'encrypt') {
  //   key = -key;
  // }

  const wordArray = word.split('');
  let output = '';
  let alfabet;

  switch (language) {
    case 'english':
      alfabet = english;
      break;

    case 'ukrainian':
      alfabet = ukrainian;
      break;
  }

  switch (mode) {
    case 'encrypt':
      for (let i = 0; i < wordArray.length; i++) {
        let upOrLow = 0;
        if (wordArray[i] == wordArray[i].toUpperCase()) {
          upOrLow = 0;
        } else if (wordArray[i] == wordArray[i].toLowerCase()){
          upOrLow = 1;
        }
    
        if (+wordArray[i]) {
          let numWord = +wordArray[i];
          let positon = key % 10;
    
          output += `${(numWord + positon) % 10}`;
          continue;
        }
    
        for (let ii = alfabet[upOrLow].length; ii >= 0; ii--) {
          if (+wordArray[i]) {
            continue;
          }
    
          if (wordArray[i] === alfabet[upOrLow][ii]) {
            if ((ii - key) < 0) {
              output += alfabet[upOrLow][alfabet[upOrLow].length - (key - ii)];
              continue;
            }
    
            output += alfabet[upOrLow][ii - key];
          }
        }
      }
      document.getElementById('decrypted').value = output;
      return output;

    case 'decrypt':
      for (let i = 0; i < wordArray.length; i++) {
        let upOrLow = 0;
        if (wordArray[i] == wordArray[i].toUpperCase()) {
          upOrLow = 0;
        } else if (wordArray[i] == wordArray[i].toLowerCase()){
          upOrLow = 1;
        }
    
        if (+wordArray[i]) {
          let numWord = +wordArray[i];
          let positon = key % 10;
    
          output += `${(numWord + positon) % 10}`;
          continue;
        }
    
        for (let ii = 0; ii < alfabet[upOrLow].length; ii++) {
          if (+wordArray[i]) {
            continue;
          }
    
          if (wordArray[i] === alfabet[upOrLow][ii]) {
            if ((ii + key) >= alfabet[upOrLow].length) {
              output += alfabet[upOrLow][(ii + key) % alfabet.length];
              continue;
            }
    
            output += alfabet[upOrLow][ii + key];
          }
        }
      }
      document.getElementById('decrypted').value = output;
      return output;
  }
};
  
function getInput() {
  const form = document.getElementById('form');
  let input = form.elements['encrypted'].value;
  let key = form.elements['key'].value;
  let language = form.elements['language'].value;
  let mode = form.elements['mode'].value;
  
  console.log(`input: ${input}, key: ${key}, language: ${language}`);
  document.getElementById('decrypted').innerHTML = '';
  document.getElementById('decrypted').innerHTML = caesarCipher(input, +key, language, mode);
}

function clearForm() {
  document.getElementById('encrypted').value = '';
  document.getElementById('decrypted').value = '';
}

// let input = 'абвГдеє';
// const key = 1;
// caesarCipher(input, key);