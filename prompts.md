# AI Resume & Cover Letter Generator: Prompting Plan

Below is a **session-based prompting structure** similar to the RAG Recommender example. Use these prompts with Claude (or any other AI assistant) to guide your learning, ensure full understanding, and tackle each milestone. Adapt the questions as needed for your project context.

---

## Session 1: Planning & Research

### Ask Claude

1. "Which resume, cover letter, and ATS concepts do I need to review or learn?"
2. "How can I break the overall project into smaller tasks?"
3. "Where should I track these tasks (Trello, GitHub Projects)?"
4. "What environment setup is recommended (Node.js version, frameworks, code editor)?"
5. "How should I organize my API keys (OpenAI, other AI providers)?"
6. "Which architecture would best fit this application (front-end vs. back-end, data flows)?"
7. "What potential challenges or risks might I face?"
8. "How should I plan to test each component?"

### You Should Understand

- **✓** The **full project scope** (resume generation, cover letter generation, ATS readiness)
- **✓** Your **personal knowledge gaps** and how to address them
- **✓** A **structured approach** to environment setup (tools, API keys, frameworks)
- **✓** A clear, **high-level architecture** for the application
- **✓** Potential **risks** and how to **mitigate** them

### Checkpoint

Can you:

- **✓** List all key concepts and tools (AI, Node.js, front-end frameworks)?
- **✓** Explain your plan to fill any knowledge gaps?
- **✓** Sketch a basic system diagram for your resume generator?
- **✓** Identify which components need integration testing?
- **✓** Describe how you’ll track and prioritize tasks?

---

## Session 2: Core Resume & Cover Letter Generation

### Ask Claude

1. "How can I structure a form or CLI to collect user data (e.g., name, skills, work history)?"
2. "What prompt strategies produce a professional, concise resume?"
3. "How do I handle missing or incomplete user data gracefully?"
4. "Can you walk me through building a minimal cover letter generator using the same user data?"
5. "How do I refine prompts to ensure a formal, professional style?"

### You Should Understand

- **✓** The **basic data requirements** for a resume and cover letter
- **✓** How **prompt engineering** affects the tone and quality of AI-generated text
- **✓** Why and how **user input validation** matters (missing skills, unclear job titles)
- **✓** The **Tier 1 milestone**: generating a functional resume and cover letter

### Checkpoint

Can you:

- **✓** Collect and validate user data (name, skills, experiences)?
- **✓** Generate a **complete** resume from prompts alone?
- **✓** Produce a **basic cover letter** that reuses resume data?
- **✓** Explain the **prompt refining** process (adding tone, style details)?

---

## Session 3: ATS Optimization & Keyword Enhancements

### Ask Claude

1. "How do I parse a job description to find crucial ATS keywords?"
2. "Which basic NLP or regex techniques can I use for keyword extraction?"
3. "How do I compare keywords in a job listing to the user’s resume?"
4. "What prompt strategy can insert missing keywords without sounding repetitive?"
5. "How do I calculate a simple ATS alignment score?"

### You Should Understand

- **✓** Why **ATS systems** scan for specific keywords
- **✓** How to **identify** missing keywords and **insert** them naturally
- **✓** Methods for **scoring** alignment or match percentage
- **✓** Balancing **readability** with **keyword** requirements

### Checkpoint

Can you:

- **✓** Extract keywords from a sample job description?
- **✓** Insert those keywords seamlessly into a resume draft?
- **✓** Provide a **numeric score** or feedback on ATS alignment?
- **✓** Avoid keyword stuffing or awkward phrasing?

---

## Session 4: AI-Powered Job Matching & HR Agent Simulation

### Ask Claude

1. "How do I build an AI module that ranks or matches job postings to a user’s profile?"
2. "What are embeddings or other approaches for semantic matching?"
3. "How can a simulated HR agent critique and suggest improvements to the resume?"
4. "What prompts work best for offering detailed, actionable feedback rather than generic advice?"

### You Should Understand

- **✓** How to **match** user profiles with job listings (semantic similarity, embeddings, or simpler text comparison)
- **✓** The **role** of an HR agent simulation in providing constructive feedback
- **✓** How to capture **strengths, weaknesses,** and **rewrite suggestions** from the AI

### Checkpoint

Can you:

- **✓** Implement a job matching feature (even if it’s basic)?
- **✓** Have the AI output a **ranked list** of suitable jobs?
- **✓** Collect detailed **HR-style** feedback on the user’s resume?
- **✓** Rewrite certain resume sections using AI suggestions?

---

## Session 5: Frontend & User Experience Enhancements

### Ask Claude

1. "How do I design a clean, intuitive UI or CLI flow for capturing user data?"
2. "What are the best patterns for showing an ATS score, job matches, or feedback in real time?"
3. "How do I validate form inputs to ensure data completeness?"
4. "What UI elements or interactions help users fine-tune their generated resumes or cover letters?"

### You Should Understand

- **✓** The **front-end or CLI** user flow, ensuring minimal friction
- **✓** Common **UI/UX practices** for real-time feedback (scores, loading states)
- **✓** Basic **form validation** or data-check strategies

### Checkpoint

Can you:

- **✓** Guide a user clearly from **data input → final output**?
- **✓** Display their **ATS score** or job matches in a user-friendly way?
- **✓** Offer **in-line editing** or re-generation options if the result needs tweaking?
- **✓** Ensure the user can’t submit incomplete or invalid info?

---

## Session 6: Testing, Debugging & Advanced Customization

### Ask Claude

1. "What’s the best way to test AI output for consistency and correctness?"
2. "How can I debug repeated phrases, hallucinations, or inaccuracies from the AI?"
3. "What advanced resume styles or cover letter formats could I add?"
4. "How can I manage different versions of prompts or keep them organized?"

### You Should Understand

- **✓** How to **systematically test** AI-driven features
- **✓** Strategies for debugging or refining AI output
- **✓** Approaches for **extending** the generator with creative or industry-specific styles
- **✓** Version control for **prompt** changes

### Checkpoint

Can you:

- **✓** Run tests on different sets of user data and job descriptions?
- **✓** Identify or fix **common AI pitfalls** like repetition or off-topic text?
- **✓** Offer multiple **resume/cover letter styles** based on user preference?
- **✓** Document your **prompt versions** and changes over time?

---

## Session 7: Final Refinement, Presentation & Future Planning

### Ask Claude

1. "How do I polish the UI or final output for demos?"
2. "What’s a simple way to give a walkthrough of the entire generation process?"
3. "Can you suggest future enhanceme
