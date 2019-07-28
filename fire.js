const DEBUG = false;
const firePixelsArray = [];
const fireWidth = 40;
const fireHeight = 40;

const start = () => {
  createFireDataStructure();
  createFireSource();
  renderFire();

  setInterval(calculateFirePropagation, 50);
};

const createFireDataStructure = () => {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
};

const calculateFirePropagation = () => {
  for (let i = 0; i < firePixelsArray.length; i++) {
    if (i + fireWidth >= firePixelsArray.length) continue;
    const belowRowValue = firePixelsArray[i + fireWidth];
    const intensityDecay = Math.floor(Math.random() * 3);
    const newFireIntensity =
      belowRowValue - intensityDecay >= 0 ? belowRowValue - intensityDecay : 0;
    firePixelsArray[i - intensityDecay] = newFireIntensity;
  }
  renderFire();
};

const renderFire = () => {
  let html = '<table>';
  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>';

    for (let col = 0; col < fireWidth; col++) {
      const pixelIndex = col + fireWidth * row;
      const fireIntensity = firePixelsArray[pixelIndex];

      if (DEBUG === true) {
        html += '<td>';
        html += `<div class="pixel-index">${pixelIndex}</div>`;
        html += fireIntensity;
        html += '</td>';
      } else {
        const color = fireColorsPalette[fireIntensity];
        const colorString = `${color.r},${color.g},${color.b}`;
        html += `<td class="pixel" style="background-color: rgb(${colorString}); "`;
        html += '</td>';
      }
    }

    html += '</tr>';
  }
  html += '</table>';

  document.querySelector('#fireCanvas').innerHTML = html;
};

const createFireSource = () => {
  for (let col = 0; col <= fireWidth; col++) {
    const overflowPixelIndex = fireWidth * fireHeight;
    const pixelIndex = overflowPixelIndex - fireWidth + col;

    firePixelsArray[pixelIndex] = 36;
  }
};

start();
