import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./products.css";
import NavBar from "../NavBar/navBar";

function ProductsDetails() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUser();
    }, []);


    const getUser = async () => {
        try {
            let res = await axios.get("https://fakestoreapi.com/products/" + id);
            setUserData(res.data);
        } catch (error) {
            console.log("error", error);
        }

    };
    console.log("id", userData);

    return (
        <>
        <NavBar />
            <div>
                <h1>Product Details</h1>
            </div>
            <div className="details">
                {!userData && <h1>Loading...</h1>}

                <div class="card" style={{ width: "18rem",border:"1px solid transparent" }}>
                    <img src={userData?.image} className="imgs" alt="Card image cap" />
                    <div class="card-body">
                        <h4 style={{color:"blue"}}>Price: {userData?.price}</h4>
                        <h5 className="card-title">Title: {userData?.title}</h5><br/>
                        <h6 className="card-text" style={{color:"orange"}}>
                        Category: {userData?.category}</h6>
                        <span style={{color:"grey"}}>Description: {userData?.description}</span>

                    </div>
                </div>
            </div>
        </>

    );
};
export default ProductsDetails;
