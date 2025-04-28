/*
useReminders.js
Description: This file holds the hooks that grab necessary information from the database to be used in the frontend.
Written by: Abe Gomez and David Marin for project with teammates: (Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/27/2025

*/

import { API_URL } from "../constants";
import { useState, useEffect } from "react";

export function useRemindersList() {
    /* 
    * Establish hook that fetches necessities from backend to allow for the reminders to be seen all at once.
    */

    const [reminders, setReminders] = useState([]); // Establish a list of reminders, initially empty.
    const [loading, setLoading] = useState(false); // Tracks loading state, initially false.
    const [error, setError] = useState(null); // Holds error messages, initially null.

    useEffect(() => {
        setLoading(true);

        // Fetch the list of reminders from the backend.
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
    return {reminders, setReminders, loading, error} 
}

export function useReminderCreate() {
    /*
    * Establish hook to fetch necessities from the backend for creating reminders.
    */
    const [name, setName] = useState(""); // Establish a place holder for the reminder name.
    const [remindBy, setRemindBy] = useState(null); // Establish a remind time for the reminder. Initially null.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(false); // Establishes whether fetch is sucessful. 
                                                         // Initially false until fetch is complete.


    /**
     * Create a new reminder and send the request.
     * @param {SubmitEvent} event The submit event from the form.
     */

    const createReminder = (event) => {
        event.preventDefault();
        setLoading(true);
        const utcTime = remindBy.toISOString(); // Needed because backend saves times in UTC and we need Central Time.

        // Fetch the name and remind by time to show once created on the frontend.
        fetch(`${API_URL}/reminders/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                remind_name: name,
                remind_by: utcTime,
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
    /*
    * Establish a hook to fetch the necessities from the backend to view reminder details.
    */

    const [reminder, setReminder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // Fetch the reminder and its information based on reminder id.
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
    /*
    * Establish a hook to fetch the necessities to edit a reminder.
    */


    // ?? "" are needed behind some useStates to prevent any undefined
    // values if the reminder data does not import quick enough.
    const [name, setName] = useState(reminder.remind_name ?? "");

    // Date modifications are just formatting to ensure database utc time is dealt with appropriately.
    const [remindBy, setRemindBy] = useState(reminder?.remind_by ? new Date(reminder.remind_by).toISOString().slice(0,16) : "");
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

        // Deal with database utc modifications
        const utcTime = new Date(remindBy).toISOString();

        // Fetch reminders by id to edit their name and remind by times.
        fetch(`${API_URL}/reminders/${reminder.id}/`, {

            // Put is used to change data instead of POST, which creates new data.
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            // Below is allowing the user to change these parameters.
            body: JSON.stringify({
                remind_name: name,
                remind_by: utcTime,
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
        editReminder,
    }

}


export function useRemindersDelete() {
    /*
    * Establish a hook that fetches the necessities to delete reminders.
    */

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(false);

    /**
     * Delete a reminder and send the request.
     * @param {string} id The ID of the reminders to delete.
     */


    const deleteReminder = (id) => {
        setLoading(true);

        // Fetch a reminder by id to delete.
        fetch(`${API_URL}/reminders/${id}/`, {
            method: "DELETE",
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
        deleteReminder,
        loading,
        error,
        successful,
    };
}