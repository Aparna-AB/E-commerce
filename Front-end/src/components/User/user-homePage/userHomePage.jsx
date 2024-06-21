import { FaChevronRight } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import "./userHomePage.css";
import NavBar from "../../NavBar/navBar";

function UserHomePage() {
  const [userData, setUserData] = useState(null);
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
      // todo => correct api

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
        alert("something went wrong!! Try again later");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("e-commerce");
    localStorage.removeItem("power-token");

    setUserData(null);
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="userHome-div">
        <Row>
          <Col>
            <Row>
              <Col md={3}>
                <div className="userHomeSidebar">
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
              <Col lg={8}>
                <div className="userMainContent">
                  {/* {todos.map((todo) => (
                    <div style={{ display: "flex" }} key={todo.id}>
                      <h5 style={{ marginRight: "20px" }}>({todo.firstName})</h5>
                      <h5 style={{ marginRight: "20px" }}>{todo.email}</h5>
                    </div>
                  ))} */}
                  {userData?.firstName ? (
                    <div>
                      <h5>{userData.firstName}</h5>
                      {/* <h5>{userData.email}</h5> */}

                      <button
                        onClick={() => {
                          handleLogout();
                          setUserData(null);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
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
    </>
  );
}

export default UserHomePage;
