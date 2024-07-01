import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fnum, setFnum] = useState();
  const [snum, setSnum] = useState();
  const [mail, setMail] = useState([]);

  useEffect(() => {
    setFnum(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
    setSnum(Math.floor(Math.random() * (10 - 1 + 1)) + 1);

    axios
      .get("http://localhost:1234/api/registeredemails")
      .then((res) => setMail(res.data));
  }, []);
  const mails = mail.map((val) => val.r_email);
  console.log(mails);
  const history = useNavigate();

  const Registers = (e) => {
    // e.preventDefault();
    const name = document.getElementById("name").value;
    // alert(name);
    const number = document.getElementById("number").value;
    // alert(number);
    const dob = document.getElementById("dob").value;
    // alert(dob);
    const email = document.getElementById("email").value;
    // alert(email);
    const password = document.getElementById("password").value;
    // alert(password);
    const captcha = document.getElementById("captcha").value;
    // alert(captcha);
    const result = fnum + snum;
    const numericRegex = /^[0-9]+$/;
    if (numericRegex.test(number.value)) {
      toast.error("Mobile number should contain only numeric characters");
    } else if (mails.includes(email)) {
      toast.error("sorry, this email is already registered with us");
    } else {
      const res = axios
        .post("http://localhost:1234/api/registration", {
          Name: name,
          Number: number,
          Dob: dob,
          Email: email,
          Password: password,
        })
        .then((resp) => {
          if (
            name === "" ||
            number === "" ||
            dob === "" ||
            email === "" ||
            password === ""
          ) {
            toast.error("Please Enter all details");
          } else if (captcha != result) {
            toast.error("Wrong Captcha");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            if (res || resp.status === 200 || resp.statusText === "OK") {
              toast.success("Registration Done Successfully");
              setTimeout(() => history("/login"), 1000);
            } else {
              toast.error("Something went wrong");
            }
          }
        });
    }
  };
  return (
    <>
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
              » Register
            </span>
          </div>
        </nav>
      </div>

      <section class="w3l-contact-1">
        <div class="contacts-9 py-5">
          <div class="container py-lg-4">
            <div class="headerhny-title text-center">
              <h3 class="hny-title mb-0">Registration</h3>
            </div>
            <div class="contact-view mt-lg-5 mt-4">
              <div class="conhny-form-section">
                <form class="formhny-sec">
                  <div class="form-grid">
                    <div class="form-input">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name *"
                        {...register("name", { required: "Please enter Name" })}
                      />
                      {errors.name && (
                        <h6 class="text-danger float-left mt-1 mb-3">
                          {errors.name.message}
                        </h6>
                      )}
                    </div>
                    <br />
                    <div class="form-input">
                      <input
                        type="number"
                        name="phone"
                        id="number"
                        placeholder="Enter your Phone Number *"
                        {...register("phone", {
                          required: "Please enter Phone Number",
                        })}
                        onChange={(e) => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                      />
                      {errors.phone && (
                        <h6 class="text-danger float-left mt-1 mb-3">
                          {errors.phone.message}
                        </h6>
                      )}
                    </div>
                    <br />
                    <div class="form-input">
                      <input
                        type="date"
                        name="date"
                        id="dob"
                        placeholder="Enter your Date of Birth *"
                        {...register("date", {
                          required: "Please enter Date of Birth",
                        })}
                      />
                      {errors.date && (
                        <h6 class="text-danger float-left mt-1 mb-3">
                          {errors.date.message}
                        </h6>
                      )}
                    </div>
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
                      />
                      {errors.email && (
                        <h6 class="text-danger float-left mt-1 mb-3">
                          {errors.email.message}
                        </h6>
                      )}
                    </div>
                    <br />
                    <div class="form-input">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password *"
                        {...register("password", {
                          required: "Please enter Password",
                        })}
                      />
                      {errors.password && (
                        <h6 class="text-danger float-left mt-1 mb-3">
                          {errors.password.message}
                        </h6>
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
                  </div>

                  <div class="submithny text-right">
                    <br />
                    <div class="already-account text-right">
                      <Link to="/login">Have account?</Link>
                    </div>
                    <br />
                    <button
                      class="btn read-button text-right"
                      onClick={handleSubmit(Registers)}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
