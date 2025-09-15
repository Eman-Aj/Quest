import { useState } from "react";

export default function Listitem({
  itemKey,
  text,
  status,
  removeItem,
  updateText,
  checkItem,
}) {
  const [isEditing, setIsEditing] = useState(""); //Item Key
  const [itemText, setItemText] = useState(text);

  return (
    <>
      <div className="list-item" key={itemKey}>
        {/* This is Check Button */}
        <button
          className="check-button"
          onClick={() => {
            checkItem(itemKey);
          }}
        >
          {/* Conditional Formatting for button */}
          {status ? "●" : "○"}
        </button>

        {isEditing === itemKey ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateText(itemKey, itemText);
              setIsEditing("");
            }}
          >
            <input
              defaultValue={text}
              onChange={(e) => {
                setItemText(e.target.value);
              }}
            ></input>
          </form>
        ) : (
          <h3
            onClick={() => {
              setIsEditing(itemKey);
            }}
          >
            {text}
          </h3>
        )}

        <button
          className="close-button"
          onClick={() => {
            removeItem(itemKey);
          }}
        >
          ✘
        </button>
      </div>
    </>
  );
}
