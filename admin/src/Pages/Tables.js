import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Tables() {
  const [cat, setCat] = useState([]);
  const [edits, setEdits] = useState([]);
  const [name, setName] = useState([]);

  const closemodal = () => {
    window.location = "/table";
  };

  useEffect(() => {
    axios
      .get("https://technia-city-backend.onrender.com/api/viewcat")
      .then((res) => setCat(res.data));
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
              "https://technia-city-backend.onrender.com/api/deletecat",
              {
                id: id,
              }
            );
            if (response) {
              toast.success("Category Deleted Successfully");
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
      .post("https://technia-city-backend.onrender.com/api/editcat", {
        id: id,
      })
      .then((resp) => {
        setEdits(resp.data);
      }, []);
  };

  const Update = (id) => {
    const catname = document.getElementById("catname").value;
    // const catid = document.getElementById("cid").value;
    // alert(catname);
    axios
      .post("https://technia-city-backend.onrender.com/api/updatecat", {
        id: id,
        Catname: catname,
      })
      .then((res) => {
        toast.success("Category Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <div>
      <h2 class="main-title-w3layouts mb-2 text-center">View Category</h2>
      <div class="outer-w3-agile mt-3">
        <table class="table">
          <thead>
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cat.map((data, index) => (
              <tr class="text-center">
                <th scope="row">{index + 1}</th>
                <td>{data.cat_name}</td>
                <td>
                  <button
                    class="btn btn-primary"
                    data-target="#myModal1"
                    data-toggle="modal"
                  >
                    <MdEdit size={20} onClick={(e) => Edit(data.cat_id)} />
                  </button>
                  <button class="btn btn-danger ml-1">
                    <MdDelete size={20} onClick={(e) => Delete(data.cat_id)} />
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
                        <h4 class="card-title">Update Category</h4>

                        <div class="basic-form">
                          <input
                            type="text"
                            value={vals.cat_id}
                            id="cid"
                            hidden
                          />

                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label>Name:</label>
                              <input
                                type="text"
                                defaultValue={vals.cat_name}
                                onChange={(e) => setName(e.target.value)}
                                class="form-control"
                                id="catname"
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
                        onClick={(e) => Update(vals.cat_id)}
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

export default Tables;
