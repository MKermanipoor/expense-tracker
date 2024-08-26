import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div style={styles.sidebar}>
      <h2>Menu</h2>
      <nav>
        <ul style={styles.ul}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/setting">About</Link></li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh', // Full height of the viewport
    position: 'fixed' as 'fixed', // Sidebar stays fixed
    top: 0,
    left: 0,
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
  }
};

export default Sidebar;
