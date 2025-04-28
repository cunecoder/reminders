/*
main.jsx
Description: This file is the page where routing can be found.
Written by: Abe Gomez and David Marin for project with teamates: (Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/26/2025

*/

import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReminderCreate } from './pages/ReminderCreate.jsx';
import { ReminderDetail } from './pages/ReminderDetail.jsx';
import { ReminderEdit } from "./pages/ReminderEdit.jsx";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/reminders/create" element={<ReminderCreate />} />
          <Route path="/reminders/:id/edit" element={<ReminderEdit />} />        
          <Route path="/reminders/:id" element={<ReminderDetail />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
