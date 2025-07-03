import type { SednaTip } from '$lib/data/sednaTips';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  statement: string;
  isFact: boolean;
  explanation: string;
  sednaTip: SednaTip;
  difficulty: Difficulty;
}

export interface OllamaResponse {
  response: string;
  done: boolean;
}

// Pre-generated questions as fallback when Ollama is not available
const fallbackQuestions: Omit<Question, 'sednaTip'>[] = [
  {
    id: 'fallback-1',
    statement: 'AI can completely replace human cybersecurity analysts in detecting threats.',
    isFact: false,
    explanation: 'While AI can assist in threat detection, human analysts are still essential for context, decision-making, and handling complex scenarios that require human judgment.',
    difficulty: 'medium'
  },
  {
    id: 'fallback-2',
    statement: 'AI-powered chatbots can provide 98% accurate multilingual support.',
    isFact: true,
    explanation: 'Modern AI chatbots, like those built by Sedna, can achieve high accuracy in language detection and provide effective multilingual support with proper training and implementation.',
    difficulty: 'easy'
  },
  {
    id: 'fallback-3',
    statement: 'AI traffic systems can adjust signals in real-time based on actual conditions.',
    isFact: true,
    explanation: 'AI-driven adaptive traffic signal systems use sensors and real-time data to dynamically adjust traffic lights, improving flow and safety.',
    difficulty: 'easy'
  },
  {
    id: 'fallback-4',
    statement: 'AI hiring tools always eliminate bias in the recruitment process.',
    isFact: false,
    explanation: 'While AI can help reduce bias, it can also perpetuate existing biases if not properly designed and monitored. Ethical AI implementation requires ongoing oversight.',
    difficulty: 'medium'
  },
  {
    id: 'fallback-5',
    statement: 'AI can predict traffic congestion and optimize transit routes.',
    isFact: true,
    explanation: 'AI systems analyze multiple data sources including cameras, ridership data, and weather to predict congestion and optimize transit routes in real-time.',
    difficulty: 'medium'
  },
  {
    id: 'fallback-6',
    statement: 'AI systems can process government permits and licenses automatically.',
    isFact: true,
    explanation: 'GenAI-powered automation systems can read, validate, and process permit requests while maintaining compliance with privacy laws and regulations.',
    difficulty: 'easy'
  },
  {
    id: 'fallback-7',
    statement: 'AI can completely eliminate the need for human oversight in government services.',
    isFact: false,
    explanation: 'While AI can automate many tasks, human oversight remains crucial for complex decisions, ethical considerations, and handling edge cases.',
    difficulty: 'easy'
  },
  {
    id: 'fallback-8',
    statement: 'AI can help prevent insider threats by monitoring data access patterns.',
    isFact: true,
    explanation: 'AI-driven cybersecurity systems use anomaly detection to identify unusual data access patterns that may indicate insider threats.',
    difficulty: 'medium'
  },
  {
    id: 'fallback-9',
    statement: 'AI systems can achieve zero data exfiltrations for extended periods.',
    isFact: true,
    explanation: 'With proper implementation of AI-driven security tools, organizations can achieve zero malicious exfiltrations, as demonstrated by Sedna\'s work with cybersecurity agencies.',
    difficulty: 'hard'
  },
  {
    id: 'fallback-10',
    statement: 'AI can automatically generate unbiased policies and regulations.',
    isFact: false,
    explanation: 'While AI can assist in policy development, human judgment and ethical oversight are essential to ensure fairness and avoid unintended biases.',
    difficulty: 'hard'
  }
];

class QuestionGenerator {
  private ollamaUrl: string;
  private isOllamaAvailable: boolean = false;

  // Track last two isFact values for alternation
  private lastIsFacts: boolean[] = [];
  // Track unused tip IDs for unique tip usage
  private unusedTipIds: number[] = [];

