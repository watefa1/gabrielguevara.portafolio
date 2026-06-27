# Profile Schema

## Overview

The AI assistant uses a single structured JSON file as its knowledge base.

This file contains all information about Gabriel Guevara and acts as the single source of truth for the assistant.

Updating this file automatically updates the assistant's knowledge without requiring code changes.

---

## File Location

```
src/assets/profile.json
```

---

## Schema

```json
{
  "name": "",
  "title": "",
  "location": "",
  "about": "",
  "experience": [],
  "projects": [],
  "skills": [],
  "education": [],
  "languages": [],
  "certifications": [],
  "contact": {
    "email": "",
    "linkedin": "",
    "github": "",
    "website": ""
  }
}
```

---

## Rules

- All information must be factual.
- Do not duplicate information.
- Projects should contain concise descriptions.
- Skills should represent technologies actually used.
- Contact information should always be up to date.

---

## Purpose

This file allows the AI assistant to answer questions consistently while remaining easy to maintain.