# Sedna AI Gameshow 🎮

A retro-style interactive gameshow that tests AI knowledge through Myth vs Fact questions, powered by local Ollama + Mistral AI and showcasing Sedna Consulting Group's public-sector AI success stories.

## 🎯 Features

- **🤖 Dynamic AI Questions**: Real-time question generation using local Ollama + Mistral
- **📚 Educational Content**: Learn from real Sedna Consulting Group case studies
- **🎮 Retro Gaming Experience**: Engaging retro-style UI with animations and effects
- **🏆 Progress Tracking**: Score tracking, accuracy metrics, and difficulty levels
- **💾 Offline Operation**: Works completely offline with local AI processing
- **🖥️ Kiosk Mode**: Optimized for fullscreen kiosk deployment
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Ollama + Mistral for local AI question generation

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sedna-ai-gameshow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 🤖 AI Setup (Optional)

For dynamic AI question generation, set up Ollama + Mistral:

1. **Install Ollama**: [https://ollama.ai/download](https://ollama.ai/download)
2. **Download Mistral**: `ollama pull mistral`
3. **Start Ollama**: `ollama serve`

The gameshow automatically detects Ollama availability and falls back to pre-generated questions if unavailable.

📖 **Detailed setup instructions**: See [OfflineOllamaSetup.md](./OfflineOllamaSetup.md)

## 🎮 How to Play

1. **Welcome Screen**: Learn about the gameshow and click "START GAMESHOW"
2. **Player Setup**: Enter your name, occupation, and AI concerns
3. **Game Play**: Answer Myth vs Fact questions about AI
4. **Learn More**: View detailed case studies when you answer correctly
5. **Track Progress**: Monitor your score and accuracy in the stats panel

## 🏗️ Architecture

### Core Components

- **QuestionGenerator**: Handles AI question generation with Ollama fallback
- **AnswerHandler**: Manages user responses and scoring
- **SednaTips**: Database of 15 real case studies and tips
- **UI Components**: Retro-styled Svelte components

### Tech Stack

- **Frontend**: SvelteKit + TypeScript
- **Styling**: TailwindCSS with custom retro theme
- **AI**: Ollama + Mistral (local) with fallback questions
- **Storage**: Browser localStorage for user data
- **Build**: Vite

### File Structure

```
src/
├── lib/
│   ├── data/
│   │   └── sednaTips.ts          # Case studies database
│   └── utils/
│       ├── QuestionGenerator.ts  # AI question generation
│       └── AnswerHandler.ts      # Answer processing & scoring
├── routes/
│   ├── +page.svelte             # Welcome screen
│   ├── setup/
│   │   └── +page.svelte         # Player setup
│   └── gameshow/
│       ├── +page.svelte         # Main game
│       ├── CaseStudyModal.svelte # Case study display
│       └── StatsModal.svelte    # Statistics panel
└── app.css                      # Global styles & retro theme
```

## 🎨 Customization

### Styling

The app uses a custom retro theme with TailwindCSS. Key color classes:

- `retro-blue`, `retro-cyan`, `retro-green`, `retro-yellow`, `retro-red`
- `retro-button`, `retro-card`, `retro-modal` components
- Custom animations: `animate-glow`, `animate-bounce-slow`, etc.

### Content

Add new case studies in `src/lib/data/sednaTips.ts`:

```typescript
{
  id: 16,
  tip: "Your new Sedna success story",
  caseStudy: "Detailed case study description",
}
```

### AI Configuration

Modify AI settings in `src/lib/utils/QuestionGenerator.ts`:

```typescript
// Change model
model: 'your-model-name'

// Adjust generation parameters
temperature: 0.7,
top_p: 0.9,
max_tokens: 500
```

## 🖥️ Kiosk Deployment

### Fullscreen Mode
- Press F11 for fullscreen
- App automatically adapts to kiosk mode
- Prevents context menus and text selection

### Production Deployment
1. Build the app: `npm run build`
2. Deploy the `build` folder to your web server
3. Install Ollama on the kiosk machine
4. Configure auto-start for Ollama service

### Performance Optimization
- Dedicated machine for Ollama
- 16GB+ RAM recommended
- SSD storage for faster model loading
- Monitor resource usage during operation

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type checking
npm run lint         # Linting
npm run format       # Code formatting
```

### Adding New Features

1. **New Question Types**: Extend `QuestionGenerator.ts`
2. **UI Components**: Create new Svelte components in `src/routes/`
3. **Styling**: Add custom classes in `src/app.css`
4. **Data**: Update `sednaTips.ts` with new case studies

### Testing

The app includes fallback questions for testing without Ollama. To test AI features:

1. Install Ollama
2. Download Mistral model
3. Start Ollama service
4. Test question generation

## 📊 Analytics & Data

### User Data (Local Storage)
- Name, occupation, AI concerns
- Score, accuracy, questions answered
- No data sent to external servers

### Performance Metrics
- Question generation time
- Ollama availability status
- User engagement patterns

## 🔒 Security & Privacy

- **Local Processing**: All AI processing happens locally
- **No External APIs**: No data sent to external services
- **Browser Storage**: User data stored in localStorage only
- **Offline Operation**: Works completely offline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Sedna Consulting Group.

## 🆘 Support

### Common Issues

**Q: Questions not generating**
A: Check if Ollama is running and Mistral model is downloaded

**Q: App not loading**
A: Ensure Node.js 18+ is installed and dependencies are installed

**Q: Performance issues**
A: Increase system RAM and ensure adequate resources for Ollama

### Getting Help

- Check [OfflineOllamaSetup.md](./OfflineOllamaSetup.md) for AI setup
- Review browser console for error messages
- Verify Ollama installation and model availability

## 🎉 About Sedna Consulting Group

Sedna Consulting Group specializes in AI solutions for government and public sector organizations. Our expertise includes:

- Cybersecurity and data protection
- Smart city implementations
- Customer service automation
- Human resources optimization
- AI governance and compliance

Learn more about our success stories through the gameshow's case studies!

---

**Built with ❤️ by Sedna Consulting Group** 