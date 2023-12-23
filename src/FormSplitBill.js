import React, { useEffect, useState } from "react";
import Button from "./Components/Button";

function FormSplitBill({ selectedFriend, onSplitCalculation }) {
  const [bill, setBill] = useState();
  const [yourExpense, setYourExpense] = useState();
  const [selectedOption, setSelectedOption] = useState("You");

  let splitingUserExpense =
    Number(yourExpense) > Number(bill)
      ? setYourExpense((currYourExpense) => currYourExpense.slice(0, 2))
      : Number(bill) - Number(yourExpense);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bill && yourExpense && selectedOption) {
      onSplitCalculation(splitingUserExpense, selectedOption);
    }
  };

  useEffect(() => {
    setBill("");
    setYourExpense("");
    setSelectedOption("You");
  }, []);

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => setYourExpense(e.target.value)}
      />

      <label>👫 {selectedFriend.name} expense</label>
      <input
        type="text"
        disabled
        value={splitingUserExpense ? splitingUserExpense : bill}
      />

      <label>🤑 Who is paying the bill</label>
      <select onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default FormSplitBill;
