const hexInput = document.getElementById("hexInput");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");

function isHexValid(hex) {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
}

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isHexValid(hex)) return;

  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + hex;
});

function convertHexToRgb(hex) {
  if (!isHexValid(hex)) return null;

  let strippedHex = hex.replace("#", "");
  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4), 16);
  return { r, g, b };
}

function convertRgbToHex(r, g, b) {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}

slider.addEventListener("input", () => {
  const hex = hexInput.value;
  if (!isHexValid(hex)) return;

  sliderText.innerText = `${slider.value}%`;

  alteredColor.style.backgroundColor = alterColor(hex, slider.value);
  alteredColorText.innerText = `Altered Color ${alterColor(hex, slider.value)}`;
});

function alterColor(hex, percentage) {
  const { r, g, b } = convertHexToRgb(hex);

  const amount = Math.floor((percentage / 100) * 255);
  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);
  return convertRgbToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
  const newHex = hex + amount;
  if (newHex > 255) return 255;
  if (newHex < 0) return 0;
  return newHex;
};
