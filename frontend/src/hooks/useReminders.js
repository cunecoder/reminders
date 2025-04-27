/*
useReminders.js
Description: This file holds the hooks that grab necessary information from the database to be used in the frontend.
Written by: Abe Gomez and David Marin for project with teamates: (Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/26/2025

*/

import { API_URL } from "../constants";
import { useState, useEffect } from "react";

export function useRemindersList() {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/reminders/`, {
            headers: {
                "Content-Type": "application/json" // text/html; application/xml
            }
        })

        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            setLoading(false);
            throw new Error("Error getting data");

        })

        .then(json => {
            setLoading(false);
            setReminders(json);
        })

        .catch((err) => {
            setError(err);
        })
    }, [])

    // Shorthand for { reminders: reminders, loading: loading, error: error }
    return {reminders, loading, error} 
}

export function useReminderCreate() {
    const [name, setName] = useState("");
    const [remindBy, setRemindBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(false);

    /**
     * Create a new task and send the request.
     * @param {SubmitEvent} event The submit event from the form.
     */

    const createReminder = (event) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${API_URL}/reminders/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                remind_name: name,
                remind_by: remindBy,
            }),
        })

        .then((response) => {
            setLoading(false);
            if(response.ok) {
                setSuccessful(true);
                return;
            }
            throw new Error("Uh Oh!");
        })
        
        .catch((err) => {
            setError(err);
            setSuccessful(false);
        });
    };

    return {
        name,
        setName,
        remindBy,
        setRemindBy,
        loading,
        error,
        successful,
        createReminder,
    }

}

export function useReminderDetail(id) {
    const [reminder, setReminder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/reminders/${id}/`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            setLoading(false);
            throw new Error("Error getting data");

        })

        .then(json => {
            setLoading(false);
            setReminder(json);
        })

        .catch((err) => {
            setError(err);
        })
    }, [])

    return {
        reminder,
        loading, 
        error
    } 
}

export function useReminderEdit(reminder = {}) {
    // ?? "" are needed behind some useStates to prevent any undefined
    // values if the reminder data does not import quick enough.
    const [name, setName] = useState(reminder.remind_name ?? "");
    const [remindby, setRemindBy] = useState(reminder.remind_by ?? "");
    const [createdat, setCreatedAt] = useState(reminder.created_at);
    const [updatedat, setUpdatedAt] = useState(reminder.updated_at);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(false);

    /**
     * Edit the reminder parameter and send the request.
     * @param {SubmitEvent} event The submit event from the form.
     */

    const editReminder = (event) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${API_URL}/reminders/${reminder.id}/`, {
            /** Put is used to change data instead of POST, which creates new data */
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            /** Below is allowing the user to change these parameters */
            body: JSON.stringify({
                remind_name: name,
                remind_by: remindby,
                created_at: createdat,
                updated_at: updatedat
            }),
        })

        .then((response) => {
            setLoading(false);
            if(response.ok) {
                setSuccessful(true);
                return;
            }
            throw new Error("Uh Oh!");
        })
        
        .catch((err) => {
            setError(err);
            setSuccessful(false);
        });
    };

    return {
        name,
        setName,
        remindby,
        setRemindBy,
        createdat,
        setCreatedAt,
        updatedat,
        setUpdatedAt,
        loading,
        error,
        successful,
        editReminder,
        /* Personal note: whenever you return a set.... you allow that person who uses
        your hook to use that set.... i.e., they can edit that. */
    }

}