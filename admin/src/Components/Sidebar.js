import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <nav id="sidebar">
        <div class="sidebar-header">
          <h1>
            <Link to="index.html">Technia Admin</Link>
          </h1>
          <span>T</span>
        </div>
        <div class="profile-bg"></div>
        <ul class="list-unstyled components">
          <li class="active">
            <Link to="/home">
              <i class="fas fa-th-large"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
              <i class="fas fa-laptop"></i>
              Category
              <i class="fas fa-angle-down fa-pull-right"></i>
            </a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
              <li>
                <Link to="/catform">Add Category</Link>
              </li>
              <li>
                <Link to="/table">View Category</Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#homeSubmenus"
              data-toggle="collapse"
              aria-expanded="false"
            >
              <i class="fas fa-laptop"></i>
              Manage Videos
              <i class="fas fa-angle-down fa-pull-right"></i>
            </a>
            <ul class="collapse list-unstyled" id="homeSubmenus">
              <li>
                <Link to="/form">Add Videos</Link>
              </li>
              <li>
                <Link to="/videotable">View Videos</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#homesubs" data-toggle="collapse" aria-expanded="false">
              <i class="fas fa-laptop"></i>
              Subscription
              <i class="fas fa-angle-down fa-pull-right"></i>
            </a>
            <ul class="collapse list-unstyled" id="homesubs">
              <li>
                <Link to="/subvideos">Subscribed Videos</Link>
              </li>
              {/* <li>
                <Link to="/table">View Category</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <a href="#feedback" data-toggle="collapse" aria-expanded="false">
              <i class="fas fa-laptop"></i>
              Feedback
              <i class="fas fa-angle-down fa-pull-right"></i>
            </a>
            <ul class="collapse list-unstyled" id="feedback">
              <li>
                <Link to="/feedback">Feedback Table</Link>
              </li>
              {/* <li>
                <Link to="/table">View Category</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <a href="#analytics" data-toggle="collapse" aria-expanded="false">
              <i class="fas fa-laptop"></i>
              Analytics
              <i class="fas fa-angle-down fa-pull-right"></i>
            </a>
            <ul class="collapse list-unstyled" id="analytics">
              <li>
                <Link to="/analyticscount">Count</Link>
              </li>
              {/* <li>
                <Link to="/table">View Category</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <a href="#chatbot" data-toggle="collapse" aria-expanded="false">
              <i class="fas fa-laptop"></i>
              Chatbot
              <i class="fas fa-angle-down fa-pull-right"></i>
            </a>
            <ul class="collapse list-unstyled" id="chatbot">
              <li>
                <Link to="/addresponse">add response</Link>
              </li>
              {/* <li>
                <Link to="/table">View Category</Link>
              </li> */}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
