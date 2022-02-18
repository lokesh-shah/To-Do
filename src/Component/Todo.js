import React, { useState, useEffect } from "react";
import "../App.css";
import GetLocal from "./GetLocal";
import TodoList from "../Component/TodoList";
import Pagination from "../Component/Pagination";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState(GetLocal());

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);

  const handleKeyPress = (e) => {
    if (!inputData) {
    } else if (e.key === "Enter") {
      const tempData = [...data];
      const obj = {
        isFav: false,
        name: inputData,
        uuid: uuidv4(),
      };
      tempData.push(obj);
      setData(tempData);
      setInputData("");
    }
  };

  const deleteItem = (task) => {
    // console.log(task);
    let text = "Are you sure ?";

    if (window.confirm(text) == true) {
      const delItems = data.filter((ele, ind) => {
        return ele.uuid !== task.uuid;
      });
      setData(delItems);
    }
  };

  useEffect(() => {
    localStorage.setItem("List Data", JSON.stringify(data));
  }, [data]);

  const handleFavourite = (ele, id) => {
    console.log(id);

    if (!ele.isFav) {
      const tempData = [...data];
      const tempIndex = tempData.findIndex((item) => item.uuid === ele.uuid);
      const new1 = tempData.splice(tempIndex, 1);
      // console.log(data);
      // console.log(new1);
      new1[0].isFav = true;
      tempData.unshift(new1[0]);
      setData(tempData);
    } else {
      const tempData = [...data];
      const tempIndex = tempData.findIndex((item) => item.uuid === ele.uuid);
      tempData[tempIndex].isFav = false;
      setData(tempData);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await GetLocal([])
      // console.log(res);
      setLoading(false);
    };
    getData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-div">
      <div className="container">
        <div className="heading">
          <div className="todo">Todo list</div>
        </div>
        <div className="input">
          <input
            placeholder="Enter your todo task"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="search"></div>
        </div>
        <div className="body">
          {/* <TodoList data={inputData ? data.filter(item=>item.name.includes(inputData)) : data} handleFavourite={handleFavourite} deleteItem={deleteItem} /> */}
          <TodoList
            data={
              inputData
                ? data.filter((item) => item.name.includes(inputData))
                : data
            }
            loading={loading}
            handleFavourite={handleFavourite}
            deleteItem={deleteItem}
            currentPage={currentPage}
            postPerPage={postPerPage}
          />
        </div>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Todo;
