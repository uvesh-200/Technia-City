import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Addresponse = () => {
  const [res, setRes] = useState([]);
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);

  const closemodal = () => {
    window.location = "/addresponse";
  };

  useEffect(() => {
    axios
      .get("https://technia-city-backend.onrender.com/api/chatbotquestions")
      .then((res) => setRes(res.data));
  }, []);

  const Delete = (id) => {
    confirmAlert({
      title: "confirm to delete",
      message: `Are you sure you want to delete ${id}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const response = axios.post(
              "https://technia-city-backend.onrender.com/api/deleteques",
              {
                id: id,
              }
            );
            if (response) {
              toast.success("Question Deleted Successfully");
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
      .post("https://technia-city-backend.onrender.com/api/editresponse", {
        id: id,
      })
      .then((res) => setData(res.data));
  };

  const Update = (id) => {
    axios
      .post("https://technia-city-backend.onrender.com/api/updateresponse", {
        id: id,
        response: response,
      })
      .then((res) => {
        if (res) {
          toast.success("Response added Succesfully");
          setTimeout(() => {
            window.location = "/addresponse";
          }, 1000);
        } else {
          toast.error("Something went wrong");
          setTimeout(() => {
            window.location = "/addresponse";
          }, 1000);
        }
      });
  };

  return (
    <div>
      <div>
        <h2 class="main-title-w3layouts mb-2 text-center">Add Response</h2>
        <div class="outer-w3-agile mt-3">
          <table class="table">
            <thead>
              <tr class="text-center">
                <th scope="col">#</th>
                <th scope="col">Chatbot questions</th>
                <th scope="col">Action</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {res.map((data, index) => (
                <tr class="text-center">
                  <th scope="row">{index + 1}</th>
                  <td>{data.q_question}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      data-target="#myModal1"
                      data-toggle="modal"
                    >
                      <MdAdd size={20} onClick={(e) => Edit(data.q_id)} />
                    </button>
                    <button class="btn btn-danger ml-1">
                      <MdDelete size={20} onClick={(e) => Delete(data.q_id)} />
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
                {/* <h4 class="modal-title"></h4> */}
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
                {data.map((vals) => {
                  return (
                    <>
                      <div class="card">
                        <div class="card-body">
                          <h4 class="card-title">Add Response</h4>

                          <div class="basic-form">
                            <div class="form-row">
                              <div class="form-group col-md-12">
                                <label>Question:</label>
                                <textarea
                                  type="text"
                                  value={vals.q_question}
                                  class="form-control"
                                />
                                <label>Response:</label>
                                <textarea
                                  type="text"
                                  onChange={(e) => setResponse(e.target.value)}
                                  class="form-control"
                                />
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
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                          onClick={(e) => Update(vals.q_id)}
                        >
                          Add
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
    </div>
  );
};

export default Addresponse;
