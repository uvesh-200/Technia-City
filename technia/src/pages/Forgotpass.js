import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Forgotpass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Forgot = (e) => {
    const email = document.getElementById("email").value;
    axios
      .post("http://localhost:1234/api/forgotpass", {
        Email: email,
      })
      .then((resp) => {
        if (resp.data.message) {
          toast.error(resp.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.success("Email Sent to your registered Email Id");
          setTimeout(() => {
            window.location.reload();
            window.location = "/login";
          }, 1000);
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
              » Forgot Password
            </span>
          </div>
        </nav>
      </div>
      <section class="w3l-contact-1">
        <div class="contacts-9 py-5">
          <div class="container py-lg-4">
            <div class="headerhny-title text-center">
              <h3 class="hny-title mb-0">Forgot Password</h3>
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
                      />
                      {errors.email && (
                        <h6 class="text-danger float-left mt-1 mb-3">
                          {errors.email.message}
                        </h6>
                      )}
                    </div>
                    <br />

                    <button
                      class="btn read-button text-right"
                      onClick={handleSubmit(Forgot)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgotpass;
