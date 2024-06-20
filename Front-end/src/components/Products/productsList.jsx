import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import axios from "axios";
import "./products.css";
import NavBar from "../NavBar/navBar";

function ProductsList() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            let res = await axios.get("https://fakestoreapi.com/products/")
            console.log("res");
            setUsers(res.data);
        } catch (error) {
            console.error("error occured", error);
        }
    };

    function redirectUserDetails(id) {
        navigate("/ProductsDetails/" + id)
    }

    return (
        <>
<NavBar />
            <div>
                {/* <h1>Products</h1> */}

            </div>
            <div className="productOrder">
                {users.length === 0 && <h2> Data loading..</h2>}
                {users.map((user, index) => {
                    console.log("user", user);

                    return (
                        <div key={index} className="card" style={{ width: "18rem", border: "1px solid transparent" }}>
                            <img src={user.image}
                                alt="Card image cap"
                                className=" card-img-top images"
                                onMouseUp={() => {
                                    redirectUserDetails(user.id);
                                }} />
                            <div class="card-body">
                                <h6 className="card-title" style={{ color: "blue" }}>Title: {user.title}</h6>
                                <br />
                               
                                <Button variant="primary" 
                                className="b1"
                                onClick={() => {
                                    addToCart();
                                }}>Add to Cart {""}
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="warning" 
                                className="b2"
                                onClick={() => {
                                    wishlist();
                                }}>Add to Wishlist {""}
                                </Button>

                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ProductsList;

