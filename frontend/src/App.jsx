import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import { useRemindersList } from './hooks/useReminders'

function App() {
  const {reminders, loading, error } = useRemindersList();

  console.log("Reminders:", reminders);


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
        </div>
      ))}
    </>
  );
}

export default App

/**
 * Return was originally:
 * <>
      <h1>Reminders</h1>
      <Link to="/reminders/create">Create a Reminder</Link>
      {reminders.map(reminder => <h2 key={reminder.id}>{reminder.remind_name}</h2>)}
    </>
 */