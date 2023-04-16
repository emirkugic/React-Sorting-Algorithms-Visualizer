import React from "react";
import Selector from "../components/Selector";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Autorenew";
import SortIcon from "@material-ui/icons/Sort";
import * as Merge from "../SortingAlgorithms/mergeSort.js";
import * as Bubble from "../SortingAlgorithms/bubbleSort.js";
import * as Quick from "../SortingAlgorithms/quickSort.js";
import * as Select from "../SortingAlgorithms/selectionSort.js";
import * as Insert from "../SortingAlgorithms/insertionSort.js";
import Box from "@material-ui/core/Box";
import "./SortVisualizer.css";

//Constants & variables.
export const MAX_ARRAY_VALUE = 500;
export const MAIN_COLOUR = "#4eccbf";
export const HIGHLIGHT_COLOUR = "#fad169";
export const SPECIAL_HIGHLIGHT = "#f0715d";
export var ANIMATION_SPEED_MS = 5;
const FINISHED_GREEN = "#8bc9a4";
var currTab = 0; //Represents the index of the sorting tab that's currently selected.

//Array size slider.
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

//Beginning of SortVisualizer Class.
export default class SortVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currArraySize: 100,
      array: [],
      speed: 5,
      currentlyAnimating: false //Represents whether or not a sorting algorithm is currently being animated.
    };
  }
  //Once components are rendered, fill the array randomly.
  componentDidMount() {
    this.refillArray(this.state.currArraySize);
  }
  //Handle changing of the slider that controls the animation speed.
  handleSpeedSliderChange = (event, newValue) => {
    ANIMATION_SPEED_MS = 200 / Math.pow(newValue / 5, 2);
  };
  //Handle changing of the slider that controls the array size.
  handleArraySliderChange = (event, newValue) => {
    this.setState({ currArraySize: newValue });
    this.refillArray(newValue);
  };
  //Handle clicking of 'New Array' button.
  handleNewArrayClick = event => {
    this.refillArray(this.state.currArraySize);
  };
  //Handle clicking of 'Sort' button.
  handleSortClick = event => {
    this.setState({ currentlyAnimating: true }, () => this.beginSort());
  };
  //Fills the array with 'currArraySize' random elements from 1 -> MAX_ARRAY_VALUE.
  refillArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(getRandomInt(1, MAX_ARRAY_VALUE));
    }
    //Ensure that colours of the bars are back to normal upon fresh refill.
    var arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = MAIN_COLOUR;
    }
    this.setState({ array });
  }
  //Sorting methods that call their respective animation methods.
  async beginSort() {
    var func;
    if (currTab === 0) func = Quick.performVisualization;
    if (currTab === 1) func = Merge.performVisualization;
    if (currTab === 2) func = Insert.performVisualization;
    if (currTab === 3) func = Bubble.performVisualization;
    if (currTab === 4) func = Select.performVisualization;
    await func(this.state.array); //Wait for the animation to finish
    this.setState({ currentlyAnimating: false }, () => this.flashGreen());
  }
  //the flashing after finishing sorting
  async flashGreen() {
    var arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = FINISHED_GREEN;
    }
    //Pause for a little bit.
    await sleep(750);
    //Turn all the bars back to their original colour.
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = MAIN_COLOUR;
    }
  }
  //Beginning of render method.
  render() {
    const { array } = this.state;
    return (
      <Box display="flex" flexDirection="column" height="100vh">
        <Selector />
        <div className="contentContainer">
          <div className="speedSlider">
            <div className="speedLabelWrapper">
              <h3>Speed</h3>
            </div>
            <Slider
              orientation="vertical"
              defaultValue={50}
              min={5}
              max={100}
              step={0.01}
              aria-label="Speed"
              onChange={this.handleSpeedSliderChange}
              disabled={this.state.currentlyAnimating}
            />
          </div>
          <div className="sliderBtnsWrapper">
            <div className="arraySizeSlider">
              <h3>Array Size</h3>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="Array Size"
                defaultValue={100}
                min={5}
                max={500}
                onChange={this.handleArraySliderChange}
                disabled={this.state.currentlyAnimating}
              />
            </div>
            <div className="btnsWrapper">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<RefreshIcon />}
                className="mainBtn"
                onClick={this.handleNewArrayClick}
                disabled={this.state.currentlyAnimating}
              >
                <h3 className="btnHeading">Reset</h3>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SortIcon />}
                className="mainBtn"
                onClick={this.handleSortClick}
                disabled={this.state.currentlyAnimating}
              >
                <h3 className="btnHeading">Sort</h3>
              </Button>
            </div>
          </div>
        </div>
        <div className="barContainer">
          {array.map((value, index) => (
            <div
              className="arrayBar"
              key={index}
              style={{
                width: `${75 / array.length}%`,
                height: `${value / (MAX_ARRAY_VALUE / 100)}%`
              }}
            ></div>
          ))}
        </div>
      </Box>
    );
  }
}
//Generates random integer within the interval [min, max].
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Sets the tab index so that the correct sorting method can be chosen.
export function setCurrTab(index) {
  currTab = index;
}
//Pauses for a duration of the given ms.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
