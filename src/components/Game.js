import React, { useState, useEffect, createContext, useContext } from "react";
import Container from "./Container";
import QuestionBox from "./QuestionBox";

import OptionBox from "./OptionBox.js";

import "../styles/Game.css";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
import Context from "../store/pause-context.js";
import {Questions, Choices} from "./DummyData.js";

export default function Game() {
  // get all choices, questions, worth.

  const [choices, setChoices] = useState(Choices);
  const [questions, setQuestions] = useState(Questions);

  const [worthID, setWorthID] = useState(0);
  const [prevID, setPrevID] = useState(1);
  const [gameLost, setGameLost] = useState(false);
  const [freezed, setFreezed] = useState(false);
  const [choiceItems, setChoiceItems] = useState([]);
  const [question, setQuestion] = useState(null);
  const [rightAnswer, setRightAnswer] = useState(false);
  const [correctChoice, setCorrectChoice] = useState({
    pos: 0,
    val: "null",
    trivia: "null",
    hint: "null",
  });
  const [TL, setTL] = useState(1000);

  const [gameQuit, setGameQuit] = useState(false);

  useEffect(() => {
    console.log(worthID);

    if (worthID > 0 && worthID <= questions.length) {
      const question_items = questions.filter((question) => {
        return question.index === worthID - 1;
      });

      const question = question_items[0];

      const choice_items = choices.filter(
        (choice) => choice.question === worthID - 1
      );

      choices.forEach((choice) => {
        console.log(choice);
      });

      const sahiJawab = choice_items.find((c) => c.is_correct) || {};
      const obj = { pos: 0, val: "null", trivia: "null" };
      obj.pos = sahiJawab.position;
      obj.val = sahiJawab.choice;
      obj.trivia = question.trivia;

      setCorrectChoice(obj);
      setQuestion(question);
      setChoiceItems(choice_items);
      console.log(choice_items);

      let x = 60 / 130;
      var arr = question.title.split(" ");
      let n = arr.length;
      let y = n * x * 1000;
      // console.log(n);
      setTL(y);
    }
  }, [worthID, questions, choices]);

  // prop function.
  function timeUpCheck(s) {
    if (s === 0) {
      setGameLost(true);
    }
  }
  // prop function.
  const getResult = (isCorrect, quit) => {
    if (quit) {
      setGameQuit(true);
    } else if (isCorrect) {
      // console.log(" func get result says absolutely true");
      setWorthID(worthID + 1);
      console.log(worthID);
    } else {
      setGameLost(true);
    }
  }

  const alphabet = (id) => {
    if (id === 1) {
      return <span> A. </span>;
    } else if (id === 2) {
      return <span> B. </span>;
    } else if (id === 3) {
      return <span> C. </span>;
    }
    return <span> D. </span>;
  };

  const putNextQuestion = () => {
    console.log(question.trivia);
    return (
      <div className="pauseScreen">
        <h3 style={{ color: "white" }} onClick={() => setRightAnswer(true)}>
          Right answer!
          <h2> Trivia </h2>
         <p>  <span style={{ color: "lightgreen" }}> {questions[(worthID > 0) ? worthID - 1 : 0].trivia} </span> </p>
          <Button color="secondary"> Next </Button>
        </h3>
      </div>
    );
  }

  const gameLostMessage = () => {
    return (
      <div className="pauseScreen">
        <h2>
          {" "}
          Wrong! The correct answer is{" "}
          <span style={{ color: "lightgreen" }}>
            {" "}
            {alphabet(correctChoice.pos)} {correctChoice.val}{" "}
          </span>{" "}
        </h2>
        <h2 style = {{color: "lightblue"}}> Trivia </h2>
        <p> {questions[(worthID > 0) ? worthID - 1 : 0].trivia}  </p>
        <Button color="secondary" to="/" component={Link}>
          {" "}
          Back to Home{" "}
        </Button>
      </div>
    );
  };

  const gameWonMessage = () => {
    return (
      <div className="pauseScreen">
        <h1>
       
          <span style={{}}>Congratulations!!</span> All answers are correct.
        
        </h1>
        <h2 style = {{color: "lightblue"}}>Trivia </h2>
        <p>   <span style={{ color: "lightgreen" }}>  {question.trivia} </span>  </p>
        <Button color="secondary" to="/" component={Link}>
          
          Back to Home
        </Button>
      </div>
    );
  };

  const gameQuitMessage = () => {
    console.log(correctChoice);
    return (
      <div className="pauseScreen">
        <h2>
          {" "}
          Thanks for playing. The correct answer is{" "}
          <span style={{ color: "lightgreen" }}>
            {" "}
            {alphabet(correctChoice.pos)} {correctChoice.val}{" "}
          </span>{" "}
        </h2>
        <h2 style = {{color: "lightblue"}}> Trivia </h2>
        <p> {questions[prevID < worthID && prevID >= 0 ? prevID : 0].trivia} </p>

        <Button color="secondary" to="/" component={Link}>
          {" "}
          Back to Home{" "}
        </Button>
      </div>
    );
  };

  const resetStates = () => {
    if (rightAnswer) {
      setRightAnswer(false);
      setPrevID(worthID);
      setFreezed(false);
    }
  };

  const continueGame = () => {
    return (
      <div>
  
        {prevID < worthID && worthID <= questions.length
          ? putNextQuestion()
          : null}

        {resetStates()}

        {prevID === worthID && prevID >= 1 ? boxHolder() : null}
      </div>
    );
  }

  const boxHolder = () => {
    if (question !== null) {
      return (
        <Container>
          {/* <button onClick={showHint}> Show Hint </button> */}
          <Context.Provider value={{ freezed, setFreezed }}>
           
                <div id="wrapper">
                  <QuestionBox
                    worthID={worthID}
                    setWorthID={setWorthID}
                    question={question}
                    timeUpCheck={timeUpCheck}
                    TL={TL}
                  />

                  <OptionBox
                    choice_items={choiceItems}
                    worthID={worthID}
                    setWorthID={setWorthID}
                    getResult={getResult}
                    TL={TL}
                  />
                  
              </div>
            
          </Context.Provider>
        </Container>
      );
    }
  }

  return (
    <div className="game">
      {/* ready button */}
      <div className="container">
        {worthID === 0 ? (
          <div className="pauseScreen">
            <Button
              style={{ margin: "0 auto" }}
              color="secondary"
              onClick={() => setWorthID(worthID + 1)}
            >
              Click To Begin!!!
            </Button>
          </div>
        ) : worthID > questions.length ? (
          gameWonMessage()
        ) : null}

        {gameLost
          ? gameLostMessage()
          : gameQuit
          ? gameQuitMessage()
          : continueGame()}
      </div>
    </div>
  );
}
