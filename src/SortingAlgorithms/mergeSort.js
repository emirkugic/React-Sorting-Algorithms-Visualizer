import * as SV from "../SortVisualizer/SortVisualizer.js";

export function mergeSort(arr, aux, low, high, visuals) {
  if (low === high) return;
  var mid = Math.floor((low + high) / 2);
  mergeSort(aux, arr, low, mid, visuals);
  mergeSort(aux, arr, mid + 1, high, visuals);
  merge(arr, aux, low, mid, high, visuals);
}

function merge(arr, aux, low, mid, high, visuals) {
  var i = low,
    l = low,
    r = mid + 1;
  while (l <= mid && r <= high) {
    visuals.push([l, r]);
    visuals.push([l, r]);
    if (aux[l] <= aux[r]) {
      visuals.push([i, aux[l]]);
      arr[i++] = aux[l++];
    } else {
      visuals.push([i, aux[r]]);
      arr[i++] = aux[r++];
    }
  }
  while (l <= mid) {
    visuals.push([l, l]);
    visuals.push([l, l]);
    visuals.push([i, aux[l]]);
    arr[i++] = aux[l++];
  }
  while (r <= high) {
    visuals.push([r, r]);
    visuals.push([r, r]);
    visuals.push([i, aux[r]]);
    arr[i++] = aux[r++];
  }
}

export function performVisualization(arr) {
  const promises = [];
  var visuals = [];
  if (arr.length <= 1) return arr;
  var aux = arr.slice();
  mergeSort(arr, aux, 0, arr.length - 1, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    var changeColour = i % 3 !== 2; 
    if (changeColour) {
      var [barOneIndex, barTwoIndex] = visuals[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour = i % 3 === 0 ? SV.HIGHLIGHT_COLOUR : SV.MAIN_COLOUR;
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
            var [barOneIndex, newHeight] = visuals[i];
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
