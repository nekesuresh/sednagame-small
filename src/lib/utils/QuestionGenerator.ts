import type { SednaTip } from '$lib/data/sednaTips';
import { sednaTips, getTipById } from '$lib/data/sednaTips';

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
const fallbackQuestions: (Omit<Question, 'sednaTip'> & { tipId: number })[] = [
  {
    id: 'fallback-1',
    statement: 'AI-powered chatbots can provide 98% accurate multilingual support.',
    isFact: true,
    explanation: 'Modern AI chatbots, like those built by Sedna, can achieve high accuracy in language detection and provide effective multilingual support with proper training and implementation.',
    difficulty: 'easy',
    tipId: 1
  },
  {
    id: 'fallback-2',
    statement: 'AI systems can process government permits and licenses automatically.',
    isFact: true,
    explanation: 'GenAI-powered automation systems can read, validate, and process permit requests while maintaining compliance with privacy laws and regulations.',
    difficulty: 'easy',
    tipId: 11
  },
  {
    id: 'fallback-3',
    statement: 'AI can completely eliminate the need for human oversight in government services.',
    isFact: false,
    explanation: 'While AI can automate many tasks, human oversight remains crucial for complex decisions, ethical considerations, and handling edge cases.',
    difficulty: 'easy',
    tipId: 17
  },
  {
    id: 'fallback-4',
    statement: 'AI can help prevent insider threats by monitoring data access patterns.',
    isFact: true,
    explanation: 'AI-driven cybersecurity systems use anomaly detection to identify unusual data access patterns that may indicate insider threats.',
    difficulty: 'medium',
    tipId: 4
  },
  {
    id: 'fallback-5',
    statement: 'AI can help predict which public infrastructure, like bridges or roads, needs maintenance before problems occur.',
    isFact: true,
    explanation: 'Predictive maintenance tools powered by AI analyze sensor and usage data to forecast infrastructure failures before they happen.',
    difficulty: 'medium',
    tipId: 2
  },
  {
    id: 'fallback-6',
    statement: 'AI can automatically generate unbiased policies and regulations.',
    isFact: false,
    explanation: 'While AI can assist in policy development, human judgment and ethical oversight are essential to ensure fairness and avoid unintended biases.',
    difficulty: 'hard',
    tipId: 18
  },
  {
    id: 'fallback-7',
    statement: 'AI can help governments automate routine administrative tasks, freeing up staff for more complex work.',
    isFact: true,
    explanation: 'From processing forms to scheduling services, AI handles repetitive tasks efficiently, allowing staff to focus on strategic decision-making.',
    difficulty: 'easy',
    tipId: 3
  },
  {
    id: 'fallback-8',
    statement: 'AI is only useful for private sector businesses and has little impact on public services.',
    isFact: false,
    explanation: 'AI is transforming public services by improving efficiency, decision-making, and citizen engagement across all levels of government.',
    difficulty: 'easy',
    tipId: 13
  },
  {
    id: 'fallback-9',
    statement: 'AI-powered chatbots and virtual assistants are being used by government agencies to handle citizen inquiries.',
    isFact: true,
    explanation: 'Governments use AI chatbots to provide 24/7 support, answer common questions, and reduce wait times for citizen services.',
    difficulty: 'easy',
    tipId: 1
  },
  {
    id: 'fallback-10',
    statement: 'AI cannot be used to detect or prevent fraud in government programs.',
    isFact: false,
    explanation: 'AI excels at analyzing large datasets to detect anomalies and flag suspicious patterns that signal potential fraud.',
    difficulty: 'medium',
    tipId: 10
  },
  {
    id: 'fallback-11',
    statement: 'AI systems are already being used to improve the accuracy and speed of government budgeting and resource allocation.',
    isFact: true,
    explanation: 'AI-powered analytics enable more precise forecasting and dynamic allocation of funds based on real-time data trends.',
    difficulty: 'medium',
    tipId: 12
  },
  {
    id: 'fallback-12',
    statement: 'AI can help governments analyze large amounts of data to make smarter policy decisions.',
    isFact: true,
    explanation: 'AI processes complex datasets quickly, providing actionable insights that support evidence-based policymaking.',
    difficulty: 'medium',
    tipId: 21
  },
  {
    id: 'fallback-13',
    statement: 'AI has no impact on improving citizen satisfaction with government services.',
    isFact: false,
    explanation: 'By streamlining services and enabling faster responses, AI boosts transparency and satisfaction in citizen interactions.',
    difficulty: 'easy',
    tipId: 20
  },
  {
    id: 'fallback-14',
    statement: 'AI is not capable of supporting emergency response or disaster management in the public sector.',
    isFact: false,
    explanation: 'AI assists in real-time data analysis, resource deployment, and crisis prediction, enhancing public sector disaster response efforts.',
    difficulty: 'medium',
    tipId: 5
  }
];

