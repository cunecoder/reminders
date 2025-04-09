import { Link } from "react-router"
import './App.css'
import { useRemindersList } from './hooks/useReminders'

function App() {
  const {reminders, loading, error } = useRemindersList();

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
      {reminders.map(reminder => <h2 key={reminder.id}>{reminder.remind_name}</h2>)}
    </>
  );
}

export default App
