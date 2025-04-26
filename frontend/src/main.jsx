import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReminderCreate } from './pages/ReminderCreate.jsx';
import { ReminderDetail } from './pages/ReminderDetail.jsx';
import { ReminderEdit } from "./pages/ReminderEdit.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reminders/create" element={<ReminderCreate />} />
        <Route path="/reminders/:id/edit" element={<ReminderEdit />} />        
        <Route path="/reminders/:id" element={<ReminderDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
