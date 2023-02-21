import React, { useState } from "react";



export default function(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    setMode(newMode);

    if(!replace) {
      setHistory([...history, mode]);

    }

  };

  function back() {

    let array = history.splice(history.length - 1, 1);

    setMode(array[array.length - 1]);


  };

  return { mode, transition, back };

};
