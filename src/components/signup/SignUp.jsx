import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // console.log("SignUp Component render");
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`https://todoback-jb7c.onrender.com/api/v1/register`, Inputs)
      .then((response) => {
        if (response.data.message === "User Already Exists") {
          alert(response.data.message);
        } else {
          // alert(response.data.message);
          // console.log(response.data.message);
          setInputs({
            email: "",
            username: "",
            password: "",
          });
          history("/signin");
        }
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center  ">
            <div className="d-flex flex-column w-100 p-3">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your email"
                onChange={change}
                value={Inputs.email}
              />

              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter Your username"
                onChange={change}
                value={Inputs.username}
              />

              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your password"
                onChange={change}
                value={Inputs.password}
              />

              <button className="btn-signup p-2" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>

          <div className=" col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none">
            <h1 className="text-center sign-up-heading">
              Sign <br />
              Up
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
