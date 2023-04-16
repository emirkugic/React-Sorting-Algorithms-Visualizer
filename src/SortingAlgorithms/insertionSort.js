import * as SV from "../SortVisualizer/SortVisualizer.js";

export function insertionSort(array, visuals) {
  for (let step = 1; step < array.length; step++) {
    var key = array[step];
    visuals.push([step, step, "k"]);
    visuals.push([step, step, "r"]);
    var j = step - 1;
    while (j >= 0 && key < array[j]) {
      visuals.push([j, j + 1, "v"]);
      visuals.push([j, j + 1, "r"]);
      visuals.push([j + 1, array[j], "s"]);
      visuals.push([j, key, "s"]);
      array[j + 1] = array[j];
      j--;
    }
    visuals.push([j + 1, key, "s"]);
    array[j + 1] = key;
  }
}

export function performVisualization(array) {
  const promises = [];
  var visuals = [];
  insertionSort(array, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    var key = visuals[i][2];
    var changeColour = key === "v" || key === "r" || key === "k";
    if (changeColour) {
      var barOneIndex = visuals[i][0];
      var barTwoIndex = visuals[i][1];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour;
      if (key === "v") colour = SV.HIGHLIGHT_COLOUR;
      if (key === "r") colour = SV.MAIN_COLOUR;
      if (key === "k") colour = SV.SPECIAL_HIGHLIGHT;
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
