import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

function Todo() {
  // console.log("Todo Component render");

  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [InputArray, setInputArray] = useState([]);
  const [toUpdateArray, setToUpdateArray] = useState([]);
  const [updateValueIndex, setUpdateValueIndex] = useState(-1);

  let id = sessionStorage.getItem("id");
  useEffect(() => {
    // id = sessionStorage.getItem("id");
    if (id) {
      fetch();
    }
    else {
      toast.error("Please SignUp First");
    }
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
    } else {
      if (id) {
        await axios
          .post(`https://todoback-jb7c.onrender.com/api/v2/addTask`, {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });

        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        fetch()

      } else {
        setInputArray([...InputArray, Inputs]);
        setInputs({ title: "", body: "" });
       
        toast.error("Your Task Is Not Saved ! Please SignUp");
      }
    }
  };

  const del = async (Cardid,InputArrayId) => {
    // console.table([id,Cardid,InputArrayId]);
    if (id) {
      await axios
        .delete(`https://todoback-jb7c.onrender.com/api/v2/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then(() => {
          // We are updating in InputArray to update the UI and minimize the no.of network call
          InputArray.splice(InputArrayId, "1");
          setInputArray([...InputArray]);
          toast.success("Your Task Is Deleted");
        });
    } else {
      toast.error("Please SignUp First");
    }
  };
  
  // It is for titile body
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  // it is for update dialog box to show up
  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  // console.log(InputArray);
  
  const update = (value) => {
    setUpdateValueIndex(value)
    setToUpdateArray(InputArray[value]); // Set the value to update in state
  };

  const updateUI = (updatetitle,updatebody) => {
    // console.log(updateValueIndex);
    if (updateValueIndex != -1) {
      InputArray[updateValueIndex].title = updatetitle;
      InputArray[updateValueIndex].body = updatebody;
      setInputArray([...InputArray]);
    }
  }

  async function fetch() {
    await axios
      .get(`https://todoback-jb7c.onrender.com/api/v2/getTasks/${id}`)
      .then((response) => {
        setInputArray(response.data.list);
      });
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div
          className="todo-main d-flex justify-content-center align-items-center my-4 flex-column "
          container
        >
          <div className="d-flex flex-column todo-inputs-div w-50 w-sm-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-3 p-2 todo-inputs"
              onClick={show}
              onChange={change}
              name="title"
              value={Inputs.title}
            />

            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              className="p-2 todo-inputs"
              onChange={change}
              name="body"
              value={Inputs.body}
            />
          </div>

          <div className="w-50 w-lg-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {InputArray &&
                InputArray.map((item, index) => {
                  return (
                    <div
                      className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                      key={index}
                    >
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        delid={del}
                        display={dis}
                        updateId={index}
                        toBeUpdate={update}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

      </div>

      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray} updateTodo={updateUI}/>
        </div>
      </div>
      
    </>
  );
}

export default Todo;
