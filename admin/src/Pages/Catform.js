import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Catform() {
  const Category = (e) => {
    e.preventDefault();
    var category = document.getElementById("category").value;
    // alert(category);

    axios
      .post("http://localhost:1234/api/category", {
        Category: category,
      })
      .then((rsp) => {
        if (category === "") {
          toast.error("Please Enter all details");
        } else {
          if (rsp.status == 200 || rsp.statusText === "OK") {
            toast.success("Category added Successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Something went wrong");
          }
        }
      });
  };
  return (
    <div>
      <h2 class="main-title-w3layouts mb-2 text-center">Add Category Form</h2>

      <section class="forms-section">
        <div class="outer-w3-agile mt-3">
          <h4 class="tittle-w3-agileits mb-4"></h4>
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="category4">Enter Category:</label>
                <input
                  type="text"
                  class="form-control"
                  id="category"
                  placeholder="Write Category"
                  required=""
                />
              </div>
            </div>

            <div class="text-center">
              <button
                onClick={Category}
                type="submit"
                class="btn  btn-primary "
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Catform;
