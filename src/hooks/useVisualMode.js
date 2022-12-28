import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(transitionMode, replace = false) { 
    if(replace) {
      setHistory(prev => {
        prev[prev.length - 2] = transitionMode;
        return prev;
      })
    } else {
      setHistory(prev => {
        if (Array.isArray(prev)) {
          return prev.concat([transitionMode]);
        } else {
          return [transitionMode];
        }
      })
    }
    setMode(transitionMode)
  };

  function back() {
    if (history.length < 2) {return}
    setHistory(prev => prev.slice(0, prev.length - 1));
    setMode(history[history.length -2]);

  };

  return { mode, transition, back };
}