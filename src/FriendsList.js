import React from "react";
import Friends from "./Friends";
function FriendsList({ data, onSplitBillForm, selectedFriend }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friends
          key={friend.id}
          friend={friend}
          onSplitBillForm={onSplitBillForm}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
