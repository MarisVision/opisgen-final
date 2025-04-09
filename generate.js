export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, lang } = req.body;
  const key = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a product description generator.' },
          { role: 'user', content: `Napiši prodajni opis za: ${input}, jezik: ${lang}` }
        ]
      })
    });

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content;
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ error: 'Greška pri generiranju opisa.' });
  }
}
