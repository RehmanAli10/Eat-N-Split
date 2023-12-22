import React, { useState } from "react";
import FriendsList from "./FriendsList";
import { data } from "./data/data";
import Button from "./Components/Button";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";

function App() {
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [updatedData, setUpdatedData] = useState(data);

  console.log("Selected Friend", selectedFriend);

  console.log(updatedData);

  const handleAddFriendForm = () => {
    setShowFriendForm((showFriendForm) => !showFriendForm);
  };

  const handleAddFriend = (friend) => {
    setUpdatedData(friend);
  };

  const handleSplitBillForm = (friend) => {
    setSelectedFriend(friend);
  };

  const handleSplitCalculation = (splittingUserExpense, option) => {
    // Ensure splittingUserExpense is a valid number
    if (isNaN(splittingUserExpense)) {
      console.error("Invalid splittingUserExpense:", splittingUserExpense);
      return;
    }

    // Find the selected friend in the updatedData array
    const selectedFriendIndex = updatedData.findIndex(
      (friend) => friend.id === selectedFriend.id
    );

    if (selectedFriendIndex !== -1) {
      // Update the balance based on the selected option
      const updatedDataCopy = [...updatedData];
      if (option === "you") {
        updatedDataCopy[selectedFriendIndex].balance += splittingUserExpense;
      } else {
        updatedDataCopy[selectedFriendIndex].balance -= splittingUserExpense;
      }

      // Log the updated data for debugging
      console.log("Updated data:", updatedDataCopy);

      // Set the updated data in the state
      setUpdatedData(updatedDataCopy);
    } else {
      console.error("Selected friend not found in updatedData");
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          data={updatedData}
          onSplitBillForm={handleSplitBillForm}
          selectedFriend={selectedFriend}
        />

        {showFriendForm && (
          <FormAddFriend
            updatedData={updatedData}
            onAddFriend={handleAddFriend}
          />
        )}

        <Button onClick={handleAddFriendForm}>
          {showFriendForm ? "Close" : "Add friend"}
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
