# AI Customer Support Chat Application

An AI-powered customer support chat platform enabling users to interact with a virtual assistant powered by OpenAI (GPT-3.5 or GPT-4). Features include a responsive chat UI, authenticated FAQ management, and conversation history storage for seamless user experiences.

## Features

- **Real-Time Chat Interface:** Dynamic conversations with the AI assistant via a user-friendly chat UI.
- **AI-Powered Responses:** Context-aware replies using OpenAI's GPT models.
- **FAQ Management:** Authenticated users can upload/manage FAQs to guide AI responses.
- **Conversation History:** Stores user conversations in MongoDB for continuity.
- **User Authentication:** Secure signup/login with JWT.
- **Responsive Design:** Optimized for various devices.

## Tech Stack

- **Frontend:** React, MobX
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI Integration:** OpenAI GPT-3.5/4 via open ai router
- **Authentication:** JWT

##  Project Structure

```
ai-customer-support-chat/
├── backend/
│   ├── models/
│   │   ├── Conversation.js
│   │   ├── FAQ.js
│   │   └── User.js
│   ├── routes/
│   │   └── chatRoutes.js
│   ├── db.js
│   └── server.js
├── frontend/
│   ├── components/
│   │   ├── Chat.js
|   |   |__ Login.js
│   │   └── MessageBubble.js
|   |   |__ Signup.js
|   |   |__ UploadFAQ.js
|   |   |__ ViewFAQ.js
│   ├── store/
│   │   └── ChatStore.js
│   └── App.js
├── .env
└── README.md
```

##  Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB
- OpenAI API Key (via openAI router Service)

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables: Create a `.env` file in `backend/` with:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key
    ```
4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React app:
    ```bash
    npm start
    ```
    The app runs at [http://localhost:3000](http://localhost:3000).

##  Authentication

- **Signup:** Create an account with email and password.
- **Login:** Receive a JWT token for secure access.

##  API Endpoints

**Public Routes**
- `POST /signup` - Register a new user
- `POST /login` - Authenticate user
- `POST /chat` - Send message to AI assistant
- `GET /history/:userId` - Get conversation history
- `GET /faqs` - Fetch all FAQs

**Protected Routes (JWT required)**
- `POST /upload-faq` - Upload a new FAQ

##  AI Integration

- **Model:** OpenAI GPT-3.5/4 via Azure OpenAI Service
- **Functionality:** Context-aware responses for enhanced support

##  FAQ Management

- Authenticated users can upload FAQs to guide AI responses.
- FAQs are stored in MongoDB for quick answers to common queries.


