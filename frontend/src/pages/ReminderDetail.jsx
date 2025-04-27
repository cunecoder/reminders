/*
ReminderDetail.jsx
Description: This file is the page where reminder details can be viewed.
Written by: Abe Gomez and David Marin for project with teamates: (Noah Leeper)
Created on: 4/8/2025
Last Updated on: 4/26/2025
*/

import { Routes, Route, Link } from "react-router-dom"
import React from "react";
import { useReminderDetail } from "../hooks/useReminders";
import { useParams } from "react-router";

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

 /** Formatting for the times */
 const formattedRemindBy = new Date(reminder.remind_by).toLocaleString("en-US", {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
   hour: "numeric",
   minute: "2-digit",
   hour12: true,
   timeZone: "US/Central",
 });

 const formattedCreatedAt = new Date(reminder.created_at).toLocaleString("en-US", {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
   hour: "numeric",
   minute: "2-digit",
   hour12: true,
   timeZone: "US/Central",
 });

 const formattedUpdatedAt = new Date(reminder.updated_at).toLocaleString("en-US", {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
   hour: "numeric",
   minute: "2-digit",
   hour12: true,
   timeZone: "US/Central",
 });
 
 return <>
   <Link to={`/reminders/${reminder.id}/edit`}>Edit Reminder "{reminder.remind_name}"</Link>
   <h1>Name: "{reminder.remind_name}" ID: {reminder.id}</h1>
   <h1>Remind by:  {formattedRemindBy}</h1>
   <h1>Created at: {formattedCreatedAt}</h1>
   <h1>Updated at: {formattedUpdatedAt}</h1>
 </>
}