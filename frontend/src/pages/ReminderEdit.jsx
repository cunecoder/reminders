/*
ReminderEdit.jsx
Description: This file is the page where reminders can be edited.
Written by: David Marin and Abe Gomez for project with teammates: (Noah Leeper)
Created on: 4/25/2025
Last Updated on: 4/27/2025

*/

import React from "react";
import { useEffect } from "react";
import { useReminderEdit, useReminderDetail } from "../hooks/useReminders";
import { useNavigate, useParams } from "react-router";
import { DateTimePicker } from "@mantine/dates"
import { TextInput, Button } from "@mantine/core"
import "@mantine/dates/styles.css"
import "@mantine/core/styles.css"

export function ReminderEdit() {
    /*
    * Use the information from edit hook to edit a reminder.
    */

    // Grab id to edit specific reminder
    const { id } = useParams();
    
    // Edit criteria based on reminder id.
    const { reminder } = useReminderDetail(id);

    // Edit action performed on edit hook reminder that was fetched.
    const { name, setName, remindBy, setRemindBy, loading, error, successful, editReminder  } = 
        useReminderEdit(reminder);
    const navigate = useNavigate();
 
    useEffect(() => {

        // Traverse back to reminder id detail page when finished edited to view edits.
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

    // Styling for front end and changes when inputs are recorded (text, widgets, and button).
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

            // Needed for UTC to Central Time while editing.
            valueFormat="MM/DD/YYYY  hh:mm A"
            variant="filled"
            radius="xl"
            onChange={(date) => setRemindBy(date)}
            placeholder="Pick date and type a time (hours, min, am/pm)"
        />
        <h1></h1>

        <Button color="gray" type="submit">Edit Reminder</Button>
    </form>
    </>
}