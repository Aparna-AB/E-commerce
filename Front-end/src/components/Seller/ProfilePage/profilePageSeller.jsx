import { FaChevronRight } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch, BsHeart } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import axios from "axios";
import "./profilePageSeller.css";
import Footer from "../../Footer/footer";
import NavBar from "../../NavBar/navBar";
import ProductsList from "../../Products/productsList";

function ProfilePageSeller() {
    const [sellerData, setSellerData] = useState(null);
    const navigate = useNavigate();
    // const todos = useSelector((state) => state.todo.eCommerceTodos);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currDate = `${day}/${month}/${year}`;

    const hr = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const currTime = `${hr}:${min}:${sec}`;

    useEffect(() => {
        const storedSellerData = JSON.parse(localStorage.getItem("ecommerce-sellerData")) || null;
        console.log("stored seller data", storedSellerData);
        const token = localStorage.getItem("ecommerce-seller-token") || null;
        const sellerId = storedSellerData?._id || null;

        if (token && sellerId) {
            getSellerData(token, sellerId);
        } else {
            setSellerData(null);
        }
    }, []);

    const getSellerData = async (token, sellerId) => {
        console.log("token", token, "sellerId", sellerId);
        try {
            const res = await axios.get(`http://localhost:3080/seller/${sellerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("resp", res.data.data);
            const data = res.data.data;
            if (data) {
                console.log("Data", data);
                setSellerData(data);
            } else {
                console.log("Seller data not found");
            }
        } catch (error) {
            console.error("Error on get seller data", error);
            if (error.response?.status === 404 || error.response?.status === 500) {
                alert("Seller not found");
            } else {
                alert("Something went wrong! Try again later");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("ecommerce-sellerData");
        localStorage.removeItem("ecommerce-seller-token");
        setSellerData(null);
        navigate('/HomePage');
    };

    const navigateHome = () => {
        navigate('/HomePage');
    };

    const navigateToProductsList = () => {
        navigate('/product/ProductsList');
    };
    const addProductDetails = () => {
        navigate('/seller/AddProductDetails');
    };

    const navigateToCart = () => {
        navigate('/cart');
    };

    return (
        <>
            <div className="sellerProfile-mainContainer">
                <Row>
                    <Col xs={12}>
                        <div className="sellerProfileHeader">
                            <p>
                                Summer Sale off is here up to 40% for all products and Free
                                Express Delivery!!!! &nbsp; <strong>Shop Now</strong>
                            </p>
                        </div>
                        <Row>
                            <Col md={3}>
                                <div className="sellerMainContent">
                                    {sellerData?.name && (
                                        <>
                                            <h5 style={{ fontFamily: "cursive" }}>
                                                Welcome,
                                                <span style={{ color: "blue", textTransform: "capitalize" }}>
                                                    <strong> {sellerData.name}</strong>
                                                </span>
                                            </h5>
                                            <h6>
                                                <span style={{ fontFamily: "cursive" }}>{sellerData.email}</span>
                                            </h6>
                                        </>
                                    )}
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="headings">
                                    <h6 onMouseUp={navigateHome}>Home</h6>
                                    <h6>Contact</h6>
                                    <h6>About</h6>
                                    <h6 onMouseUp={navigateToProductsList}>Products</h6>
                                    <h6 onMouseUp={addProductDetails}>Add Product</h6>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div>
                                    <form>
                                        <input type="text" className="headings2" placeholder="What are you looking for?" />
                                        <BsSearch className="icon1" />
                                    </form>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="icons">
                                    <BsHeart className="icon2" />
                                    <GrCart className="icon3" onMouseUp={navigateToCart} />
                                    <button
                                        className="logout"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </Col>
                            <hr />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="sellerHome-div">
                <Row>
                    <Col>
                        <Row>
                            {/* <Col md={3}> */}
                            {/* <div className="sellerHomeSidebar">
                                    <h5 className="sellerProfileExclusive">
                                        <strong><u>Exclusives</u></strong>
                                    </h5><br />
                                    <h6>
                                        Woman's Fashion <FaChevronRight />
                                    </h6>
                                    <br />
                                    <h6>
                                        Men's Fashion <FaChevronRight />
                                    </h6>
                                    <br />
                                    <h6>Electronics</h6>
                                    <br />
                                    <h6>Home & Lifestyle</h6>
                                    <br />
                                    <h6>Medicines</h6>
                                    <br />
                                    <h6>Sports & Outdoor</h6>
                                    <br />
                                    <h6>Baby's & Toys</h6>
                                    <br />
                                    <h6>Groceries & Pets</h6>
                                    <br />
                                    <h6>Health & Beauty</h6>
                                    <br />
                                </div>
                                <div className="hrLine"></div> */}
                            {/* </Col> */}
                            {/* <div className="sellerHome-content2">
                                    <h6>
                                        <span style={{ color: "red" }}>Date:</span> {currDate}
                                    </h6>
                                    <h6>
                                        <span style={{ color: "red" }}>Time:</span> {currTime}
                                    </h6>
                                </div>
                                */}
                            <Col lg={12}>

                                <div className="productListView">
                                    <ProductsList />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default ProfilePageSeller;
