import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Expenses from './Routes/Expenses';
import Setting from './Routes/Setting';
import Content from './components/Content';

const App: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<Expenses />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Content>
    </>
  );
}

export default App;