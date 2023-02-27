import React, {useState, useContext, useEffect} from 'react'
import OptionHandler from './OptionHandler.js';
import {Button} from "@material-ui/core";

import Context from '../store/pause-context.js';
import "../styles/QuestionBox.css";
import lock from "../soundEffects/lock.mp3";
import clap from '../soundEffects/clap.mp3';
import wrong from "../soundEffects/wrong.mp3";

function OptionBox(props) {

  const { setFreezed } = useContext(Context);
  const {choice_items, worthID, TL} = props;

  const [disableFreeze, setDisableFreeze] = useState(true);
  const [showCAB, setShowCAB] = useState(false);
  const [cabClicked, setCABClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showOptionBox, setShowOptionBox] = useState(false);

  const [lockSound, setLockSound] = useState(new Audio(lock));

  useEffect(() => {
    const delay = TL + 5000;
    const timer = setTimeout(() => setShowOptionBox(true), delay); //change ms here.
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {

    if(cabClicked)  {
      console.log("pausing");
      lockSound.pause();
    }
 
  }, [cabClicked]);

  function optionHandler(clicked) {
    setDisableFreeze(!clicked);

 }
 
 function freezeOptions() {
   
    setShowCAB(!showCAB);

     setFreezed(true);

 }

 function checkAnswer() {
      console.log("checking answer."); 
     setCABClicked(!cabClicked);

     if(!isCorrect) {
      lockSound.pause();
        props.getResult(false);
        // setRightAnswer(false);
        let sound  = new Audio(wrong);
        sound.play();
     }
     else {
      lockSound.pause();
       setShowCAB(!showCAB);
       props.getResult(true, false);
      //  setRightAnswer(true);
   
      console.log(worthID);
      if(worthID !== 15) {
        let song = new Audio(clap);
        song.play();
      }
     
     }
 }

    const gameQuit = () => {
        props.getResult(false, true);
    }

    function displayButtons() {

      let mat = [[]], arr = [];
      choice_items.map((option) => {
          arr.push(option);
      })

      mat = [ [arr[0], arr[1]], [arr[2], arr[3]] ];
          
      return (
          <div>        
            {

            mat.map((row, index) => ( 
              <div key={index} className="option-row">
                { row.map( (option) => {
                    return (
                            <div key={option.position + index}>
                                <OptionHandler 
                                option={option} 
                                id={option.position} 
                                onOptionClick = {optionHandler}
                                disableOption = {showCAB}
                                cabClicked = {cabClicked}
                                setChosen = {setIsCorrect}
                                worthID = {worthID}
                                /> 
                            </div>
                          )
                  } ) 
                }
                </div>
              ))

            } 
        </div>
      )
    }

    function Box() {
      return (
        <div>

           {displayButtons()}
     
          <div className = "button">
          
            {showCAB ? <Button style={{color: "#EFE9EF"}} onClick={checkAnswer}> Check Answer </Button>: 
            <Button style={{color: "white"}} disabled={disableFreeze} onClick={freezeOptions} color="primary">
              Freeze
            </Button>}


          </div>
          
         {!showCAB ?<Button style={{color: "white"}} onClick={gameQuit} color="primary">
              Quit
            </Button> : null} 
          
        </div>
      )
    }

    return (
        <div id="inner2">
            {showOptionBox ? Box() : null}
        </div>
    )
}

export default OptionBox
