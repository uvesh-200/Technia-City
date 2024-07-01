import React, { useState, useEffect, useRef } from "react";
import { Link, json } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Videos() {
  const [sel, setSel] = useState([]);
  const [catid, setCatid] = useState([]);
  const [vid, selvideo] = useState(null);
  const [nsel, setNsel] = useState([]);
  const [showad, setShowad] = useState(true);
  const [skipad, setSkipad] = useState(false);
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("tbl_u_reg") != null) {
      const user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      const id = user.id;
      axios
        .get("http://localhost:1234/api/getsubscibed", { params: { id: id } })
        .then((res) => {
          setHistory(res.data);
          // console.log(res.data);
        });
    }
  }, []);
  useEffect(() => {
    axios.get("http://localhost:1234/api/likecount").then((res) => {
      setCount(res.data);
      console.log(res.data);
    });
  }, [count]);
  const datas = history.map((val) => val.v_id);
  // console.log(datas);
  const like = (id) => {
    // e.preventDefault();
    if (sessionStorage.getItem("tbl_u_reg") == null) {
      toast.error("Please login first");
      setTimeout(() => {
        window.location = "/login";
      }, 1000);
    } else {
      let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      let rid = user.id;
      axios
        .post("http://localhost:1234/api/like", { rid: rid, id: id })
        .then((res) => {
          if (res.data.message) {
            toast.error(res.data.message);
          } else {
            toast.success("you liked one video");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const watchLater = (vid) => {
    // e.preventDefault();
    if (sessionStorage.getItem("tbl_u_reg") == null) {
      toast.error("Please login first");
      setTimeout(() => {
        window.location = "/login";
      }, 1000);
    } else {
      let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      let rid = user.id;
      axios
        .post("http://localhost:1234/api/watchlater", { vid: vid, rid: rid })
        .then((res) => {
          if (res.data.message) {
            toast.error(res.data.message);
          } else {
            toast.success("video added to watch later");
          }
        });
    }
  };

  const playvideo = (id, type, vid) => {
    if (type === "premium" && datas.includes(vid)) {
      setShowad(true);
      selvideo(id);
    } else if (type === "premium" && !datas.includes(vid)) {
      toast.error("Please subscribe first");
    } else {
      setShowad(true);
      selvideo(id);
    }
  };

  const Skipad = (id) => {
    if (sessionStorage.getItem("tbl_u_reg") != null) {
      const user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      const rid = user.id;
      axios
        .post("http://localhost:1234/api/history", { id: id, rid: rid })
        .then(() => {});
      setShowad(false);
      setSkipad(true);
    } else {
      setShowad(false);
      setSkipad(true);
    }
  };

  // useEffect(() => {
  //   // axios.get("http://localhost:1234/api/viewvideo").then((res) => {
  //   //   setVid(res.data);
  //   //   //  alert(res.data);
  //   // });

  //   if (showad) {
  //     setTimeout(() => {
  //       setShowad(false);
  //     }, 11000);
  //   }
  // }, [showad]);

  const adend = (id) => {
    if (sessionStorage.getItem("tbl_u_reg") != null) {
      const user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      const rid = user.id;
      axios
        .post("http://localhost:1234/api/history", { id: id, rid: rid })
        .then(() => {});
      setShowad(false);
    } else {
      setShowad(false);
    }
  };

  useEffect(() => {
    if (skipad) {
      setShowad(false);
      setSkipad(false);
    }
  }, [skipad]);

  useEffect(() => {
    if (sessionStorage.getItem("tbl_u_reg") != null) {
      let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));
      let id = user.id;
      axios
        .get("http://localhost:1234/api/suggest", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          setCatid(res.data);
          // console.log(res.data);
        });
    } else {
      axios.get("http://localhost:1234/api/viewvideo").then((res) => {
        setCatid(res.data);
        //  alert(res.data);
      });
    }
  }, []);
  const arys = catid.map((val) => val.cat_id);
  // console.log(arys);
  useEffect(() => {
    axios
      .get("http://localhost:1234/api/suggestVideos", {
        params: {
          catid: arys,
        },
      })
      .then((res) => {
        setSel(res.data.sel);
        setNsel(res.data.nsel);

        // console.log(res.data);
      });
  }, [catid]);

  const fetchLikeCount = (videoId) => {
    const likedVideo = count.find((item) => item.v_id === videoId);
    return likedVideo ? likedVideo.count : 0;
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
              » Videos
            </span>
          </div>
        </nav>
      </div>
      <section class="w3l-grids">
        <div class="grids-main">
          <div class="container">
            <div class="w3l-populohny-grids">
              {sel.map((video) => {
                return (
                  <>
                    <div class="item mt-n2 ml-n2">
                      <div class="box">
                        <button
                          class="playbtn mb-2"
                          style={{
                            border: "none",
                            background: "none",
                          }}
                          onClick={() =>
                            playvideo(video.v_video, video.v_type, video.v_id)
                          }
                        >
                          {vid === video.v_video ? (
                            <div>
                              <video
                                id="video"
                                autoPlay
                                controls
                                controlsList="nodownload"
                                style={{
                                  width: "383px",
                                  height: "250px",
                                }}
                                onEnded={() => adend(video.v_id)}
                                src={
                                  showad
                                    ? "http://localhost:1234/public/ad.mp4"
                                    : "http://localhost:1234/public/" + vid
                                }
                              ></video>
                              {showad ? (
                                <p onClick={() => Skipad(video.v_id)}>
                                  skip ad
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <video
                              id="video"
                              // ref={vidRef}
                              controlsList="nodownload"
                              style={{ width: "383px", height: "250px" }}
                            >
                              <source
                                src={
                                  "http://localhost:1234/public/" +
                                  video.v_video
                                }
                              />
                            </video>
                          )}
                        </button>

                        {/* <h3>{video.cat_id}</h3> */}
                        <div class="mx-2 ml-3 mb-2">
                          <button
                            class="btn btn-info ml-n2"
                            onClick={() => like(video.v_id)}
                          >
                            Like&nbsp;{fetchLikeCount(video.v_id)}
                          </button>
                          <button
                            class="btn bg-warning ml-2"
                            onClick={() => watchLater(video.v_id)}
                          >
                            Add to Watch later
                          </button>
                          {sessionStorage.getItem("tbl_u_reg") == null ? (
                            video.v_type != "free" ? (
                              <Link to="/login">
                                <button
                                  class="btn btn-danger ml-2"
                                  onClick={(e) =>
                                    toast.error(
                                      "Please login first to continue"
                                    )
                                  }
                                >
                                  Subscribe
                                </button>
                              </Link>
                            ) : (
                              ""
                            )
                          ) : video.v_type == "free" ? (
                            <div></div>
                          ) : datas.includes(video.v_id) ? (
                            <Link>
                              <button class="btn btn-success ml-2">
                                Subscribed
                              </button>
                            </Link>
                          ) : (
                            <Link to="/videodetails" state={{ id: video.v_id }}>
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
              {/* <History history={history} /> */}
              {nsel.map((video) => {
                return (
                  <>
                    <div class="item mt-n2 ml-n2">
                      <div class="box">
                        <button
                          class="playbtn mb-2"
                          style={{
                            border: "none",
                            background: "none",
                          }}
                          onClick={() =>
                            playvideo(video.v_video, video.v_type, video.v_id)
                          }
                        >
                          {vid === video.v_video ? (
                            <div>
                              <video
                                id="video"
                                autoPlay
                                controls
                                controlsList="nodownload"
                                style={{
                                  width: "383px",
                                  height: "250px",
                                }}
                                src={
                                  showad
                                    ? "http://localhost:1234/public/ad.mp4"
                                    : "http://localhost:1234/public/" + vid
                                }
                              ></video>
                              {showad ? <p onClick={Skipad}>skip ad</p> : ""}
                            </div>
                          ) : (
                            <video
                              id="video"
                              // ref={vidRef}
                              controlsList="nodownload"
                              style={{ width: "383px", height: "250px" }}
                            >
                              <source
                                src={
                                  "http://localhost:1234/public/" +
                                  video.v_video
                                }
                              />
                            </video>
                          )}
                        </button>

                        {/* <h3>{video.cat_id}</h3> */}
                        <div class="mx-2 ml-3 mb-2">
                          <button
                            class="btn btn-info ml-n2"
                            onClick={() => like(video.v_id)}
                          >
                            Like&nbsp;{fetchLikeCount(video.v_id)}
                          </button>
                          <button
                            class="btn bg-warning ml-2"
                            onClick={() => watchLater(video.v_id)}
                          >
                            Add to Watch later
                          </button>
                          {sessionStorage.getItem("tbl_u_reg") == null ? (
                            video.v_type === "free" ? (
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
                            ) : (
                              ""
                            )
                          ) : video.v_type == "free" ? (
                            <div></div>
                          ) : datas == video.v_id ? (
                            <Link>
                              <button class="btn btn-success ml-2">
                                Subscribed
                              </button>
                            </Link>
                          ) : (
                            <Link to="/videodetails" state={{ id: video.v_id }}>
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
    </div>
  );
}

export default Videos;
