import { FaChevronRight } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import axios from "axios";
import "./profilePage.css";
import Footer from "../../Footer/footer";
import ImageFrame from "../../../assets/Images/Frame 560.png";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
    const userData = JSON.parse(localStorage.getItem("ecommerce-userData")) || null;
    const token = localStorage.getItem("ecommerce-token") || null;
    const userId = userData?._id || null;

    if (token && userId) {
      getUserData(token, userId);
    } else {
      setUserData(null);
    }
  }, []);

  const getUserData = async (token, userId) => {
    console.log("token", token, "userId ", userId);
    try {
      const res = await axios.get(`http://localhost:3080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("resp", res.data.data);
      const data = res.data.data;
      if (data) {
        console.log("Data", data);
        setUserData(data);
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error on get user data", error);
      if (error.response.status === 404 || error.response.status === 500) {
        alert("User not found");
      } else {
        alert("Something went wrong!! Try again later");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ecommerce-userData");
    localStorage.removeItem("ecommerce-token");
    setUserData(null);
    navigate('/');
  };

  const HomePage = () => {
    navigate('/');
  };

  const ProductsList = () => {
    navigate('/product/ProductsList');
  };

  const Cart = () => {
    navigate('/cart');
  };
  const handleEdit = () => {
    navigate('/user/editProfile');
  };

  return (
    <>
      <div className="userProfile-mainContainer">
        <Row>
          <Col xs={12}>
            <div className="userProfileHeader">
              <p>
                Summer Sale off is here upto 40% for all products and Free
                Express Delivery!!!! &nbsp; <strong>Shop Now</strong>
              </p>
            </div>
            <Row>
              <Col md={4}>
                <div className="userMainContent">
                  {userData?.firstName ? (
                    <>
                      <h5 style={{ fontFamily: "cursive" }}>Welcome ,
                        <span style={{ color: "blue", textTransform: "capitalize" }}>
                          <strong> {userData.firstName} {userData.lastName}
                          </strong>
                        </span>
                      </h5>

                    </>
                  ) : null}
                </div>
              </Col>
              <Col lg={2}>
                <div className="headings">
                  <h6 onMouseUp={HomePage}>Home</h6>
                  <h6 onMouseUp={ProductsList}>Products</h6>
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
                  <GrCart className="icon3" onMouseUp={Cart} />
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
      <div className="userHome-div">
        <Row>
          <Col>
            <Row>
              <Col md={2}>
                <div className="userHomeSidebar">
                  <h6>
                    <span style={{ color: "red" }}>Date:</span> {currDate}
                  </h6>
                  <h6>
                    <span style={{ color: "red" }}>Time:</span> {currTime}
                  </h6>
                  <br />

                  <h6 onClick={handleEdit}>
                    Edit Profile<FaChevronRight />
                  </h6>
                  <br />
                  <h5 className="userProfileExclusive">
                    <strong><u>Exclusives</u></strong>
                  </h5><br />
                  <h6>
                    Men's Fashion <FaChevronRight />
                  </h6>
                  <br />
                  <h6>Electronics</h6>
                  <br />
                  <h6>Home & Lifestyle</h6>
                  <br />
                  <h6>Baby's & Toys</h6>
                  <br />
                  <h6>Health & Beauty</h6>
                  <br />
                </div>
              </Col>

              <div className="hrLine"></div>

              {userData?.email ? (
                <>
                  <Col lg={3} style={{ marginLeft: "150px" }}>
                    <h6>Email:- <br />
                      <span style={{ color: "blue" }}>
                        {userData.email}</span></h6>

                    <h6 style={{ marginTop: "30px" }}>Mobile:- <br />
                      <span style={{ color: "blue" }}>
                        {userData.phoneNumber}</span></h6>
                  </Col>

                  <Col lg={4} style={{ marginLeft: "150px" }}>
                    <h6>Street:- <br />
                      <span style={{ color: "blue" }}>
                        {userData.street}</span></h6>

                    <h6 style={{ marginTop: "30px" }}>City:- <br />
                      <span style={{ color: "blue" }}>
                        {userData.city}</span></h6>
                  </Col>
                </>
              ) : null}

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

export default ProfilePage;
