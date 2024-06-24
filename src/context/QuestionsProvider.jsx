import { createContext, useContext, useReducer } from "react";
import { quizData } from "../data";

const QuestionsContext = createContext();

const initialState = {
  status: "pending",
  questions: quizData.quizzes,
  topicNumber: null,
  answer: null,
  index: 0,
  points: 0,
  secondRemaining: 10 * 30,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
        topicNumber: action.payload,
      };
    case "newAnswer":
      const question = state.questions[state.topicNumber].questions.at(
        state.index,
      );
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.answer ? state.points + 1 : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return { ...state, status: "finished" };

    case "restart":
      return { ...initialState };

    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action.");
  }
}

function QuestionsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    topicNumber,
    index,
    answer,
    points,
    secondRemaining,
  } = state;

  const questionsNum = questions[topicNumber]?.questions?.length;
  const topicIcon = questions[topicNumber]?.icon;
  const topicTitle = questions[topicNumber]?.title;
  const currentQuestion = questions[topicNumber]?.questions[index];

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        currentQuestion,
        status,
        topicNumber,
        index,
        answer,
        points,
        secondRemaining,
        dispatch,
        questionsNum,
        topicIcon,
        topicTitle,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error("The Questions context was used outside the provider.");
  return context;
}

export { useQuestions, QuestionsProvider };
