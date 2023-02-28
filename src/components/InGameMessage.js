import React from 'react'
import "../styles/Game.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function InGameMessage(props) {
 
    return (
        <div className="pauseScreen">
          <h2>
            {props.resultMessage}
            <span style={{ color: "lightgreen" }}>
              {props.correctChoicePosition} {props.CorrectChoiceValue}
            </span>
          </h2>
          <h2 style = {{color: "lightblue"}}> Trivia </h2>
          <p> {props.answerInfo}  </p>
          <Button color="secondary" to="/" component={Link}>
            Back to Home
          </Button>
        </div>
      );
}

export default InGameMessage