import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicServices";

function Topic() {

  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListTopic();
      setTopics(res);
    }
    fetchApi();
  }, []);

  return (
    <>

      <h2>List topics</h2>
      {topics.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th row={3}>Topic</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {topics.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/quiz/" + item.id}>Practice</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
export default Topic;