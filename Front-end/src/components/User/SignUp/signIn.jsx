import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';

import "./signIn.css";
import NavBar from "../../NavBar/navBar";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "Kerala",
    nationality: "India",
    pincode: "",
    img: null,
  });

  const [validated, setValidated] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFilechange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  // form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.gender ||
      !userData.phoneNumber ||
      !userData.age ||
      !userData.street ||
      !userData.city ||
      !userData.state ||
      !userData.pincode ||
      !userData.nationality
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (userData.age < 18) {
        alert("Sorry, User's age must be 18 or above");
        return;
      }
      if (userData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }
      let phoneNumberReg = /^[0-9]{10}$/;
      if (!phoneNumberReg.test(userData.phoneNumber)) {
        alert("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(userData.email)) {
        alert("Invalid Email Address");
        console.log("Invalid email");
        return;
      }

      // if (!agreedToTerms) {
      //   alert("Please agree to the terms and conditions");
      //   console.log("Not checked");
      //   return;
      // }
      sendDataToServer(userData);
    }
  };

  const sendDataToServer = async () => {
    try {
      let res = await axios.post('http://localhost:3080/user/signUp', userData);
      if (response.status === 200) {
        console.log("user created successfully");
        alert("Login successful.");
        // setTimeout(() => {
          navigate("/user/Login");
        // }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400 || error.response?.status === 404) {
        let mssg=error.response?.data?.message || "something went wrong ,please try later";
        alert(mssg);
        } else {
        alert("Internal server error");
        setTimeout(() => {
          navigate("/user/ForgotPw");
        }, 1500);
      }
    }
  };


  // const redirectLogin = () => {
  //   navigate("/login");
  // };

  return (
    <>

      <NavBar />

      <Form
        id="user-signup-form-input"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >

        {/* <div className="container-flex"> */}
        {/* <div className="mainContent">
            <img
              className="imgs1"
              src="https://img.freepik.com/free-photo/black-friday-concept-with-smartphone-mouse-label-cart_23-2147695921.jpg"
              alt="Iphone Cart" />
          </div> */}
        {/* </div> */}
        <div className="signup-form-flex-div">
          <Form.Group >
            {/* <Form.Label>FirstName</Form.Label> */}
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={handleChange}
              value={userData?.firstName}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your first name!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              type="text"
              value={userData?.lastName}
              placeholder="Last name"
              name="lastName"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter your lastname.
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="signup-form-flex-div">
          <Form.Group>
            <Form.Control
              required
              as="select"
              type="select"
              name="gender"
              onChange={handleChange}
              value={userData?.gender}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select your gender.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={handleChange}
              name="age"
              value={userData?.age}
              type="number"
              placeholder="Your age"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter your age
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="signup-form-flex-div">
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

          <Form.Group >
            <Form.Control
              required
              type="phoneNumber"
              placeholder="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
              value={userData?.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your valid phoneNumber!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group >
            <Form.Control
              required
              type="street"
              placeholder="street"
              name="street"
              onChange={handleChange}
              value={userData?.street}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your street!
            </Form.Control.Feedback>
          </Form.Group>

        </div>

        <div className="signup-form-flex-div">

          <Form.Group>
            <Form.Control
              required
              type="city"
              value={userData?.city}
              placeholder="city"
              name="city"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter your city.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              required
              type="state"
              value={userData?.state}
              placeholder="state"
              name="state"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter your state.
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="signup-form-flex-div">
          <Form.Group >
            <Form.Control
              required
              type="pincode"
              placeholder="pincode"
              name="pincode"
              onChange={handleChange}
              value={userData?.pincode}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your pincode!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              type="nationality"
              value={userData?.nationality}
              placeholder="nationality"
              name="nationality"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter your nationality
            </Form.Control.Feedback>
          </Form.Group>
        </div>



        {/* </div> */}



        {/* <div className="signup-form-flex-div">
          <Form.Group className="position-relative mt-3">
            <Form.Label>Upload your photo (Square image) </Form.Label>
            <Form.Control
              onChange={handleFilechange}
              type="file"
              name="img"
              accept="image/*"
            />
          </Form.Group>
          <Form.Group className="mt-2 ms-3">
            <Form.Check
              required
              className="signup-check-box "
              feedbackType="invalid"
              checked={agreedToTerms}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="" className="ms-3">
              Agree to our{" "}
              <span
                className="text-primary"
                onClick={() => {
                  navigate("../terms");
                }}
              >
                {" "}
                terms and conditions{" "}
              </span>
            </label>
          </Form.Group>
        </div> */}

        <div className="signup-form-flex-div">
          <Button id="user-signup-btn" type="submit" >
            Sign Up
          </Button>
          {/* <Button onClick={redirectLogin} className="btn2" type="submit">Existing User? Log In</Button> */}
        </div>
        {/* <div className="signup-form-flex-div">
          <Button onClick={redirectLogin} className="user-signup-btn" type="submit">Existing User? Log In</Button>
        </div> */}
      </Form>
    </>
  );
};
export default SignUp;
