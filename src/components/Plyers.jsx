import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setplayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing(!isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(event) {
    console.log(event.value);
    setplayerName(event.target.value);
  }
  let editableplayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editableplayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <div className="player-info">
        {editableplayerName}
        <span className="player-symbol">{symbol}</span>
      </div>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
