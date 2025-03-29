"""
models.py
Description: This is the model for our backend for models.py. It is used to hold reminders.
Written by: Noah Leeper for project with teamates: (David Marin and Abraham Gomez)
Created on: 3/29/2025
Last Updated on: 3/29/2025
"""

from django.db import models

"""
Attributes:
        remind_name: The name of the reminder I.E. what you want to be reminded of.
        remind_by: The date and time when the reminder should go off.
        created_at: The timestamp of when the reminder was created.
        updated_at: The timestamp of when the reminder was most recently updated.
"""


class Reminder(models.Model):
    remind_name = models.CharField(max_length=255)
    remind_by = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reminder: {self.remind_name[:50]} - Remind by {self.remind_by}"
