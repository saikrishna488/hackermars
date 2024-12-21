# Hackathon Platform

A full-stack web application for organizing and participating in hackathons. This platform allows organizations to host hackathons and participants to register and compete in teams.

## Features

### For Organizers
- 🏢 Host Organization Verification
- 📝 Create & Manage Hackathons
- 👥 Team Management
- 📊 Participant Dashboard
- 📢 Send Notifications
- 🏆 Review & Judge Submissions

### For Participants
- 👤 User Registration & Authentication
- 🔍 Browse Hackathons
- 📋 Team Registration
- 💡 Submit Project Ideas
- 🤝 Team Collaboration
- 📱 Real-time Updates

## Tech Stack

### Frontend
- Next.js 13+ (React Framework)
- Tailwind CSS (Styling)
- Lucide React (Icons)
- React-Toastify (Notifications)
- React-Quill (Rich Text Editor)
- Axios (HTTP Client)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd hackermars
```

2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local  # Configure your environment variables
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
hackermars/
├── backend/
│   ├── config/         # Configuration files
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── essentials/     # Utility functions
│   └── server.js       # Entry point
│
└── frontend/
    ├── app/           # Next.js 13+ app directory
    ├── context_api/   # React Context providers
    ├── lib/           # Utility functions
    └── public/        # Static assets
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
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

- Thanks to all contributors who have helped shape this platform
- Special thanks to the open-source community for the amazing tools and libraries