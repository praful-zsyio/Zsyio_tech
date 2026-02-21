import React from "react";
import ChatBot from "react-chatbotify";
import { sendChatMessage } from "../services/api";

const Chatbot = () => {
    const flow = {
        start: {
            message: "Hi! How can I help you today?",
            path: "process_message",
        },
        process_message: {
            message: async (params) => {
                try {
                    const response = await sendChatMessage(params.userInput);
                    // Backend returns { response: "...", id: ... }
                    return response.data.response || "I didn't get a response from the server.";
                } catch (error) {
                    console.error("Chat error:", error);
                    return "Sorry, I'm having trouble connecting to the server right now.";
                }
            },
            path: "process_message",
        },
    };

    const options = {
        theme: {
            primaryColor: "#89b4fa", // Catppuccin Blue
            secondaryColor: "#1e1e2e", // Catppuccin Base
            fontFamily: "Inter, sans-serif",
        },
        tooltip: {
            mode: "CLOSE",
            text: "Chat with us!",
        },
        chatHistory: {
            storageKey: "zsyio_chat_history",
        },
        botBubble: {
            simStream: true,
        },
    };

    return <ChatBot options={options} flow={flow} />;
};

export default Chatbot;
