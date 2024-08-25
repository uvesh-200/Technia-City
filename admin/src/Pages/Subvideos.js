import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Subvideos = () => {
  const [video, setvideo] = useState([]);
  const [search, setSearch] = useState();
  const [searchresult, setSearchresult] = useState([]);

  useEffect(() => {
    const shs = document.getElementById("shs").value;
    // alert(shs)
    if (shs === "") {
      axios
        .get("https://technia-city-backend.onrender.com/api/subscribevideos")
        .then((resp) => {
          setvideo(resp.data);
        });
    } else {
      axios
        .get("https://technia-city-backend.onrender.com/api/subvideosearch", {
          params: { searches: search },
        })
        .then((resp) => {
          setvideo(resp.data);
        });
    }
  }, [search]);

  return (
    <div>
      <div>
        <h2 class="main-title-w3layouts mb-2 text-center">Subscribed Videos</h2>
        <form class="form-inline search-form outer-w3-agile col-md-15">
          <input
            style={{ border: "1px solid gray" }}
            class="form-control col-md-11"
            type="search"
            id="shs"
            placeholder="Search any username"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div class="outer-w3-agile mt-3">
          <table class="table">
            <thead>
              <tr class="text-center">
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Amount</th>
                <th scope="col">Subscribe on</th>
                <th scope="col">Subscribe Video</th>
                <th scope="col">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {video.map((val, index) => {
                var date = new Date().toISOString();
                return date >= val.sub_end ? (
                  <tr class="text-center" style={{ background: "#FF474C" }}>
                    <th scope="row">{index + 1}</th>
                    <td>{val.r_name}</td>
                    <td>{val.r_email}</td>
                    <td>{val.sub_price}</td>
                    <td>{new Date(val.sub_start).toDateString()}</td>
                    <video
                      class="mb-3 mt-1"
                      style={{ width: "200px", height: "120px" }}
                      controls
                      controlsList="nodownload"
                    >
                      <source
                        class="mb-3"
                        src={
                          "https://technia-city-backend.onrender.com/public/" +
                          val.v_video
                        }
                      />
                    </video>
                    <td>{new Date(val.sub_end).toDateString()}</td>
                  </tr>
                ) : (
                  <tr class="text-center">
                    <th scope="row">{index + 1}</th>
                    <td>{val.r_name}</td>
                    <td>{val.r_email}</td>
                    <td>{val.sub_price}</td>
                    <td>{new Date(val.sub_start).toDateString()}</td>
                    <video
                      class="mb-3 mt-1"
                      style={{ width: "200px", height: "120px" }}
                      controls
                      controlsList="nodownload"
                    >
                      <source
                        class="mb-3"
                        src={
                          "https://technia-city-backend.onrender.com/public/" +
                          val.v_video
                        }
                      />
                    </video>
                    <td>{new Date(val.sub_end).toDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subvideos;
