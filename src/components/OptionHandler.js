import React, {useState, useEffect} from 'react'
import '../styles/OptionBox.css';
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

export default function OptionHandler(props) {
    const {option, id, disableOption, setChosen, worthID, cabClicked} = props;
   
    const [clicked, setClicked] = useState(true);
    const [bgcolor, setBgcolor] = useState('black');
    const [textcolor, setTextcolor] = useState('white');
    const [prevWorthID, setPrevWorthID] = useState(0);
    const [back, setBack] = useState('black');

  function handleOptionClick() {

      setClicked(!clicked);
      if(clicked) {
          setChosen(option.is_correct);
          setBgcolor('yellow');
          setTextcolor('black');
      }
      else {
          if(disableOption === false) {
            setChosen(false);
            setBgcolor('black');
            setTextcolor('white');
          }

      }
    // console.log(clicked);

      props.onOptionClick(clicked);
 
  }

  function resetOptions() {
      if(worthID > prevWorthID) {
          setBgcolor('black');
          setTextcolor('white');
          setClicked(true);
          setPrevWorthID(worthID);
      }
  }

//   const foo = () => {
//       if(cabClicked) {
//           if(option.is_correct) {
//             setBack('green');
//           }
//       }
//       else {
//           setBack(bgcolor);
//       }
//   }
  let style = {backgroundColor : bgcolor, color : textcolor};

  const alphabet = () => {
      if(id === 1) {
          return <span> A </span>;
      }
      else if(id === 2) {
        return <span> B </span>;
      }
      else if(id === 3) {
        return <span> C </span>;
      }
      return <span> D </span>;
  }

    return (
        <div>
    
            <button disabled={disableOption && bgcolor!=='yellow'} onClick={handleOptionClick}
            style={style} 
            className="option"> {alphabet()}. {option.choice} </button>
            {resetOptions()}

        </div>
    )
}

// {`option${id}`}