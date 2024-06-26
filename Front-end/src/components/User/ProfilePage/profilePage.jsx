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
import NavBar from "../../NavBar/navBar";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
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
                          <strong> {userData.firstName}
                          </strong>
                        </span>
                      </h5>
                      <h6><span style={{ fontFamily: "cursive" }}>{userData.email}</span></h6>

                    </>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="headings">
                  <h6 onMouseUp={HomePage}>Home</h6>
                  <h6>Contact</h6>
                  <h6>About</h6>
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
              <Col md={3}>
                <div className="userHomeSidebar">
                  <h5 className="userProfileExclusive">
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
                <div className="hrLine"></div>
              </Col>
              <Col lg={7}>
              </Col>
              <Col lg={1}>
                <div className="userHome-content2">
                  <h6>
                    <span style={{ color: "red" }}>Date:</span> {currDate}
                  </h6>
                  <h6>
                    <span style={{ color: "red" }}>Time:</span> {currTime}
                  </h6>
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

export default ProfilePage;
