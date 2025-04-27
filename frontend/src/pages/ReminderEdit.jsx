/*
ReminderEdit.jsx
Description: This file is the page where reminders can be edited.
Written by: David Marin and Abe Gomez for project with teammates: (Noah Leeper)
Created on: 4/25/2025
Last Updated on: 4/26/2025

*/

import React from "react";
import { useEffect } from "react";
import { useReminderEdit, useReminderDetail } from "../hooks/useReminders";
import { useNavigate, useParams } from "react-router";

export function ReminderEdit() {
    // Grab id to edit specific reminder
    const { id } = useParams();
    const { reminder } = useReminderDetail(id);
    const { name, setName, remindby, setRemindBy, createdat, setCreatedAt, updatedat, setUpdatedAt, loading, error, successful, editReminder  } = 
        useReminderEdit(reminder);
    const navigate = useNavigate();
 
    useEffect(() => {
        if (successful) {
            navigate(`/reminders/${id}`);
        }
    }, [successful]);

    if(loading) {
        return <>
        <h1>Loading...</h1>
        </>
    }
    
    if(error) {
        return <>
        <h1>Uh Oh! "{reminder.remind_name}"</h1>
        </>
    }
    
    return <>

    <h1>Editing Reminder: "{reminder.remind_name}"</h1>
    <form onSubmit={editReminder}>
        <div>
        <label>Edit Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
        </label>
        </div>
        <div>
        <label>Edit time to Remind By:
            <input type="datetime-local" value={remindby} onChange={(e) => setRemindBy(e.target.value)} />
        </label>
        </div>
        <button type="submit">Edit Reminder</button>
    </form>
    </>
}