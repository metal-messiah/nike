import React from 'react';

import './header.scss';

const HeaderComponent: React.FC<{ setShowForm: Function }> = props => {
  const { setShowForm } = props;
  return (
    <h1>
      HobbyPocket
      <div className='add-hobby'>
        <span>Add Hobby</span>
        <button type='button' className='add-hobby-button' onClick={() => setShowForm(true)}>
          <i className='fas fa-plus-circle' />
        </button>
      </div>
    </h1>
  );
};

export default HeaderComponent;
