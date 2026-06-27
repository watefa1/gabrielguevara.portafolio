# Architecture Decision Record

## Purpose

This document explains the main technical decisions made during the development of the AI Portfolio Assistant.

---

## Angular

### Decision

Use Angular as the frontend framework.

### Reason

- Existing project framework.
- Component-based architecture.
- Strong TypeScript integration.
- Excellent maintainability.

---

## Netlify Functions

### Decision

Use Netlify Functions as the backend.

### Reason

- No server maintenance.
- Easy deployment.
- Secure environment variables.
- Low operational cost.

---

## NVIDIA NIM

### Decision

Use NVIDIA NIM as the LLM provider.

### Reason

- High-quality open models.
- OpenAI-compatible API.
- Free tier suitable for portfolio usage.
- Simple integration.

---

## profile.json

### Decision

Use a JSON file instead of a database.

### Reason

- Simplicity.
- Easy maintenance.
- Version control.
- No additional infrastructure.

---

## Serverless Architecture

### Decision

Avoid a traditional backend server.

### Reason

- Better scalability.
- Lower costs.
- Easier deployment.
- Reduced maintenance.

---

## Future Decision

When the knowledge base becomes larger, migrate to a Retrieval-Augmented Generation (RAG) architecture with embeddings and vector search.