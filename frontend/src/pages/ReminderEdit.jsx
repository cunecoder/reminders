/*
ReminderEdit.jsx
Description: This file is the page where reminders can be edited.
Written by: David Marin for project with teammates: (Abe Gomez and Noah Leeper)
Created on: 4/25/2025
Last Updated on: 4/26/2025

*/

import React from "react";
import { useEffect } from "react";
import { useReminderEdit, useReminderDetail } from "../hooks/useReminders";
import { useNavigate, useParams } from "react-router";

export function ReminderEdit() {
    /** Personal note: Get id from url */
    const { id } = useParams();
    // const { reminder } = useReminderDetail(id)
    const { reminder, loading: loadingDetail, error: errorDetail } = useReminderDetail(id);
    const navigate = useNavigate();
   
    /** Testing this from chat
     */
   
    if (loadingDetail) {
        return <h1>Loading Reminder...</h1>;
    }

    if (errorDetail || !reminder) {
        return <h1>Uh Oh! Reminder not found.</h1>;
    }

    const { name, setName, remindby, setRemindBy, createdat, setCreatedAt, updatedat, setUpdatedAt, loading, error, successful, editReminder  } = useReminderEdit(reminder)


 
    useEffect(() => {
        if (successful) {
            navigate(`/reminder/${id}`);
        }
    }, [successful, navigate, id]);
    // if (successful) {
    //     navigate(`/reminder/${id}`);
    // }

    if(loading) {
        return <>
        <h1>Saving Changes...</h1>
        </>
    }
    
    if(error) {
        return <>
        <h1>Uh Oh! Failed to edit "{reminder.remind_name}"</h1>
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
    {/* Might not need this part
                    <h1>{reminder.remind_name} {reminder.id}</h1>
                    <h1>{reminder.remind_by}</h1>
                    <h1>{reminder.created_at}</h1>
                    <h1>{reminder.updated_at}</h1>
    </>
    */}
    </>
}