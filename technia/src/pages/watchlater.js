import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Watchlater() {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("tbl_u_reg") != null) {
      let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      let rid = user.id;
      axios
        .get("http://localhost:1234/api/watchlatervideos", {
          params: { rid: rid },
        })
        .then((res) => {
          setList(res.data);
        });
    } else {
      setMsg(true);
      toast.error("Please login first");
      // setTimeout(() => {
      //   window.location = "/login";
      // }, 1000);
    }
  }, []);

  const remove = (id) => {
    let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
    let rid = user.id;
    axios
      .post("http://localhost:1234/api/removewatchlatervideos", {
        id: id,
        rid: rid,
      })
      .then((res) => {
        if (res) {
          toast.success("successfully removed");
          setTimeout(() => {
            window.location.reload();
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
              Home
            </Link>
            <span
              style={{ float: "left" }}
              class="breadcrumb_last"
              aria-current="page"
            >
              » Watch Later
            </span>
          </div>
        </nav>
      </div>
      {msg ? (
        <h1 class="text-center" style={{ margin: "15%" }}>
          Nothing to see, please login to access watch later
        </h1>
      ) : (
        <section class="w3l-grids">
          <div class="grids-main">
            <div class="container ml-n1">
              <div class="w3l-populohny-grids">
                {list.map((values) => {
                  return (
                    <div class="item mt-n2">
                      <div class="box">
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
                        <div class="mx-2 mb-2">
                          <button
                            class="btn btn-info ml-n2"
                            onClick={() => remove(values.v_id)}
                          >
                            Remove from watch later
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Watchlater;
