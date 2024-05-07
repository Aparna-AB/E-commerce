import { FaChevronRight } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import ImageFrame from "../../assets/Images/Frame 560.png";
import Image1 from "../../assets/Images/g92-2-500x500 1.png";
import Image2 from "../../assets/Images/Frame 612.png";
import Image3 from "../../assets/Images/Frame 613.png";
import Image4 from "../../assets/Images/Frame 614.png";

import "./homePage.css";
import NavBar from "../NavBar/navBar";


function HomePage() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  let currDate = day + "/" + month + "/" + year;

  var hr = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  let currTime = hr + ":" + min + ":" + sec;
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="main">
        <Row>
          <Col>
            <Row>
              <Col md={3}>
                <div className="sideBar">
                  <h6>Woman's Fashion  <FaChevronRight /></h6><br />
                  <h6>Mens's Fashion  <FaChevronRight /></h6><br />
                  <h6>Electronics</h6><br />
                  <h6>Home & Lifestyle</h6><br />
                  <h6>Medicines</h6><br />
                  <h6>Sports & Outdoor</h6><br />
                  <h6>Baby's & Toys</h6><br />
                  <h6>Groceries & Pets</h6><br />
                  <h6>Health & Beauty</h6><br />
                </div>
                <div className="line"></div>

              </Col>

              <Col lg={8}>
                <div className="newCarousel">
                  <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                      <img className="d-block w-100"
                        src={ImageFrame}
                        alt="First Slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=1060&t=st=1712744105~exp=1712744705~hmac=94f28e473f7902933eb6e783ea085e7814a84e187bd2f5a4710e5e27a9b580b0"

                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://cdn.dribbble.com/users/13146396/screenshots/19578949/media/fef418d5eb07a2e751211df8f12acc51.jpg?resize=1000x750&vertical=center"
                        alt="Second slide"
                      />

                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-vector/hand-drawn-kids-toys-sale-banner_23-2149651210.jpg?w=1060&t=st=1712743832~exp=1712744432~hmac=0c2bd3d52c58a4054ae4d4948324de09bd771d5471e3842df6b812a4205086c0"
                        alt="Third slide"
                      />

                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://cdn.vectorstock.com/i/1000v/16/23/promo-sale-banners-templates-for-kids-clothes-vector-43261623.avif"
                        alt="Fourth slide"
                      />

                    </Carousel.Item>
                  </Carousel>
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
        <hr />
        <div className="content-2">
          <h5 style={{ color: "red", marginLeft: "110px", textDecoration: "underline" }}><strong>Today's</strong></h5>
          <Row>
            <Col>
              <Row style={{ marginLeft: "100px", marginTop: "30px" }}>
                <Col md={2}>
                  <h5><strong>Flash Sales</strong></h5>
                </Col>

                <Col md={2}>
                  <h6>Date:- {currDate}</h6>
                </Col>

                <Col md={2}>
                  <h6>Time:- {currTime}</h6>

                </Col>
              </Row>

              <Row style={{ marginTop: "50px" }}>
                <Col lg={12}>
                  <div className="imgDet1">

                    <div>
                      <div className="div1">
                        <img className="block1"
                          src={Image1}
                          alt="First Image"
                        />
                      </div>
                      <h6 style={{ marginLeft: "20px", marginTop: "10px" }}>HAVIT HV-G92 Gamepad</h6>
                    </div>

                    <div>
                      <div className="div1">
                        <img
                          className="block1"
                          src={Image2}
                          alt="Second Image"
                        />
                      </div>
                      <h6 style={{ marginLeft: "20px", marginTop: "10px" }}>AK-900 Wired Keyboard</h6>

                    </div>

                    <div>
                      <div className="div1">
                        <img
                          className="block1"
                          src={Image3}
                          alt="Third Image"
                        />
                      </div>
                      <h6 style={{ marginLeft: "20px", marginTop: "10px" }}>IPS LCD Gaming Monitor</h6>

                    </div>

                    <div>
                      <div className="div1">
                        <img
                          className="block1"
                          src={Image4}
                          alt="Fourth Image"
                        />
                      </div>
                      <h6 style={{ marginLeft: "20px", marginTop: "10px" }}>S-Series Comfort Chair</h6>

                    </div>

                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

      </div>
    </>

  );
}
export default HomePage;