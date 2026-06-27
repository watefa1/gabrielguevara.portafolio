# AI Portfolio Assistant

## Overview

The portfolio includes an AI-powered assistant that helps recruiters
learn about Gabriel Guevara's experience, projects and technical skills.

The assistant is not a general-purpose chatbot.
It only answers questions related to the portfolio.

---

## Objectives

- Improve recruiter experience.
- Showcase AI integration skills.
- Demonstrate secure backend architecture.
- Keep deployment simple and inexpensive.
- Avoid hallucinations.

---

## Tech Stack

Frontend
- Angular

Backend
- Netlify Functions

LLM Provider
- NVIDIA NIM

Deployment
- Netlify

---

## Architecture

User

↓

Angular Chat Component

↓

POST /.netlify/functions/chat

↓

Netlify Function

↓

NVIDIA NIM API

↓

LLM Response

↓

Angular UI

---

## Security

- API Key stored as Netlify Environment Variable.
- API Key never exposed to the client.
- Input validation.
- Error handling.
- Basic rate limiting.
- Prompt injection mitigation.

---

## Knowledge Source

The assistant receives its context from a structured `profile.json`.

Example sections:

- personal information
- work experience
- featured projects
- technologies
- education
- certifications
- languages
- contact information

The assistant must never invent information that is not present in this context.

---

## System Behaviour

The assistant should:

- answer questions about Gabriel
- explain projects
- explain technologies used
- summarize experience
- provide contact information
- recommend projects to recruiters

The assistant should refuse questions unrelated to the portfolio.

---

## User Experience

Features:

- chat history
- typing indicator
- suggested questions
- responsive layout
- markdown support
- loading state
- error messages

---

## Future Improvements

- RAG
- Vector database
- Embeddings
- Conversation memory
- Multi-language
- Streaming responses
- Analytics
- Feedback buttons