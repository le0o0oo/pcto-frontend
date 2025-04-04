function rotateString(str: string, n: number): string {
  n = n % str.length;
  return str.slice(n) + str.slice(0, n);
}

export default (input: string): { temp: number; hum: number } => {
  let temp, hum, battery;

  let humHex = input.slice(0, 4);
  let tempHex = input.slice(4, 8);

  humHex = rotateString(humHex, 2);
  tempHex = rotateString(tempHex, 2);

  temp = parseInt(tempHex, 16) / 100;
  hum = parseInt(humHex, 16) / 100;

  return { temp, hum };
};
