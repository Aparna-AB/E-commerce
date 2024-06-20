import { useState } from "react";
import NavBar from "../NavBar/navBar";
import { Button } from "react-bootstrap";
import "./forgotPw.css";
import { useNavigate } from "react-router-dom";

function ForgotPw() {
    const navigate = useNavigate();

    let [findOtp, setFindOtp] = useState("");
    // let [updateOtp,setUpdateOtp]=useState("");

    const changeEmail = (e) => {
        let otp = e.target.value;
        setFindOtp(otp);
    }


    function submit(event) {
        event.preventDefault();
        if (findOtp.length > 0) {
            alert("Otp send to email/number");
        } else {
            alert("wrong email/number");
        }
    }
    function getOtp() {
        navigate("/UserOtp");
    }

    return (
        <>
            <div>
                <NavBar />

            </div>
            <div className="container1 lg-12">
                <div className="cont" md={5}>
                    <img
                        className="forgotPwImg"
                        src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-pin-4571934-3805755.png"
                        alt="Iphone Cart" />
                </div>

                <div className="form1a">
                    <h3 className="forgotHead">Forgot Password??</h3>
                    <form onSubmit={submit} >

                        {/* &nbsp; &nbsp; &nbsp;<label>Enter Email/Mobile Number</label> */}
                        <input type="text"
                            placeholder="Email/Mobile Number"
                            onChange={changeEmail}
                            value={findOtp}
                            className="forgot-em-txt"
                        />
                        {/* <p>{setUpdateOtp}</p> */}
                        <br />


                        {/* <input type="submit" value="Get Otp" className="btnForgotpw" onClick={getOtp} /> */}
                        <Button variant="success" 
                        type="submit"
                                className="btnForgotpw"
                                onClick={getOtp}>Get OTP {""}
                                </Button>
                    </form>
                </div>

            </div>

        </>
    );
}
export default ForgotPw;