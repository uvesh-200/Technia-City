import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlater from "./pages/watchlater";
import Subscription from "./pages/subscription";
import Videos from "./pages/videos";
import History from "./pages/History";
import Profile from "./pages/profile";
import Contact from "./pages/Contact";
import Videodetails from "./pages/Videodetails";
import Forgotpass from "./pages/Forgotpass";
import Searchpage from "./pages/Searchpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/managewatchlater" element={<Watchlater />} />
          <Route exact path="/subscription" element={<Subscription />} />
          <Route exact path="/managehistory" element={<History />} />
          <Route exact path="/videos" element={<Videos />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/videodetails" element={<Videodetails />} />
          <Route exact path="/forgotpassword" element={<Forgotpass />} />
          <Route exact path="/searchpage" element={<Searchpage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
