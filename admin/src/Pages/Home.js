import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip as tooltip,
  Title,
} from "chart.js";
ChartJS.register(
  Title,
  tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

function Home() {
  const [count, setCount] = useState(0);
  const [vcount, setVcount] = useState(0);
  const [subvcount, setSubvcount] = useState(0);
  const [vid, setVid] = useState([]);
  const [bar, setBar] = useState([]);

  let COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#33FFAC",
    "#D86AD5",
  ];
  const data = {
    labels: bar.map((val) => val.month),
    datasets: [
      {
        label: "Months",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        data: bar.map((val) => val.price),
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  useEffect(() => {
    axios
      .get("https://technia-city-backend.onrender.com/api/catcount")
      .then((resp) => {
        setCount(resp.data[0].count);
      });

    axios
      .get("https://technia-city-backend.onrender.com/api/vidcount")
      .then((resp) => {
        setVcount(resp.data[0].count);
      });

    axios
      .get("https://technia-city-backend.onrender.com/api/subscribevidcount")
      .then((resp) => {
        setSubvcount(resp.data[0].count);
      });

    axios
      .get("https://technia-city-backend.onrender.com/api/piechart")
      .then((res) => {
        setVid(res.data);
        console.log(res.data);
      });

    axios
      .get("https://technia-city-backend.onrender.com/api/barchart")
      .then((res) => {
        setBar(res.data);
        console.log(res.data);
      });
  }, []);

  useEffect(() => {
    window.$(document).ready(function () {
      window.$("#sidebarCollapse").on("click", function () {
        window.$("#sidebar").toggleClass("active");
      });
    });
  }, []);

  return (
    <div id="content">
      <div class="container-fluid">
        <div class="row">
          <div class="outer-w3-agile col-xl">
            <div class="stat-grid p-3 d-flex align-items-center justify-content-between bg-primary">
              <div class="s-l">
                <h5 style={{ fontFamily: "Poiret-One, cursive" }}>Category</h5>
                <p
                  class="paragraph-agileits-w3layouts"
                  style={{ fontFamily: "Poiret-One, cursive" }}
                >
                  Total Categories in our Web App
                </p>
              </div>
              <div class="s-r">
                <h6 style={{ fontFamily: "Poiret-One, cursive" }}>
                  {count}&nbsp;
                  <i class="far fa-edit"></i>
                </h6>
              </div>
            </div>
            <div class="stat-grid p-3 mt-3 d-flex align-items-center justify-content-between bg-success">
              <div class="s-l">
                <h5 style={{ fontFamily: "Poiret-One, cursive" }}>Videos</h5>
                <p
                  class="paragraph-agileits-w3layouts"
                  style={{ fontFamily: "Poiret-One, cursive" }}
                >
                  Total Videos in our Web App
                </p>
              </div>
              <div class="s-r">
                <h6 style={{ fontFamily: "Poiret-One, cursive" }}>
                  {vcount}&nbsp;
                  <i class="far fa-smile"></i>
                </h6>
              </div>
            </div>
            <div class="stat-grid p-3 mt-3 d-flex align-items-center justify-content-between bg-danger">
              <div class="s-l">
                <h5 style={{ fontFamily: "Poiret-One, cursive" }}>
                  Subscribed Videos
                </h5>
                <p
                  class="paragraph-agileits-w3layouts"
                  style={{
                    fontFamily: "Poiret-One, cursive",
                    fontSize: "10px",
                  }}
                >
                  Total Videos Subscribed by users in our Web App
                </p>
              </div>
              <div class="s-r">
                <h6 style={{ fontFamily: "Poiret-One, cursive" }}>
                  {subvcount}&nbsp;
                  <i class="fas fa-tasks"></i>
                </h6>
              </div>
            </div>

            {/* <div class="stat-grid p-3 mt-3 d-flex align-items-center justify-content-between bg-warning">
              <div class="s-l">
                <h5>Employees</h5>
                <p class="paragraph-agileits-w3layouts">Lorem Ipsum</p>
              </div>
              <div class="s-r">
                <h6>
                  190
                  <i class="fas fa-users"></i>
                </h6>
              </div>
            </div> */}
          </div>

          <div class="outer-w3-agile col-xl ml-xl-3 mt-xl-0 mt-3">
            <h4 class="tittle-w3-agileits mb-4">Pie Chart</h4>

            <PieChart width={400} height={400}>
              <Pie
                data={vid}
                dataKey="count"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
                labelLine="false"
              >
                {vid.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </div>

          <div class="outer-w3-agile col-xl mt-xl-3 mt-5">
            <h4 class="tittle-w3-agileits mb-4">Bar Chart</h4>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
