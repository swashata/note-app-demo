export function sum(a, b) {
  // let numberOne = Number.parseFloat(a);
  // if (Number.isNaN(numberOne)) {
  //   numberOne = 0;
  // }
  // let numberTwo = Number.parseFloat(b);
  // if (Number.isNaN(numberTwo)) {
  //   numberTwo = 0;
  // }
  // return numberOne + numberTwo;
  return [a, b].reduce((acc, num) => {
    let castedNum = Number.parseFloat(num);
    if (Number.isNaN(castedNum)) {
      castedNum = 0;
    }
    return acc + castedNum;
  }, 0);
}
