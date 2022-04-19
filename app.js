const hexInput = document.getElementById("hexInput");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");

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
