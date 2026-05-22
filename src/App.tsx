import { useReducer } from "react";
import { reducer, initialState } from "./engine/quizState";
import { WelcomeScreen } from "./components/WelcomeScreen/WelcomeScreen";
import { QuizScreen } from "./components/QuizScreen/QuizScreen";
import { SummaryScreen } from "./components/SummaryScreen/SummaryScreen";

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.screen === "welcome") {
    return <WelcomeScreen onPlay={() => dispatch({ type: "START_ROUND" })} />;
  }

  if (state.screen === "playing" || state.screen === "feedback") {
    return <QuizScreen state={state} dispatch={dispatch} />;
  }

  if (state.screen === "summary") {
    return (
      <SummaryScreen
        correctCount={state.correctCount}
        onPlayAgain={() => dispatch({ type: "RESTART" })}
      />
    );
  }

  return null;
}
