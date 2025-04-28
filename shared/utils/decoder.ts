function rotateString(str: string, n: number): string {
  n = n % str.length;
  return str.slice(n) + str.slice(0, n);
}

export default (
  input: string
): { temp: number; battery: number; hum: number } => {
  let temp, hum, battery;

  let humHex = input.slice(0, 4);
  let batteryHex = input.slice(4, 8);
  let tempHex = input.slice(8, 12);

  humHex = rotateString(humHex, 2);
  tempHex = rotateString(tempHex, 2);
  batteryHex = rotateString(batteryHex, 2);

  temp = parseInt(tempHex, 16) / 100;
  hum = parseInt(humHex, 16) / 100;
  battery = parseInt(batteryHex, 16);

  return { temp, battery, hum };
};
