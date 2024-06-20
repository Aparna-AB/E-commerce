import { useNavigate } from "react-router-dom";
import "./cart.css";
import "../NavBar/navBar.css"
import NavBar from "../NavBar/navBar";
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";

function Cart() {
    return (
        <>
            <NavBar />
            <div className="content-container">
                <div className="cart-div1">
                    <img
                        className="image1"
                        src="https://c8.alamy.com/comp/H4BEGR/shopping-cart-apple-iphone-6plus-symbolical-picture-consumption-H4BEGR.jpg"
                        alt="Iphone Cart" />

                    {/* <Button variant="outline-light" >Add to wishlist</Button>{' '} */}
                    {/* <Button variant="warning" >Add to Cart</Button>{' '} */}
                </div>


                <div className="cart-div2">

                    <img
                        className="image1"
                        src="https://img.freepik.com/free-photo/black-friday-concept-with-smartphone-mouse-label-cart_23-2147695921.jpg"
                        alt="Iphone Cart" />
                    {/* <Button variant="warning" >Add to Cart</Button>{' '} */}
                </div>

                <div className="cart-div3">
                    <img
                        className="image1"
                        src="https://c8.alamy.com/comp/H4BEGR/shopping-cart-apple-iphone-6plus-symbolical-picture-consumption-H4BEGR.jpg"
                        alt="Iphone Cart" />
                    {/* <Button variant="warning" >Add to Cart</Button>{' '} */}

                </div>


                <div className="cart-div4">

                    <img
                        className="image1"
                        src="https://img.freepik.com/free-photo/black-friday-concept-with-smartphone-mouse-label-cart_23-2147695921.jpg"
                        alt="Iphone Cart" />
                    {/* <Button variant="warning" >Add to Cart</Button>{' '} */}
                </div>
            </div>
        </>
    );
}
export default Cart;
