import React from "react";
import { useReminderCreate } from "../hooks/useReminders";
import { useNavigate } from "react-router";

export function ReminderCreate() {
    const { reminder_name, setName, loading, error, successful, createReminder } =
        useReminderCreate();
    const navigate = useNavigate();

    if(successful) {
        navigate("/");
    }

    if(loading) {
        return <>
        <h1>Loading...</h1>
        </>
    }

    if(error) {
        return <>
        <h1>Uh Oh!</h1>
        </>
    }

    return <>
        <h1>Create a Reminder</h1>
        <form onSubmit={createReminder}>
            <input type="text" value={reminder_name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Create Reminder</button>
        </form>
    </>
}
