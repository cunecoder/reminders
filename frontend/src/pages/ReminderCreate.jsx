/*
ReminderCreate.jsx
Description: This file is the page where reminders can be created.
Written by: Abe Gomez for project with teamates: (David Marin and Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/27/2025

*/

import React from "react";
import { Link } from "react-router-dom";
import { useReminderCreate } from "../hooks/useReminders";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { DateTimePicker } from "@mantine/dates";
import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";


export function ReminderCreate() {
    /*
    * Use the information from the create hook to create a reminder and return to home page.
    */

    const { name, setName, remindBy, setRemindBy, loading, error, successful, createReminder } =
        useReminderCreate();
    const navigate = useNavigate();

    useEffect(() => {
        if (successful) {
          navigate("/");
        }
    }, [successful]);

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

    // Styling for front end and changes when inputs are recorded (text, widgets, and button).
    return <>
        <h1>Create a Reminder</h1>
        <form onSubmit={createReminder}>
            <TextInput 
                type="text" 
                variant="filled" 
                radius="xl" 
                placeholder="Reminder Name" 
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
            <Button color="gray" type="submit">Create Reminder</Button>
        </form>
        <h1></h1>
        <Link to={`/`}>Back to Reminders List</Link>
    </>
}
