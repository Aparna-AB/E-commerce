import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Footer from "../../Footer/footer";
import axios from 'axios';

import "./signUp.css";
import NavBar from "../../NavBar/navBar";

const AdminSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        name: "Admin",
        email: "admin@gmail.com",
        password: "AdminAdmin",
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleFilechange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.files[0] });
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
            !adminData.name ||
            !adminData.email ||
            !adminData.password 
           
        ) {
            console.log("Please fill all the fields");
            return;
        } else {
            if (!isValidEmail(adminData.email)) {
                alert("Invalid Email Address");
                console.log("Invalid email");
                return;
            }

            sendDataToServer(adminData);
        }
    };

    const sendDataToServer = async () => {
        try {
            let res = await axios.post('http://localhost:3080/admin/signUp', adminData);
            if (res.status === 200) {
                // console.log("Seller created successfully");
                alert("Admin created successfully.");
                setTimeout(() => {
                    navigate("/admin/login");
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
                    <Col md={6} className="admin-mainContent">
                        <img
                            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714435200&semt=ais"
                            alt="Admin signUp"
                        />
                    </Col>
                    <Col md={5}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            className="admin-signUp"
                        >
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={adminData.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={adminData.email}
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
                                    value={adminData.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter at least 8 characters.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button id="admin-sign-up-btn" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div>
        <Footer />
      </div>
        </>
    );
};

export default AdminSignUp;