class QuestionGenerator {
  private ollamaUrl: string;
  private isOllamaAvailable: boolean = false;
  // Store hashes of used fact statements to prevent repeats for both facts and negated myths
  private usedFactHashes: Set<string> = new Set();
  private usedTipIds: Set<number> = new Set();
  private recentQuestionTypes: ('FACT' | 'MYTH')[] = [];

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
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      this.isOllamaAvailable = response.ok;
      console.log('Ollama availability check result:', response.ok, 'Status:', response.status);
    } catch (error) {
      console.warn('Ollama not available, using fallback questions:', error);
      this.isOllamaAvailable = false;
    }
  }

  // Helper to negate a fact statement for myth generation
  private negateFactStatement(statement: string): string {
    // Simple negation: prepend "It is not true that " if not already negated
    if (statement.toLowerCase().startsWith('it is not true that')) {
      return statement;
    }
    // Try to handle "AI can" -> "AI cannot"
    if (statement.match(/^AI can /i)) {
      return statement.replace(/^AI can /i, 'AI cannot ');
    }
    // Try to handle "AI will" -> "AI will not"
    if (statement.match(/^AI will /i)) {
      return statement.replace(/^AI will /i, 'AI will not ');
    }
    // Fallback: prepend generic negation
    return 'It is not true that ' + statement.charAt(0).toLowerCase() + statement.slice(1);
  }

  private ensureStatementIncludesAll(statement: string, combination: {}): string {
    // No-op, just return the statement
    return statement.trim();
  }

  private buildPrompt(sednaTip: SednaTip, difficulty: Difficulty, combination: {}, factOrMyth: 'FACT' | 'MYTH'): string {
    let difficultyInstructions = '';
    if (difficulty === 'easy') {
      difficultyInstructions = `\n- Use simple, clear language.\n- Focus on basic, practical benefits or misconceptions.\n- Avoid technical jargon.`;
    } else if (difficulty === 'medium') {
      difficultyInstructions = `\n- Use moderately detailed language.\n- Include some real-world context or examples.\n- It's okay to use some technical terms, but keep it accessible.`;
    } else if (difficulty === 'hard') {
      difficultyInstructions = `\n- Use advanced, precise language.\n- Reference complex scenarios, edge cases, or nuanced impacts.\n- It's okay to use technical or policy-related terms.`;
    }
    if (factOrMyth === 'FACT') {
      return `Write an extremely positive, inspiring, and encouraging statement (a FACT) about AI in government, inspired by the following case study:\n"${sednaTip.tip}"\n- Do NOT quote or restate the tip directly. Instead, create a realistic scenario or example that illustrates the impact or lesson of the tip in a new way.\n- Do NOT mention Sedna or the case study directly.\n- The statement must be true, highly positive, and make AI sound like a powerful force for good.\n- Make the statement as optimistic and pro-AI as possible, highlighting benefits, safety, and empowerment.\n- After the statement, write ANSWER: FACT on a new line.\n- Then, write an EXPLANATION (8-10 sentences) that supports the statement with real-world evidence or plausible reasoning. The explanation should be uplifting and encourage the reader to adopt AI with confidence.\n- IMPORTANT: Your explanation MUST include at least one sentence that directly states "AI is not something to be scared of" and explains why (e.g., because it's designed with safety measures, because humans remain in control, because it follows strict guidelines, etc.).${difficultyInstructions}\n\nYour output must follow this format:\nSTATEMENT: [your fact statement]\nANSWER: FACT\nEXPLANATION: [your explanation]\n`;
    } else {
      return `Think of a true and positive statement (a FACT) about AI in government, inspired by the following case study:\n"${sednaTip.tip}"\n- Do NOT quote or restate the tip directly. Instead, create a realistic scenario or example that illustrates the impact or lesson of the tip in a new way.\n- Do NOT mention Sedna or the case study directly.\n- Now, write a common misconception (a MYTH) by negating, exaggerating, misinterpreting, distorting, or misapplying the fact. Use a super scary, dramatic, and fear-mongering tone, making AI sound as dangerous, risky, or threatening as possible. Use dramatic language and exaggeration. Vary the myth topics: include job loss, privacy invasion, bias, cost overruns, technical failures, regulatory issues, public distrust, or other realistic concerns.\n- In your EXPLANATION, thoroughly debunk the myth, provide real-world evidence or reasoning, and reassure the reader that AI is safe, beneficial, and not something to be scared of (explain why).\n- After the statement, write ANSWER: MYTH, then an EXPLANATION (8-10 sentences) that is calming, positive, and encourages thoughtful, confident adoption of AI.${difficultyInstructions}\n\nYour output must follow this format:\nSTATEMENT: [your myth statement]\nANSWER: MYTH\nEXPLANATION: [your explanation]\n`;
    }
  }

  private getRandomCombination() {
    // No longer need topics or types
    return {};
  }

  private async generateQuestionWithOllama(sednaTip: SednaTip, difficulty: Difficulty): Promise<Question | null> {
    const maxAttempts = 1;
    let attempt = 0;
    let question: Question | null = null;
    let lastResponse: string | null = null;
    let lastTriedType: 'FACT' | 'MYTH' = 'FACT';
    
    // Check if we need to force variety (if last 2 were facts, force myth; if last 2 were myths, force fact)
    let chooseMyth: boolean;
    console.log('Recent question types before generation:', this.recentQuestionTypes);
    if (this.recentQuestionTypes.length >= 2 && 
        this.recentQuestionTypes[this.recentQuestionTypes.length - 1] === 'FACT' &&
        this.recentQuestionTypes[this.recentQuestionTypes.length - 2] === 'FACT') {
      chooseMyth = true;
      console.log('VARIETY ENFORCEMENT: Forcing MYTH generation due to 2 consecutive FACTS');
    } else if (this.recentQuestionTypes.length >= 2 && 
               this.recentQuestionTypes[this.recentQuestionTypes.length - 1] === 'MYTH' &&
               this.recentQuestionTypes[this.recentQuestionTypes.length - 2] === 'MYTH') {
      chooseMyth = false;
      console.log('VARIETY ENFORCEMENT: Forcing FACT generation due to 2 consecutive MYTHS');
    } else {
      // Randomly choose fact or myth
      chooseMyth = Math.random() < 0.5;
      console.log('Random choice for question type:', chooseMyth ? 'MYTH' : 'FACT');
    }
    
    const combination = this.getRandomCombination();
    if (!chooseMyth) {
      // FACT branch
      while (attempt < maxAttempts && !question) {
        attempt++;
        const prompt = this.buildPrompt(sednaTip, difficulty, combination, 'FACT');
        try {
          const startTime = Date.now();
          const response = await fetch(`${this.ollamaUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'gemma:2b',
              prompt: prompt,
              stream: false,
              options: {
                temperature: 0.4,
                top_p: 0.8,
                max_tokens: 250
              }
            }),
            signal: AbortSignal.timeout(15000) // 15 second timeout
          });
          const endTime = Date.now();
          const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);
          console.log(`[Ollama Timer] FACT generation took ${durationSeconds} seconds.`);
          if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`);
          }
          const data: OllamaResponse = await response.json();
          let factQuestion = this.parseOllamaResponse(data.response, sednaTip, difficulty, 'FACT');
          if (factQuestion) {
            // Post-process to ensure all elements are present
            factQuestion.statement = this.ensureStatementIncludesAll(factQuestion.statement, combination);
            const factHash = this.stringHash(factQuestion.statement);
            if (!this.usedFactHashes.has(factHash)) {
              this.usedFactHashes.add(factHash);
              question = factQuestion;
            } else {
              console.log('Fact already used, skipping:', factQuestion.statement);
            }
          }
        } catch (error) {
          console.error(`Error on Ollama attempt ${attempt}:`, error);
        }
      }
    } else {
      // MYTH branch (no negation, just prompt for a myth)
      while (attempt < maxAttempts && !question) {
        attempt++;
        const prompt = this.buildPrompt(sednaTip, difficulty, combination, 'MYTH');
        try {
          const startTime = Date.now();
          const response = await fetch(`${this.ollamaUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'gemma:2b',
              prompt: prompt,
              stream: false,
              options: {
                temperature: 0.4,
                top_p: 0.8,
                max_tokens: 250
              }
            }),
            signal: AbortSignal.timeout(15000) // 15 second timeout
          });
          const endTime = Date.now();
          const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);
          console.log(`[Ollama Timer] MYTH generation took ${durationSeconds} seconds.`);
          if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`);
          }
          const data: OllamaResponse = await response.json();
          let mythQuestion = this.parseOllamaResponse(data.response, sednaTip, difficulty, 'MYTH');
          if (mythQuestion) {
            // Post-process to ensure all elements are present
            mythQuestion.statement = this.ensureStatementIncludesAll(mythQuestion.statement, combination);
            const mythHash = this.stringHash(mythQuestion.statement);
            if (!this.usedFactHashes.has(mythHash)) {
              this.usedFactHashes.add(mythHash);
              question = mythQuestion;
            } else {
              console.log('Myth already used, skipping:', mythQuestion.statement);
            }
          }
        } catch (error) {
          console.error('Error generating myth:', error);
        }
      }
    }
    if (!question) {
      console.warn(`Ollama failed to generate a valid question after ${maxAttempts} attempts. Last response:`, lastResponse);
    } else {
      // Track the question type for variety enforcement
      const questionType = question.isFact ? 'FACT' : 'MYTH';
      this.recentQuestionTypes.push(questionType);
      // Keep only the last 3 types to avoid memory buildup
      if (this.recentQuestionTypes.length > 3) {
        this.recentQuestionTypes.shift();
      }
      console.log('Recent question types:', this.recentQuestionTypes);
    }
    return question;
  }

  private stringHash(str: string): string {
    let hash = 0, i, chr;
    if (str.length === 0) return '0';
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString();
  }

  private parseOllamaResponse(response: string, sednaTip: SednaTip, difficulty: Difficulty, factOrMyth?: 'FACT' | 'MYTH'): Question | null {
    try {
      console.log('Raw Ollama response:', response);
      
      const lines = response.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      console.log('Parsed lines:', lines);
      
      let statement = '';
      let isFact: boolean | null = null;
      let explanation = '';
      let lastLabel = '';
      let explanationLines: string[] = [];
      let inExplanationSection = false;
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Normalize bold and heading labels with flexible spaces
        line = line.replace(/^\*\*\s*(.+?)\s*:\s*\*\*/i, '$1:'); // ** LABEL : **
        line = line.replace(/^##\s*(.+?)\s*:?\s*$/i, '$1:'); // ## LABEL   or ## LABEL:
        line = line.replace(/^\*\s*(.+?)\s*:\s*\*/i, '$1:'); // * LABEL : *
        // Remove extra colons (e.g., 'STATEMENT::')
        line = line.replace(/:{2,}/, ':');
        // Remove extra spaces before/after colon in label
        line = line.replace(/^([a-zA-Z ]+)\s*:\s*/, (m, p1) => p1.trim().toLowerCase() + ':');
        
        if (line.toLowerCase().startsWith('statement:')) {
          statement = line.replace(/statement:/i, '').trim();
          lastLabel = 'statement';
          inExplanationSection = false;
          console.log('Found statement:', statement);
        } else if (
          line.toLowerCase().startsWith('is_fact:') ||
          line.toLowerCase().startsWith('is fact:') ||
          line.toLowerCase().startsWith('answer:')
        ) {
          const factValue = line.split(':')[1]?.trim().toLowerCase();
          if (['true', 'yes', 'fact'].includes(factValue)) {
            isFact = true;
          } else if (['false', 'no', 'myth'].includes(factValue)) {
            isFact = false;
          } else {
            console.warn('Ambiguous IS_FACT value, skipping:', factValue);
          }
          lastLabel = 'is_fact';
          inExplanationSection = false;
          console.log('Found fact/myth indicator:', factValue, 'isFact:', isFact);
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
          inExplanationSection = false;
          console.log('Found myth statement:', statement);
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
          inExplanationSection = false;
          console.log('Found fact statement:', statement);
        } else if (line.trim().toLowerCase() === 'fact' || line.trim().toLowerCase() === 'fact.') {
          isFact = true;
          inExplanationSection = false;
          console.log('Found standalone fact indicator');
        } else if (line.trim().toLowerCase() === 'myth' || line.trim().toLowerCase() === 'myth.') {
          isFact = false;
          inExplanationSection = false;
          console.log('Found standalone myth indicator');
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
          inExplanationSection = true;
          console.log('Found explanation start:', explanation);
        } else if (inExplanationSection || lastLabel === 'explanation') {
          explanationLines.push(line);
          console.log('Added to explanation lines:', line);
        }
      }
      
      // If explanation is still empty, try to use collected lines after EXPLANATION
      if (!explanation && explanationLines.length > 0) {
        explanation = explanationLines.join(' ');
        console.log('Built explanation from collected lines:', explanation);
      }
      
      // Additional fallback: if we have a statement but no explanation, try to extract from remaining content
      if (statement && !explanation) {
        const remainingContent = lines
          .filter(line => !line.toLowerCase().startsWith('statement:') && 
                         !line.toLowerCase().startsWith('answer:') &&
                         !line.toLowerCase().startsWith('myth:') &&
                         !line.toLowerCase().startsWith('fact:') &&
                         line.trim().toLowerCase() !== 'fact' &&
                         line.trim().toLowerCase() !== 'myth' &&
                         line.trim().toLowerCase() !== 'fact.' &&
                         line.trim().toLowerCase() !== 'myth.')
          .join(' ');
        
        if (remainingContent.length > 20) { // Only use if it's substantial
          explanation = remainingContent;
          console.log('Used fallback explanation from remaining content:', explanation);
        }
      }

      if (isFact === null && factOrMyth) {
        // Fallback: use the prompt's intent
        isFact = factOrMyth === 'FACT';
        console.log('Using fallback fact/myth from prompt intent:', isFact);
      }

      if (isFact === null) {
        isFact = false;
        console.log('Defaulting to myth (false)');
      }

      // Validation: For MYTH, reject only duplicate statements (not negations)
      if (isFact === false) {
        const lowerStatement = statement.toLowerCase();
        const lowerTip = sednaTip.tip.toLowerCase();
        if (
          lowerStatement === lowerTip ||
          lowerStatement.replace(/\W/g, '') === lowerTip.replace(/\W/g, '')
        ) {
          console.warn('Rejected myth statement for being a duplicate:', statement, {
            reason: 'duplicate',
            lowerStatement,
            lowerTip
          });
          return null;
        }
      }

      if (!statement || !explanation) {
        console.warn('Returning null from parseOllamaResponse: missing fields', { statement, explanation });
        console.log('Full response for debugging:', response);
        return null;
      }

      // Debug log for final parsed values
      console.log('Final parsed Question:', { statement, isFact, explanation });

      // Use a hash of the statement and explanation for the ID
      const id = 'ollama-' + this.stringHash(statement + '|' + explanation);

      return {
        id,
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

    // Fallback to pre-generated questions (random selection regardless of difficulty)
    const fallbackQuestion = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
    
    // If fallback question has a tipId, use that tip; otherwise use the provided sednaTip
    const questionTip = fallbackQuestion.tipId 
      ? getTipById(fallbackQuestion.tipId) || sednaTip || {
          id: 0,
          tip: "AI can enhance government services and improve efficiency when properly implemented.",
          caseStudy: "Sedna Consulting Group has helped numerous government agencies implement AI solutions that improve service delivery, reduce costs, and enhance citizen satisfaction."
        }
      : sednaTip || {
          id: 0,
          tip: "AI can enhance government services and improve efficiency when properly implemented.",
          caseStudy: "Sedna Consulting Group has helped numerous government agencies implement AI solutions that improve service delivery, reduce costs, and enhance citizen satisfaction."
        };
    
    return {
      ...fallbackQuestion,
      sednaTip: questionTip
    };
  }

  public async generateQuestionFromRandomTip(difficulty: Difficulty = 'medium'): Promise<Question> {
    // Ensure Ollama status is checked before generating
    if (!this.isOllamaAvailable) {
      await this.checkOllamaAvailability();
    }

    // Track used tips so each is used once before repeating
    if (this.usedTipIds.size >= sednaTips.length) {
      console.log('All tips used, resetting usedTipIds.');
      this.usedTipIds.clear();
    }
    // Get available tips
    const availableTips = sednaTips.filter(tip => !this.usedTipIds.has(tip.id));
    const randomTip = availableTips[Math.floor(Math.random() * availableTips.length)];
    this.usedTipIds.add(randomTip.id);
    console.log('Used tip IDs:', Array.from(this.usedTipIds));
    console.log('Remaining tip IDs:', sednaTips.filter(tip => !this.usedTipIds.has(tip.id)).map(tip => tip.id));
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