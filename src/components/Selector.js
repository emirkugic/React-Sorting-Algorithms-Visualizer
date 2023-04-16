import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import QuickIcon from "@material-ui/icons/FastForwardRounded";
import InsertIcon from "@material-ui/icons/MenuOpenRounded";
import BubbleIcon from "@material-ui/icons/BubbleChartRounded";
import SelectIcon from "@material-ui/icons/ColorizeRounded";
import MergeIcon from "@material-ui/icons/MergeTypeRounded";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { setCurrTab } from "../SortVisualizer/SortVisualizer.js";
import "../App.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Selector() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className="tabsContainer" position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Quick" icon={<QuickIcon />} {...a11yProps(0)} />
          <Tab label="Merge" icon={<MergeIcon />} {...a11yProps(2)} />
          <Tab label="Insertion" icon={<InsertIcon />} {...a11yProps(2)} />
          <Tab label="Bubble" icon={<BubbleIcon />} {...a11yProps(3)} />
          <Tab label="Selection" icon={<SelectIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel className="tab" value={value} index={0}>
        <p>
          <span className="bold">Quicksort </span>
          works by first selecting a ‘pivot’ point, and partitioning the list
          around this pivot so that all elements smaller than the pivot are
          before it, and all elements larger are after. It then recursively
          repeats this process on the unsorted sublist before the pivot and the
          one after.
        </p>
      </TabPanel>
      <TabPanel className="tab" value={value} index={1}>
        <p>
          <span className="bold">Merge sort </span>repeatedly breaks down the
          list into smaller sublists until each sublist consists of only one
          element. Then, these sublists are sorted and recursively{" "}
          <span className="bold">'merged' </span> with others in a manner that
          will form a sorted list.
        </p>
      </TabPanel>
      <TabPanel className="tab" value={value} index={2}>
        <p>
          <span className="bold">Insertion sort </span>is similar to how we
          might sort cards in our hand during a card game. Each unsorted element
          is <span className="bold">'inserted' </span> into its correct
          position, growing a sorted list from left to right.
        </p>
      </TabPanel>
      <TabPanel className="tab" value={value} index={3}>
        <p>
          <span className="bold">Bubble sort </span> repeatedly compares
          adjacent elements and swaps their positions if they are not in the
          intended order. Visually, the largest element will continuously{" "}
          <span className="bold">'bubble' </span> up to the location where it
          belongs.
        </p>
      </TabPanel>
      <TabPanel className="tab" value={value} index={4}>
        <p>
          <span className="bold">Selection sort </span> continuously{" "}
          <span className="bold">'selects' </span>
          the smallest element in the unsorted portion of the list and places it
          at the beginning. As a result, the list is constantly in two parts -
          the sorted part at the left, and the unsorted part at the right.
        </p>
      </TabPanel>
    </div>
  );
}
