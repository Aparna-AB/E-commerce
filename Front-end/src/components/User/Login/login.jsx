import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../redux/reduxTodoReducer/reduxTodoReducer";
import NavBar from "../../NavBar/navBar";
import { Button, Form } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (!userLoginData.email || !userLoginData.password) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!isValidEmail(userLoginData.email)) {
        alert("Invalid Email Address");
        console.log("Invalid email");
        return;
      }
      sendLoginDataToServer(userLoginData);
    }
  };

  const sendLoginDataToServer = async (data) => {
    if (userLoginData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3080/user/login', data);
      if (response.status === 200) {
        console.log("user logged in successfully");
        dispatch(addTodo({
          firstName: userLoginData.firstName,
          email:userLoginData.email
        }));

        let userData = response.data;
        let token = userData.accessToken;
        if (token) {
          let obj = {
            userData: userData.data,
            token: token
          }
          localStorage.setItem("e-commerce", JSON.stringify(obj))
          alert("Login success");

          navigate("/userHomePage");
        } else {
          console.log("Token not found");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400 || error.response?.status === 404) {
        let mssg = error.response?.data?.message || "something went wrong, please try again later";
        alert(mssg);
      }
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function pwForgot() {
    navigate("/user/ForgotPw");
  }

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="container-login lg-12">
        <div className="login-content" md={5}>
          <img
            className="loginImg"
            src="https://c8.alamy.com/comp/H4BEGR/shopping-cart-apple-iphone-6plus-symbolical-picture-consumption-H4BEGR.jpg"
            alt="Iphone Cart"
          />
        </div>
        <Form
          id="user-signup-form-input"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="login-form-flex-div">
            <Form.Group>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={userLoginData?.email}
                name="email"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="login-form-flex-div">
            <Form.Group style={{ position: "relative" }}>
              <div
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  position: "absolute",
                  top: "25px",
                  right: "34px",
                  zIndex: "100",
                }}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              <Form.Control
                required
                type={showPassword ? "text" : "password"}
                minLength={8}
                placeholder="Password"
                className="password-input-eye-btn-hide"
                name="password"
                onChange={handleChange}
                value={userLoginData.password}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter at least 8 characters.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="signup-form-flex-div">
            <Button className="user-login-btn" type="submit">
              Login
            </Button>
          </div>
          <div className="signup-form-flex-div">
            <Button onClick={pwForgot} className="user-forgot-btn">
              Forgot Password
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
