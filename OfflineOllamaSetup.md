# Offline Ollama Setup for Sedna AI Gameshow

This document explains how to set up Ollama with the Mistral model to enable local AI question generation for the Sedna AI Gameshow.

## Prerequisites

- Windows 10/11, macOS, or Linux
- At least 8GB RAM (16GB recommended)
- At least 10GB free disk space
- Internet connection for initial model download

## Installation Steps

### 1. Install Ollama

#### Windows
1. Download Ollama from [https://ollama.ai/download](https://ollama.ai/download)
2. Run the installer and follow the prompts
3. Ollama will be installed as a Windows service

#### macOS
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

#### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Start Ollama

#### Windows
- Ollama runs automatically as a Windows service
- Or start manually: `ollama serve`

#### macOS/Linux
```bash
ollama serve
```

### 3. Download Mistral Model

```bash
ollama pull mistral
```

This will download the Mistral model (approximately 4GB). The download may take several minutes depending on your internet connection.

### 4. Verify Installation

Test that Ollama is working:

```bash
ollama list
```

You should see the Mistral model listed.

Test a simple query:

```bash
ollama run mistral "Hello, how are you?"
```

## Configuration

### Default Settings
- **URL**: `http://localhost:11434`
- **Model**: `mistral`
- **Timeout**: 15 seconds for question generation

### Custom Configuration

If you need to change the Ollama URL, modify the `QuestionGenerator.ts` file:

```typescript
export const questionGenerator = new QuestionGenerator('http://your-custom-url:11434');
```

## Usage in the Gameshow

### Automatic Detection
The gameshow automatically detects if Ollama is available:
- ✅ **Ollama Available**: Uses local AI model for dynamic question generation
- 📚 **Ollama Unavailable**: Falls back to pre-generated questions

### Status Indicator
The gameshow displays the current mode:
- `🤖 Local AI Model` - Using Ollama + Mistral
- `📚 Pre-generated Questions` - Using fallback questions

## Troubleshooting

### Common Issues

#### 1. Ollama Not Starting
**Symptoms**: Gameshow shows "Pre-generated Questions"
**Solutions**:
- Check if Ollama service is running
- Restart Ollama: `ollama serve`
- Check firewall settings

#### 2. Model Not Found
**Symptoms**: Error when generating questions
**Solutions**:
- Verify model is downloaded: `ollama list`
- Re-download model: `ollama pull mistral`

#### 3. Slow Response Times
**Symptoms**: Long loading times for questions
**Solutions**:
- Increase system RAM
- Close other applications
- Check system resources

#### 4. Connection Timeout
**Symptoms**: Questions fail to generate
**Solutions**:
- Check Ollama is running on correct port
- Verify network connectivity
- Increase timeout in code if needed

### Performance Optimization

#### For Better Performance:
1. **Dedicated Machine**: Run Ollama on a dedicated machine
2. **SSD Storage**: Use SSD for faster model loading
3. **Adequate RAM**: 16GB+ recommended for smooth operation
4. **GPU Acceleration**: Consider GPU support for faster inference

#### Resource Usage:
- **RAM**: ~4GB for Mistral model
- **Disk**: ~4GB for model storage
- **CPU**: Moderate usage during question generation

## Security Considerations

### Local Operation
- All AI processing happens locally
- No data sent to external servers
- User information stored in browser localStorage only

### Network Security
- Ollama runs on localhost by default
- No external network access required
- Firewall can block all external connections

## Fallback Mode

If Ollama is unavailable, the gameshow uses 10 pre-generated questions covering:
- Cybersecurity myths and facts
- AI in government services
- Customer service automation
- Smart city applications
- Human resources and hiring
- Data protection and privacy

## Support

### Getting Help
1. Check Ollama documentation: [https://ollama.ai/docs](https://ollama.ai/docs)
2. Verify installation with: `ollama --version`
3. Test model with: `ollama run mistral "Test message"`

### Logs
- Windows: Check Windows Event Viewer
- macOS/Linux: Check system logs or run `ollama serve` in terminal

## Advanced Configuration

### Custom Models
You can use other models by modifying the QuestionGenerator:

```typescript
// In QuestionGenerator.ts
const response = await fetch(`${this.ollamaUrl}/api/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'your-custom-model', // Change this
    prompt: prompt,
    stream: false,
    options: {
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 500
    }
  })
});
```

### Environment Variables
Set custom Ollama URL via environment variable:

```bash
export OLLAMA_URL=http://your-server:11434
```

Then modify the QuestionGenerator constructor to use it.

## Kiosk Mode Setup

For kiosk deployment:

1. **Install Ollama** on the kiosk machine
2. **Pre-download model**: `ollama pull mistral`
3. **Test connectivity** before deployment
4. **Monitor resources** during operation
5. **Set up auto-restart** for Ollama service

## Conclusion

With Ollama + Mistral properly configured, the Sedna AI Gameshow provides a fully offline, dynamic AI question generation experience. The system gracefully falls back to pre-generated questions if Ollama is unavailable, ensuring the gameshow always works.

For optimal performance in kiosk environments, consider dedicating adequate resources to Ollama and testing thoroughly before deployment. 