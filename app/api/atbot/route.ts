import { NextResponse } from 'next/server'

const MODEL_NAME = 'gpt-4o-mini'

const SYSTEM_PROMPT = `
You are "AnadjyTech AI", a multilingual shopping assistant for tech & gadgets.
Brand: "AnadjyTech" — tagline: "The smart way to tech."
Languages supported: English, French, and Spanish only.
Goals:
- Help users find gadgets, compare options, and recommend products.
- Always append "anadjytech-20" to Amazon links.
- Never handle payments; redirect users to affiliate pages.
- Keep answers concise, friendly, and focused on gadgets and deals.
`

export async function POST(req: Request) {
  try {
    const { message, referrer } = await req.json()
    if (!message)
      return NextResponse.json({ error: 'Missing message' }, { status: 400 })
 
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        temperature: 0.4,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      }),
    })

    const data = await openaiRes.json()
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      'Sorry, I had trouble answering.'

    return NextResponse.json({ reply })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Server error', detail: String(err).slice(0, 500) },
      { status: 500 }
    )
  }
}
