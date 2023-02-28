import React, { useState, useEffect, createContext, useContext } from "react";
import Container from "./Container";
import QuestionBox from "./QuestionBox";
import OptionBox from "./OptionBox.js";
import "../styles/Game.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Context from "../store/pause-context.js";
import {Questions, Choices} from "./DummyData.js";
import InGameMessage from "./InGameMessage";

export default function Game() {
  // get all choices, questions, worth.

  const [choices, setChoices] = useState(Choices);
  const [questions, setQuestions] = useState(Questions);

  const [gameIndex, setgameIndex] = useState(0);
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
    console.log(gameIndex);

    if (gameIndex > 0 && gameIndex <= questions.length) {
      const question_items = questions.filter((question) => {
        return question.index === gameIndex - 1;
      });

      const question = question_items[0];

      const choice_items = choices.filter(
        (choice) => choice.question === gameIndex - 1
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
  }, [gameIndex, questions, choices]);

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
      setgameIndex(gameIndex + 1);
      console.log(gameIndex);
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
         <p>  <span style={{ color: "lightgreen" }}> {questions[(gameIndex > 0) ? gameIndex - 1 : 0].trivia} </span> </p>
          <Button color="secondary"> Next </Button>
        </h3>
      </div>
    );
  }

  const gameLostMessage = () => {

    return (
      <InGameMessage 
      resultMessage = "Wrong! The correct answer is."
      correctChoicePosition = {alphabet(correctChoice.pos)}
      correctChoiceValue = {correctChoice.val}
      answerInfo = {questions[(gameIndex > 0) ? gameIndex - 1 : 0].trivia}
      />
    );
  };

  const gameWonMessage = () => {

    return (
          <InGameMessage 
          resultMessage = "Congratulations!! All answers are correct."
          correctChoicePosition = {alphabet(correctChoice.pos)}
          correctChoiceValue = {correctChoice.val}
          answerInfo = {questions[questions.length - 1].trivia}
          />
    );
  };

  const gameQuitMessage = () => {

    console.log(correctChoice);
    return (
      <InGameMessage 
      resultMessage = "Thanks for playing. The correct answer is: "
      correctChoicePosition = {alphabet(correctChoice.pos)}
      correctChoiceValue = {correctChoice.val}
      answerInfo = {questions[(gameIndex > 0) ? gameIndex - 1 : 0].trivia}
      />
    );
  };

  const resetStates = () => {
    if (rightAnswer) {
      setRightAnswer(false);
      setPrevID(gameIndex);
      setFreezed(false);
    }
  };

  const continueGame = () => {
    return (
      <div>
        {prevID < gameIndex && gameIndex <= questions.length
          ? putNextQuestion()
          : null}
        {resetStates()}
        {prevID === gameIndex && prevID >= 1 ? boxHolder() : null}
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
                    gameIndex={gameIndex}
                    setgameIndex={setgameIndex}
                    question={question}
                    timeUpCheck={timeUpCheck}
                    TL={TL}
                  />

                  <OptionBox
                    choice_items={choiceItems}
                    gameIndex={gameIndex}
                    setgameIndex={setgameIndex}
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
        {gameIndex === 0 ? (
          <div className="pauseScreen">
            <Button
              style={{ margin: "0 auto" }}
              color="secondary"
              onClick={() => setgameIndex(gameIndex + 1)}
            >
              Click To Begin!!!
            </Button>
          </div>
        ) : gameIndex > questions.length ? (
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
