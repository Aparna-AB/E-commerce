import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./products.css";
import NavBar from "../NavBar/navBar";

function ProductsDetails() {
    const { id } = useParams(id);
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        getProductDetails();
    }, []);


    const getProductDetails = async (id) => {
        try {
            let res = await axios.get(`http://localhost:3080/products/${id}` + id);
            setProductDetails(res);
        } catch (error) {
            console.log("error", error);
        }

    };
    console.log("id", productDetails);

    return (
        <>
        <NavBar />
            <div>
                <h1>Product Details</h1>
            </div>
            <div className="details">
                {!productDetails && <h1>Loading...</h1>}

                <div class="card" style={{ width: "18rem",border:"1px solid transparent" }}>
                    <img src={productDetails?.image} className="imgs" alt="Card image cap" />
                    <div class="card-body">
                        <h4 style={{color:"blue"}}>Price: {productDetails?.price}</h4>
                        <h5 className="card-title">Title: {productDetails?.title}</h5><br/>
                        <h6 className="card-text" style={{color:"orange"}}>
                        Name: {productDetails?.name}</h6>
                        <span style={{color:"grey"}}>Description: {productDetails?.description}</span>

                    </div>
                </div>
            </div>
        </>

    );
};
export default ProductsDetails;
