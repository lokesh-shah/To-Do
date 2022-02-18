
const GetLocal = () => {
    let listData = localStorage.getItem("List Data");
    // console.log(listData);
    if (listData) {
      return JSON.parse(localStorage.getItem("List Data"));
    } else {
      return [];
    }
  };

export default GetLocal;