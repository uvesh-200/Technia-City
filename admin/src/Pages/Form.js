import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Form() {
  const [filename, setFilename] = useState("");
  const [cat, setCat] = useState([]);
  const [sel, setSel] = useState();
  //  const [catid, setcatid] = useState();

  useEffect(() => {
    axios
      .get("https://technia-city-backend.onrender.com/api/viewcat")
      .then((resp) => setCat(resp.data));
  }, []);

  const SubmitData = (e) => {
    e.preventDefault();
    var catid = document.getElementById("catid").value;
    //alert(catid);
    var title = document.getElementById("title").value;
    // alert(title);
    var desc = document.getElementById("description").value;
    // alert(desc);
    var amt = document.getElementById("amount").value;
    //alert(amt);
    var days = document.getElementById("days").value;
    //alert(days);
    var type = sel;
    // alert(type);

    let formdata = new FormData();
    formdata.append("filename", filename);
    formdata.append("Title", title);
    formdata.append("Description", desc);
    formdata.append("Amount", amt);
    formdata.append("Days", days);
    formdata.append("Catid", catid);
    formdata.append("Type", type);

    axios
      .post(
        "https://technia-city-backend.onrender.com/api/addvideo",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((rsp) => {
        if (title === "") {
          toast.error("Please Enter all details");
        } else if (rsp.status === 200 || rsp.statusText === "OK") {
          toast.success("Video uploaded Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
  return (
    <>
      <h2 class="main-title-w3layouts mb-2 text-center">Upload Video</h2>

      <section class="forms-section">
        <div class="outer-w3-agile mt-3">
          <h4 class="tittle-w3-agileits mb-4"></h4>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Select Category:</label>

                <select class="form-control col-md-6" id="catid">
                  <option selected>select category</option>
                  {cat.map((category) => (
                    <option class="form-control" value={category.cat_id}>
                      {category.cat_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputTitle4">Title:</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Title"
                  required=""
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputDescription">Description:</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="Description"
                required=""
              />
            </div>
            <div class="form-group">
              <label for="inputVideos2">Upload Videos:</label>
              <input
                type="file"
                class="form-control"
                required=""
                onChange={(e) => setFilename(e.target.files[0])}
              />
            </div>
            <div class="form-group">
              <label for="inputType2">Video Type:</label>
              <br />
              <div class="form-check" style={{ marginLeft: "20px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="free"
                  // defaultChecked
                  onChange={(e) => setSel(e.target.value)}
                />
                <label class="form-check-label" for="gridRadios1">
                  Free
                </label>
              </div>
              <div class="form-check" style={{ marginLeft: "20px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="premium"
                  onChange={(e) => setSel(e.target.value)}
                />
                <label class="form-check-label" for="gridRadios2">
                  Premium
                </label>
              </div>
              <br />
              {sel === "premium" ? (
                <>
                  <div class="form-group">
                    <label for="inputAmount">Amount:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="amount"
                      placeholder="Amount"
                    />
                  </div>

                  <div class="form-group">
                    <label for="inputDays">Days:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="days"
                      placeholder="Days"
                    />
                  </div>
                </>
              ) : (
                <div></div>
              )}
              {sel === "free" ? (
                <>
                  <div class="form-group">
                    <label for="inputAmount">Amount:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="amount"
                      placeholder="Amount"
                      value="0"
                    />
                  </div>

                  <div class="form-group">
                    <label for="inputDays">Days:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="days"
                      placeholder="Days"
                      value="0"
                    />
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>

            <button type="submit" class="btn btn-primary" onClick={SubmitData}>
              Upload
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Form;
