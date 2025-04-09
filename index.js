import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('hr');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, lang })
    });
    const data = await res.json();
    setOutput(data.output || 'Greška...');
    setLoading(false);
  };

  return (
    <main style={{ background: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700' }}>OpisGen AI</h1>
      <p>Profesionalni AI alati za pisanje opisa proizvoda</p>
      <input
        type="text"
        placeholder="Unesi naziv proizvoda"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ padding: '10px', width: '80%', maxWidth: '400px', margin: '10px' }}
      /><br />
      <select value={lang} onChange={e => setLang(e.target.value)} style={{ padding: '10px' }}>
        <option value="hr">Hrvatski</option>
        <option value="en">English</option>
      </select><br /><br />
      <button onClick={generate} disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', background: '#ffd700', border: 'none' }}>
        {loading ? 'Generiram...' : 'Generiraj opis'}
      </button>
      <pre style={{ background: '#1e1e1e', padding: '1rem', borderRadius: '8px', marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
        {output}
      </pre>
      <a href="https://ko-fi.com/opisgen" target="_blank" style={{ color: '#ffd700', display: 'inline-block', marginTop: '20px' }}>
        ☕ Podrži nas putem Ko-fi
      </a>
    </main>
  );
}