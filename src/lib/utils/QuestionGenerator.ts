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

  constructor(ollamaUrl: string = 'http://localhost:11434') {
    this.ollamaUrl = ollamaUrl;
    // Don't check availability in constructor - let it be checked explicitly
  }

  private async checkOllamaAvailability(): Promise<void> {
    try {
      console.log('Checking Ollama availability at:', this.ollamaUrl);
      const response = await fetch(`${this.ollamaUrl}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(60000) // 30 second timeout
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

    const startTime = Date.now();
    try {
      // Randomly choose FACT or MYTH
      const factOrMyth: 'FACT' | 'MYTH' = Math.random() < 0.5 ? 'FACT' : 'MYTH';
      const prompt = this.buildPrompt(sednaTip, difficulty, this.getRandomCombination(), factOrMyth);
      
      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen:0.5b',
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.4,
            top_p: 0.8,
            max_tokens: 250
          }
        }),
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      const endTime = Date.now();
      const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);
      console.log(`Successfully generated question with Ollama in ${durationSeconds} seconds`);
      console.log('Ollama response data:', data.response);
      return this.parseOllamaResponse(data.response, sednaTip, difficulty, factOrMyth);
    } catch (error) {
      const endTime = Date.now();
      const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);
      console.error(`Error generating question with Ollama after ${durationSeconds} seconds:`, error);
      return null;
    }
  }

  private getRandomCombination() {
    const topics = ['privacy', 'security', 'efficiency', 'bias', 'transparency', 'automation', 'decision-making', 'compliance', 'cost', 'accessibility'];
    const perspectives = ['citizen', 'employee', 'manager', 'regulator', 'taxpayer', 'stakeholder'];
    const questionTypes = ['capability', 'limitation', 'implementation', 'outcome', 'requirement'];
    
    return {
      topic: topics[Math.floor(Math.random() * topics.length)],
      perspective: perspectives[Math.floor(Math.random() * perspectives.length)],
      type: questionTypes[Math.floor(Math.random() * questionTypes.length)]
    };
  }

  private buildPrompt(sednaTip: SednaTip, difficulty: Difficulty, combination: { topic: string, perspective: string, type: string }, factOrMyth: 'FACT' | 'MYTH'): string {
    const difficultyInstructions = {
      easy: 'Simple language, easy to decide.',
      medium: 'Moderate complexity, some technical terms.',
      hard: 'Advanced technical language, complex concepts.'
    };

    if (factOrMyth === 'FACT') {
      return `Write a FACT about AI, inspired by this case study: "${sednaTip.tip}". The statement must be about ${combination.topic}, from the perspective of a ${combination.perspective}. Do NOT mention Sedna or the case study. After the statement, write FACT on a new line. Then, give a positive explanation (8-10 sentences) showing how this is possible in real life.

STATEMENT: [your statement]
ANSWER: FACT
EXPLANATION: [explain the fact in 8-10 lines and give real world examples]
`;
    } else {
      return `Write a MYTH (a common misconception) about AI in government, based on this case study: "${sednaTip.tip}". The statement must be about ${combination.topic}, from the perspective of a ${combination.perspective}.
IMPORTANT: Do NOT simply negate the fact or use phrases like 'is actually false' or 'is not true.' The myth should be a believable but incorrect idea that some people might think, but the case study proves it wrong. Do NOT mention Sedna or the case study. After the statement, write MYTH on a new line. Then, give an explanation (8-10 sentences) that debunks the myth using real-world evidence.

STATEMENT: [your MYTH statement]
ANSWER: MYTH
EXPLANATION: [explain why the statement is wrong in 8-10 lines]
`;
    }
  }

  private parseOllamaResponse(response: string, sednaTip: SednaTip, difficulty: Difficulty, factOrMyth?: 'FACT' | 'MYTH'): Question | null {
    try {
      const lines = response.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      let statement = '';
      let isFact: boolean | null = null;
      let explanation = '';
      let lastLabel = '';
      let explanationLines: string[] = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.toLowerCase().startsWith('statement:')) {
          statement = line.replace(/statement:/i, '').trim();
          lastLabel = 'statement';
        } else if (
          line.toLowerCase().startsWith('is_fact:') ||
          line.toLowerCase().startsWith('is fact:') ||
          line.toLowerCase().startsWith('answer:')
        ) {
          const factValue = line.split(':')[1]?.trim().toLowerCase();
          if (factValue === 'true' || factValue === 'yes' || factValue === 'fact') isFact = true;
          if (factValue === 'false' || factValue === 'no' || factValue === 'myth') isFact = false;
          lastLabel = 'is_fact';
        } else if (line.toLowerCase().startsWith('myth:')) {
          const mythContent = line.replace(/myth:/i, '').trim();
          if (mythContent) {
            statement = mythContent;
          } else if (lines[i + 1]) {
            statement = lines[i + 1].trim();
            i++;
          }
          isFact = false;
          lastLabel = 'myth';
        } else if (line.toLowerCase().startsWith('fact:')) {
          const factContent = line.replace(/fact:/i, '').trim();
          if (!statement) {
            if (factContent) {
              statement = factContent;
            } else if (lines[i + 1]) {
              statement = lines[i + 1].trim();
              i++;
            }
            isFact = true;
          } else if (!explanation) {
            if (factContent) {
              explanation = factContent;
            } else if (lines[i + 1]) {
              explanation = lines[i + 1].trim();
              i++;
            }
          }
          lastLabel = 'fact';
        } else if (line.trim().toLowerCase() === 'fact' || line.trim().toLowerCase() === 'fact.') {
          isFact = true;
        } else if (line.trim().toLowerCase() === 'myth' || line.trim().toLowerCase() === 'myth.') {
          isFact = false;
        } else if (line.toLowerCase().startsWith('explanation')) {
          // Robustly handle EXPLANATION label with any casing, extra spaces, or colon
          const match = line.match(/explanation\s*:?(.*)/i);
          if (match) {
            const rest = match[1].trim();
            if (rest) {
              explanation = rest;
            } else if (lines[i + 1]) {
              explanation = lines[i + 1].trim();
              i++;
            }
          }
          lastLabel = 'explanation';
        } else if (lastLabel === 'explanation') {
          // Collect multi-line explanations
          explanationLines.push(line);
        }
      }
      // If explanation is still empty, try to use collected lines after EXPLANATION
      if (!explanation && explanationLines.length > 0) {
        explanation = explanationLines.join(' ');
      }

      if (isFact === null && factOrMyth) {
        // Fallback: use the prompt's intent
        isFact = factOrMyth === 'FACT';
      }

      if (isFact === null) {
        isFact = false;
      }

      // Validation: For MYTH, reject negated or duplicate statements
      if (isFact === false) {
        const lowerStatement = statement.toLowerCase();
        const lowerTip = sednaTip.tip.toLowerCase();
        if (
          lowerStatement.includes('is actually false') ||
          lowerStatement.includes('is not true') ||
          lowerStatement === lowerTip ||
          lowerStatement.replace(/\W/g, '') === lowerTip.replace(/\W/g, '')
        ) {
          console.warn('Rejected myth statement for being a negation or duplicate:', statement);
          return null;
        }
      }

      if (!statement || !explanation) {
        console.warn('Returning null from parseOllamaResponse: missing fields', { statement, explanation });
        return null;
      }

      // Debug log for final parsed values
      console.log('Final parsed Question:', { statement, isFact, explanation });

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
    // Ensure Ollama status is checked before generating
    if (!this.isOllamaAvailable) {
      await this.checkOllamaAvailability();
    }
    
    // Import here to avoid circular dependencies
    const { getRandomTip } = await import('$lib/data/sednaTips');
    const randomTip = getRandomTip();
    return this.generateQuestion(randomTip, difficulty);
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