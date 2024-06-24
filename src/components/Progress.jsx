function Progress({ index, questionsNum, answer }) {
  return (
    <div className="progress">
      <progress max={questionsNum} value={index + Number(answer !== null)} />
      <p className="text-sm">
        Question {index + 1} / {questionsNum}
      </p>
    </div>
  );
}

export default Progress;
