import { useReducer } from "react";
import { reducer, initialState } from "./engine/quizState";
import { WelcomeScreen } from "./components/WelcomeScreen/WelcomeScreen";

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.screen === "welcome") {
    return <WelcomeScreen onPlay={() => dispatch({ type: "START_ROUND" })} />;
  }

  // Remaining screens (playing, feedback, summary) are out of scope for this iteration
  return (
    <div id="app-shell">
      <p>Screen: {state.screen}</p>
    </div>
  );
}
