import React, { useEffect, useRef, useState } from "react";
import { HiChat } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { IoCloseOutline, IoVolumeHigh } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const [response, setResponse] = useState([]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState([]);
  const [value, setValue] = useState([]);
  const history = useNavigate();
  // let prev = useRef("");
  const transcript = () => {
    const conversationdata = document.getElementById("chatbot").textContent;
    console.log(conversationdata);
    const file = new Blob([conversationdata], {
      type: "text/plain",
    });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "Your conversation data" + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  useEffect(() => {
    if (sessionStorage.getItem("tbl_u_reg") != null) {
      let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      let name = user.name;
      let rid = user.id;
      axios
        .post("http://localhost:1234/api/chatbotsubscribedcount", {
          rid: rid,
        })
        .then((res) => {
          setCount(res.data.count[0].count);
          setValue(res.data.value);
          // console.log(res.data.value);
        });
    }
  }, []);
  const Chatbot = (e) => {
    // setPre(prev.current);
    setInput("");
    e.preventDefault();
    console.log(response);
    const conversation = document.getElementById("conversation");

    let msg = document.createElement("div");
    if (input != "") {
      axios
        .get("http://localhost:1234/api/chatbot", {
          params: { input: input },
        })
        .then((res) => {
          setResponse(res.data);

          let rss = res.data.q_response;
          const currentTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          if (rss == null) {
            msg.classList.add("chatbot-message", "user-message");
            msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
            // const newinput = input;

            conversation.appendChild(msg);
            axios
              .post("http://localhost:1234/api/newinput", { newinput: input })
              .then((res) => {});
            msg = document.createElement("div");
            msg.classList.add("chatbot-message", "chatbot");
            msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">Sorry, we could not find your response</p>`;
            conversation.appendChild(msg);
          } else if (rss == "check") {
            msg.classList.add("chatbot-message", "user-message");
            msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
            conversation.appendChild(msg);
            msg = document.createElement("div");
            msg.classList.add("chatbot-message", "chatbot");
            if (sessionStorage.getItem("tbl_u_reg") == null) {
              msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">Please Login first</p>`;
            } else {
              msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${count}<br></p><br><p class="chatbot-text" sentTime="${currentTime}>${value
                .map((val) => val.v_title)
                .join("<br>")}<br/></p>`;
              // msg.innerHTML =
              // console.log(count);
            }
            conversation.appendChild(msg);
          } else {
            msg.classList.add("chatbot-message", "user-message");
            msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
            conversation.appendChild(msg);
            msg = document.createElement("div");
            msg.classList.add("chatbot-message", "chatbot");
            msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${rss}</p>`;
            conversation.appendChild(msg);
          }
        });
    } else {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // conversation.appendChild(msg);
      msg = document.createElement("div");
      msg.classList.add("chatbot-message", "chatbot");
      msg.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">Sorry, Please write anything</p>`;
      conversation.appendChild(msg);
    }
  };
  return (
    <>
      <div>
        <footer class="w3l-footer">
          <HiChat
            // class="chatbot"
            data-target="#myModal1"
            data-toggle="modal"
            color="#df0e62"
            size={50}
            style={{ position: "fixed", right: "25px", top: "88%" }}
          />

          <section class="footer-inner-main mt-2">
            <div class="footer-hny-grids py-3">
              <div class="container py-lg-4">
                <div class="text-txt">
                  <div class="right-side">
                    <div class="row footer-links">
                      <div class="col-md-3 col-sm-6 sub-two-right mt-5">
                        <h6>Videos</h6>
                        <ul>
                          <li>
                            <Link to="/videos">Videos</Link>
                          </li>
                          <li>
                            <Link to="/subscription">Subscription</Link>
                          </li>
                          <li>
                            <Link to="/">Latest videos</Link>
                          </li>
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact Us</Link>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-3 col-sm-6 sub-two-right mt-5">
                        <h6>Information</h6>
                        <ul>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/videos">Videos</Link>
                          </li>
                          <li>
                            <Link to="/login">Login</Link>
                          </li>
                          <li>
                            <Link to="/register">Registration</Link>
                          </li>
                          <li>
                            <Link to="/" href="contact.html">
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-3 col-sm-6 sub-two-right mt-5">
                        <h6>Locations</h6>
                        <ul>
                          <li>
                            <Link>Vadodara</Link>
                          </li>
                          <li>
                            <Link>Bharuch</Link>
                          </li>
                          <li>
                            <Link></Link>
                          </li>
                          <li>
                            <Link></Link>
                          </li>
                          <li>
                            <Link></Link>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-3 col-sm-6 sub-two-right mt-5">
                        <h6>Newsletter</h6>
                        <form class="subscribe mb-3">
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email Address"
                            required=""
                          />
                          <button onClick={() => history("/contact")}>
                            <span class="fa fa-envelope-o"></span>
                          </button>
                        </form>
                        <p>
                          Enter your email and receive the latest news, updates
                          and special offers from us.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="below-section">
              <div class="container">
                <div class="copyright-footer">
                  <div class="columns text-lg-left">
                    <p>
                      &copy; 2024 Technia City. All rights reserved | Developed
                      by Uvesh
                    </p>
                  </div>

                  <ul class="social text-lg-right">
                    <li>
                      <Link to="/" href="#facebook">
                        <span class="fa fa-facebook" aria-hidden="true"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/" href="#linkedin">
                        <span class="fa fa-linkedin" aria-hidden="true"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/" href="#twitter">
                        <span class="fa fa-twitter" aria-hidden="true"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/" href="#google">
                        <span
                          class="fa fa-google-plus"
                          aria-hidden="true"
                        ></span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button onclick="topFunction()" id="movetop" title="Go to top">
              <span class="fa fa-arrow-up" aria-hidden="true"></span>
            </button>
          </section>
        </footer>
      </div>
      <div
        id="myModal1"
        class="modal chatbot-container"
        role="dialog"
        style={{
          height: "520px",
          width: "35%",
          position: "fixed",
          // right: "1px",
          left: "63%",
          top: "1%",
        }}
      >
        <div id="header">
          <h1 style={{ fontSize: "15px" }}>
            Technia City Chatbot
            <IoCloseOutline
              size={20}
              style={{ float: "right" }}
              data-dismiss="modal"
              onClick={transcript}
            />
          </h1>
        </div>
        <div id="chatbot">
          <div id="conversation">
            <div class="chatbot-message">
              <p id="chatbot-text" class="chatbot-text">
                Hi! 👋 How can i help you!
              </p>
            </div>
          </div>

          <form id="input-form">
            <message-container>
              <input
                id="input-field"
                type="text"
                placeholder="Type your message here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button id="submit-button" type="submit" onClick={Chatbot}>
                <IoMdSend
                  size={20}
                  class="send-icon"
                  onClick={() => setInput("")}
                />
              </button>
            </message-container>
          </form>
        </div>
      </div>
    </>
  );
}

export default Footer;
