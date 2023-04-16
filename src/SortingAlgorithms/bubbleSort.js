import * as SV from "../SortVisualizer/SortVisualizer.js";

export function bubbleSort(array, visuals) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      visuals.push([j, j + 1, "v"]);
      visuals.push([j, j + 1, "r"]);
      if (array[j] > array[j + 1]) {
        visuals.push([j, array[j + 1], "s"]);
        visuals.push([j + 1, array[j], "s"]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
} 

export function performVisualization(array) {
  const promises = [];
  var visuals = [];
  bubbleSort(array, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    var changeColour = visuals[i][2] === "v" || visuals[i][2] === "r";
    if (changeColour) {
      var [barOneIndex, barTwoIndex, key] = visuals[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour = key === "v" ? SV.HIGHLIGHT_COLOUR : SV.MAIN_COLOUR;
      promises.push(
        new Promise(resolve => {
          setTimeout(() => {
            barOneStyle.backgroundColor = colour;
            barTwoStyle.backgroundColor = colour;
            resolve();
          }, i * SV.ANIMATION_SPEED_MS);
        })
      );
    } else {
      promises.push(
        new Promise(resolve => {
          setTimeout(() => {
            var barOneIndex = visuals[i][0];
            var newHeight = visuals[i][1];
            var barOneStyle = arrayBars[barOneIndex].style;
            barOneStyle.height = `${newHeight / (SV.MAX_ARRAY_VALUE / 100)}%`;
            resolve();
          }, i * SV.ANIMATION_SPEED_MS);
        })
      );
    }
  }
  return Promise.all(promises);
}
