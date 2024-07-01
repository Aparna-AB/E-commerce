import { useState } from "react";
import NavBar from "../../NavBar/navBar";
import { Button, Form, Col, Row } from "react-bootstrap"; // Import Col and Row from react-bootstrap
import "./sellerLogin.css";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Footer from "../../Footer/footer";
import axios from "axios";

function SellerLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const [sellerLoginData, setSellerLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSellerLoginData({ ...sellerLoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (!sellerLoginData.email || !sellerLoginData.password) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!isValidEmail(sellerLoginData.email)) {
        alert("Invalid Email Address");
        console.log("Invalid email");
        return;
      }
      sendLoginDataToServer(sellerLoginData);
    }
  };

  const sendLoginDataToServer = async (data) => {
    if (sellerLoginData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3080/seller/sellerLogin', data);
      if (response.status === 200) {
        console.log("Seller created successfully");
        navigate("/seller/ProfilePageSeller");

        let sellerData = response.data.data;
        let token = response.data.accessToken;
        console.log("seller token",token);

        localStorage.setItem("ecommerce-sellerData", JSON.stringify(sellerData))
        localStorage.setItem("ecommerce-seller-token", token)
        console.log("Seller data", sellerData)
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400 || error.response?.status === 404) {
        let mssg =
          error.response?.data?.message ||
          "something went wrong, please try later";
        alert(mssg);
      } else {
        alert("Internal server error");
        setTimeout(() => {
          navigate("/user/ForgotPw");
        }, 1500);
      }
    }finally {
      setSellerLoginData({ email: "", password: "" });
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
      <div className="container-sellerLogin">
        <Row>
          <Col md={5}>
            <div className="seller-login-content">
              <img
                className="sellerLoginImg"
                src="https://c8.alamy.com/comp/H4BEGR/shopping-cart-apple-iphone-6plus-symbolical-picture-consumption-H4BEGR.jpg"
                alt="Iphone Cart"
              />
            </div>
          </Col>
          <Col md={7}>
            <Form
              id="seller-form-input"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Group as={Row} className="seller-txt1">
                {/* <Form.Label className="lab1" column>Email</Form.Label> */}
                <Col>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    value={sellerLoginData?.email}
                    name="email"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter valid email.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="seller-txt2">
                {/* <Form.Label className="lab1" column>Password</Form.Label> */}
                <Col>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        cursor: "pointer",
                        position: "absolute",
                        top: "5px",
                        right: "25px",
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
                      value={sellerLoginData.password}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please Enter at least 8 characters.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <div className="signup-form-flex-div">
                <Button className="sellerLogBtn" type="submit">
                  Login
                </Button>
              </div>
              <div className="signup-form-flex-div">
                <Button
                  onClick={pwForgot}
                  className="sellerforgotBtn"
                >
                  Forgot Password
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
export default SellerLogin;
