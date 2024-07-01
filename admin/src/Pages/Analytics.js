import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [vtab, setVtab] = useState([]);
  const [count, setCount] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/videotable")
      .then((res) => setCount(res.data));
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:1234/api/analyticsvideocount", {
        start: start,
        end: end,
      })
      .then((res) => {
        console.log(res.count);
        setCount(res.data);
      });
  }, [start, end]);
  return (
    <div>
      <h2 class="main-title-w3layouts mb-2 text-center">
        Subscribed Video Count
      </h2>
      <hr style={{ border: "1px solid #C0C0C0" }} />
      <div class="mt-4">
        Enter Start Date:
        <input
          type="date"
          name="date"
          onChange={(e) => setStart(e.target.value)}
        />
        &nbsp;&nbsp; Enter End Date:
        <input
          type="date"
          name="date"
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div class="outer-w3-agile mt-3">
        <table class="table">
          <thead>
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Video</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {count.map((data, index) => {
              return (
                <>
                  <tr class="text-center">
                    <th scope="row">{index + 1}</th>
                    <td scope="row">{data.cat_id}</td>
                    <td>{data.v_title}</td>
                    <td>{data.v_description}</td>
                    <td>{data.v_type}</td>

                    <video
                      class="mb-3 mt-1"
                      style={{ width: "200px", height: "120px" }}
                      controls
                      controlsList="nodownload"
                    >
                      <source
                        class="mb-3"
                        src={"http://localhost:1234/public/" + data.v_video}
                      />
                    </video>
                    <td>{data.count}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
