export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Use the standard environment variable without the VITE_ prefix
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured in Vercel Environment Variables.' });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // These headers are optional for OpenRouter but good for rankings
        "HTTP-Referer": "https://edwinbayog-portfolio.vercel.app", 
        "X-Title": "Edwin Bayog Portfolio", 
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: req.body.messages,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("OpenRouter Proxy Error:", error);
    return res.status(500).json({ error: 'Failed to fetch AI response from OpenRouter' });
  }
}
