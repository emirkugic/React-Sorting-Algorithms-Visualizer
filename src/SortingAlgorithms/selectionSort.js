import * as SV from "../SortVisualizer/SortVisualizer.js";

export function selectionSort(array, visuals) {
  for (let left = 0; left < array.length; left++) {
    var minIndex = left;
    for (let i = left + 1; i < array.length; i++) {
      visuals.push([i, minIndex, "v"]);
      visuals.push([i, minIndex, "r"]);
      if (array[i] < array[minIndex]) {
        minIndex = i;
        visuals.push([minIndex, minIndex, "m"]);
      }
    }
    visuals.push([minIndex, minIndex, "r"]);
    visuals.push([minIndex, array[left], "s"]);
    visuals.push([left, array[minIndex], "s"]);
    var temp = array[minIndex];
    array[minIndex] = array[left];
    array[left] = temp;
  }
}

export function performVisualization(array) {
  const promises = [];
  var visuals = [];
  selectionSort(array, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    var key = visuals[i][2];
    var changeColour = key === "v" || key === "r" || key === "m";
    if (changeColour) {
      var barOneIndex = visuals[i][0];
      var barTwoIndex = visuals[i][1];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour;
      if (key === "v") colour = SV.HIGHLIGHT_COLOUR;
      if (key === "r") colour = SV.MAIN_COLOUR;
      if (key === "m") colour = SV.SPECIAL_HIGHLIGHT;
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
