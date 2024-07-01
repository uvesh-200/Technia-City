import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Form from "./Pages/Form";
import Tables from "./Pages/Tables";
import Login from "./Pages/Login";
import Catform from "./Pages/Catform";
import Footer from "./Components/Footer";
import Videotable from "./Pages/Videotable";
import Subvideos from "./Pages/Subvideos";
import Feedback from "./Pages/Feedback";
import Analytics from "./Pages/Analytics";
import Addresponse from "./Pages/Addresponse";

function App() {
  return (
    <>
      {sessionStorage.getItem("tbl_a_admin") == null ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Router>
            <div class="wrapper">
              <Sidebar />
              <div id="content">
                <Header />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/table" element={<Tables />} />
                  <Route path="/videotable" element={<Videotable />} />
                  <Route path="/catform" element={<Catform />} />
                  <Route path="/subvideos" element={<Subvideos />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/analyticscount" element={<Analytics />} />
                  <Route path="/addresponse" element={<Addresponse />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
