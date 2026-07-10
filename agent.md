# AI Agent Instruction Manual & Token Saving Guidelines

This file serves as a guide for AI agents working on this project (react-portfolio) to optimize efficiency and minimize token consumption.

---

## 10 Rules for Token Optimization

1. **Send Only Related Files**: Do not read the entire project. Only read files directly linked to the requested changes. Smaller context = fewer tokens.
2. **Use context.md**: Maintain a high-level summary of the project structure so the AI doesn't have to scan the directory tree repeatedly.
3. **Ask Before Reading More Files**: The AI agent must ask the user for permission before opening/reading files outside the immediate scope of the task.
4. **Summarize Context when Chatting (Compact)**: In long conversations, use summaries to truncate older, unused context.
5. **Start a New Chat for a New Task (Clear)**: Open a fresh conversation window once a task is completed to prevent carrying over large old contexts.
6. **Limit Output Format (Structured & Concise)**: Provide only the necessary code changes. Do not explain basic programming concepts or write long explanations unless requested.
7. **Prompt Caching**: Keep static rules, system instructions, and headers at the top of instructions to benefit from cache hits.
8. **Just-in-Time Context**: Reference file paths first, and only load the content when it is absolutely required to make a modification.
9. **Break Tasks into Smaller Pieces**: Execute complex changes step-by-step rather than requesting massive system-wide overhauls in a single prompt.
10. **Use Specific Token-Saving Prompts**: Explicitly instruct the AI to show only modified code blocks (diffs) instead of reproducing entire source files.

---

## Core Philosophy
> *"Do not let the AI read everything; let the AI read only what is necessary to make decisions."*

---

## Project Rules & Best Practices (react-portfolio)

- **Image Formats**: Always prioritize `.webp` format for portfolio preview screenshots and assets to keep the bundle size small and load times fast.
- **Vite & Imports**: Verify that any new asset added is properly defined and imported in `src/constants/assets.js` and correctly mapped in `src/constants/portfolioData.js`.
- **CSS Grid/Flexbox Layouts**: Maintain responsive CSS rules (e.g. tablet and mobile media queries) when adding or reordering portfolio showcase items. Do not hardcode static pixel values that break responsive views.