  constructor(ollamaUrl: string = 'http://localhost:11434') {
    this.ollamaUrl = ollamaUrl;
    // Load unused tips from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sedna-unused-tip-ids');
      if (stored) {
        try {
          this.unusedTipIds = JSON.parse(stored);
        } catch (e) {
          this.unusedTipIds = [];
        }
      }
    }
  }

  private saveUnusedTips() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sedna-unused-tip-ids', JSON.stringify(this.unusedTipIds));
    }
  }

  // Helper to get a tip that hasn't been used yet
  private async getUniqueRandomTip(): Promise<SednaTip> {
    const { sednaTips } = await import('$lib/data/sednaTips');
    if (this.unusedTipIds.length === 0) {
      // Refill and shuffle
      this.unusedTipIds = sednaTips.map(t => t.id).sort(() => Math.random() - 0.5);
      this.saveUnusedTips();
    }
    const tipId = this.unusedTipIds.pop();
    this.saveUnusedTips();
    return sednaTips.find(t => t.id === tipId) || sednaTips[0];
  }

  // Helper to enforce alternation: no 3 in a row
  private enforceAlternation(isFact: boolean): boolean {
    if (this.lastIsFacts.length < 2) return true;
    if (this.lastIsFacts[this.lastIsFacts.length - 1] === isFact && this.lastIsFacts[this.lastIsFacts.length - 2] === isFact) {
      return false;
    }
    return true;
  }

  // Update lastIsFacts with the new value
  private pushIsFact(isFact: boolean) {
    this.lastIsFacts.push(isFact);
    if (this.lastIsFacts.length > 2) this.lastIsFacts.shift();
  }

  private async checkOllamaAvailability(): Promise<void> {
    try {
      console.log('Checking Ollama availability at:', this.ollamaUrl);
      const response = await fetch(`${this.ollamaUrl}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(60000) // 1 minute timeout
      });
      this.isOllamaAvailable = response.ok;
      console.log('Ollama availability check result:', response.ok, 'Status:', response.status);
    } catch (error) {
      console.warn('Ollama not available, using fallback questions:', error);
      this.isOllamaAvailable = false;
    }
  }

  private async generateQuestionWithOllama(sednaTip: SednaTip, difficulty: Difficulty): Promise<Question | null> {
    if (!this.isOllamaAvailable) {
      return null;
    }

    try {
      const prompt = this.buildPrompt(sednaTip, difficulty);
      
      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral:7b-instruct-v0.2-q4_K_M',
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 500
          }
        }),
        signal: AbortSignal.timeout(60000) // 1 minute timeout
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      return this.parseOllamaResponse(data.response, sednaTip, difficulty);
    } catch (error) {
      console.error('Error generating question with Ollama:', error);
      return null;
    }
  }

  private buildPrompt(sednaTip: SednaTip, difficulty: Difficulty): string {
    const difficultyInstructions = {
      easy: 'Use simple, clear language. Make it easy to decide if the statement is true or false.',
      medium: 'Use moderate complexity and some technical terms. Challenge the user\'s understanding.',
      hard: 'Use advanced technical language and complex AI concepts. Require deep understanding.'
    };

    return `Create a Myth vs Fact question about AI in government/public sector, based on this case study: "${sednaTip.tip}".

DIFFICULTY: ${difficulty.toUpperCase()}
${difficultyInstructions[difficulty]}

Format:
STATEMENT: [A myth or fact statement about AI, focusing on a key lesson (e.g., bias, fairness, transparency, accountability, explainability, ethics, unintended consequences, etc.). Relate it to the case study.]
IS_FACT: [true or false]
EXPLANATION: [Briefly explain why this is a myth or fact. Do not mention Sedna or any company.]
`;
}


  private parseOllamaResponse(response: string, sednaTip: SednaTip, difficulty: Difficulty): Question | null {
    try {
      const lines = response.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      let statement = '';
      let isFact = false;
      let explanation = '';

      for (const line of lines) {
        if (line.startsWith('STATEMENT:')) {
          statement = line.replace('STATEMENT:', '').trim();
        } else if (line.startsWith('IS_FACT:')) {
          const factValue = line.replace('IS_FACT:', '').trim().toLowerCase();
          isFact = factValue === 'true';
        } else if (line.startsWith('EXPLANATION:')) {
          explanation = line.replace('EXPLANATION:', '').trim();
        }
      }

      if (!statement || !explanation) {
        return null;
      }

      return {
        id: `ollama-${Date.now()}`,
        statement,
        isFact,
        explanation,
        sednaTip,
        difficulty
      };
    } catch (error) {
      console.error('Error parsing Ollama response:', error);
      return null;
    }
  }

  public async generateQuestion(sednaTip?: SednaTip, difficulty: Difficulty = 'medium'): Promise<Question> {
    // Ensure Ollama status is checked before generating
    if (!this.isOllamaAvailable) {
      await this.checkOllamaAvailability();
    }
    
    console.log('Ollama available:', this.isOllamaAvailable);
    console.log('Sedna tip provided:', !!sednaTip);
    console.log('Difficulty level:', difficulty);
    
    // Try Ollama first if available
    if (this.isOllamaAvailable && sednaTip) {
      console.log('Attempting to generate question with Ollama...');
      const ollamaQuestion = await this.generateQuestionWithOllama(sednaTip, difficulty);
      if (ollamaQuestion) {
        console.log('Successfully generated question with Ollama');
        return ollamaQuestion;
      } else {
        console.log('Ollama generation failed, falling back to pre-generated questions');
      }
    } else {
      console.log('Using fallback questions - Ollama not available or no sedna tip');
    }

    // Fallback to pre-generated questions filtered by difficulty
    const difficultyQuestions = fallbackQuestions.filter(q => q.difficulty === difficulty);
    const fallbackQuestion = difficultyQuestions.length > 0 
      ? difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)]
      : fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]; // fallback to any question if none match difficulty
    
    return {
      ...fallbackQuestion,
      sednaTip: sednaTip || {
        id: 0,
        tip: "AI can enhance government services and improve efficiency when properly implemented.",
        caseStudy: "Sedna Consulting Group has helped numerous government agencies implement AI solutions that improve service delivery, reduce costs, and enhance citizen satisfaction."
      }
    };
  }

  public async generateQuestionFromRandomTip(difficulty: Difficulty = 'medium'): Promise<Question> {
    if (!this.isOllamaAvailable) {
      await this.checkOllamaAvailability();
    }
    // Get a unique tip
    const randomTip = await this.getUniqueRandomTip();
    // Try to generate a question that alternates myth/fact
    let question: Question | null = null;
    let attempts = 0;
    do {
      question = await this.generateQuestion(randomTip, difficulty);
      attempts++;
      // If alternation fails, flip isFact and try again (max 5 attempts)
      if (question && !this.enforceAlternation(question.isFact)) {
        // Try to flip isFact if possible (fallback only)
        if (!this.isOllamaAvailable) {
          question.isFact = !question.isFact;
        } else {
          // For Ollama, just try again (may not be perfect)
          question = null;
        }
      }
    } while ((!question || !this.enforceAlternation(question.isFact)) && attempts < 5);
    if (question) this.pushIsFact(question.isFact);
    return question!;
  }

  public getOllamaStatus(): boolean {
    return this.isOllamaAvailable;
  }

  public async refreshOllamaStatus(): Promise<void> {
    await this.checkOllamaAvailability();
  }
}

// Export singleton instance
export const questionGenerator = new QuestionGenerator();

// Export for testing
export { QuestionGenerator }; 