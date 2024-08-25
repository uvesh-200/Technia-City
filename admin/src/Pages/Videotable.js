import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Videotable() {
  const [vtab, setVtab] = useState([]);
  const [edits, setEdits] = useState([]);
  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [amt, setAmt] = useState([]);
  const [days, setDays] = useState([]);
  const [type, setType] = useState();

  useEffect(() => {
    axios
      .get("https://technia-city-backend.onrender.com/api/videotable")
      .then((res) => setVtab(res.data));
  }, []);

  const Delete = (id) => {
    confirmAlert({
      title: "Delete Confirmation",
      message: `Are you sure you want to delete ${id}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const response = axios.post(
              "https://technia-city-backend.onrender.com/api/deletevid",
              {
                id: id,
              }
            );
            if (response) {
              toast.success("Video Deleted Successfully");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              toast.error("Something went wrong");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const Edit = (id) => {
    axios
      .post("https://technia-city-backend.onrender.com/api/editvid", {
        id: id,
      })
      .then((resp) => {
        setEdits(resp.data);
      });
  };

  const closemodal = () => {
    window.location = "/videotable";
  };

  const Update = () => {
    const id = document.getElementById("vid").value;
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const amt = document.getElementById("amt").value;
    const days = document.getElementById("days").value;
    const types = type;

    const formdata = new FormData();
    formdata.append("filename", filename);
    formdata.append("title", title);
    formdata.append("desc", desc);
    formdata.append("amt", amt);
    formdata.append("days", days);
    formdata.append("id", id);
    formdata.append("types", types);

    axios
      .post(
        "https://technia-city-backend.onrender.com/api/updatevideo",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((resp) => {
        toast.success("Video Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <div>
      <h2 class="main-title-w3layouts mb-2 text-center">View Videos</h2>
      <div class="outer-w3-agile mt-3">
        <table class="table">
          <thead>
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Days</th>
              <th scope="col">Video</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {vtab.map((data, index) => (
              <tr class="text-center">
                <th scope="row">{index + 1}</th>
                <td scope="row">{data.cat_name}</td>
                <td>{data.v_title}</td>
                <td>{data.v_description}</td>
                <td>{data.v_type}</td>
                <td>{data.v_amt}</td>
                <td>{data.v_days}</td>
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
                      data.v_video
                    }
                  />
                </video>
                <td>
                  <button class="btn btn-primary">
                    <MdEdit
                      size={20}
                      onClick={(e) => Edit(data.v_id)}
                      data-target="#myModal1"
                      data-toggle="modal"
                    />
                  </button>
                  <br />
                  <br />
                  <button class="btn btn-danger">
                    <MdDelete size={20} onClick={(e) => Delete(data.v_id)} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="myModal1" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                style={{ color: "blue" }}
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              {edits.map((vals) => {
                return (
                  <>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Update Video</h4>

                        <div class="basic-form">
                          <input
                            type="text"
                            value={vals.v_id}
                            id="vid"
                            hidden
                          />

                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <br />
                              <label>Title:</label>
                              <input
                                type="text"
                                defaultValue={vals.v_title}
                                onChange={(e) => setTitle(e.target.value)}
                                class="form-control"
                                id="title"
                              />
                            </div>
                          </div>
                          <div class="form-row">
                            <div class="form-group">
                              <label>Description:</label>
                              <textarea
                                class="form-control"
                                cols="60"
                                rows="2"
                                defaultValue={vals.v_description}
                                onChange={(e) => setDesc(e.target.value)}
                                id="desc"
                              ></textarea>
                            </div>
                          </div>

                          <label for="inputType2">Video Type:</label>
                          <br />
                          <div
                            class="form-check"
                            style={{ marginLeft: "20px" }}
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="radio"
                              value="free"
                              defaultChecked={vals.v_type == "free"}
                              // defaultChecked
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              Free
                            </label>
                          </div>
                          <div
                            class="form-check"
                            style={{ marginLeft: "20px" }}
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="radio"
                              value="premium"
                              defaultChecked={vals.v_type == "premium"}
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label class="form-check-label" for="gridRadios2">
                              Premium
                            </label>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label>Amount:</label>
                              <input
                                type="number"
                                defaultValue={vals.v_amt}
                                onChange={(e) => setAmt(e.target.value)}
                                class="form-control"
                                id="amt"
                              />
                            </div>
                            <br />
                            <div class="form-group col-md-6">
                              <label>Days:</label>
                              <input
                                type="number"
                                defaultValue={vals.v_days}
                                onChange={(e) => setDays(e.target.value)}
                                class="form-control"
                                id="days"
                              />
                            </div>
                          </div>
                          <div class="form-row"></div>
                          <div class="form-row">
                            <div class="form-group col-md-12">
                              <label>Video:</label>
                              <video
                                class="my-2"
                                style={{ width: "420px", height: "220px" }}
                                controls
                                controlsList="nodownload"
                              >
                                <source
                                  src={
                                    "https://technia-city-backend.onrender.com/public/" +
                                    vals.v_video
                                  }
                                />
                              </video>
                              <label>Update Video:</label>

                              <input
                                type="file"
                                // value={vals.v_video}
                                class="form-control"
                                id="file"
                                onChange={(e) => setFilename(e.target.files[0])}
                              />
                            </div>
                            {/* <video>
                              <source src={vals.v_video} defaultValue={vals.v_video} />
                            </video> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                        onClick={closemodal}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        onClick={Update}
                      >
                        Update
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videotable;
