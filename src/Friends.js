import React from "react";
import Button from "./Components/Button";

function Friends({ friend, onSplitBillForm, selectedFriend }) {
  const choosenFriend = selectedFriend ? selectedFriend.id === friend.id : "";

  return (
    <li className={choosenFriend ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      ) : friend.balance < 0 ? (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <Button onClick={() => onSplitBillForm(friend)}>
        {choosenFriend ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friends;
