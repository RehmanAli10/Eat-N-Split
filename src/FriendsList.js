import React from "react";
import Friends from "./Friends";
function FriendsList({ data, onSelectingFriend, selectedFriend }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friends
          key={friend.id}
          friend={friend}
          onSelectingFriend={onSelectingFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
