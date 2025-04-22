import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersServices";
import { getListQuestion } from "../../services/questionsServices";
import "./Result.css"

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestion = await getListQuestion(dataAnswers.topicId);

      let resultMerge = [];
      for (let i = 0; i < dataQuestion.length; i++) {
        resultMerge.push({
          ...dataQuestion[i],
          ...dataAnswers.answers.find(item => item.questionId === dataQuestion[i].id)
        })
      }
      console.log(resultMerge)
      setDataResult(resultMerge);
    }
    fetchApi();
  }, [])
  return (
    <>
      <h2>Result:</h2>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={index}>
            <p>
              Câu {index + 1}: {item.questions}
              {item.correctAnswer === item.answer ? (
                <span className="result--true">Correct</span>
              ) : (
                <span className="result--false">Wrong</span>
              )}
            </p>
            {item.answers.map((itemAns, indexAns) => {
              let checked = false;
              let className = "";

              if (item.answer === indexAns) {
                checked = true;
                className = "result__item--selected ";
              }
              if (item.correctAnswer === indexAns) {
                className += "result__item--result";
              }
              return (
                <div className="result__answer" key={indexAns}>
                  <input type="radio" checked={checked} disabled />
                  <label className={className}>{itemAns}</label>
                </div>
              )
            }

            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default Result;