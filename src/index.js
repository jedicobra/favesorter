import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTemplate from './pages/EditTemplate';
import ChoiceArea from './pages/ChoiceArea';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import '../src/css/App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <br></br>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="game" element={<ChoiceArea />} />
          <Route path="edit" element={<EditTemplate />} />
          <Route path="*" element={<p>Not found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
