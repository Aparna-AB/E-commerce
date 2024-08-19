import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Footer from "../../Footer/footer";
import axios from 'axios';
import NavBar from "../../NavBar/navBar";
import "./addProductDetails.css";
// import "../ProfilePage/profilePageSeller";

const AddProductDetails = () => {
    const navigate = useNavigate();
    const [addProductData, setAddProductData] = useState({
        name: "",
        title: "",
        description: "",
        quantity: "",
        price: "",
        sellerId: "",
        expDate: "",
        // productImg:"",
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        setAddProductData({ ...addProductData, [e.target.name]: e.target.value });
    };

    const handleFilechange = (e) => {
        setAddProductData({ ...addProductData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (
            !addProductData.name ||
            !addProductData.title ||
            !addProductData.description ||
            !addProductData.quantity ||
            !addProductData.price ||
            !addProductData.sellerId ||
            !addProductData.expDate
            // !addProductData.productImg
        ) {
            console.log("Please fill all the fields");
            return;
        } else {
            sendDataToServer(addProductData);
        }
    };

    const sendDataToServer = async () => {
        try {
            let res = await axios.post('http://localhost:3080/products/addProduct', addProductData);
            if (res.status === 200) {
                alert("New Product added successfully.");
                setTimeout(() => {
                    navigate("/product/ProductsList");
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400 || error.response?.status === 404) {
                let mssg = error.response?.data?.message || "something went wrong ,please try later";
                alert(mssg);
            }
        }
    };

    return (
        <>
            <NavBar />
            <div>
                <Row className="align-items-center">
                    <Col md={6} className="addProduct-mainContent">
                        <img
                            src="https://framerusercontent.com/images/zuwlr8Qsdm3t0ewZTCqlX69DMc.jpg"
                            alt="Cart"
                        />
                    </Col>
                    <Col md={5}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            className="addProductForm"
                        >
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={addProductData.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your product name!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    onChange={handleChange}
                                    name="title"
                                    value={addProductData.title}
                                    type="text"
                                    placeholder="Product Title"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter product title
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product Description"
                                    name="description"
                                    onChange={handleChange}
                                    value={addProductData.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter product description!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product Quantity"
                                    name="quantity"
                                    onChange={handleChange}
                                    value={addProductData.quantity}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter quantity of products required!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product price"
                                    name="price"
                                    onChange={handleChange}
                                    value={addProductData.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter product price.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="seller Id"
                                    name="sellerId"
                                    onChange={handleChange}
                                    value={addProductData.sellerId}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid sellerId.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder="Enter the expiry date of product"
                                    name="expDate"
                                    onChange={handleChange}
                                    value={addProductData.expDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter product expiry.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* <Form.Group>
                                <Form.Control
                                    required
                                    type="file"
                                    placeholder="Enter the price"
                                    name="productImg"
                                    onChange={handleFilechange}
                                    value={addProductData.productImg}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please upload the product image.
                                </Form.Control.Feedback>
                            </Form.Group> */}

                            <Button id="addProduct-btn" type="submit">
                                Add Product
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

export default AddProductDetails;
