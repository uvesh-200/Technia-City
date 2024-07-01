import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Header() {
  const history = useNavigate();
  const location = useLocation();
  // const locations = useHistory();

  const [searchvalue, setSearchvalue] = useState("");
  let user = JSON.parse(sessionStorage.getItem("tbl_u_reg"));

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const clear = (e) => {
    e.preventDefault();

    sessionStorage.clear();
    toast.success("Logout Successfully");
    setTimeout(() => history("/login"), 1000);
  };

  useEffect(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        toggleSwitch.checked = true;
      }
    }

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }

    toggleSwitch.addEventListener("change", switchTheme, false);
  }, []);

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div>
      <header id="site-header" class="w3l-header fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light fill px-lg-0 py-0 px-3">
          <div class="container">
            <Link class="navbar-brand">
              <img
                src="assets/images/logoweb.png"
                alt="Your logo"
                title="Your logo"
                style={{ height: "70px", marginLeft: "-40px" }}
              />
            </Link>
            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="fa icon-expand fa-bars"></span>
              <span class="fa icon-close fa-times"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div style={{ display: "flex" }} class="mx-4">
                <input
                  id="search"
                  type="search"
                  class="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  defaultValue={transcript}
                  // onClick={handleTranscript}
                  onChange={(e) => setSearchvalue(e.target.value)}
                ></input>

                <Link
                  type="button"
                  class="btn btn-outline-primary search-line"
                  style={{ height: "38px" }}
                  onClick={() => setTimeout(() => window.location.reload(), 0)}
                  to={"/searchpage"}
                  state={{
                    text: transcript
                      ? transcript.trim().slice(0, -1)
                      : searchvalue,
                  }}
                >
                  <FaSearch />
                </Link>
                <Link
                  type="button"
                  class="btn btn-outline-primary ml-1"
                  style={{ height: "38px" }}
                  // onClick={voicesearch}
                >
                  <FaMicrophone
                    style={{ fontSize: "20px" }}
                    onClick={SpeechRecognition.startListening}
                  />
                </Link>
              </div>
              {/* <textarea value={transcript}></textarea> */}
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <Link
                    class={
                      location.pathname === "/" ? "nav-link active" : "nav-link"
                    }
                    style={{ fontFamily: "sans-serif" }}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {sessionStorage.getItem("tbl_u_reg") == null ? (
                  <div></div>
                ) : (
                  <li class="nav-item">
                    <Link
                      class={
                        location.pathname === "/subscription"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/subscription"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Subscription
                    </Link>
                  </li>
                )}
                <li class="nav-item">
                  <Link
                    class={
                      location.pathname === "/videos"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ fontFamily: "sans-serif" }}
                    to="/videos"
                  >
                    Videos
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class={`${
                      isPathActive("/manage") ? "nav-link active" : "nav-link"
                    } `}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    <li>
                      Manage
                      <IoMdArrowDropdown style={{ fontSize: "23px" }} />
                    </li>
                  </Link>
                  <div class="drop-menu">
                    <li>
                      <Link class="menus" to="/managehistory">
                        History
                      </Link>
                    </li>
                    <li>
                      <Link class="menus" to="/managewatchlater">
                        Watch Later
                      </Link>
                    </li>
                  </div>
                </li>

                <li class="nav-item">
                  <Link
                    class={
                      location.pathname === "/contact"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ fontFamily: "sans-serif" }}
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>

                {user == null ? (
                  <li class="nav-item">
                    <Link
                      class={
                        location.pathname === "/login"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={{ fontFamily: "sans-serif" }}
                      to="/login"
                    >
                      Register / Login
                    </Link>
                  </li>
                ) : (
                  <div>
                    <li class="nav-item">
                      <Link
                        class={`${
                          isPathActive("/profile")
                            ? "nav-link active"
                            : "nav-link"
                        } `}
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {user.name}
                        <IoMdArrowDropdown style={{ fontSize: "23px" }} />
                      </Link>
                      <div class="drop-menu">
                        <li>
                          <Link class="menus" to="/profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link class="menus" onClick={clear}>
                            Logout
                          </Link>
                        </li>
                      </div>
                    </li>
                  </div>
                )}
                {/* {user == null ? (
                  <div></div>
                ) : (
                  <li class="nav-item">
                    <Link class="nav-link" onClick={clear}>
                      Logout
                    </Link>
                  </li>
                )} */}
              </ul>

              {/* <div class="search-right">
                <Link
                  href="#search"
                  class="btn search-hny mr-lg-3 mt-lg-0 mt-4"
                  title="search"
                >
                  Search{" "}
                  <span class="fa fa-search ml-3" aria-hidden="true"></span>
                </Link> */}

              {/* <div class="input-group rounded">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <span class="input-group-text border-0" id="search-addon">
                    <IoMdArrowDropdown />
                  </span>
                </div> */}

              {/* <div id="search" class="pop-overlay">
                  <div class="popup">
                    <form class="search-box">
                      <input
                        type="search"
                        placeholder="Search your Keyword"
                        name="search"
                        required="required"
                        autofocus=""
                      />
                      <button type="submit" class="btn">
                        <span class="fa fa-search" aria-hidden="true"></span>
                      </button>
                    </form>
                    <div class="browse-items">
                      <h3 class="hny-title two mt-md-5 mt-4">Browse all:</h3>
                      <ul class="search-items">
                        <li>
                          <Link href="">Action</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Drama</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Family</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Thriller</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Commedy</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Romantic</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Tv-Series</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Horror</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Action</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Drama</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Family</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Thriller</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Commedy</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Romantic</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Tv-Series</Link>
                        </li>
                        <li>
                          <Link href="genre.html">Horror</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link class="close" href="#close">
                    ×
                  </Link>
                </div>
              </div>*/}
            </div>

            <div class="mobile-position">
              <nav class="navigation">
                <div class="theme-switch-wrapper">
                  <label class="theme-switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div class="mode-container">
                      <i class="gg-sun"></i>
                      <i class="gg-moon"></i>
                    </div>
                  </label>
                </div>
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Header;
