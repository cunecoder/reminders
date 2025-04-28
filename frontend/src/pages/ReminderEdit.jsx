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
import { DateTimePicker } from "@mantine/dates"
import { TextInput } from "@mantine/core"
import "@mantine/dates/styles.css"
import "@mantine/core/styles.css"

export function ReminderEdit() {
    // Grab id to edit specific reminder
    const { id } = useParams();
    const { reminder } = useReminderDetail(id);
    const { name, setName, remindBy, setRemindBy, loading, error, successful, editReminder  } = 
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
        <TextInput 
            type="text" 
            variant="filled" 
            radius="xl" 
            placeholder="Edit Reminder Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
        <h1></h1>
        <DateTimePicker
            value={remindBy}
            valueFormat="MM/DD/YYYY  hh:mm A"
            variant="filled"
            radius="xl"
            onChange={(date) => setRemindBy(date)}
            placeholder="Pick date and type a time (hours, min, am/pm)"
        />
        <h1></h1>

        <button type="submit">Edit Reminder</button>
    </form>
    </>
}