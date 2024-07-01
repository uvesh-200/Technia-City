import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import { toast } from "react-toastify";
import axios from "axios";

function Subscription() {
  const [vdata, setVdata] = useState([]);
  const [days, setDays] = useState();
  const [amt, setAmt] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt_token");
    const user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));

    const id = user.id;
    axios
      .get("http://localhost:1234/api/subscriptionvideos", {
        params: { id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setVdata(resp.data);
      });
  }, []);

  const reSubscribe = (id, sid) => {
    let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
    let email = user.email;
    alert(id);
    alert(sid);
    axios
      .get("http://localhost:1234/api/videodetails", { params: { id: id } })
      .then((res) => {
        console.log(res.data);
        let obj = {
          day: res.data[0].v_days,
          amt: res.data[0].v_amt,
        };
        setDays(obj.day);
        setAmt(obj.amt);
        // alert(obj.day);
        // alert(obj.amt);
      });

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
          .post("http://localhost:1234/api/resubscribe", {
            sid: sid,
            days: days,
            amt: amt,
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
  //   axios
  //     .post("http://localhost:1234/api/resubscribe", {
  //       email: email,
  //     })
  //     .then((res) => {});
  //   // window.location = "/subscription";
  // };

  return (
    <>
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
                » Subscription
              </span>
            </div>
          </nav>
        </div>
        <section class="w3l-grids">
          <div class="grids-main">
            <div class="container">
              <div class="w3l-populohny-grids">
                {vdata.map((values) => {
                  var date = new Date().toISOString();

                  return (
                    <div class="item mt-n2">
                      <div class="box">
                        {date >= values.sub_end ? (
                          <>
                            <video
                              controlsList="nodownload"
                              style={{ width: "383px", height: "250px" }}
                            >
                              <source
                                src={
                                  "http://localhost:1234/public/" +
                                  values.v_video
                                }
                                type="video/mp4"
                              />
                            </video>
                            <p class="mt-n4 mb-1">Expired</p>
                            <button
                              style={{ float: "left" }}
                              class="btn btn-danger mr-3"
                              onClick={() =>
                                reSubscribe(values.v_id, values.sub_id)
                              }
                            >
                              Re-Subscribe
                            </button>
                          </>
                        ) : (
                          <video
                            controlsList="nodownload"
                            style={{ width: "383px", height: "250px" }}
                            controls
                          >
                            <source
                              src={
                                "http://localhost:1234/public/" + values.v_video
                              }
                              type="video/mp4"
                            />
                          </video>
                        )}

                        <div class="mx-2 mb-2">
                          <button class="btn btn-info ml-n2">Like</button>
                        </div>
                        <h5>
                          Expire on:&nbsp;
                          {new Date(values.sub_end).toDateString()}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Subscription;
