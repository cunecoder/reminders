/*
ReminderDetail.jsx
Description: This file is the page where reminder details can be viewed.
Written by: Abe Gomez for project with teamates: (David Marin and Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/22/2025

*/


import React from "react";
import { useReminderDetail } from "../hooks/useReminders";
import { useNavigate, useParams } from "react-router";

export function ReminderDetail() {

 const { id } = useParams();
 const { reminder, loading, error} = useReminderDetail(id);
 
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
    <h1>{reminder.remind_name} {reminder.id}</h1>
    <h1>{reminder.remind_by}</h1>
    <h1>{reminder.created_at}</h1>
    <h1>{reminder.updated_at}</h1>
 </>
}