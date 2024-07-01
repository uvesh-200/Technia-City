import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Home() {
  const [vid, setVid] = useState([]);
  const [latest, setLatest] = useState([]);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    window.$(document).ready(function () {
      window.$(".owl-three").owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 2,
            nav: false,
          },
          480: {
            items: 2,
            nav: true,
          },
          667: {
            items: 3,
            nav: true,
          },
          1000: {
            items: 5,
            nav: true,
          },
        },
      });
    });

    window.$(document).ready(function () {
      window.$(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true,
          },
          600: {
            items: 2,
            nav: false,
          },
          1000: {
            items: 4,
            nav: true,
            loop: false,
          },
        },
      });
    });

    window.$(document).ready(function () {
      window.$(".owl-one").owlCarousel({
        stagePadding: 280,
        loop: true,
        margin: 20,
        nav: true,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1,
            stagePadding: 40,
            nav: false,
          },
          480: {
            items: 1,
            stagePadding: 60,
            nav: true,
          },
          667: {
            items: 1,
            stagePadding: 80,
            nav: true,
          },
          1000: {
            items: 1,
            nav: true,
          },
        },
      });
    });

    window.$(document).ready(function () {
      window.$(".popup-with-zoom-anim").magnificPopup({
        type: "inline",

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: "auto",

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
      });

      window.$(".popup-with-move-anim").magnificPopup({
        type: "inline",

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: "auto",

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom",
      });
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:1234/api/viewvideo").then((res) => {
      setVid(res.data);
      //  alert(res.data);
    });

    axios.get("http://localhost:1234/api/latestvideo").then((res) => {
      setLatest(res.data);
      //  alert(res.data);
    });
  }, []);
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const setting = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
  };

  return (
    // <div class="mt-5">
    //   <iframe
    //     src={"https://indveng-criccoder.vercel.app/Hindi.html"}
    //     allow="autoplay; fullscreen"
    //     allowfullscreen=""
    //   ></iframe>
    // </div>
    <>
      <section class="w3l-main-slider position-relative" id="home">
        <div class="companies20-content">
          <div class="oe">
            <div class="item">
              <Slider {...setting}>
                {/* {vid.map((val) => ( */}
                <li>
                  <div class="slider-info banner-view bg bg2">
                    {/* <video
                        class="slider-info"
                        style={{ position: "absolute" }}
                      >
                        <source
                          style={{
                            maxHeight: "600px",
                            position: "absolute",
                          }}
                          src={"http://localhost:1234/public/" + val.v_video}
                          type="video/mp4"
                        />
                      </video> */}
                    <div class="banner-info" style={{ position: "relative" }}>
                      <>
                        <h3>React js</h3>
                        <p>
                          Introduction to React js
                          <span class="over-para"></span>
                        </p>
                        <a
                          // href="#small-dialog1"
                          class="popup-with-zoom-anim play-view1"
                        >
                          <span class="video-play-icon">
                            <span class="fa fa-play"></span>
                          </span>
                          <h6>Watch Video</h6>
                        </a>

                        <div
                          id="small-dialog1"
                          class="zoom-anim-dialog mfp-hide"
                        ></div>
                      </>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="slider-info banner-view banner-top1 bg bg2">
                    {/* <video
                        class="slider-info"
                        style={{ position: "absolute" }}
                      >
                        <source
                          style={{
                            maxHeight: "600px",
                            position: "absolute",
                          }}
                          src={"http://localhost:1234/public/" + val.v_video}
                          type="video/mp4"
                        />
                      </video> */}
                    <div class="banner-info" style={{ position: "relative" }}>
                      <>
                        <h3>Node js</h3>
                        <p>
                          Introduction to Node js
                          <span class="over-para"></span>
                        </p>
                        <a
                          // href="#small-dialog1"
                          class="popup-with-zoom-anim play-view1"
                        >
                          <span class="video-play-icon">
                            <span class="fa fa-play"></span>
                          </span>
                          <h6>Watch Video</h6>
                        </a>

                        <div
                          id="small-dialog1"
                          class="zoom-anim-dialog mfp-hide"
                        ></div>
                      </>
                    </div>
                  </div>
                </li>
                {/* ))} */}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <div class="bodyss">
        <div class="grids-main">
          <div class="headerhny-title">
            <h3 class="hny-title mt-5 ml-3">Popular Videos</h3>
          </div>
          <div class="mx-4">
            <Slider {...settings}>
              {vid.map((item) => (
                <>
                  <Link to="/videos">
                    <video
                      style={{
                        height: "120px",
                        borderRadius: "2px",
                        width: "220px",
                        marginBottom: "-20px",
                      }}
                    >
                      <source
                        src={"http://localhost:1234/public/" + item.v_video}
                        type="video/mp4"
                      />
                    </video>
                    <div class="box-content"></div>
                  </Link>

                  <h3 class="text-center mt-5">
                    <Link
                      class="title ml-n4"
                      style={{
                        color: "black",
                        fontSize: "20px",
                      }}
                      to="/videos"
                    >
                      {item.v_title}
                    </Link>
                  </h3>
                  <p class="mt-2 ml-n4 text-center">{item.v_description}</p>
                  <div class="button-center text-center mt-4 mr-4">
                    <Link to="/videos" class="btn watch-button">
                      Watch now
                    </Link>
                  </div>
                </>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <section class="w3l-albums mb-5 py-5" id="projects">
        <div class="container ">
          <div class="row">
            <div class="col-lg-12 mx-auto">
              <div id="parentHorizontalTab">
                <ul class="resp-tabs-list hor_1">
                  <li style={{ background: "#df0e62" }}>Latest Videos</li>
                  {/* <li>Popular Movies</li>
                  <li>Trend Movies</li> */}
                  <div class="clear"></div>
                </ul>
                <div class="resp-tabs-container hor_1">
                  <div class="albums-content">
                    <div class="row">
                      {latest.map((val) => (
                        <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                          <div class="slider-info">
                            <>
                              <div
                                class="img-circle"
                                style={{ width: "200px" }}
                              >
                                <Link to="/videos">
                                  {/* <img
                                    src="assets/images/m6.jpg"
                                    class="img-fluid"
                                    alt="author image"
                                  /> */}
                                  <video
                                    style={{
                                      height: "230px",
                                      borderRadius: "9px",
                                    }}
                                  >
                                    <source
                                      src={
                                        "http://localhost:1234/public/" +
                                        val.v_video
                                      }
                                      type="video/mp4"
                                    />
                                  </video>
                                  <div class="overlay-icon">
                                    <span
                                      class="fa fa-play video-icon"
                                      aria-hidden="true"
                                    ></span>
                                  </div>
                                </Link>
                              </div>
                              <div class="message">
                                {/* <p>English</p> */}
                                <a class="author-book-title" href="genre.html">
                                  {val.v_title}
                                </a>
                                <h4>
                                  {" "}
                                  <span class="post" style={{ width: "150px" }}>
                                    {val.v_description}
                                  </span>
                                </h4>
                              </div>
                            </>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
