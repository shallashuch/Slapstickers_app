import React from "react";
import "../assets/scss/App.scss";

function GiveAName({ title, setTitle }) {
  return (
    <div className="GiveAName">
      <p className="title">Give it a name</p>
      <input
        type="text"
        value={title}
        placeholder="SLAPPE!"
        onChange={(ev) => setTitle(ev.target.value)}
      />
    </div>
  );
}

export default GiveAName;
