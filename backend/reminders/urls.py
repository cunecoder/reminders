"""
urls.py (reminders)

Description:
URL configuration for conf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

Written by Abe Gomez: Partners (David Marin and Noah Leeper)
Created On: 3/30/25
Last Updated: 4/8/25
"""

from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"reminders", views.ReminderViewSet)

urlpatterns = router.urls
