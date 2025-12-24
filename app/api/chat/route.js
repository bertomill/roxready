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

Be concise but helpful. Give practical, actionable advice. If asked about form or technique, be specific about body positioning and common mistakes. Reference the current workout when relevant.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return Response.json({
      message: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { error: 'Failed to get response' },
      { status: 500 }
    )
  }
}
