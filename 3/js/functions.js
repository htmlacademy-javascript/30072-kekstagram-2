// 1st task
const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

checkStringLength();
checkStringLength('My custom string', 100);

// 2nd task
const checkIsPalindrome = (string = '') => {
  const formattedString = string.trim().toLocaleLowerCase();
  const reverseString = [...formattedString].reverse().join('');

  return formattedString === reverseString;
};

checkIsPalindrome('madam');
checkIsPalindrome('string');

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

getNumbersFromString('1my2string3');
getNumbersFromString('');
getNumbersFromString('строка без чисел');
