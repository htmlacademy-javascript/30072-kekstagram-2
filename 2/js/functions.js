// 1st task
const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

console.log(checkStringLength());
console.log(checkStringLength('My custom string', 100));

// 2nd task
const checkIsPalindrome = (string = '') => {
  const originalString = string.trim().toLocaleLowerCase();
  const reverseString = [...originalString].reverse().join('');

  return originalString === reverseString;
};

console.log(checkIsPalindrome('madam'));
console.log(checkIsPalindrome('string'));

// 3rd task
const getNumbersFromString = (string = '') => {
  const originalArray = [...string];
  const numbersArray = [];

  originalArray.forEach((item) => {
    if (!isNaN(item)) {
      numbersArray.push(item);
    }
  });

  return Number(numbersArray.join('')) || NaN;
};

console.log(getNumbersFromString('1my2string3'));
console.log(getNumbersFromString(''));
console.log(getNumbersFromString('строка без чисел'));
