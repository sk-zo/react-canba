import React, { useState } from 'react';

function Header({ pages, addPage, setSelectedPage }) {
  const [pageName, setPageName] = useState('');

  const handleAddPage = () => {
    if (pageName.trim()) {
      addPage(pageName.trim());
      setPageName('');
    }
  };

  return (
    <div className="header">
      <input
        type="text"
        value={pageName}
        onChange={(e) => setPageName(e.target.value)}
        placeholder="Page Name"
      />
      <button onClick={handleAddPage}>Add Page</button>
      <div className="page-list">
        {pages.map((page) => (
          <button key={page.id} onClick={() => setSelectedPage(page.id)}>
            {page.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Header;
