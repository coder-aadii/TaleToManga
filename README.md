# TaleToManga

TaleToManga is a web application that transforms user-submitted stories into manga-style images using AI technology. The application provides an intuitive interface for users to submit their stories and receive beautifully generated manga panels.

## Features

- Story to manga conversion using AI
- User authentication (Email/Password and Google OAuth)
- Responsive design for all devices
- Dark/Light mode
- Personal dashboard for manga history
- Download and share capabilities
- Real-time generation progress tracking

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- React Context (for state management)

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- JWT Authentication
- Google OAuth
- Hugging Face API (Stable Diffusion)

## Project Structure

```
taletomanga/
├── frontend/           # React application
└── backend/           # Node.js/Express server
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Cloud Console account (for OAuth)
- Hugging Face account

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/coder-aadii/TaleToManga.git
cd TaleToManga
```

2. Set up frontend
```bash
cd frontend
npm install
npm start
```

3. Set up backend
```bash
cd backend
npm install
npm start
```

4. Configure environment variables (create .env files in both frontend and backend directories)

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hugging Face for providing AI model hosting
- MongoDB Atlas for database services
- The open-source community for various tools and libraries
