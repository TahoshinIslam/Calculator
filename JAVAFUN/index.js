// JavaScript utility functions

// 1. Count vowels
function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) count++;
  }
  return count;
}

// 2. Sort numbers
function sortNumbers(arr) {
  return arr.slice().sort((a, b) => a - b);
}

// 3. Reverse string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 4. Get last element
function getLastElement(arr) {
  return arr[arr.length - 1];
}

// 5. Merge arrays
function mergeArrays(arr1, arr2) {
  return arr1.concat(arr2);
}

// 6. Has space
function hasSpace(str) {
  return str.includes(' ');
}

// 7. Is empty string
function isEmptyString(str) {
  return str === '';
}

// 8. Remove negative numbers
function removeNegativeNumbers(arr) {
  return arr.filter(num => num >= 0);
}

// Example usage
console.log(countVowels("Your Name")); 
console.log(sortNumbers([4, 1, 8, 3])); 
console.log(reverseString("hello")); 
console.log(getLastElement([10, 20, 30, 40])); 
console.log(mergeArrays([1, 2], [3, 4])); 
console.log(hasSpace("Ostad Limited"));
console.log(isEmptyString("")); 
console.log(isEmptyString("Hello"));
console.log(removeNegativeNumbers([-5, 2, -1, 6, 0])); 
