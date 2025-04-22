import { useEffect, useState } from "react";
import { getAnswersByUsersId } from "../../services/answersServices";
import { getListTopic } from "../../services/topicServices";
import { Link } from "react-router-dom";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answersByUsersId = await getAnswersByUsersId();
      const topics = await getListTopic();

      let result = [];
      for (let i = 0; i < answersByUsersId.length; i++) {
        result.push({
          ...topics.find(item => item.id === answersByUsersId[i].topicId),
          ...answersByUsersId[i]
        })
      }
      setDataAnswers(result.reverse());
    }
    fetchApi();
  }, []);
  return (
    <>
      <h2>List Practice</h2>

      {dataAnswers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID User</th>
              <th >Topic</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {dataAnswers.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/result/" + item.id}>Practice</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
export default Answers;