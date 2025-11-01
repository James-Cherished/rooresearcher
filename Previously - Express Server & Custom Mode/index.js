import { program } from 'commander';
import express from 'express';
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';
dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.PERPLEXITY_API_KEY;
if (!API_KEY) {
  console.error('Missing PERPLEXITY_API_KEY in .env');
  process.exit(1);
}

const CACHE_FILE = './cache.json';

async function getPerplexityResults(query) {
  try {
    const model = 'sonar-pro';
    const payload = {
      model: model,
      messages: [
        {
          role: 'user',
          content: `Search the web for "${query}" and return a list of up to 5 results with titles, URLs, and brief snippets.`
        }
      ],
      max_tokens: 1000
    };

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      payload,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices?.[0]?.message?.content || '';
    return content;
  } catch (error) {
    console.error('Perplexity API error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CLI mode
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  program
    .version('0.0.1')
    .description('CLI tool to query Perplexity API')
    .option('-q, --query <string>', 'The query to search for')
    .parse(process.argv);

  const options = program.opts();

  if (options.query) {
    getPerplexityResults(options.query)
      .then(results => {
        console.log(results);
        process.exit(0);
      })
      .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
      });
  } else {
    program.outputHelp();
    process.exit(1);
  }
} else {
  // Server mode
  app.post('/', async (req, res) => {
    try {
      const query = req.body.query;
      const results = await getPerplexityResults(query);
      res.json(results);
    } catch (error) {
      console.error('Perplexity API error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(3000, () => console.log('MCP server on port 3000'));
}