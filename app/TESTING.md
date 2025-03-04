# Testing Tasks for Phase 1

This document outlines the tasks to test the Phase 1 implementation of the Job Hunt Helper application.

## Database Setup

- [ ] Verify that the database schema is correctly set up
- [ ] Confirm that Prisma migrations have been applied
- [ ] Check that the database connection is working

## API Endpoints

### Authentication

- [ ] Test user registration with valid data
- [ ] Test user registration with invalid data (e.g., missing fields, invalid email)
- [ ] Test user registration with an existing email
- [ ] Test user login with valid credentials
- [ ] Test user login with invalid credentials
- [ ] Test user logout

### Base Resumes

- [ ] Test creating a base resume with valid data
- [ ] Test creating a base resume with invalid data
- [ ] Test retrieving all base resumes for a user
- [ ] Test that base resumes are only accessible to the user who created them

### Resume Details

#### Experiences

- [ ] Test adding a job experience to a resume with valid data
- [ ] Test adding a job experience with invalid data
- [ ] Test retrieving all job experiences for a resume
- [ ] Test that job experiences are only accessible to the user who created them

#### Education

- [ ] Test adding education to a resume with valid data
- [ ] Test adding education with invalid data
- [ ] Test retrieving all education entries for a resume
- [ ] Test that education entries are only accessible to the user who created them

#### Skills

- [ ] Test adding a skill to a resume with valid data
- [ ] Test adding a skill with invalid data
- [ ] Test retrieving all skills for a resume
- [ ] Test that skills are only accessible to the user who created them

### Job Descriptions

- [ ] Test creating a job description with valid data
- [ ] Test creating a job description with invalid data
- [ ] Test retrieving all job descriptions for a user
- [ ] Test that job descriptions are only accessible to the user who created them

### Custom Resumes

- [ ] Test creating a custom resume with valid data
- [ ] Test creating a custom resume with invalid data
- [ ] Test creating a custom resume with a non-existent base resume
- [ ] Test creating a custom resume with a non-existent job description
- [ ] Test retrieving all custom resumes for a user
- [ ] Test that custom resumes are only accessible to the user who created them

### Cover Letters

- [ ] Test creating a cover letter with valid data
- [ ] Test creating a cover letter with invalid data
- [ ] Test creating a cover letter with a non-existent job description
- [ ] Test retrieving all cover letters for a user
- [ ] Test that cover letters are only accessible to the user who created them

## Authentication and Authorization

- [ ] Test that protected routes require authentication
- [ ] Test that the middleware correctly redirects unauthenticated users
- [ ] Test that the middleware correctly handles authenticated users
- [ ] Test that JWT tokens are correctly generated and verified
- [ ] Test that cookies are correctly set and removed

## Error Handling

- [ ] Test that API endpoints return appropriate error messages
- [ ] Test that validation errors are correctly formatted
- [ ] Test that server errors are correctly handled

## Tools for Testing

### API Testing

You can use tools like Postman, Insomnia, or curl to test the API endpoints. Here's an example of how to test the registration endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","confirmPassword":"password123"}'
```

### Database Testing

You can use the Prisma Studio to inspect the database:

```bash
npx prisma studio
```

This will open a web interface at http://localhost:5555 where you can view and edit the database.

## Next Steps

After completing these tests, you can proceed to Phase 2, which involves building the frontend components and integrating them with the API endpoints.
