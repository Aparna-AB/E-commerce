import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
// import NavBar from "../NavBar/navBar";
import "./products.css";

function ProductsList() {
    const navigate = useNavigate();
    const [viewProduct, setViewProduct] = useState([]);

    useEffect(() => {
        getProductList();
    }, []);

    const getProductList = async () => {
        try {
            let res = await axios.get("http://localhost:3080/products/viewProducts");
            console.log("response", res);

            let prdctData = res.data.data;
            if (prdctData) {
                console.log("List of all products", prdctData);
                setViewProduct(prdctData);
            } else {
                console.log("Products not found");
            }
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    const redirectProductDetails = (id) => {
        navigate("/product/ProductsDetails/" + id);
    };
const handleBack=()=>{
    navigate('/seller/AddProductDetails');
};
    // const addToCart = (id) => {
    //     navigate('/cart');
    // };

    // const wishlist = (id) => {
        // Add to wishlist logic here
    // };

    return (
        <>
            {/* <NavBar /> */}
            {/* <div>
            <Button variant="primary"className="back" onClick={handleBack}>Back</Button>

            </div> */}
            <br/>
            <div className="productOrder">
                {viewProduct.length === 0 && <h2>Data loading...</h2>}
                {viewProduct.map((product) => (
                    <div key={product._id} className="card" style={{ width: "18rem", border: "1px solid transparent" }}>
                        <img
                            src={product.productImg}
                            alt="Product"
                            className="card-img-top images"
                            onClick={() => redirectProductDetails(product._id)}
                        />
                        <div className="card-body">
                            <h5 style={{ fontFamily:"monospace" }}>
                                Name: <span style={{ color: "blue", textTransform: "capitalize" }}><strong>{product.name}</strong></span>
                            </h5>
                            <h6>Title: <span style={{ fontFamily: "cursive" }}>{product.title}</span></h6>
                            <h6 className="card-text">Description: 
                               &nbsp; <span style={{ color: "blue",fontFamily:"monospace" }}>{product.description}</span>
                            </h6>
                            {/* <Button
                                variant="primary"
                                className="b1"
                                onClick={() => addToCart(product._id)}
                            >
                                Add to Cart
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                variant="warning"
                                className="b2"
                                onClick={() => wishlist(product._id)}
                            >
                                Add to Wishlist
                            </Button> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductsList;
