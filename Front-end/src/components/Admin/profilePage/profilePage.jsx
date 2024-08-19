import { FaChevronRight } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch, BsHeart } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import axios from "axios";
import "./profilePage.css";
import Footer from "../../Footer/footer";
import NavBar from "../../NavBar/navBar";
import ProductsList from "../../Products/productsList";

function AdminProfilePage() {
    const [adminData, setAdminData] = useState(null);
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
    
    
    const navigateHome = () => {
        navigate('/HomePage');
    };

    const navigateToProductsList = () => {
        navigate('/product/ProductsList');
    };
    const viewSellers = () => {
        navigate('/admin/sellersList');
    };
    const viewUsers = () => {
        navigate('/usersList');
    };
    const handleLogout=()=>{
        navigate('/HomePage');
    };

    return (
        <>
            <div className="adminProfile">
                <Row>
                    <Col xs={12}>
                        <div className="adminHeader">
                            <p>
                                Summer Sale off is here up to 40% for all products and Free
                                Express Delivery!!!! &nbsp; <strong>Shop Now</strong>
                            </p>
                        </div>
                        <Row>
                            <Col md={3}>
                                <div className="adminMain">
                                    {adminData?.name && (
                                        <>
                                            <h5 style={{ fontFamily: "cursive" }}>
                                                Welcome Admin,
                                                <span style={{ color: "blue", textTransform: "capitalize" }}>
                                                    <strong> {adminData.name}</strong>
                                                </span>
                                            </h5>
                                            <h6>
                                                <span style={{ fontFamily: "cursive" }}>{adminData.email}</span>
                                            </h6>
                                        </>
                                    )}
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className="headings">
                                    <h6 onMouseUp={navigateHome}>Home</h6>
                                    <h6>Contact</h6>
                                    <h6>About</h6>
                                    <h6 onMouseUp={navigateToProductsList}>Products</h6>
                                    <h6 onMouseUp={viewSellers}>Sellers</h6>
                                    <h6 onMouseUp={viewUsers}>Users</h6>

                                </div>
                            </Col>
                           
                            <Col md={2}>
                                <h4 style={{marginTop:"30px",textDecoration:"underline"}}>Welcome ADMIN</h4>

                            </Col>
                            <Col md={1} >
                            <button
                    className="logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                            </Col>
                            <hr />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="adminHome-div">
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
                            <div className="adminHome-content2">
                                    <h6>
                                        <span style={{ color: "red" }}>Date:</span> {currDate}
                                    </h6>
                                    <h6>
                                        <span style={{ color: "red" }}>Time:</span> {currTime}
                                    </h6>
                                </div>
                               
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

export default AdminProfilePage;
