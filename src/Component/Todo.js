import React, { useState, useEffect } from "react";
import "../App.css";
import GetLocal from './GetLocal';
import TodoList from '../Component/TodoList';
import Pagination from "../Component/Pagination";

const Todo = () => {
  
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState(GetLocal());

  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);

  const handleKeyPress = (e) => {

    // if (!inputData) {
    // } else if (e.key === "Enter") {
    //   setData([...data, inputData]);
    //   setInputData("");
    // }

    if (!inputData) {
    } else if (e.key === "Enter") {
      const tempData = [...data];
      const obj={
        isFav:false,
        name:inputData
      }
      tempData.push(obj);
      setData(tempData);
      setInputData("");
    }
    
  };

  const deleteItem = (id) => {
    console.log(id);
    const delItems = data.filter((ele,ind) => {
      return ind !== id;
    });
    setData(delItems);
  };

  useEffect(() => {
    localStorage.setItem("List Data", JSON.stringify(data));
  }, [data]);
 

  const handleFavourite = (ele,id) =>{
    console.log(id);

    if(!ele.isFav){
      const tempData = [...data]
      const new1 = tempData.splice(id, 1);
      // console.log(data);
      // console.log(new1);
      new1[0].isFav=true;
      tempData.unshift(new1[0]);
      setData(tempData); 
    }else{
      const tempData = [...data];
      tempData[id].isFav = false;
      setData(tempData); 
    }
    
  }

  useEffect(()=>{
    const getData = () =>{
      setLoading(true);
      const res = GetLocal([]);
      console.log(res);
      setLoading(false);
    }
    getData();
  },[]);

  const indexOfLastData = currentPage * postPerPage;
  const indexOfFirstData = indexOfLastData - postPerPage;
  const currentTask = inputData.slice(indexOfFirstData , indexOfLastData);
  
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
          <div className="search">
          </div>
        </div>
        <div className="body">
            {/* <TodoList data={inputData ? data.filter(item=>item.name.includes(inputData)) : data} handleFavourite={handleFavourite} deleteItem={deleteItem} /> */}
            <TodoList data={currentTask ? data.filter(item=>item.name.includes(currentTask)) : data} loading={loading} handleFavourite={handleFavourite} deleteItem={deleteItem} />
            {/* <Pagination postPerPage={postPerPage} totalPosts={data.length}/> */}
        </div>
      </div>
    </div>
  );
};

export default Todo;
