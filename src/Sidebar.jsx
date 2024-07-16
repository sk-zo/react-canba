import React from 'react';
import './Sidebar.css';

function Sidebar({ addTextComponent }) {
  return (
    <div className="sidebar">
      <button onClick={addTextComponent}>Add Text</button>
    </div>
  );
}

export default Sidebar;
