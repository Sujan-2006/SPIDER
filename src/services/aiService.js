/**
 * AI Site & Section Generator Service (Nvidia NIM Integration)
 * Converts user prompt descriptions into clean HTML/CSS components for GrapesJS.
 */

const API_URL = '/api/nvidia/chat/completions';
const MODEL = 'meta/llama-3.1-70b-instruct';
const API_KEY = import.meta.env.VITE_NVIDIA_API_KEY;

export async function rewriteTextWithAI(text, mode) {
  if (!text || !text.trim()) return text;
  
  let systemPrompt = "You are an expert copywriter for websites. Return ONLY the rewritten text, nothing else. No markdown formatting, no quotes.";
  let userPrompt = "";

  if (mode === 'shorten') {
    userPrompt = `Make this text shorter and more concise: "${text}"`;
  } else if (mode === 'professional') {
    userPrompt = `Make this text sound highly professional, sophisticated, and engineered for excellence: "${text}"`;
  } else {
    userPrompt = `Rewrite this text: "${text}"`;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 150
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to rewrite text.');
  }

  const data = await response.json();
  const generatedText = data.choices[0].message.content.trim();
  // Strip any surrounding quotes that the LLM might have added
  return generatedText.replace(/^["']|["']$/g, '');
}

export async function generateAISection(promptText, sectionType = 'hero') {
  if (!promptText || !promptText.trim()) {
    throw new Error('Please enter a description for the AI generator.');
  }

  const systemPrompt = `You are an expert frontend developer and web designer creating components for a visual builder. 
Your task is to return ONLY raw, valid HTML. DO NOT include \`\`\`html or any markdown blocks. DO NOT include explanations. 
Use inline styles (style="...") for all styling. Use modern, beautiful design principles (padding, flexbox, border-radius, modern fonts, good contrast).
Do NOT include <html>, <head>, or <body> tags. Just the raw <section> or <div> wrapper and its contents.`;

  const userPrompt = `Create a visually stunning "${sectionType}" website section based on this description: "${promptText}". 
Make sure the inline CSS is polished, responsive-friendly (using percentages/flex/grid where applicable), and looks incredibly premium.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to generate section.');
  }

  const data = await response.json();
  let generatedHtml = data.choices[0].message.content.trim();
  
  // Cleanup any markdown artifacts just in case
  generatedHtml = generatedHtml.replace(/^```html\n?/, '').replace(/```$/g, '');

  return {
    html: generatedHtml,
    css: '' // Inline styles are used in the HTML
  };
}

export async function generateBrandConfig(promptText) {
  if (!promptText || !promptText.trim()) return null;

  const systemPrompt = `You are an expert UI/UX designer. Based on the user's creative prompt, generate a cohesive brand design token payload.
Return ONLY a strict JSON object with no markdown wrappers, no explanations, just the JSON.
The JSON must have this exact structure:
{
  "primaryColor": "#hexcode",
  "secondaryColor": "#hexcode",
  "fontFamilyHeading": "Google Font Name",
  "fontFamilyBody": "Google Font Name"
}

Rules for fonts: Choose from popular Google Fonts like 'Playfair Display', 'Inter', 'Outfit', 'Roboto', 'Space Grotesk', 'Syne', 'Plus Jakarta Sans', etc.
Rules for colors: Ensure the primary and secondary colors look incredible together and match the requested theme.`;

  const userPrompt = `Generate a brand theme for this description: "${promptText}"`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 150
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate brand theme.');
  }

  const data = await response.json();
  let jsonString = data.choices[0].message.content.trim();
  jsonString = jsonString.replace(/^```json\n?/, '').replace(/```$/g, '');

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("AI returned invalid JSON:", jsonString);
    throw new Error("AI returned invalid data format.");
  }
}

export async function generateSEOMetadata(pageText) {
  if (!pageText || !pageText.trim()) return null;

  const systemPrompt = `You are an expert SEO copywriter. Based on the provided raw text content of a webpage, generate an optimized SEO payload.
Return ONLY a strict JSON object with no markdown wrappers, no explanations.
The JSON must have this exact structure:
{
  "title": "A catchy, optimized title (max 60 chars)",
  "description": "A compelling meta description summarizing the page value (max 160 chars)"
}`;

  const userPrompt = `Generate SEO metadata for this page content:\n\n${pageText.substring(0, 3000)}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 150
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate SEO metadata.');
  }

  const data = await response.json();
  let jsonString = data.choices[0].message.content.trim();
  jsonString = jsonString.replace(/^```json\n?/, '').replace(/```$/g, '');

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("AI returned invalid JSON:", jsonString);
    throw new Error("AI returned invalid data format.");
  }
}

export async function translateTextBulk(textArray, targetLanguage) {
  if (!textArray || textArray.length === 0) return [];

  const systemPrompt = `You are an expert polyglot translator. You will receive a JSON array of text strings from a website.
Your task is to translate EVERY string into ${targetLanguage}.
Return ONLY a strict JSON array of the translated strings in the EXACT SAME ORDER.
Do not add any markdown formatting, do not add explanations. Just the JSON array.
If a string contains HTML tags, preserve the HTML tags perfectly.`;

  const userPrompt = `Translate this JSON array to ${targetLanguage}:\n\n${JSON.stringify(textArray)}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 2048
    })
  });

  if (!response.ok) {
    throw new Error('Failed to translate text.');
  }

  const data = await response.json();
  let jsonString = data.choices[0].message.content.trim();
  jsonString = jsonString.replace(/^```json\n?/, '').replace(/```$/g, '');

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("AI returned invalid JSON:", jsonString);
    throw new Error("AI returned invalid data format.");
  }
}
