import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Searchpage = () => {
  const [result, setResult] = useState([]);
  let location = useLocation();
  let text = location.state ? location.state.text : "";
  console.log(text);
  useEffect(() => {
    // if (text) {
    axios
      .get("http://localhost:1234/api/search", { params: { text: text } })
      .then((resp) => {
        setResult(resp.data);
      });
    // }
  }, [text]);
  return (
    <div>
      <div class="w3l-breadcrumbs">
        <nav id="breadcrumbs" class="breadcrumbs">
          <div style={{ float: "left" }} class="container page-wrapper">
            <Link style={{ float: "left" }} to="/">
              Home
            </Link>
            <span
              style={{ float: "left" }}
              class="breadcrumb_last"
              aria-current="page"
            >
              » Search
            </span>
          </div>
        </nav>
      </div>
      {result.length == 0 ? (
        <p class="text-center" style={{ fontSize: "20px", margin: "100px" }}>
          Sorry, No result found for "<b>{text}</b>"
        </p>
      ) : (
        <section class="w3l-grids">
          <div class="grids-main">
            <div class="container">
              <div class="w3l-populohny-grids">
                {result.map((video) => {
                  return (
                    <>
                      <div class="item mt-n2" style={{ marginLeft: "-15px" }}>
                        <div class="box">
                          <video
                            controls
                            controlsList="nodownload"
                            style={{ width: "383px", height: "250px" }}
                          >
                            <source
                              src={
                                "http://localhost:1234/public/" + video.v_video
                              }
                              type="video/mp4"
                            />
                          </video>
                          <div class="mx-2 my-1 mb-2">
                            <button class="btn btn-info ml-n2">Like</button>
                            {sessionStorage.getItem("tbl_u_reg") == null ? (
                              <Link to="/login">
                                <button
                                  class="btn btn-danger ml-2"
                                  onClick={(e) =>
                                    toast.error(
                                      "Please Login first to Continue"
                                    )
                                  }
                                >
                                  Subscribe
                                </button>
                              </Link>
                            ) : video.v_type == "free" ? (
                              <div></div>
                            ) : (
                              <Link
                                to="/videodetails"
                                state={{ id: video.v_id }}
                              >
                                <button class="btn btn-danger ml-2">
                                  Subscribe
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Searchpage;
