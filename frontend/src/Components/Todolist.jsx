import { useEffect, useState } from "react";
import '../css/Todolist.css'
export default function Todolist({}) {
  const [newItemText, setNewItemText] = useState("");
  const [list, setList] = useState(JSON.parse(localStorage.getItem("List")));
  const itemTemplate = {
    text: "Name",
    position: 0,
    status: "checked",
    id: "increment by 1",
  };

  useEffect(() => {
    const newList = JSON.stringify(list);

    //Updates the data (typically this is our create in CRUD)
    localStorage.setItem("List", newList);
  }, [list]);

  const getList = () => {
    console.log(JSON.parse(localStorage.getItem("List")));
    return JSON.parse(localStorage.getItem("List"));
  };

  const createItem = (e) => {
    e.preventDefault();
    
    const currentList = getList();
    console.log(currentList);
    // const newItem = newItemText;
    const listSize = Object.keys(currentList).length;
    
    const newItemId = "" + (listSize + 1);
    const newItemData = {
      text: newItemText,
      status: false,
      position: listSize + 1,
    };

    //Set a new item
    currentList[newItemId] = newItemData;

    console.log(listSize, currentList);
    
    //The use effect updates the data
    setList(currentList);

    setNewItemText("");

    console.log("Task:", newItemText, '"created"');
    //Localstorage only stores strings
    // localStorage.setItem("List", localStorage.getItem("List")["Test"])
  };

  const checkItem = (itemKey) => {
    var currentList = getList();

    currentList[itemKey].status = !currentList[itemKey].status;

    setList(currentList);
  };

  const removeItem = (itemKey) => {
    var currentList = getList();
    delete currentList[itemKey];
    setList(currentList);
  };

  return (
    <>
      <div>This Is Your List</div>

      <form onSubmit={createItem}>
        <input
          placeholder="Enter Item"
          onChange={(e) => {
            setNewItemText(e.target.value);
          }}
          value={newItemText}
        ></input>
        <button>Create</button>
      </form>
      {/*  ○↑↓● */}
      <div>
        {Object.entries(list).map(([key, value]) => (
          <div key={key}>
            {/* This is Check Button */}
            <button
              className="check-button"
              onClick={() => {
                checkItem(key);
              }}
            >
              {/* Conditional Formatting for button */}
              {value.status ? "●" : "○"}
            </button>

            {value.text}

            <button
              className="close-button"
              onClick={() => {
                removeItem(key);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("List");
          localStorage.setItem("List", JSON.stringify({}));
          setList(getList);
        }}
      >
        {" "}
        Clear List
      </button>

      <button
        onClick={() => {
          //Do Stuff
          console.log(Object.keys(list));
        }}
      >
        Do Something
      </button>
    </>
  );
}
