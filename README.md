# 🚀 Interview Maestro

An AI-powered interview preparation platform that helps you master your next job interview with personalized questions and expert answers.

![Interview Maestro](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Personalized Question Generation

- Generate tailored interview questions based on your target role
- Choose from Technical, Behavioral, or Case Study question types
- Customize the number of questions (1-20)

### 🤖 AI-Powered Answers

- Get comprehensive, well-structured answers powered by advanced AI
- Markdown-formatted responses for better readability
- Copy answers to clipboard with one click

### 🎨 Modern & Beautiful UI

- Stunning gradient backgrounds with animated effects
- Smooth animations using Framer Motion
- Glass morphism design elements
- Fully responsive across all devices
- Dark mode optimized

### 💾 Smart Storage

- Automatic question saving to localStorage
- Resume your prep session anytime
- Easy reset functionality

### 🧩 Component Architecture

- Reusable UI components (Button, Card, Input, Select, Alert, LoadingSpinner)
- Modular and maintainable codebase
- Type-safe with TypeScript

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5 with App Router
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 12.23
- **Icons:** Lucide React 0.544
- **Markdown:** React Markdown 10.1
- **AI Provider:** Groq API (OpenAI compatible)
- **Package Manager:** pnpm

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/MuhammadRaffey/ai-interview-buddy
cd ai-interview-buddy
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
GROK_API_KEY=your_groq_api_key_here
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage

### Generate Questions

1. Navigate to the Interview Prep page
2. Enter your target job role (e.g., "Software Engineer")
3. Select the interview focus (Technical, Behavioral, or Case Study)
4. Choose the number of questions
5. Click "Generate Questions"

### View Answers

1. Click on any question to view the AI-generated answer
2. Copy the answer to your clipboard if needed
3. Navigate back to generate more questions

## 📁 Project Structure

```
ai-interview-buddy/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── interview-buddy/
│   │   │       ├── route.ts          # Questions generation API
│   │   │       └── answer/
│   │   │           └── route.ts      # Answer generation API
│   │   ├── interview/
│   │   │   ├── page.tsx              # Interview prep dashboard
│   │   │   └── answer/
│   │   │       └── [questionNumber]/
│   │   │           └── page.tsx      # Answer page
│   │   ├── layout.tsx                # Root layout with navbar
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   └── components/
│       ├── ui/
│       │   ├── Button.tsx            # Reusable button component
│       │   ├── Card.tsx              # Card component
│       │   ├── Input.tsx             # Input component
│       │   ├── Select.tsx            # Select dropdown
│       │   ├── Alert.tsx             # Alert notifications
│       │   └── LoadingSpinner.tsx    # Loading spinner
│       └── layout/
│           ├── Navbar.tsx            # Navigation bar
│           └── BackgroundEffects.tsx # Animated backgrounds
├── public/
│   └── videos/
│       └── bg.mp4                    # Background video
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design Features

### Color Palette

- **Primary:** Blue gradient (from-blue-400 to-purple-600)
- **Secondary:** Purple and pink accents
- **Background:** Dark gradient (from-gray-900 via-black to-gray-900)
- **Cards:** Glass morphism with backdrop blur

### Typography

- **Headings:** Geist Sans with gradient text
- **Body:** System fonts with proper line-height
- **Code:** Geist Mono for code blocks

### Animations

- Page transitions with Framer Motion
- Hover effects on interactive elements
- Loading states with smooth transitions
- Floating orbs in background
- Gradient animations

## 🔧 Scripts

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## 🌟 Key Improvements

### Performance

- Server-side rendering with Next.js 15
- Optimized bundle size
- Lazy loading for components
- Efficient state management

### User Experience

- Intuitive navigation
- Clear visual feedback
- Error handling with friendly messages
- Loading states for async operations
- Keyboard accessible

### Code Quality

- Full TypeScript coverage
- ESLint configuration
- Component-based architecture
- Separation of concerns
- Reusable components

## 🔐 Environment Variables

| Variable       | Description                         | Required |
| -------------- | ----------------------------------- | -------- |
| `GROK_API_KEY` | Your Groq API key for AI generation | Yes      |

## 📝 API Routes

### POST `/api/interview-buddy`

Generate interview questions based on role and type.

**Request Body:**

```json
{
  "role": "Software Engineer",
  "questionType": "Technical",
  "numQuestions": 10
}
```

**Response:**

```json
{
  "questions": {
    "1": "Question 1...",
    "2": "Question 2...",
    ...
  }
}
```

### POST `/api/interview-buddy/answer`

Generate an answer for a specific question.

**Request Body:**

```json
{
  "question": "What is polymorphism?"
}
```

**Response:**

```json
{
  "answer": "Detailed answer..."
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- AI powered by [Groq](https://groq.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for interview preparation
