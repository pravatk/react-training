import React, { useState } from "react";
import "./App.css";
import ValidationComponent from "./ValidationComponent";
import CharComponent from "./CharComponent";

function App() {
  const [state, setState] = useState({ length: 0, text: null });

  const onChangeHandler = event => {
    let text = event.target.value;
    const newState = Object.assign({}, state);
    newState.length = text.length;
    newState.text = text;
    setState(newState);
  };

  const deleteChar = (event, index) => {
    let newText = state.text.slice(0, index) + state.text.substring(index + 1);
    const newState = Object.assign({}, state);
    newState.length = newText.length;
    newState.text = newText;
    setState(newState);
  };

  return (
    <div className="App">
      <input onChange={onChangeHandler} value={state.text} />
      <p>Length: {state.length}</p>
      <p>Text: {state.text}</p>
      <ValidationComponent length={state.length} />
      {state.text != null && state.text.length > 0
        ? Array.from(state.text).map((aChar, index) => (
            <CharComponent
              input={aChar}
              click={event => deleteChar(event, index)}
            />
          ))
        : null}
    </div>
  );
}

export default App;
