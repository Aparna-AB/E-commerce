import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';

import "./sellerSignUp.css";
import NavBar from "../../NavBar/navBar";

const SellerSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [sellerData, setSellerData] = useState({
        name: "",
        age: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value });
    };

    const handleFilechange = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.files[0] });
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (
            !sellerData.name ||
            !sellerData.age ||
            !sellerData.email ||
            !sellerData.password ||
            !sellerData.phoneNumber ||
            !sellerData.address
        ) {
            console.log("Please fill all the fields");
            return;
        } else {
            if (sellerData.age < 18) {
                alert("Sorry, User's age must be 18 or above");
                return;
            }
            if (sellerData.phoneNumber.length !== 10) {
                console.log("Phone number must be 10 digits");
                return;
            }
            let phoneNumberReg = /^[0-9]{10}$/;
            if (!phoneNumberReg.test(sellerData.phoneNumber)) {
                alert("Phone number must be 10 digits");
                return;
            }
            if (!isValidEmail(sellerData.email)) {
                alert("Invalid Email Address");
                console.log("Invalid email");
                return;
            }

            sendDataToServer(sellerData);
        }
    };

    const sendDataToServer = async () => {
        try {
            let res = await axios.post('http://localhost:3080/seller/sellerSignUp', sellerData);
            if (res.status === 200) {
                // console.log("Seller created successfully");
                alert("seller created successfully.");
                setTimeout(() => {
                    navigate("/seller/SellerLogin");
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400 || error.response?.status === 404) {
                let mssg = error.response?.data?.message || "something went wrong ,please try later";
                alert(mssg);
            } 
            // else {
                // alert("Internal server error");
                // setTimeout(() => {
                //     navigate("/user/ForgotPw");
                // }, 1500);
            // }
        }
    };

    return (
        <>
            <NavBar />
            <div>
                <Row className="align-items-center">
                    <Col md={6} className="seller-mainContent">
                        <img
                            src="https://img.freepik.com/free-photo/black-friday-concept-with-smartphone-mouse-label-cart_23-2147695921.jpg"
                            alt="Iphone Cart"
                        />
                    </Col>
                    <Col md={5}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            className="seller-signUp-form"
                        >
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={sellerData.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    onChange={handleChange}
                                    name="age"
                                    value={sellerData.age}
                                    type="number"
                                    placeholder="Your age"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your age
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={sellerData.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your valid phone number!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    onChange={handleChange}
                                    value={sellerData.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your address!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={sellerData.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group style={{ position: "relative" }}>
                                <div
                                    style={{
                                        display: "inline-block",
                                        cursor: "pointer",
                                        position: "absolute",
                                        top: "6px",
                                        right: "32px",
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
                                    value={sellerData.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter at least 8 characters.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button id="seller-signup-btn" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default SellerSignUp;
