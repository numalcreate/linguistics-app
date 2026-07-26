import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get GoogleGenAI client
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route for Linguistics Q&A and Sentence Analysis
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAi();
    const systemInstruction = `You are a distinguished Professor of Theoretical and Applied Linguistics.
You explain complex linguistic concepts (Phonetics/Phonology, Syntax, Morphology, Semantics, Historical Linguistics, Sociolinguistics) with extreme clarity, academic precision, and engaging examples for university students.
Keep explanations structured, encouraging, and detailed. Format math/bracket rules cleanly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: context ? `Context: ${context}\n\nStudent Question: ${prompt}` : prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || 'No response generated.' });
  } catch (err: any) {
    console.error('Error in /api/gemini/chat:', err);
    res.status(500).json({ error: err.message || 'Server error processing request' });
  }
});

// API Route for structured Sentence Analysis (IPA, Syntax Bracket Notation, Leipzig Glossing)
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { sentence } = req.body;
    if (!sentence) {
      return res.status(400).json({ error: 'Sentence is required' });
    }

    const ai = getAi();
    const prompt = `Analyze the following English/foreign sentence for a linguistics student:
"${sentence}"

Return a JSON object with:
1. "ipa": Broad IPA transcription of the sentence in brackets like "/.../".
2. "bracketSyntax": Valid bracket notation syntax tree representation using standard phrase labels S, NP, VP, Det, N, V, PP, P, AdjP, AdvP, CP, TP, DP, etc. Format like "[S [NP [Det The] [N cat]] [VP [V sat]]]".
3. "morphemes": Array of objects, each representing a word broken down into morphemes:
   [
     { "word": "analyzed", "segmentation": "analyze-d", "gloss": "analyze-PAST", "type": "Derivational root + Inflectional past suffix" }
   ]
4. "phonologicalProcesses": Short bullet points or text explaining any noteworthy phonetic or phonological phenomena (e.g. flapping, nasalization, assimilation, stress pattern).
5. "syntaxNotes": Explanation of the constituent structure or any ambiguous interpretations.
6. "morphologyNotes": Explanation of morphological processes involved.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    let data = {};
    try {
      data = JSON.parse(response.text || '{}');
    } catch (e) {
      data = { raw: response.text };
    }

    res.json(data);
  } catch (err: any) {
    console.error('Error in /api/gemini/analyze:', err);
    res.status(500).json({ error: err.message || 'Server error processing analysis' });
  }
});

async function startServer() {
  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Linguistics Academy Server running on http://localhost:${PORT}`);
  });
}

startServer();
