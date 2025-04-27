/*
ReminderCreate.jsx
Description: This file is the page where reminders can be created.
Written by: Abe Gomez for project with teamates: (David Marin and Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/22/2025

*/

import React from "react";
import {useEffect} from "react";
import { useReminderCreate } from "../hooks/useReminders";
import { useNavigate } from "react-router";

export function ReminderCreate() {
    const { remind_name, setName, remind_by, setRemindBy, loading, error, successful, createReminder } =
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

    return <>
        <h1>Create a Reminder</h1>
        <form onSubmit={createReminder}>
            <input type="text" value={remind_name} onChange={(e) => setName(e.target.value)} />
            <input type="datetime-local" value={remind_by} onChange={(e) => setRemindBy(e.target.value)}/>
            <button type="submit">Create Reminder</button>
        </form>
    </>
}
