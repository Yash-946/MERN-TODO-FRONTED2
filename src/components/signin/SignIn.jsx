import React, { useState } from "react";
import "../signup/SignUp.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Index2";
import axios from "axios";

function SignUp() {
  // console.log("Signin Component render");
  const dispatch = useDispatch();
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://todoback-jb7c.onrender.com/api/v1/signin`,
        Inputs
      );
      // console.log(response.data);
      if (response.data) {
        sessionStorage.setItem("id", response.data.others._id);
        dispatch(authActions.login());
        history("/todo");
      } else {
        console.error("Response data or id not found in the response.");
      }
    } catch (error) {
      
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
            
          <div className=" col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none">
            <h1 className="text-center sign-up-heading">
              Sign <br />
              In
            </h1>
          </div>

          <div className="col-lg-8 column d-flex justify-content-center align-items-center  ">
          <div className="d-flex flex-column  w-100 p-3">
                <input
                  className="p-2  my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={Inputs.email}
                  onChange={change}
                />

                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={Inputs.password}
                  onChange={change}
                />

                <button className="btn-signup p-2" onClick={submit}>
                  Sign In
                </button>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
