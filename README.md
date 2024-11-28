# AI Interview Buddy

AI Interview Buddy is an AI-powered platform designed to help job seekers enhance their interview skills through simulated interviews. Users can select from various industries and job positions, respond to questions via speech, and receive real-time feedback to improve their performance.

## Features

- **Industry-Specific Simulations**: Choose from a wide range of industries and job roles to tailor your interview practice.
- **Speech Recognition**: Answer questions verbally, mimicking real interview scenarios.
- **Real-Time Feedback**: Receive instant evaluations to identify strengths and areas for improvement.
- **Progress Tracking**: Monitor your development over time with detailed analytics.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **AI Feedback**: OpenAI's GPT-4o-mini

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MuhammadRaffey/ai-interview-buddy.git
   cd ai-interview-buddy
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. **Select an Industry and Role**: Choose the sector and position you want to practice for.
2. **Start the Interview**: Begin the simulation and respond to questions verbally.
3. **Receive Feedback**: After completing the interview, get instant feedback on your performance.
4. **Review and Improve**: Use the feedback to identify areas for improvement and track your progress over time.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Acknowledgements

- [OpenAI](https://openai.com) for their GPT-4o-mini model.
- [Next.js](https://nextjs.org) for the React framework.
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework.
