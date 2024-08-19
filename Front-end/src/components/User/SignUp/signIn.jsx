import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import "./signIn.css";
import NavBar from "../../NavBar/navBar";
import Footer from "../../Footer/footer";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const [myFile,setMyFile]=useState(null);
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
    profilePic: null,
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
      !userData.nationality ||
      !userData.profilePic
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (userData.age < 10) {
        alert("Sorry, User's age must be 10 or above");
        return;
      } if (!userData.profilePic) {
        alert("Please select a file");
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
      const formData = new FormData();
      formData.append("profilePic", userData.profilePic);
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("gender", userData.gender);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("age", userData.age);
      formData.append("street", userData.street);
      formData.append("city", userData.city);
      formData.append("state", userData.state);
      formData.append("pincode", userData.pincode);
      formData.append("nationality", userData.nationality);


      sendDataToServer(formData);
    }
  };

  const sendDataToServer = async (formData) => {
    try {
      let res = await axios.post('http://localhost:3080/user/signUp', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        console.log("user created successfully");
        alert("SignUp successful.");
        // setTimeout(() => {
        navigate("/user/Login");
        // }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400 || error.response?.status === 404) {
        let mssg = error.response?.data?.message || "something went wrong ,please try later";
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
              type="number"
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
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
              value={userData?.nationality}
              placeholder="nationality"
              name="nationality"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter your nationality
            </Form.Control.Feedback>
          </Form.Group>
        </div><br />
        <div className="signup-form-flex-div">
          <Form.Group>
            <Form.Control
              required
              type="file"
              // value={userData?.profilePic}
              placeholder="Profile Picture"
              name="profilePic"
              onChange={handleFilechange}
            />
            <Form.Control.Feedback type="invalid">
              Add Your Profile Picture
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="signup-form-flex-div">
          <Button id="user-signup-btn" type="submit" >
            Sign Up
          </Button>
          {/* <Button onClick={redirectLogin} className="btn2" type="submit">Existing User? Log In</Button> */}
        </div>

      </Form>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default SignUp;
