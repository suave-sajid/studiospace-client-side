# StudioSpace – Creative Studio Space Marketplace

**Live Website:** [Insert your deployed website URL]

StudioSpace is a peer-to-peer marketplace that connects creative professionals with studio space owners. Photographers, filmmakers, podcasters, musicians, and other creators can discover and book suitable creative spaces, while studio owners can list and manage their properties.

##  Key Features

- **Browse Creative Studios:** Explore different creative spaces, including photography studios, podcast lounges, recording studios, workshops, and sound stages.
- **Authentication:** Secure user authentication with email and Google sign-in using Better Auth.
- **Studio Management:** Studio owners can add, update, and delete their studio listings.
- **Booking System:** Users can book available studios and manage their bookings.
- **Booking Management:** Studio owners can view and manage booking requests, including updating booking statuses.
- **Wishlist:** Save favorite studios and easily access them later.
- **Reviews & Ratings:** Customers can submit reviews and ratings for completed bookings.
- **Responsive Design:** Fully responsive interface for desktop, tablet, and mobile devices.
- **Notifications:** Interactive toast notifications and user-friendly feedback using Sonner.

##  Technology Stack

**Frontend:**
- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- Better Auth
- Lucide React
- Sonner

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

**Tools & Deployment:**
- Git & GitHub
- Vercel (Frontend)
- Render (Backend)

##  Local Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Client Repository

```bash
git clone YOUR_CLIENT_GITHUB_REPOSITORY_URL
cd studiospace-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and configure the required environment variables.

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL
```

Add the remaining Better Auth and application environment variables required by your project.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Backend Setup

The frontend requires the StudioSpace backend to be running.

Clone the server repository, install dependencies, configure its `.env` file with the MongoDB connection string, database name, authentication secrets, and required application settings.

Then start the backend using:

```bash
npm install
npm run dev
```

Refer to the server repository's README for its complete configuration.

##  Examiner Test Credentials

Use the following credentials to test the application.

**Test User Account:**

- Email: `YOUR_EXAMINER_EMAIL`
- Password: `YOUR_EXAMINER_PASSWORD`

**Note:** Replace these placeholders with the actual working examiner account credentials before submission.

##  Project Structure

```text
studiospace-client/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
├── .env.local
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

## 🎯 Project Purpose

StudioSpace aims to simplify the process of discovering, listing, and booking creative studio spaces through a user-friendly digital marketplace.

Built as a full-stack web development project with a focus on authentication, CRUD operations, API integration, booking management, and responsive UI design.