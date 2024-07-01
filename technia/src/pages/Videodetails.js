import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Videodetails = () => {
  const [vid, setVid] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState();
  const [amt, setAmt] = useState();
  const [days, setDays] = useState();

  let location = useLocation();
  let id = location ? location.state.id : null;

  const Subscribe = (e) => {
    e.preventDefault();
    const amt = document.getElementById("amt").value;
    const vid = document.getElementById("vid").value;
    const days = document.getElementById("days").value;
    const user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
    const rid = user.id;
    // alert(rid);

    var merchant_order_id = Math.floor(Math.random() * 90000) + 10000;
    // alert(merchant_order_id);

    var opt = {
      key: "rzp_test_MajB13VR6998I4",
      amount: amt * 100,
      name: "Technia City",
      description: "Subscribe",
      currency: "INR",
      netbanking: true,
      prefill: {
        name: "Technia",
        email: "techniacityit@gmail.com",
        contact: 9999999999,
      },
      notes: {
        soolegal_order_id: merchant_order_id,
      },
      handler: function (response) {
        axios
          .post("http://localhost:1234/api/subscribe", {
            Amt: amt,
            vid: vid,
            rid: rid,
            days: days,
            orderid: merchant_order_id,
          })
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              toast.success("payment done sucessfully");
              setTimeout(() => {
                window.location.reload();
                window.location = "/subscription";
              }, 1000);
            }
          });
      },
      theme: {
        color: "#528FF0",
      },
    };
    var rzp1 = new window.Razorpay(opt);
    rzp1.open();
  };

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/videodetails", { params: { id: id } })
      .then((res) => {
        let obj = {
          vid: res.data[0].v_id,
          title: res.data[0].v_title,
          description: res.data[0].v_description,
          type: res.data[0].v_type,
          amt: res.data[0].v_amt,
          days: res.data[0].v_days,
        };
        setVid(obj.vid);
        setTitle(obj.title);
        setDesc(obj.description);
        setAmt(obj.amt);
        setDays(obj.days);
        setType(obj.type);
      });
  });
  return (
    <div>
      <section class="w3l-contact-1">
        <div class="contacts-9 py-5">
          <div class="container py-lg-4">
            <div class="headerhny-title text-center">
              <h3 class="hny-title mb-0 mt-3">Video Details</h3>
            </div>
            <div class="contact-view mt-lg-5 mt-4">
              <div class="conhny-form-section">
                <form class="formhny-sec">
                  <div class="form-grid">
                    <div class="form-input">
                      <input type="text" id="vid" value={vid} required hidden />
                      <h6 class="profile-input">Title: </h6>
                      <input type="text" id="name" value={title} required />
                    </div>
                    <br />
                    <div class="form-input">
                      <h6 class="profile-input">Description: </h6>
                      <textarea rows="2" value={desc}></textarea>
                    </div>
                    <br />
                    <div class="form-input">
                      <h6 class="profile-input">Type: </h6>
                      <input name="w3lPhone" value={type} />
                    </div>
                    <br />
                    <div class="form-input">
                      <h6 class="profile-input">Amount: </h6>
                      <input
                        type="number"
                        name="w3lSubject"
                        value={amt}
                        id="amt"
                        required
                      />
                    </div>
                    <br />
                    <div class="form-input">
                      <h6 class="profile-input">Days: </h6>
                      <input type="number" id="days" value={days} required />
                    </div>
                  </div>
                  <div class="submithny text-right">
                    <br />
                    <button
                      class="btn read-button text-right"
                      onClick={Subscribe}
                    >
                      Subscribe
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

export default Videodetails;
