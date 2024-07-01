import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Feedback = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/api/feedback").then((resp) => {
      setData(resp.data);
    });
  }, []);

  const closemodal = () => {
    window.location = "/feedback";
  };

  const View = (id) => {
    axios
      .get("http://localhost:1234/api/viewfeedback", { params: { id: id } })
      .then((resp) => {
        setView(resp.data);
      });
  };

  const Delete = (id) => {
    confirmAlert({
      title: "confirm to delete",
      message: `Are you sure you want to delete ${id}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const response = axios.post(
              "http://localhost:1234/api/deletefeedback",
              {
                id: id,
              }
            );
            if (response) {
              toast.success("Feedback Deleted Successfully");
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
  return (
    <div>
      <div>
        <h2 class="main-title-w3layouts mb-2 text-center">Feedback</h2>
        <div class="outer-w3-agile mt-3">
          <table class="table">
            <thead>
              <tr class="text-center">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Subject</th>
                <th scope="col">Message</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr class="text-center">
                  <th scope="row">{index + 1}</th>
                  <td>{data.cn_name}</td>
                  <td>{data.cn_email}</td>
                  <td>{data.cn_number}</td>
                  <td>{data.cn_subject}</td>
                  <td>{data.cn_msg}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      data-target="#myModal1"
                      data-toggle="modal"
                    >
                      <CiViewList size={20} onClick={(e) => View(data.cn_id)} />
                    </button>
                    <button class="btn btn-danger ml-1">
                      <MdDelete size={20} onClick={(e) => Delete(data.cn_id)} />
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
                <h4 class="modal-title">View</h4>
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
                {view.map((vals) => {
                  return (
                    <>
                      <div class="card">
                        <div class="card-body">
                          <h4 class="card-title">View Feedback</h4>

                          <div class="basic-form">
                            <input
                              type="text"
                              value={vals.cn_id}
                              id="cid"
                              hidden
                            />
                            <div class="form-row">
                              <div class="form-group">
                                <label>Name:</label>
                                <input
                                  type="text"
                                  defaultValue={vals.cn_name}
                                  class="form-control"
                                />
                              </div>
                            </div>
                            <div class="form-row">
                              <div class="form-group">
                                <label>Number:</label>
                                <input
                                  type="number"
                                  defaultValue={vals.cn_number}
                                  class="form-control"
                                />
                              </div>
                            </div>
                            <div class="form-row">
                              <div class="form-group">
                                <label>Subject:</label>
                                <input
                                  type="text"
                                  defaultValue={vals.cn_subject}
                                  class="form-control"
                                />
                              </div>
                            </div>
                            <div class="form-row">
                              <div class="form-group">
                                <label>Message:</label>
                                <textarea
                                  class="form-control"
                                  cols="60"
                                  rows="2"
                                  defaultValue={vals.cn_msg}
                                  id="desc"
                                ></textarea>
                              </div>
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
                        {/* <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                          //   onClick={(e) => Update(vals.cat_id)}
                        >
                          Update
                        </button> */}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
