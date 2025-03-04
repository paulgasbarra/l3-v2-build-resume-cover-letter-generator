import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Experience validation schema
export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  description: z.string().min(1, 'Description is required'),
  highlights: z.array(z.string()).or(z.record(z.any())),
});

// Education validation schema
export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

// Skill validation schema
export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.string().optional(),
  category: z.string().optional(),
});

// Base Resume validation schema
export const baseResumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.record(z.any()),
  experiences: z.array(experienceSchema).optional(),
  educations: z.array(educationSchema).optional(),
  skills: z.array(skillSchema).optional(),
});

// Job Description validation schema
export const jobDescriptionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  content: z.string().min(1, 'Job description content is required'),
});

// Custom Resume validation schema
export const customResumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  baseResumeId: z.string().uuid('Invalid base resume ID'),
  jobDescriptionId: z.string().uuid('Invalid job description ID'),
  content: z.record(z.any()),
});

// Cover Letter validation schema
export const coverLetterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  jobDescriptionId: z.string().uuid('Invalid job description ID'),
  content: z.string().min(1, 'Cover letter content is required'),
}); 