export default async function handler(req, res) {
  const { input, lang } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: \`Napiši prodajni opis za: "\${input}" na jeziku: \${lang === 'en' ? 'English' : 'Hrvatski'}\`,
          },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ output: data.choices[0]?.message?.content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate description.' });
  }
}
