import { useEffect, useState } from "react";
import "../css/Todolist.css";
import Listitem from "./ListItem";
export default function Todolist({}) {
  const [newItemText, setNewItemText] = useState("");
  const [list, setList] = useState(JSON.parse(localStorage.getItem("List")));

  useEffect(() => {
    const newList = JSON.stringify(list);

    //Updates the data (typically this is our create in CRUD)
    localStorage.setItem("List", newList);
  }, [list]);

  const getList = () => {
    return JSON.parse(localStorage.getItem("List"));
  };

  const createItem = (e) => {
    e.preventDefault();

    const currentList = getList();
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

    //The use effect updates the data
    setList(currentList);

    setNewItemText("");

    console.log("Task:", newItemText, '"created"');
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

  const updateText = (itemKey, text) => {
    var currentList = getList();
    currentList[itemKey].text = text;
    setList(currentList);
  };
  return (
    <>
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
          <Listitem
            itemKey={key}
            key={key}
            text={value.text}
            status={value.status}
            updateText={updateText}
            removeItem={removeItem}
            checkItem={checkItem}
          />
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
