"""
views.py
Description: This is the views file for reminders I use viewsets.Modelviewset to get acess to Create Read Update and Delete for free
Written by: Noah Leeper for project with teamates: (David Marin and Abraham Gomez)
Created on: 3/29/2025
Last Updated on: 3/29/2025

"""

from django.shortcuts import render
from rest_framework import viewsets
from .models import Reminder
from .serializers import ReminderSerializer


class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer  