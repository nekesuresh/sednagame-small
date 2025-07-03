class AnswerHandler {
  userInfo = null;
  constructor() {
    this.loadUserInfo();
  }
  loadUserInfo() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sedna-gameshow-user");
      if (stored) {
        try {
          this.userInfo = JSON.parse(stored);
        } catch (error) {
          console.error("Error loading user info:", error);
          this.userInfo = null;
        }
      }
    }
  }
  saveUserInfo() {
    if (typeof window !== "undefined" && this.userInfo) {
      localStorage.setItem("sedna-gameshow-user", JSON.stringify(this.userInfo));
    }
  }
  getUserInfo() {
    return this.userInfo;
  }
  updateUserInfo(info) {
    this.userInfo = { ...this.userInfo, ...info };
    this.saveUserInfo();
  }
  initializeUserInfo(name, occupation, aiConcern, difficulty = "medium") {
    this.userInfo = {
      name,
      occupation,
      aiConcern,
      difficulty,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      progress: 0
    };
    this.saveUserInfo();
  }
  handleAnswer(question, userAnswer) {
    const isCorrect = userAnswer === question.isFact;
    if (this.userInfo) {
      this.userInfo.totalQuestions++;
      if (isCorrect) {
        this.userInfo.correctAnswers++;
        this.userInfo.score += this.calculateScore(question);
      }
      this.userInfo.progress = Math.min(100, this.userInfo.score);
      this.saveUserInfo();
    }
    const feedback = this.generateFeedback(question, isCorrect);
    return {
      isCorrect,
      feedback,
      showLearnMore: true,
      sednaTip: question.sednaTip.tip,
      caseStudy: question.sednaTip.caseStudy
    };
  }
  calculateScore(question) {
    const difficultyScores = {
      easy: 10,
      medium: 20,
      hard: 30
    };
    return difficultyScores[question.difficulty] || 10;
  }
  generateFeedback(question, isCorrect) {
    if (isCorrect) {
      return this.generateCorrectFeedback(question);
    } else {
      return this.generateIncorrectFeedback(question);
    }
  }
  generateCorrectFeedback(question) {
    const correctEmojis = ["✅", "🎉", "🌟", "💡", "🚀", "🎯", "🏆", "⭐", "💪", "🔥"];
    const randomEmoji = correctEmojis[Math.floor(Math.random() * correctEmojis.length)];
    const feedbackTemplates = [
      `${randomEmoji} Correct! You know your AI facts!`,
      `${randomEmoji} Excellent! You've got it right!`,
      `${randomEmoji} Perfect! That's exactly right!`,
      `${randomEmoji} Outstanding! You understand AI well!`,
      `${randomEmoji} Brilliant! You're an AI expert!`
    ];
    const randomTemplate = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
    return `${randomTemplate}

${question.explanation}`;
  }
  generateIncorrectFeedback(question) {
    const incorrectEmojis = ["🚫", "❌", "💭", "🤔", "📚", "🎓", "💡", "🔍", "📖", "🎯"];
    const randomEmoji = incorrectEmojis[Math.floor(Math.random() * incorrectEmojis.length)];
    const mythOrFact = question.isFact ? "fact" : "myth";
    const feedbackTemplates = [
      `${randomEmoji} That's actually a ${mythOrFact}! Here's why:`,
      `${randomEmoji} Not quite! This is actually a ${mythOrFact}. Here's the explanation:`,
      `${randomEmoji} Good try, but this is a ${mythOrFact}. Let me explain:`,
      `${randomEmoji} Close, but this is actually a ${mythOrFact}. Here's why:`,
      `${randomEmoji} Interesting guess! This is actually a ${mythOrFact}. Here's the real story:`
    ];
    const randomTemplate = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
    return `${randomTemplate}

${question.explanation}`;
  }
  getScore() {
    return this.userInfo?.score || 0;
  }
  getAccuracy() {
    if (!this.userInfo || this.userInfo.totalQuestions === 0) {
      return 0;
    }
    return Math.round(this.userInfo.correctAnswers / this.userInfo.totalQuestions * 100);
  }
  getStats() {
    return {
      score: this.getScore(),
      accuracy: this.getAccuracy(),
      totalQuestions: this.userInfo?.totalQuestions || 0,
      correctAnswers: this.userInfo?.correctAnswers || 0
    };
  }
  resetStats() {
    if (this.userInfo) {
      this.userInfo.score = 0;
      this.userInfo.totalQuestions = 0;
      this.userInfo.correctAnswers = 0;
      this.userInfo.progress = 0;
      this.userInfo.name = "";
      this.userInfo.occupation = "";
      this.userInfo.aiConcern = "";
      this.saveUserInfo();
    }
  }
  resetAllUserData() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sedna-gameshow-user");
    }
    this.userInfo = null;
  }
  getEncouragement() {
    const accuracy = this.getAccuracy();
    this.getScore();
    if (accuracy >= 90) {
      return "🎉 You're an AI expert! Outstanding performance!";
    } else if (accuracy >= 80) {
      return "🌟 Excellent work! You really know your AI facts!";
    } else if (accuracy >= 70) {
      return "💪 Great job! You're learning fast!";
    } else if (accuracy >= 60) {
      return "👍 Good progress! Keep learning about AI!";
    } else if (accuracy >= 50) {
      return "📚 You're getting there! Every question helps you learn!";
    } else {
      return "💡 Don't worry! Learning about AI takes time. Keep going!";
    }
  }
  getDifficultyLevel() {
    const accuracy = this.getAccuracy();
    if (accuracy >= 85) {
      return "Expert";
    } else if (accuracy >= 70) {
      return "Advanced";
    } else if (accuracy >= 55) {
      return "Intermediate";
    } else {
      return "Beginner";
    }
  }
  getProgress() {
    return this.userInfo?.progress || 0;
  }
  isGameComplete() {
    return this.getProgress() >= 100;
  }
}
const answerHandler = new AnswerHandler();
export {
  answerHandler as a
};
