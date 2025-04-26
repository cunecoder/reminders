from rest_framework import status
from rest_framework.test import APITestCase
from reminders.models import Reminder


class ReminderAPITests(APITestCase):
    def setUp(self):
        self.reminder = Reminder.objects.create(
            remind_name="Test Reminder", remind_by="2025-05-01T10:00:00Z"
        )

    def test_create_reminder(self):
        data = {
            "remind_name": "New Test Reminder",
            "remind_by": "2025-05-01T12:00:00Z",
        }
        response = self.client.post("/api/reminders/", data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Reminder.objects.count(), 2)

    def test_get_reminder(self):
        response = self.client.get(f"/api/reminders/{self.reminder.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["remind_name"], "Test Reminder")
        self.assertEqual(response.data["remind_by"], "2025-05-01T10:00:00Z")

    def test_delete_reminder(self):
        response = self.client.delete(f"/api/reminders/{self.reminder.id}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Reminder.objects.count(), 0)
