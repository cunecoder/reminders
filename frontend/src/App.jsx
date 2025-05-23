/*
App.jsx
Description: This file is the home page where reminders are listed and can be viewed, edits, and created.
Written by: Abe Gomez for project with teamates: (David Marin and Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/27/2025

*/

import { Link } from "react-router-dom";
import './App.css';
import { useRemindersList, useRemindersDelete } from './hooks/useReminders';
import { useParams } from "react-router";
import { Button } from "@mantine/core";

function App() {
  /*
  * Establish the main home page where all reminders and their options can be viewed.
  */

  const {reminders, setReminders, loading, error } = useRemindersList();
  const {deleteReminder, loading: deleting, error: deleteError, successful} = useRemindersDelete();
  const { id } = useParams();

  // Remove reminder from UI instantly
  const handleDelete = (id) => {
      deleteReminder(id);
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  if (loading) {
    return(
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (error) {
    return(
      <> 
        <h1>Uh Oh!</h1>
      </>
    );
  }

    // Styling for front end and changes when inputs are recorded (text, widgets, and button).
    return (
    <>
      <h1>Reminders</h1>
      <Link to="/reminders/create">Create a Reminder</Link>
      
      {/** Lists all reminders with link to their detail page */}
      {reminders.map(reminder => (
        <div key={reminder.id}>
          <h2>{reminder.remind_name}</h2>

          {/** Links to the detail page for specific reminder */}
          <Link to={`/reminders/${reminder.id}`}>View Reminder "{reminder.remind_name}"</Link>

          <div>
            <Button color="gray" onClick={() => handleDelete(reminder.id)}>Delete Reminder "{reminder.remind_name}"</Button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App
