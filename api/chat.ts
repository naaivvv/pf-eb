export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY is not configured.' }), { status: 500 });
  }

  try {
    const body = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://edwinbayog-portfolio.vercel.app", 
        "X-Title": "Edwin Bayog Portfolio", 
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: body.messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      return new Response(response.body, { status: response.status });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("OpenRouter Proxy Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch AI response from OpenRouter' }), { status: 500 });
  }
}
