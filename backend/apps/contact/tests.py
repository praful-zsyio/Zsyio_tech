from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import ContactSubmission

class ContactSubmissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/contact/'
        self.valid_payload = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'Hello world'
        }
        self.invalid_payload = {
            'name': '',
            'email': 'not-an-email',
            'message': ''
        }

    def test_create_submission(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactSubmission.objects.count(), 1)
        self.assertEqual(ContactSubmission.objects.get().name, 'John Doe')

    def test_create_submission_invalid(self):
        response = self.client.post(self.url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactSubmission.objects.count(), 0)
