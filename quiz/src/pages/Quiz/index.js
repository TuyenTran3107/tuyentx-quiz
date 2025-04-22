import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicServices";
import { getListQuestion } from "../../services/questionsServices";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizServices";

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const navigate = useNavigate();
  // console.log(params)

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getTopic(params.id);
      setDataTopic(res);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListQuestion(params.id);
      setDataQuestion(res);
    }
    fetchApi();
  }, []);
  // console.log(dataQuestion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e)
    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      const name = e.target.elements[i].name;
      const value = e.target.elements[i].value;
      if (e.target.elements[i].checked) {
        // console.log(name, value)
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        })
      }
    }
    // console.log(selectedAnswers)
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers
    }
    const res = await createAnswer(options);
    if (res) {
      navigate(`/result/${res.id}`);
    }
  }


  return (
    <>
      <h2>Topic: {dataTopic && (<>{dataTopic.name}</>)}</h2>

      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item, index) => (
            <div className="form-quiz__item" key={index}>
              <p>Câu {index + 1}: {item.questions}</p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answer" key={indexAns}>
                  <input type="radio" name={item.id} id={`quiz-${item.id}-${indexAns}`} value={indexAns} />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}
export default Quiz;