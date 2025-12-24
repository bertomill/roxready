import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { messages, workoutContext } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a helpful Hyrox training coach assistant. You're helping an athlete prepare for a Hyrox race.

Current Workout Context:
${workoutContext}

You have deep knowledge of:
- Hyrox race format (8 stations + 8x1km runs)
- All Hyrox stations: SkiErg, Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Lunges, Wall Balls
- Strength training for functional fitness
- Running and endurance training
- Recovery and nutrition for athletes
- Pacing strategies and race tactics

Format your responses using markdown:
- Use **bold** for emphasis
- Use bullet points for lists
- Use ### for section headers
- Keep responses concise but thorough

Be helpful and give practical, actionable advice. If asked about form or technique, be specific about body positioning and common mistakes.`

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 800,
      temperature: 0.7,
      stream: true,
    })

    // Create a ReadableStream to send chunks to the client
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          if (content) {
            controller.enqueue(encoder.encode(content))
          }
        }
        controller.close()
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { error: 'Failed to get response' },
      { status: 500 }
    )
  }
}
