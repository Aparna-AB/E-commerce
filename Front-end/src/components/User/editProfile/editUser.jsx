import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./editUser.css";

export const EditProfile = () => {
  const navigate = useNavigate();

    const [userEdit, setUserEdit] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        email: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        nationality: ""
    });

    const [userId, setUserId] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("ecommerce-userData")) || null;
        if (!userData || !userData?._id) {
            // Navigate to login page or handle unauthorized access
            return;
        }
        setUserId(userData?._id);
        // Prepopulate the form with user data
        setUserEdit({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            gender: userData.gender || "",
            age: userData.age || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            street: userData.street || "",
            city: userData.city || "",
            state: userData.state || "",
            pincode: userData.pincode || "",
            nationality: userData.nationality || ""
        });
    }, []);

    console.log("user id", userId);

    const handleChange = (e) => {
        setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);
        // if (userEdit.age < 18) {
        //     alert("You must be at least 18 years old.");
        //     return;
        // }
        navigate("/user/homePage");


        sendDataToServer();
    };

    const sendDataToServer = async () => {
        try {
            const res = await axios.patch(`http://localhost:3080/user/${userId}`, userEdit);
            console.log("response", res);
            if (res.status === 200) {
                alert("Profile updated successfully!");
                // navigate to profile page or handle post-update actions
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="mx-auto">
            <h1><u>Update Profile</u></h1><br />
            <Form className="mx-auto" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col lg={5} style={{ marginLeft: "50px" }}>
                        <h6>First Name</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                placeholder="First Name"
                                value={userEdit.firstName}
                            />
                        </Form.Group>
                        <br />

                        <h6>Email</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={userEdit.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />

                        <h6>Street</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="street"
                                placeholder="Street"
                                value={userEdit.street}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />

                        <h6>State</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="state"
                                placeholder="State"
                                value={userEdit.state}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />

                        <h6>Nationality</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="nationality"
                                placeholder="Nationality"
                                value={userEdit.nationality}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />


                    </Col>

                    <Col lg={5} style={{ marginLeft: "50px" }}>

                        <h6>Last Name</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                value={userEdit.lastName}
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />

                        <h6>Age</h6>
                        <Form.Group>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Age"
                                name="age"
                                value={userEdit.age}
                                onChange={handleChange}
                            />

                        </Form.Group>
                        <br />

                        <h6>Mobile</h6>

                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={userEdit.phoneNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />

                        <h6>City</h6>

                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="city"
                                placeholder="City"
                                value={userEdit.city}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />

                        <h6>Pincode</h6>

                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={userEdit.pincode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br />
                    </Col>
                </Row>

                <Button type="submit" className="updateBtn">Save Changes</Button>
            </Form>
        </div>
    );
};
