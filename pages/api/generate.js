import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const prompt = `
Stwórz scenariusz morderstwa w stylu Agathy Christie. Zawiera:
- Miejsce zbrodni (np. pałac, teatr, luksusowy hotel)
- Ofiarę: imię, wiek, kim była
- Opis sceny zbrodni
- 4 podejrzanych: imię, rola, motyw, alibi, osobowość
- Jedna z postaci jest winna – nie zdradzaj od razu kto
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}