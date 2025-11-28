# Note Taking Application

Welcome to this coding test. Please read the following instructions carefully and complete all required tasks.

> ℹ️ **Note**: This test is for React developers. Knowledge of React and TypeScript is mandatory for all tasks.

## About This App

This is a simple Notes App built with vanilla JavaScript.

### Current Features

- User can create a new note
- User can edit an existing note (title and body)
- User can delete an existing note

**Note:** All data will be saved in your browser's local storage.

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- TypeScript (latest version recommended)
- A package manager of your choice (e.g., npm, yarn, pnpm)

### How to Run

1. Install dependencies: `yarn install`.
2. Start the development server: `yarn dev`.
3. Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

### Submission Instructions

1. Clone this repository.
2. Make changes as per the tasks below.
3. Send us the zip copy or upload to your preferred project management platform like GitHub, GitLab, or Gitee.

## Guidelines

> ⚠️ **Important**: This test must be completed independently. Use of AI tools or external help is prohibited and will result in disqualification.

## Required Tasks

1. Refactor the app to use React with TypeScript
   - Convert class-based JS code to functional React components
2. Organize the folder structure appropriately
   - Separate components
   - Hooks
   - Utils
   - Types
3. Ensure all current features listed above are implemented and work correctly after refactoring
4. Fix existing bugs in the note application
5. Improve the UI and UX
   - Make the app responsive
   - Add form validation to prevent saving empty or invalid notes
6. Add a confirmation modal for the delete action
   - Include a loading state while deleting the note
   - Simulate a 5-second delay during deletion to demonstrate the loading state

## Bonus Tasks

Bonus tasks are optional and demonstrate advanced skills. They are not required but can differentiate candidates.

1. Implement auto-save functionality
   - Ensure no Save button is included
   - Auto-save changes while editing
2. Implement import and export functionality for notes
   - Support CSV or XML formats
3. Add a search bar for searching notes
   - You can add it anywhere you want (e.g., in the sidebar or edit panel)
   - The search should filter notes by title
   - Be case-insensitive
   - Update the sidebar in real-time as the user types
4. Optimize performance by minimizing unnecessary re-renders
   - For example, ensure that editing one note only updates that note in the sidebar, not all notes
   - Add comments explaining the optimizations made and why they improve performance
5. Implement drag-and-drop functionality for reordering notes in the sidebar

## Evaluation Criteria

- Completeness and correctness of required features.
- Code quality, React/TypeScript best practices, and folder organization.
- UI/UX improvements and bug fixes.
- Bonus features for advanced evaluation.

## Thank You

Thank you for your participation. We look forward to reviewing your work!
