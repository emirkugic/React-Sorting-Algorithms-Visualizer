import * as SV from "../SortVisualizer/SortVisualizer.js";

export function quickSort(array, start, end, visuals) {
  if (start >= end) return;
  var pIndex = partition(array, start, end, visuals);
  quickSort(array, start, pIndex - 1, visuals);
  quickSort(array, pIndex + 1, end, visuals);
}

function partition(array, start, end, visuals) {
  var pivot = array[end];
  var pIndex = start;
  visuals.push([end, end, "p"]);
  visuals.push([end, end, "r"]);
  for (let i = start; i < end; i++) {
    visuals.push([i, pIndex, "v"]);
    visuals.push([i, pIndex, "r"]);
    if (array[i] < pivot) {
      visuals.push([i, array[pIndex], "s"]);
      visuals.push([pIndex, array[i], "s"]);
      let temp = array[i];
      array[i] = array[pIndex];
      array[pIndex] = temp;
      pIndex++;
    }
  }
  visuals.push([pIndex, end, "v"]);
  visuals.push([pIndex, end, "r"]);
  visuals.push([pIndex, array[end], "s"]);
  visuals.push([end, array[pIndex], "s"]);
  var temp = array[pIndex];
  array[pIndex] = array[end];
  array[end] = temp;
  return pIndex;
}

export function performVisualization(array) {
  const promises = [];
  var visuals = [];
  quickSort(array, 0, array.length - 1, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    var key = visuals[i][2];
    var changeColour = key === "v" || key === "r" || key === "p";
    if (changeColour) {
      var barOneIndex = visuals[i][0];
      var barTwoIndex = visuals[i][1];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour;
      if (key === "v") colour = SV.HIGHLIGHT_COLOUR;
      if (key === "r") colour = SV.MAIN_COLOUR;
      if (key === "p") colour = SV.SPECIAL_HIGHLIGHT;
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
