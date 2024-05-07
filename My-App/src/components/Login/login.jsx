import { useState } from "react";
import NavBar from "../NavBar/navBar";
import { Button, Form } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function Login() {
    const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const [userData, setUserData] = useState({
   
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (
     
      !userData.email ||
      !userData.password 
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
     
      if (!isValidEmail(userData.email)) {
        alert("Invalid Email Address");
        console.log("Invalid email");
        return;
      }
      sendDataToServer(userData);
    }
  };

  const sendDataToServer = async (data) => {
    if (userData.password.length < 8) {
      alert("Password must be atleast 8 characters long");
      return;
    }
    try {
      const response = await axiosMultipartInstance.post("/user/signup", data);
      if (response.status === 201) {
        console.log("user created successfully");
        alert("Registration successful.");
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

    // let [email, setEmail] = useState("");
    // let [password, setPassword] = useState("");

    // let realEm = "aparna@gmail.com";
    // let realPw = "aparna";

    // const changeEmail = (e) => {
    //     let em = e.target.value;
    //     setEmail(em);
    // }

    // const changePassword = (e) => {
    //     let pw = e.target.value;
    //     setPassword(pw);
    // }

    // function submit(event) {
    //     event.preventDefault();
    //     if (password === realPw && email === realEm) {
    //         alert("Login Successful");
    //     } else {
    //         alert("wrong Email and password");
    //     }
    // }
    function pwForgot(){
        navigate("/ForgotPw");
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
                    alt="Iphone Cart" />
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
            value={userData?.email}
            name="email"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter valid email.
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
            value={userData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter atleast 8 characters.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

    
      <div className="signup-form-flex-div">
        <Button className="user-login-btn" type="submit">
          Login
        </Button>
      </div>
      <div className="signup-form-flex-div">
        <Button onClick={pwForgot} className="user-forgot-btn" >Forgot Password</Button>
      </div>
    </Form>

            </div>

        </>
    );
}
export default Login;