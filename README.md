# Web-Dev-Group-Project

### Group Project for Web Programming CS4300

### Team Name: International Justice League of Super Acquaintances

#### Team Members: Thai Nguyen, JR Insular, Andrew Ingraham, Jamie Chen

**Team Roles:**

- Team Lead: Thai Nguyen
- Communication Lead: JR Insular
- Miroboard Captain: Andrew Ingraham
- GitHub Captain: Jamie Chen

### Links:

- Video Demo: https://www.loom.com/share/04e8e8049bb446f3b017975b1e82d01e?sid=6928a038-d539-422c-9f3f-5fc7bf634940
- Miro Board: https://miro.com/app/board/uXjVIcSoszk=/?share_link_id=536096687861
- GitHub: https://github.com/ttn64681/Web-Dev-Group-Project

## Project Overview

CourseHub is a web application designed to help UGA students in their academic pursuits by providing a centralized platform (a hub, if you will) for discovering course information and sharing valuable study resources. It aims to streamline the process of finding relevant materials and foster an easier, more collaborative learning environment within the UGA student community.

### Disclaimer

CourseHub is not an official UGA app. All images are purely for personal purposes.

## Technology Stack

- **Frontend:**
  - React with Next.js (TypeScript)
  - Client-side routing using App Router
  - State management with React hooks
- **Backend:**
  - Node.js using Next.js API routes
- **Database:**
  - MongoDB for data persistence

## APIs Used

- YouTube Data API
- Google Generative Language (Gemini)

## Project Timeline (Roughly)

- **Week 2:** Project idea submission
- **Week 3:** UI Design mockup (splash page, authenticated/unauthenticated views, database schema)
- **Week 4:** Progress report (roles, progress) and Peer Review
- **Week 5:** Functioning UI with client-side routes and database models
- **Week 6:** Final submission (4/22) and presentation (4/24 & 4/28)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB connection string and access permissions
- API keys registered

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ttn64681/Web-Dev-Group-Project.git
    cd Web-Dev-Group-Project
    ```
2.  Install dependencies:
    ```bash
    npm i
    ```
3.  Set up environment variables (MongoDB connection string, API Keys). Create a `.env.local` file in the root directory and add your environment variables.
    ```
    AUTH_SECRET=
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=
    NEXT_PUBLIC_MONGODB_URI=
    MONGODB_URI=
    GEMINI_API_KEY=
    YOUTUBE_API_KEY=
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
