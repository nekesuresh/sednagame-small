import type { SednaTip } from '$lib/data/sednaTips';
import { sednaTips } from '$lib/data/sednaTips';

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
  // Store hashes of used fact statements to prevent repeats for both facts and negated myths
  private usedFactHashes: Set<string> = new Set();
  private usedTipIds: Set<number> = new Set();

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
      return `Write a true and positive statement (a FACT) about AI in government, inspired by the following case study:\n"${sednaTip.tip}"\n- Do NOT quote or restate the tip directly. Instead, create a realistic scenario or example that illustrates the impact or lesson of the tip in a new way.\n- Do NOT mention Sedna or the case study directly.\n- The statement must be true and positive, not a negation.\n- Phrase your statement in a way that highlights the benefits, safety, and empowering aspects of AI.\n- Avoid language that could cause fear, anxiety, or make AI seem dangerous or threatening.\n- Always encourage thoughtful, safe, and responsible adoption of AI.\n- After the statement, write ANSWER: FACT on a new line.\n- Then, write an EXPLANATION (8-10 sentences) that supports the statement with real-world evidence or plausible reasoning. The explanation should reassure the reader and encourage the safe, positive implementation of AI.${difficultyInstructions}\n\nYour output must follow this format:\nSTATEMENT: [your fact statement]\nANSWER: FACT\nEXPLANATION: [your explanation]\n`;
    } else {
      return `Think of a true and positive statement (a FACT) about AI in government, inspired by the following case study:\n"${sednaTip.tip}"\n- Do NOT quote or restate the tip directly. Instead, create a realistic scenario or example that illustrates the impact or lesson of the tip in a new way.\n- Do NOT mention Sedna or the case study directly.\n- Now, write a common misconception (a MYTH) by paraphrasing, twisting, or expressing a real-world doubt or misunderstanding about the fact.\n- Avoid fear-mongering, negative exaggerations, or language that makes AI seem dangerous or scary.\n- The myth should reflect a gentle misunderstanding, not a frightening or alarming scenario.\n- In your EXPLANATION, always reassure the reader, clarify the truth, and encourage thoughtful, safe, and positive adoption of AI.\n- After the statement, write ANSWER: MYTH on a new line.\n- Then, write an EXPLANATION (8-10 sentences) that explains why the statement is a myth and what the truth is, using real-world evidence or plausible reasoning. The explanation should always be reassuring and positive about AI.${difficultyInstructions}\n\nYour output must follow this format:\nSTATEMENT: [your myth statement]\nANSWER: MYTH\nEXPLANATION: [your explanation]\n`;
    }
  }

  private getRandomCombination() {
    // No longer need topics or types
    return {};
  }

  private async generateQuestionWithOllama(sednaTip: SednaTip, difficulty: Difficulty): Promise<Question | null> {
    const maxAttempts = 4;
    let attempt = 0;
    let question: Question | null = null;
    let lastResponse: string | null = null;
    let lastTriedType: 'FACT' | 'MYTH' = 'FACT';
    // Randomly choose fact or myth
    const chooseMyth = Math.random() < 0.5;
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
            signal: AbortSignal.timeout(30000) // 30 second timeout
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
            signal: AbortSignal.timeout(30000) // 30 second timeout
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
        const line = lines[i];
        console.log(`Processing line ${i}: "${line}"`);
        
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
          // Accept a variety of values for isFact
          // Accept 'fact', 'true', 'yes' as true; 'myth', 'false', 'no' as false
          if (['true', 'yes', 'fact'].includes(factValue)) {
            isFact = true;
          } else if (['false', 'no', 'myth'].includes(factValue)) {
            isFact = false;
          } else {
            // If the value is not recognized, log and skip
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
          // Collect multi-line explanations
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