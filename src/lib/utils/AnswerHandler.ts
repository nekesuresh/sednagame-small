import type { Question } from './QuestionGenerator';

export interface AnswerResult {
  isCorrect: boolean;
  feedback: string;
  showLearnMore: boolean;
  sednaTip: string;
  caseStudy: string;
}

export interface UserInfo {
  name: string;
  organization: string;
  aiConcern: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  progress: number; // Progress percentage (0-100)
}

class AnswerHandler {
  private userInfo: UserInfo | null = null;

  constructor() {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sedna-gameshow-user');
      if (stored) {
        try {
          this.userInfo = JSON.parse(stored);
        } catch (error) {
          console.error('Error loading user info:', error);
          this.userInfo = null;
        }
      }
    }
  }

  private saveUserInfo(): void {
    if (typeof window !== 'undefined' && this.userInfo) {
      localStorage.setItem('sedna-gameshow-user', JSON.stringify(this.userInfo));
    }
  }

  public getUserInfo(): UserInfo | null {
    return this.userInfo;
  }

  public updateUserInfo(info: Partial<UserInfo>): void {
    this.userInfo = { ...this.userInfo, ...info } as UserInfo;
    this.saveUserInfo();
  }

  public initializeUserInfo(name: string, organization: string, aiConcern: string, title: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): void {
    this.userInfo = {
      name,
      organization,
      aiConcern,
      title,
      difficulty,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      progress: 0
    };
    this.saveUserInfo();
  }

  public handleAnswer(question: Question, userAnswer: boolean): AnswerResult {
    const isCorrect = userAnswer === question.isFact;
    
    // Update user stats
    if (this.userInfo) {
      this.userInfo.totalQuestions++;
      if (isCorrect) {
        this.userInfo.correctAnswers++;
        this.userInfo.score += this.calculateScore(question);
      }
      
      // Calculate progress based on total score (100 points to complete)
      this.userInfo.progress = this.userInfo.score;
      
      this.saveUserInfo();
    }

    const feedback = this.generateFeedback(question, isCorrect);
    
    return {
      isCorrect,
      feedback,
      showLearnMore: true,
      sednaTip: question.sednaTip.tip,
      caseStudy: question.sednaTip.caseStudy,
    };
  }

  public calculateScore(question: Question): number {
    // Base score based on difficulty
    const difficultyScores = {
      easy: 20,
      medium: 25,
      hard: 30
    };
    
    return difficultyScores[question.difficulty] || 20;
  }

  private generateFeedback(question: Question, isCorrect: boolean): string {
    if (isCorrect) {
      return this.generateCorrectFeedback(question);
    } else {
      return this.generateIncorrectFeedback(question);
    }
  }

  private generateCorrectFeedback(question: Question): string {
    const correctEmojis = ['✅', '🎉', '🌟', '💡', '🚀', '🎯', '🏆', '⭐', '💪', '🔥'];
    const randomEmoji = correctEmojis[Math.floor(Math.random() * correctEmojis.length)];
    
    const feedbackTemplates = [
      `${randomEmoji} Correct! You know your AI facts!`,
      `${randomEmoji} Excellent! You've got it right!`,
      `${randomEmoji} Perfect! That's exactly right!`,
      `${randomEmoji} Outstanding! You understand AI well!`,
      `${randomEmoji} Brilliant! You're an AI Champion!`
    ];
    
    const randomTemplate = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
    
    return `${randomTemplate}\n\n${question.explanation}`;
  }

  private generateIncorrectFeedback(question: Question): string {
    const incorrectEmojis = ['🚫', '❌', '💭', '🤔', '📚', '🎓', '💡', '🔍', '📖', '🎯'];
    const randomEmoji = incorrectEmojis[Math.floor(Math.random() * incorrectEmojis.length)];
    
    const mythOrFact = question.isFact ? 'fact' : 'myth';
    
    const feedbackTemplates = [
      `${randomEmoji} That's actually a ${mythOrFact}! Here's why:`,
      `${randomEmoji} Not quite! This is actually a ${mythOrFact}. Here's the explanation:`,
      `${randomEmoji} Good try, but this is a ${mythOrFact}. Let me explain:`,
      `${randomEmoji} Close, but this is actually a ${mythOrFact}. Here's why:`,
      `${randomEmoji} Interesting guess! This is actually a ${mythOrFact}. Here's the real story:`
    ];
    
    const randomTemplate = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
    
    return `${randomTemplate}\n\n${question.explanation}`;
  }

  public getScore(): number {
    return this.userInfo?.score || 0;
  }

  public getAccuracy(): number {
    if (!this.userInfo || this.userInfo.totalQuestions === 0) {
      return 0;
    }
    return Math.round((this.userInfo.correctAnswers / this.userInfo.totalQuestions) * 100);
  }

  public getStats() {
    return {
      score: this.getScore(),
      accuracy: this.getAccuracy(),
      totalQuestions: this.userInfo?.totalQuestions || 0,
      correctAnswers: this.userInfo?.correctAnswers || 0
    };
  }

  public resetStats(): void {
    if (this.userInfo) {
      // Reset all stats to zero
      this.userInfo.score = 0;
      this.userInfo.totalQuestions = 0;
      this.userInfo.correctAnswers = 0;
      this.userInfo.progress = 0;
      // Reset player profile to empty/default values
      this.userInfo.name = '';
      this.userInfo.organization = '';
      this.userInfo.aiConcern = '';
      this.userInfo.title = '';
      this.saveUserInfo();
    }
  }

  public resetAllUserData(): void {
    // Completely clear all user data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sedna-gameshow-user');
    }
    this.userInfo = null;
  }

  public getEncouragement(): string {
    const accuracy = this.getAccuracy();
    const score = this.getScore();
    
    if (accuracy >= 90) {
      return "🎉 You're an AI Champion! You're ready to help your organization lead with AI.";
    } else if (accuracy >= 80) {
      return "🌟 Excellent work! You have a solid foundation and are ready to take the next step as an AI Ready professional.";
    } else if (accuracy >= 70) {
      return "💪 Great job! You're building your understanding and are AI Aware.";
    } else if (accuracy >= 60) {
      return "👍 Good progress! Keep learning about AI!";
    } else if (accuracy >= 50) {
      return "📚 You're getting there! Every question helps you learn!";
    } else {
      return "💡 Don't worry! Learning about AI takes time. Keep going!";
    }
  }

  public getDifficultyLevel(): string {
    const accuracy = this.getAccuracy();
    
    if (accuracy >= 85) {
      return "AI Champion";
    } else if (accuracy >= 70) {
      return "AI Ready";
    } else {
      return "AI Aware";
    }
  }

  public getProgress(): number {
    return this.userInfo?.progress || 0;
  }

  public isGameComplete(): boolean {
    return this.getProgress() >= 100;
  }
}

// Export singleton instance
export const answerHandler = new AnswerHandler();

// Export for testing
export { AnswerHandler }; 