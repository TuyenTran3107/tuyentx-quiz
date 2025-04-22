import { useNavigate } from "react-router-dom";
import { login } from "../../services/usersService";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const res = await login(email, password);
    if (res.length > 0) {
      navigate("/");
      setCookie("id", res[0].id, 1);
      setCookie("fullName", res[0].fullName, 1);
      setCookie("email", res[0].email, 1);
      setCookie("token", res[0].token, 1);
      dispatch(checkLogin(true));
    } else {
      alert("Wrong account or password!")
    }

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login </h2>
        <div>
          <input type="email" placeholder="Email" defaultValue="vothik@gmail.com" />
        </div>
        <div>
          <input type="password" placeholder="Password" defaultValue="vothik" />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
export default Login;