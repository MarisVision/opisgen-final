
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { input, lang } = req.body;
  const apiKey = "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";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Napiši prodajni opis proizvoda na jeziku: " + lang },
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ output: data?.choices?.[0]?.message?.content || "Greška pri generaciji." });
  } catch (error) {
    res.status(500).json({ error: "Došlo je do greške prilikom poziva AI servisu." });
  }
}
