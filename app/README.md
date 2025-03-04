# Job Hunt Helper

A web application that helps you build a base resume, customize it for specific job descriptions, and generate cover letters.

## Features

- User authentication (register, login, logout)
- Create and manage base resumes
  - Add job experiences
  - Add education history
  - Add skills
- Import and store job descriptions
- Customize resumes based on job descriptions
- Generate cover letters for job applications

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: JWT
- **Form Validation**: Zod
- **ORM**: Prisma

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/job-hunt-helper.git
   cd job-hunt-helper
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables

   ```bash
   # Copy the example .env file
   cp .env.example .env
   # Edit the .env file with your own values
   ```

4. Set up the database

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
job-hunt-helper/
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── (auth)/        # Authentication pages
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── resumes/       # Resume pages
│   │   ├── job-descriptions/ # Job description pages
│   │   └── cover-letters/ # Cover letter pages
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   └── utils/             # Helper functions
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user

### Resumes

- `GET /api/resumes` - Get all base resumes
- `POST /api/resumes` - Create a new base resume
- `GET /api/resumes/custom` - Get all custom resumes
- `POST /api/resumes/custom` - Create a new custom resume

### Resume Details

- `GET /api/resumes/:id/experiences` - Get all experiences for a resume
- `POST /api/resumes/:id/experiences` - Add an experience to a resume
- `GET /api/resumes/:id/educations` - Get all education entries for a resume
- `POST /api/resumes/:id/educations` - Add an education entry to a resume
- `GET /api/resumes/:id/skills` - Get all skills for a resume
- `POST /api/resumes/:id/skills` - Add a skill to a resume

### Job Descriptions

- `GET /api/job-descriptions` - Get all job descriptions
- `POST /api/job-descriptions` - Create a new job description

### Cover Letters

- `GET /api/cover-letters` - Get all cover letters
- `POST /api/cover-letters` - Create a new cover letter

## License

This project is licensed under the MIT License - see the LICENSE file for details.
