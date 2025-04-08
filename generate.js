export default async function handler(req, res) {
  const { input, lang } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Ti si stručnjak za prodajne opise. Piši jasno, privlačno i učinkovito."
          },
          {
            role: "user",
            content: `Napiši kratak, profesionalan opis proizvoda: ${input}. Jezik: ${lang === 'hr' ? 'hrvatski' : 'engleski'}`
          }
        ]
      })
    });

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content || 'Greška u generiranju.';
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ output: 'Greška pri komunikaciji s AI.' });
  }
}