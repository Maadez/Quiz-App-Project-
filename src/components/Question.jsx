import { useQuestions } from "../context/QuestionsProvider";
import Button from "./Button";
import Option from "./Option";
import Progress from "./Progress";
import Timer from "./Timer";

function Question() {
  const {
    dispatch,
    answer,
    index,
    questionsNum,
    secondRemaining,
    currentQuestion,
  } = useQuestions();

  return (
    <div className="container mx-auto px-[10px] md:w-[80%]">
      <div className="flex min-h-[45vh] w-full flex-col items-center justify-around gap-[20px] p-[20px] md:flex-row md:justify-between">
        <div className="flex h-[40vh] w-full flex-col items-start justify-center gap-[20px] md:w-[50%] md:justify-between">
          <p className="text-left text-xl sm:text-2xl">
            {currentQuestion.question}
          </p>
          <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
            <Progress
              index={index}
              questionsNum={questionsNum}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
          </div>
        </div>

        <div className="flex w-full flex-col  items-center gap-[10px] text-sm sm:gap-[20px] sm:text-base md:w-[50%]">
          {currentQuestion?.options?.map((q, i) => {
            return (
              <Option
                key={i}
                option={currentQuestion?.options[i]}
                dispatch={dispatch}
                answer={answer}
                question={currentQuestion}
              />
            );
          })}

          {answer && index < questionsNum - 1 ? (
            <Button onClick={() => dispatch({ type: "nextQuestion" })}>
              Next Question
            </Button>
          ) : null}

          {answer && index === questionsNum - 1 ? (
            <Button onClick={() => dispatch({ type: "finish" })}>Finish</Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Question;
