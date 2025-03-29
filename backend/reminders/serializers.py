"""
serializers.py
Description: This is the Serializer for our Reminers model to convert it to JSON
Written by: Noah Leeper for project with teamates: (David Marin and Abraham Gomez)
Created on: 3/29/2025
Last Updated on: 3/29/2025

"""

from rest_framework import serializers
from .models import Reminder


class ReminderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Reminder model to convert model data into JSON format.
    """

    class Meta:
        model = Reminder
        fields = ["id", "remind_name", "remind_by", "created_at", "updated_at"]
