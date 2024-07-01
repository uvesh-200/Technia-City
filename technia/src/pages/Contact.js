import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Contact() {
  const Message = (e) => {
    e.preventDefault();
    const cnname = document.getElementById("cnname").value;
    // alert(cnname);
    const cnnumber = document.getElementById("cnnumber").value;
    // alert(cnnumber);
    const cnemail = document.getElementById("cnemail").value;
    // alert(cnemail);
    const cnsubject = document.getElementById("cnsubject").value;
    // alert(cnsubject);
    const cnmsg = document.getElementById("cnmsg").value;
    // alert(cnmsg);

    const res = axios
      .post("http://localhost:1234/api/contact", {
        Cnname: cnname,
        Cnemail: cnemail,
        Cnnumber: cnnumber,
        Cnsubject: cnsubject,
        Cnmsg: cnmsg,
      })
      .then((resp) => {
        if (
          cnname === "" ||
          cnnumber === "" ||
          cnemail === "" ||
          cnsubject === "" ||
          cnmsg === ""
        ) {
          toast.error("Please Enter all details");
        } else {
          if (resp.status === 200 || resp.statusText === "OK") {
            setTimeout(() => window.location.reload(), 1000);
            toast.success("Your Query has been Submitted Successfully");
          } else {
            toast.error("Something went wrong");
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
              » Contact
            </span>
          </div>
        </nav>
      </div>
      <section class="w3l-contact-1">
        <div class="contacts-9 py-5">
          <div class="container py-lg-4">
            <div class="headerhny-title text-center">
              <h4 class="sub-title text-center">Contact us</h4>
              <h3 class="hny-title mb-0">Leave a Message</h3>
              <p class="hny-title mb-lg-5 mb-4">
                If you have a question regarding our services, feel free to
                contact us using the form below.
              </p>
            </div>
            <div class="contact-view mt-lg-5 mt-4">
              <div class="conhny-form-section">
                <form class="formhny-sec">
                  <div class="form-grids">
                    <div class="form-input">
                      <input
                        type="text"
                        name="w3lName"
                        id="cnname"
                        placeholder="Enter your name *"
                        required=""
                      />
                    </div>
                    <div class="form-input">
                      <input
                        type="text"
                        name="w3lSubject"
                        id="cnsubject"
                        placeholder="Enter subject *"
                        required
                      />
                    </div>
                    <div class="form-input">
                      <input
                        type="email"
                        name="w3lSender"
                        id="cnemail"
                        placeholder="Enter your email *"
                        required
                      />
                    </div>
                    <div class="form-input">
                      <input
                        type="number"
                        name="w3lPhone"
                        id="cnnumber"
                        placeholder="Enter your Phone Number *"
                        required
                        pattern="[1-9]{1}[0-9]{9}"
                        maxLength="10"
                      />
                    </div>
                  </div>
                  <div class="form-input mt-4">
                    <textarea
                      name="w3lMessage"
                      id="cnmsg"
                      placeholder="Type your query here *"
                      required=""
                    ></textarea>
                  </div>
                  <div class="submithny text-right mt-4">
                    <button class="btn read-button" onClick={Message}>
                      Submit Message
                    </button>
                  </div>
                </form>
              </div>

              <div class="d-grid contact-addres-inf mt-5 pt-lg-4">
                <div class="contact-info-left d-grid">
                  <div class="contact-info">
                    <div class="icon">
                      <span
                        class="fa fa-location-arrow"
                        aria-hidden="true"
                      ></span>
                    </div>
                    <div class="contact-details">
                      <h4>Address:</h4>
                      <p>Vadodara</p>
                    </div>
                  </div>
                  <div class="contact-info">
                    <div class="icon">
                      <span class="fa fa-phone" aria-hidden="true"></span>
                    </div>
                    <div class="contact-details">
                      <h4>Phone:</h4>
                      <p>
                        <a href="tel:+598-658-456">+598-658-346</a>
                      </p>
                    </div>
                  </div>
                  <div class="contact-info">
                    <div class="icon">
                      <span
                        class="fa fa-envelope-open-o"
                        aria-hidden="true"
                      ></span>
                    </div>
                    <div class="contact-details">
                      <h4>Mail:</h4>
                      <p>
                        <a href="mailto:mail@example.com" class="email">
                          techniacityit@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sin!4v1563262564932!5m2!1sen!2sin"
            style={{ border: "0" }}
            allowfullscreen=""
          ></iframe>
        </div> */}
      </section>
    </div>
  );
}

export default Contact;
