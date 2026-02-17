# Shyam Vertex - Website Project

## Project Structure

This project is divided into two main parts:
- **Client**: React.js frontend (Vite + Tailwind CSS)
- **Server**: Node.js backend (Express + MySQL)

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server

## Setup Instructions

### 1. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Open `.env` file.
   - Update `DB_PASSWORD` and other details to match your local MySQL setup.
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Features

- **Responsive Design**: Built with Tailwind CSS for mobile-first responsiveness.
- **Modern UI**: Uses lucide-react icons and clean layout.
- **Sections**:
  - Hero (with CTA)
  - About Us (Mission, Vision)
  - Services (Grid layout)
  - Careers (Job listings)
  - Testimonials (Client reviews)
  - Blog (Latest insights)
  - Contact (Form and info)
- **Backend API**: Ready for extension with Express.js.

## Customization

- **Colors**: Edit `client/tailwind.config.js` to change primary/secondary colors.
- **Content**: Edit the component files in `client/src/components/` to update text and images.
