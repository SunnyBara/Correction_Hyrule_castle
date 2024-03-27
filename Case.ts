function testternaire(test: number) {
  if (test < 5) {
    console.log("test est plus petit que 5");
  } else {
    console.log("test est plus grand que 5");
  }

  test < 5
    ? console.log("test est plus petit que 5")
    : console.log("test est plus grand que 5");

  console.log(`test est plus ` + (test < 5 ? `petit` : `grand`) + ` que 5`);
}

const test = 4;
const test2 = 6;
testternaire(test);

testternaire(test2);
