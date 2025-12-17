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

// 4th task
const MINUTES_IN_HOUR = 60;

const convertTimeInMinutes = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * MINUTES_IN_HOUR + minute;
};

const checkMeetingByWorkingHours = (startTime, endTime, startMeetingTime, meetingDuration) => {
  const startTimeInMinutes = convertTimeInMinutes(startTime);
  const endTimeInMinutes = convertTimeInMinutes(endTime);
  const startMeetingTimeInMinutes = convertTimeInMinutes(startMeetingTime);
  const endOfMeeting = startMeetingTimeInMinutes + meetingDuration;

  return startMeetingTimeInMinutes >= startTimeInMinutes && endOfMeeting <= endTimeInMinutes;
};

checkMeetingByWorkingHours('08:00', '17:30', '14:00', 90);
checkMeetingByWorkingHours('8:0', '10:0', '8:0', 120);
checkMeetingByWorkingHours('08:00', '14:30', '14:00', 90);
checkMeetingByWorkingHours('14:00', '17:30', '08:0', 90);
checkMeetingByWorkingHours('8:00', '17:30', '08:00', 900);
