/**
 * Date: 17-8-2023
 * Author: Miyaad J
 * Description: Color picker application with huge dom functionalities
 */
const randomColorBtn = document.querySelector('#generate-random-color');
const colorDisplay = document.querySelector('#color-display');
const outputRGB = document.querySelector('#input-rgb');
const outputHex = document.querySelector('#input-hex');

const inputHex = document.querySelector('#input-hex');

const redColorSlider = document.querySelector('#color-slider-red');
const greenColorSlider = document.querySelector('#color-slider-green');
const blueColorSlider = document.querySelector('#color-slider-blue');
const copyToClipboardBtn = document.querySelector('#copy-to-clipboard');
const colorModes = document.getElementsByName('color-mode');
const toastMessage = document.createElement('div');

const redColorSliderLabel = document.querySelector('#color-slider-red-label');
const greenColorSliderLabel = document.querySelector(
    '#color-slider-green-label'
);
const blueColorSliderLabel = document.querySelector('#color-slider-blue-label');

//change display color
const changeDisplayColor = color => {
  colorDisplay.style.backgroundColor = color;
};

//adjust RGB Sliders
const adjustRGBSliders = (r, g, b) => {
  redColorSlider.value = r;
  redColorSliderLabel.textContent = `${r}`;
  greenColorSlider.value = g;
  greenColorSliderLabel.textContent = `${g}`;
  blueColorSlider.value = b;
  blueColorSliderLabel.textContent = `${b}`;
};

//Adjust RGB colors from color slider
const adjustRGBColors = (redColorSlider, greenColorSlider, blueColorSlider) => {
  console.log(redColorSlider, greenColorSlider, blueColorSlider);
  const color = `rgb(${redColorSlider}, ${greenColorSlider}, ${blueColorSlider})`;
  //change display color
  changeDisplayColor(color);
  //showing RGB color on output
  outputRGB.value = color;
  //showing Hex color on output
};

//Adjust Hex colors from color slider
const adjustHexColors = (r, g, b) => {
  console.log(r, g, b);
  const red = Number(r).toString(16).padStart(2, 0);
  const green = Number(g).toString(16).padStart(2, 0);
  const blue = Number(b).toString(16).padStart(2, 0);
  console.log(red, green, blue);
  outputHex.value = `${red.toUpperCase()}${green.toUpperCase()}${blue.toUpperCase()}`;
};

//toast message appear animation
const toastMessageAppear = () => {
  toastMessage.classList.remove('slide-out');
  toastMessage.classList.add('slide-in');
};
//toast message disappear animation
const toastMessageDisappear = () => {
  toastMessage.classList.remove('slide-in');
  toastMessage.classList.add('slide-out');
};
//creating the toast message
const createToastMessage = (message, mode) => {
  if (mode === 'hex' && isValidHex(message)) {
    window.navigator.clipboard.writeText(`#${message}`);
    toastMessage.textContent = `#${message} copied!`;
    toastMessage.classList.add('toast-message');
    document.querySelector('.container').prepend(toastMessage);
    toastMessageAppear();
  } else if (mode === 'rgb') {
    window.navigator.clipboard.writeText(`#${message}`);
    toastMessage.textContent = `${message} copied!`;
    toastMessage.classList.add('toast-message');
    document.querySelector('.container').prepend(toastMessage);
    toastMessageAppear();
  } else {
    alert('Invalid Color Code!');
  }
};

redColorSlider.addEventListener('change', e => {
  redColorSliderLabel.textContent = e.target.value;
  adjustRGBColors(
      redColorSlider.value,
      greenColorSlider.value,
      blueColorSlider.value
  );
  adjustHexColors(
      redColorSlider.value,
      greenColorSlider.value,
      blueColorSlider.value
  );
});

greenColorSlider.addEventListener('change', e => {
  greenColorSliderLabel.textContent = e.target.value;
  adjustRGBColors(
      redColorSlider.value,
      greenColorSlider.value,
      blueColorSlider.value
  );
  adjustHexColors(
      redColorSlider.value,
      greenColorSlider.value,
      blueColorSlider.value
  );
});

blueColorSlider.addEventListener('change', e => {
  blueColorSliderLabel.textContent = e.target.value;
  adjustRGBColors(
      redColorSlider.value,
      greenColorSlider.value,
      blueColorSlider.value
  );
  adjustHexColors(
      redColorSlider.value,
      greenColorSlider.value,
      blueColorSlider.value
  );
});

//check for valid Hex color code

/**
 *
 * @param {string} code
 */
const isValidHex = code => {
  if (code.length !== 6) return false;
  if (code[0] === '#') return false;
  return /^[0-9A-Fa-f]{6}$/i.test(code);
};

//input Hex color value

inputHex.addEventListener('keyup', e => {
  const color = e.target.value;
  if (color) {
    if (isValidHex(color)) {
      changeDisplayColor(`#${color}`);
      //adjust RGB color
      const r = parseInt(color.slice(0, 2), 16);
      const g = parseInt(color.slice(2, 4), 16);
      const b = parseInt(color.slice(4), 16);
      console.log(r, g, b);
      adjustRGBColors(r, g, b);
      //adjust rgb sliders
      adjustRGBSliders(r, g, b);
    }
    outputHex.value = color.toUpperCase();
  }
});

//copy colors to clipboard
copyToClipboardBtn.addEventListener('click', () => {
  const colorMode = colorModes[0].checked ? 'hex' : 'rgb';
  console.log(colorMode);
  if (colorMode === 'hex') {
    createToastMessage(outputHex.value, colorMode);
  } else {
    createToastMessage(outputRGB.value, colorMode);
  }
});

//make the toast message disappear
toastMessage.addEventListener('click', toastMessageDisappear);

//creating random colors
//Generating random numbers
const createRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//creating random decimals for rgb colors
const createColors = () => {
  const red = createRandomNumbers(0, 255);
  const green = createRandomNumbers(0, 255);
  const blue = createRandomNumbers(0, 255);
  return [red, green, blue];
};

//random color click event
randomColorBtn.addEventListener('click', () => {
  const [red, green, blue] = createColors();
  //change display color
  const color = `rgb(${red},${green},${blue})`;
  changeDisplayColor(color);
  adjustHexColors(red, green, blue);
  adjustRGBColors(red, green, blue);
  adjustRGBSliders(red, green, blue);
  toastMessageDisappear();
});
