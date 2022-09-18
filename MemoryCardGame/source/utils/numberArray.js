// logic to generate 12 random number between 1-100 and put it in an array
export default function () {
  let arr = Array.from({length: 100}, (_, i) => i + 1);
  randomize(arr, 100);
  let temp = [];
  temp = arr.slice(0, 6);
  let newArr = [...temp, ...temp];
  randomize(newArr, 12);
  return newArr;
}
let randomize = (arr, lengthOfArray) => {
  for (let i = lengthOfArray - 1; i > 0; i--) {
    let element = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[element]] = [arr[element], arr[i]];
  }
};
