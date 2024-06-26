import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import "./navBar.css";
// import ProductsList from "../Products/productsList";
// import Cart from "../Cart/cart";

export default function NavBar() {
    const navigate = useNavigate();

    function SignUp() {
        navigate('/user/SignUp');
    }

    function Login() {
        navigate('/user/Login');
    }

    function ProductsList() {
        navigate('/product/ProductsList');
    }

    function HomePage() {
        navigate('/HomePage');
    }

    function Cart() {
        navigate('/Cart');
    }

    return (
        <div className="mainContainer">
            <Row>
                <Col xs={12}>
                    <div className="topHeader">
                        <p>
                            Summer Sale off is here upto 40% for all products and Free
                            Express Delivery!!!! &nbsp; <strong>Shop Now</strong>{" "}
                        </p>
                    </div>
                    <Row>
                        <Col md={3}>
                            <h4 className="exclusive">
                                <strong>Sale upTo 70%</strong>
                            </h4>
                        </Col>
                        <Col lg={5}>
                            <div className="headings">
                                <h6 onMouseUp={HomePage}>Home</h6>
                                <h6>Contact</h6>
                                <h6>About</h6>
                                <h6 onMouseUp={ProductsList}>Products</h6>
                                <h6 onMouseUp={SignUp}>Sign Up</h6>
                                <h6 onMouseUp={Login}>Login</h6>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div>
                                {/* <p className="headings2" > What are you looking for?
                                    <BsSearch className="icon1" />
                                </p> */}
                                <form>
                                    <input type="text" className="headings2" placeholder="What are you looking for?" />
                                    <BsSearch className="icon1" />
                                </form>
                            </div>

                        </Col>
                        <Col md={1}>
                            <div className="icons">
                                <BsHeart className="icon2" />
                                <GrCart className="icon3" onMouseUp={Cart} />
                            </div>
                        </Col>
                        <hr />
                    </Row>

                </Col>
            </Row>
        </div>
    );
}
