import React from "react";

const TodoList = ({ data , handleFavourite, deleteItem , loading}) => {

  if(loading){
    return <h2> Data is loading..</h2>;
  }
  return (
    <div>
      {data.map((ele, ind) => {
        return (
          <div key={ind}>
            <div className="content">
              <div className="label">
                <div>{ele.name}</div>
              </div>

              <div className="left">
                <div className="fav">
                  <i
                    className="fa fa-regular fa-star "
                    title="Favourite"
                    style={{ color: ele.isFav ? "gray" : "white" }}
                    onClick={() => handleFavourite(ele, ind)}
                  ></i>
                </div>
                <div className="trash">
                  <i
                    className=" fa fa-trash add-btn"
                    title="Delete"
                    onClick={() => deleteItem(ind)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
