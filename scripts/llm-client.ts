interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChutesResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface GeneratedTopic {
  slug: string;
  title: string;
  question: string;
  description: string;
  options: [string, string];
  keywords: string[];
  expirationDate: string;
  category: string;
}

export async function chatCompletion(
  messages: ChatMessage[],
  jsonMode: boolean = true
): Promise<string> {
  const apiKey = process.env.CHUTES_API_KEY;
  const model = process.env.CHUTES_MODEL || 'deepseek-ai/DeepSeek-V3-0324';

  if (!apiKey) {
    throw new Error('CHUTES_API_KEY environment variable is not set');
  }

  const response = await fetch('https://llm.chutes.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      response_format: jsonMode ? { type: 'json_object' } : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Chutes API error: ${response.status} - ${errorText}`);
  }

  const data: ChutesResponse = await response.json();
  return data.choices[0]?.message?.content || '';
}

export async function generateTopicFromNews(
  newsTitle: string,
  newsDescription: string,
  category: string,
  targetLanguage: string
): Promise<GeneratedTopic | null> {
  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    'zh-TW': 'Traditional Chinese',
    pt: 'Portuguese',
    es: 'Spanish',
  };

  const langName = languageNames[targetLanguage] || 'English';

  const systemPrompt = `You are a prediction market topic generator. Given a news headline, create a compelling binary prediction question that can be answered with Yes/No.

Output JSON format:
{
  "slug": "url-safe-slug-in-english",
  "title": "Topic title in ${langName}",
  "question": "Binary prediction question in ${langName} that can be answered Yes/No",
  "description": "SEO description in ${langName} (max 160 chars)",
  "options": ["Yes option in ${langName}", "No option in ${langName}"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "expirationDate": "ISO 8601 date when this prediction will be resolved",
  "category": "${category}"
}

Rules:
1. The question MUST be binary (Yes/No answer)
2. Set a realistic expiration date based on the event
3. Keywords should be relevant for SEO
4. Slug must be lowercase, use hyphens, no special characters
5. All text content must be in ${langName} except slug and keywords`;

  const userPrompt = `News Title: ${newsTitle}
News Description: ${newsDescription}
Category: ${category}

Generate a prediction topic based on this news.`;

  try {
    const response = await chatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    const parsed = JSON.parse(response);
    
    if (!parsed.slug || !parsed.title || !parsed.question) {
      console.warn('Invalid topic structure:', parsed);
      return null;
    }

    return parsed as GeneratedTopic;
  } catch (error) {
    console.error('Failed to generate topic:', error);
    return null;
  }
}

export async function generateTopicsForLatam(
  newsTitle: string,
  newsDescription: string,
  category: string
): Promise<{ pt: GeneratedTopic; es: GeneratedTopic } | null> {
  const systemPrompt = `You are a prediction market topic generator for Latin America. Given a news headline, create a compelling binary prediction question with translations in both Portuguese and Spanish.

Output JSON format:
{
  "slug": "url-safe-slug-in-english",
  "pt": {
    "title": "Topic title in Portuguese",
    "question": "Binary prediction question in Portuguese",
    "description": "SEO description in Portuguese (max 160 chars)",
    "options": ["Sim", "Não"]
  },
  "es": {
    "title": "Topic title in Spanish", 
    "question": "Binary prediction question in Spanish",
    "description": "SEO description in Spanish (max 160 chars)",
    "options": ["Sí", "No"]
  },
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "expirationDate": "ISO 8601 date",
  "category": "${category}"
}`;

  const userPrompt = `News Title: ${newsTitle}
News Description: ${newsDescription}
Category: ${category}

Generate a prediction topic with Portuguese and Spanish translations.`;

  try {
    const response = await chatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    const parsed = JSON.parse(response);
    
    if (!parsed.slug || !parsed.pt || !parsed.es) {
      return null;
    }

    return {
      pt: {
        slug: parsed.slug,
        title: parsed.pt.title,
        question: parsed.pt.question,
        description: parsed.pt.description,
        options: parsed.pt.options,
        keywords: parsed.keywords,
        expirationDate: parsed.expirationDate,
        category: parsed.category,
      },
      es: {
        slug: parsed.slug,
        title: parsed.es.title,
        question: parsed.es.question,
        description: parsed.es.description,
        options: parsed.es.options,
        keywords: parsed.keywords,
        expirationDate: parsed.expirationDate,
        category: parsed.category,
      },
    };
  } catch (error) {
    console.error('Failed to generate latam topic:', error);
    return null;
  }
}
