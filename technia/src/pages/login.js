import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fnum, setFnum] = useState();
  const [snum, setSnum] = useState();
  const [cemail, setCemail] = useState();
  const [checked, setChecked] = useState(false);
  const [cookies, setCookie] = useCookies(["rememberme"]);
  const remember = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setFnum(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
    setSnum(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
  }, []);

  const Logins = () => {
    // e.preventDefault();
    const email = document.getElementById("email").value;
    // alert(email);
    const password = document.getElementById("password").value;
    // alert(password);
    const captcha = document.getElementById("captcha").value;
    // alert(captcha);

    const result = fnum + snum;

    axios
      .post("https://technia-city-backend.onrender.com/api/login", {
        LEmail: email,
        LPassword: password,
      })
      .then((response) => {
        console.log(response);
        if (email === "" && password === "") {
          toast.error("Please Enter all details");
        } else if (response.data.message) {
          toast.error(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          // alert(response.data.message);
        } else if (captcha != result) {
          toast.error("Wrong Captcha");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          let obj = {
            email: response.data.result[0].r_email,
            id: response.data.result[0].r_id,
            name: response.data.result[0].r_name,
          };
          sessionStorage.setItem("jwt_token", response.data.auth);
          sessionStorage.setItem("tbl_u_reg", JSON.stringify(obj));
          toast.success("Login Successfully");
          setTimeout(() => {
            window.location.reload();
            window.location = "/";
          }, 1000);

          if (checked) {
            setCookie("name", email);
            setCookie("password", password);
          }
        }
      });
  };

  return (
    <div>
      <div class="w3l-breadcrumbs">
        <nav id="breadcrumbs" class="breadcrumbs">
          <div style={{ float: "left" }} class="container page-wrapper">
            <Link style={{ float: "left" }} to="/">
              Home{" "}
            </Link>{" "}
            <span
              style={{ float: "left" }}
              class="breadcrumb_last"
              aria-current="page"
            >
              » Login
            </span>
          </div>
        </nav>
      </div>
      <section class="w3l-contact-1">
        <div class="contacts-9 py-5">
          <div class="container py-lg-4">
            <div class="headerhny-title text-center">
              <h3 class="hny-title mb-0">Login</h3>
            </div>
            <div class="contact-view mt-lg-5 mt-4">
              <div class="conhny-form-section">
                <form class="formhny-sec">
                  <div class="form-grid">
                    <br />
                    <div class="form-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email *"
                        {...register("email", {
                          required: "Please enter Email",
                        })}
                        onChange={(e) => setCemail(e.target.value)}
                      />
                      {errors.email && (
                        <small class="text-danger float-left mt-1 mb-3">
                          {errors.email.message}
                        </small>
                      )}
                    </div>
                    <br />

                    <div class="form-input">
                      {cemail === cookies.name ? (
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={cookies.password}
                          placeholder="Enter your password *"
                        />
                      ) : (
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password *"
                          {...register("password", {
                            required: "Please enter Password",
                          })}
                          {...(errors.password && (
                            <small class="text-danger float-left mt-1">
                              {errors.password.message}
                            </small>
                          ))}
                        />
                      )}
                    </div>
                    <br />
                    <div class="form-input text-left">
                      {"Addition of " + fnum + "+" + snum + ":"}&nbsp;&nbsp;
                      <input
                        class="col-md-3"
                        type="text"
                        name="captcha"
                        id="captcha"
                        placeholder="Enter Captcha *"
                        {...register("captcha", {
                          required: "Please enter Captcha",
                        })}
                      />
                      {errors.captcha && (
                        <small class="text-danger float-left mt-1">
                          {errors.captcha.message}
                        </small>
                      )}
                    </div>
                    <br />
                  </div>
                  <div class="form-input">
                    <input
                      style={{ width: "13px", height: "29px" }}
                      type="checkbox"
                      id="checkbox"
                      onChange={remember}
                    />

                    <label class="form-check-label" for="exampleCheck1">
                      &nbsp;&nbsp;Remember me
                    </label>
                  </div>
                  <br />
                  <div class="md-sm-flex justify-content-between">
                    <Link
                      to="/forgotpassword"
                      class="col-md-6 text-sm-left text-center ml-n3"
                    >
                      <small>forget password ?</small>
                    </Link>

                    <div class="submithny text-right">
                      <div class="already-account text-right">
                        <Link to="/register">New user?</Link>
                      </div>
                      <br />
                      <button
                        class="btn read-button text-right"
                        onClick={handleSubmit(Logins)}
                      >
                        Login
                      </button>
                    </div>
                    <h2></h2>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
