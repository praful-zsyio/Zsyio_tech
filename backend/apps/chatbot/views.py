import os
from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ChatMessage

class ChatView(APIView):
    def post(self, request):
        message = request.data.get('message')
        if not message:
            return Response({"error": "Message is required"}, status=400)
            
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return Response({"response": "Server configuration error: API Key missing."}, status=500)

        # Configure OpenAI client
        if api_key.startswith("sk-or-"):
            client = OpenAI(
                api_key=api_key,
                base_url="https://openrouter.ai/api/v1"
            )
            model = "google/gemini-flash-1.5-8b"
        else:
            client = OpenAI(api_key=api_key)
            model = "gpt-4o"

        try:
            completion = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for Zsyio, a digital agency."},
                    {"role": "user", "content": message},
                ]
            )
            bot_reply = completion.choices[0].message.content
        except Exception as e:
            bot_reply = f"Error processing request: {str(e)}"

        # Save to SQLite3
        chat_msg = ChatMessage.objects.create(
            user_message=message,
            bot_response=bot_reply
        )

        return Response({"response": bot_reply, "id": chat_msg.id})
