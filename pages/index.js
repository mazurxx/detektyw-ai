import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    const res = await fetch('/api/generate');
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-[#e2dcc8] font-mono p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center tracking-widest">🕵️ Detektyw AI</h1>
        <p className="text-lg mb-8 text-center opacity-80">
          Witaj w biurze spraw nierozwiązanych. Kliknij poniżej, by rozpocząć kolejne śledztwo.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="border border-[#e2dcc8] px-6 py-2 text-lg hover:bg-[#2d2d2d] transition-all rounded tracking-wide"
          >
            {loading ? 'Generowanie sprawy...' : '🗃️ Rozpocznij Śledztwo'}
          </button>
        </div>
        {response && (
          <div className="mt-10 p-6 bg-[#2a2a2a] rounded shadow-md border border-[#3a3a3a] whitespace-pre-wrap">
            <h2 className="text-2xl font-semibold mb-4">📝 Akta sprawy:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}