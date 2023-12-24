import React, { useState } from "react";
import FriendsList from "./FriendsList";
import { data } from "./data/data";
import Button from "./Components/Button";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";

function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [updatedData, setUpdatedData] = useState(data);

  const handleAddFriendForm = () => {
    setShowAddFriendForm((showFriendForm) => !showFriendForm);
  };

  const handleAddFriend = (friend) => {
    // setUpdatedData((data) => [...data, friend]);
    setUpdatedData(friend);
    setShowAddFriendForm(false);
  };

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriendForm(false);
  };

  const handleSplitCalculation = (
    splittingUserExpense,
    option,
    yourExpense
  ) => {
    setSelectedFriend(null);
    if (isNaN(splittingUserExpense)) return;

    const selectedFriendIndex = updatedData.findIndex(
      (friend) => friend.id === selectedFriend.id
    );

    if (selectedFriendIndex !== -1) {
      const updatedDataCopy = [...updatedData];

      if (option === "You") {
        updatedDataCopy[selectedFriendIndex].balance =
          updatedDataCopy[selectedFriendIndex].balance + splittingUserExpense;
        setUpdatedData(updatedDataCopy);
      } else {
        updatedDataCopy[selectedFriendIndex].balance =
          updatedDataCopy[selectedFriendIndex].balance - yourExpense;
      }
    } else {
      console.error("Selected friend not found in updatedData");
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          data={updatedData}
          onSelectingFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriendForm && (
          <FormAddFriend
            updatedData={updatedData}
            onAddFriend={handleAddFriend}
          />
        )}

        <Button onClick={handleAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitCalculation={handleSplitCalculation}
        />
      )}
    </div>
  );
}

export default App;
