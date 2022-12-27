export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(mode, replace = false) { /* ... */ }
  function back() { /* ... */ }


  return { mode, transition, back };
}