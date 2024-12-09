Quiz Builder Application
Features

1. Snap Grid System

Grid Canvas: Components snap to predefined grid positions.
Available Components: Progress Bar, Question Number, Timer, Question Text, Image, and 4 Options.
State Management: Save component positions and details to the backend when dropped. 2. Admin View

Draggable Elements: Navigation drawer with draggable components.
Drag-and-Drop: Arrange components on the grid.
Configuration Saving: Save quiz structures to the backend using Remix Actions. 3. User View

Quiz Interaction: Load quiz setup using Remix Loaders and answer questions.
Answer Validation: Test if submitted answers are correct. 4. Backend Integration

Supports mock or real backend for:
Fetching quiz components.
Saving grid and quiz configurations. 5. Responsive Design

Grid system and navigation drawer adapt to mobile, tablet, and desktop. 6. Accessibility

Keyboard Navigation: Enhanced for grid and components.
Focus Management: Improved usability for keyboard users.
Technical Requirements

1. Remix Loaders & Actions

Loaders: Fetch quiz configurations and questions.
Actions: Save grid state and quiz configurations. 2. TypeScript & Tailwind CSS

TypeScript: Ensures type safety.
Tailwind CSS: Utility-first styling approach. 3. Validations

Custom validations for intuitive grid functionality. 4. Accessibility

Implement ARIA roles and keyboard navigation enhancements.
Development
Prerequisites

Node.js installed on your system.
Clone the repository and navigate to the project directory.
Run Locally

Install dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm run dev
Build for Production

Build the project:
bash
Copy code
npm run build
Start the production server:
bash
Copy code
npm start
How It Works
Admin Workflow

Drag components from the navigation drawer to the grid.
Configure components as needed.
Save the setup using Remix Actions.
User Workflow

Fetch quiz setup using Remix Loaders.
Interact with the quiz and submit answers.
View answer validations.
Styling
Framework: Tailwind CSS.
Customization: Modify styles in tailwind.config.js and component classnames.
Accessibility
Keyboard Navigation: Full keyboard operability.
Focus Management: Visual cues and intuitive tab navigation
