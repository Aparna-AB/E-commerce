import { useState } from "react";
import NavBar from "../NavBar/navBar";
import { Button } from "react-bootstrap";
import "./userOtp.css";
import { useNavigate } from "react-router-dom";



function UserOtp(){
return(
<>
<div>
        <NavBar />

        </div>
            <div className="containerOtp lg-12">
                <div className="cont" md={5}>
                     <img 
                   className="otpImg"
                   src="https://cdni.iconscout.com/illustration/premium/thumb/otp-authentication-security-5053897-4206545.png" 
                    alt="Iphone Cart" />
                </div>

                <div className="formOtp">
                    <h3 className="OtpHead">OTP</h3>
                    {/* <form onSubmit={submit} > */}

                        {/* &nbsp; &nbsp; &nbsp;<label>Enter Email/Mobile Number</label> */}
                        {/* <input type="text"
                            placeholder="Otp"
                            onChange={setOtp}
                            value={getOtp}
                            className="otpText"
                        /><p>{setUpdateOtp}</p>
                        <br /> */}


                        {/* <input  value="Login" className="sub" /> */}
                        {/* <Button variant="success" 
                        type="submit"
                                className="btnOtp"
                                onClick={getOtp}>OTP {""}
                                </Button> */}
                    {/* </form> */}
                </div>

            </div>

</>
);
}
export default UserOtp;