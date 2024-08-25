import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function Login() {
  // const history = useNavigate();
  const Logincat = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios
      .post("https://technia-city-backend.onrender.com/api/adminlogin", {
        Email: email,
        Password: password,
      })
      .then((response) => {
        if (email === "" && password === "") {
          toast.error("Please Enter all details");
        } else if (response.data.message) {
          toast.error(response.data.message);
          // alert(response.data.message);
        } else {
          let obj = {
            email: response.data[0].a_email,
            id: response.data[0].a_id,
          };
          sessionStorage.setItem("tbl_a_admin", JSON.stringify(obj));
          toast.success("Login Successfully");
          // window.location = "/";
          setTimeout(() => {
            // history("/home");
            window.location = "/home";
          }, 1000);
        }
      });
  };

  return (
    <div class="bg-page py-5">
      <div class="container">
        <h2 class="main-title-w3layouts mb-2 text-center text-white">Login</h2>

        <div class="form-body-w3-agile text-center w-lg-50 w-sm-75 w-100 mx-auto mt-5">
          <form>
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter email *"
                id="email"
                required=""
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password *"
                id="password"
                required=""
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary error-w3l-btn mt-sm-5 mt-3 px-4"
              onClick={Logincat}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
