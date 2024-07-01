import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { Checkmark } from "react-checkmark";
import { toast } from "react-toastify";

function Profile() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [pass, setPass] = useState("");
  const [opass, setOpass] = useState("");
  const [npass, setNpass] = useState("");
  const [cpass, setCpass] = useState("");

  let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
  var id = user.id;

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/profile", { params: { Id: id } })
      .then((response) => {
        let obj = {
          id: response.data[0].r_id,
          name: response.data[0].r_name,
          number: response.data[0].r_number,
          email: response.data[0].r_email,
          dob: response.data[0].r_dob,
          password: response.data[0].r_password,
        };

        const isdate = new Date(obj.dob);
        const day = isdate.getDate().toString().padStart(2, "0");
        const month = (isdate.getMonth() + 1).toString().padStart(2, "0");
        const year = isdate.getFullYear().toString().slice();
        const formatdate = `${day}-${month}-${year}`;

        setName(obj.name);
        setNumber(obj.number);
        setDob(formatdate);
        setEmail(obj.email);
        setPass(obj.password);
      });
  });

  const updatePassword = (e) => {
    e.preventDefault();
    const newpass = npass;

    if (opass != pass) {
      toast.error("You enter wrong password");
    } else if (npass != cpass) {
      toast.error("Confirm password doesn't match");
    } else {
      axios
        .post("http://localhost:1234/api/updatepassword", {
          Newpass: newpass,
          id: id,
        })
        .then((resp) => {});
      toast.success("Password Updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
              » Profile
            </span>
          </div>
        </nav>
      </div>

      <div class="row">
        <div class="column col-md-6">
          <section class="w3l-contact-1">
            <div class="contacts-9 py-5">
              <div class="container py-lg-4">
                <div class="headerhny-title text-center">
                  <h3 class="hny-title mb-0">Profile</h3>
                </div>
                <div class="contact-view mt-lg-5 mt-4">
                  <div class="conhny-form-section">
                    <form class="formhny-sec">
                      <div class="form-grid">
                        <div class="form-input">
                          <h6 class="profile-input">Your Name: </h6>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            required
                            readOnly
                          />
                        </div>
                        <br />
                        <div class="form-input">
                          <h6 class="profile-input">Your Number: </h6>
                          <input
                            type="number"
                            name="w3lPhone"
                            id="number"
                            value={number}
                            required
                            readOnly
                          />
                        </div>
                        <br />
                        <div class="form-input">
                          <h6 class="profile-input">Your Date of Birth: </h6>
                          <input
                            name="w3lPhone"
                            id="dob"
                            value={dob}
                            readOnly
                          />
                        </div>
                        <br />
                        <div class="form-input">
                          <h6 class="profile-input">Your Email: </h6>
                          <input
                            type="email"
                            name="w3lSubject"
                            id="email"
                            value={email}
                            required
                            readOnly
                          />
                        </div>
                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="column col-md-6">
          <section class="w3l-contact-1">
            <div class="contacts-9 py-5">
              <div class="container py-lg-4">
                <div class="headerhny-title text-center">
                  <h3 class="hny-title mb-0">Change Password</h3>
                </div>
                <div class="contact-view mt-lg-5 mt-4">
                  <div class="conhny-form-section">
                    <form class="formhny-sec">
                      <div class="form-grid">
                        <br />
                        <div class="form-input te" style={{ display: "flex" }}>
                          {/* <h6 class="profile-input">Enter your Old Password: </h6> */}
                          <input
                            type="password"
                            name="w3lSender"
                            id="password"
                            placeholder="Enter your old password *"
                            required
                            onChange={(e) => {
                              setOpass(e.target.value);
                            }}
                          />

                          {opass.length >= pass.length ? (
                            opass === pass ? (
                              <div class="mx-2 mt-3">
                                <Checkmark size="medium" />
                              </div>
                            ) : (
                              <div class="mx-2" style={{ marginTop: "12px" }}>
                                <ImCross color="red" />
                              </div>
                            )
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <br />
                        <br />
                        <div class="form-input">
                          {/* <h6 class="profile-input">Enter your New Password: </h6> */}
                          <input
                            type="password"
                            name="w3lSender"
                            id="password"
                            placeholder="Enter your new password *"
                            required
                            onChange={(e) => {
                              setNpass(e.target.value);
                            }}
                          />
                        </div>
                        <br />
                        <br />
                        <div class="form-input">
                          {/* <h6 class="profile-input">Confirm Password: </h6> */}
                          <input
                            type="password"
                            name="w3lSender"
                            id="password"
                            placeholder="Confirm password *"
                            required
                            onChange={(e) => {
                              setCpass(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div class="submithny text-right">
                        <br />
                        <button
                          class="btn read-button text-right"
                          onClick={updatePassword}
                        >
                          Update Password
                        </button>
                      </div>

                      <br />
                      <br />
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Profile;
