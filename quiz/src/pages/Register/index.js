import { useNavigate } from "react-router-dom";
import { checkExits, register } from "../../services/usersService";
import { generateToken } from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkExitsEmail = await checkExits("email", email);
    if (checkExitsEmail.length > 0) {
      alert("Email already exists!")
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken()
      };
      const res = await register(options);
      if (res) {
        navigate("/login");
      } else {
        alert("Account registration failed!")
      }
    }




  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input type="text" placeholder="Full Name" />
        </div>
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  )
}
export default Register;