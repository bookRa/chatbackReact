import React from "react";
import RibbonButton from "./RibbonButton";
//import classes from './Ribbon.css';

const buttonContainer = props =>
  props.btns.map((btn, index) => {
    return (
      <RibbonButton
        className="ribbonButton"
        name={props.btns[index].key}
        key={props.btns[index].key}
        value={props.btns[index].value}
        title={props.btns[index].tooltip}
        clickfunc={() => props.clicked(index)}
        data-toggle="tooltip"
      />
    );
  });

export default buttonContainer;
