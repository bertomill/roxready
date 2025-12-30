import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// This will be populated with Hyrox knowledge
const HYROX_KNOWLEDGE = `
# Hyrox Knowledge Base

[Placeholder for Hyrox knowledge - will be populated with latest information]

## Basic Hyrox Format
- 8 x 1km runs
- 8 functional workout stations between each run
- Stations: SkiErg, Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Sandbag Lunges, Wall Balls

## Race Divisions
- Open: Individual competition
- Doubles: Team of 2 (alternating stations)
- Relay: Team of 4 (each person does 2 stations + 2 runs)
- Pro: Elite athletes
- Age Group: Various age categories
`

export async function POST(request) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are an expert Hyrox coach and knowledge assistant. You have deep expertise in all aspects of Hyrox racing.

${HYROX_KNOWLEDGE}

You help athletes with:
- Understanding Hyrox race format, rules, and divisions
- Training strategies and programming
- Station-specific techniques and form
- Pacing strategies for race day
- Equipment and gear recommendations
- Nutrition and recovery for Hyrox
- Mental preparation and race tactics

Format your responses using markdown:
- Use **bold** for key terms and emphasis
- Use bullet points and numbered lists for clarity
- Use ### for section headers
- Use *italics* for important notes
- Keep responses clear, actionable, and well-structured

Be comprehensive but concise. Provide practical, evidence-based advice that athletes can immediately apply to their training and racing.`

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 1200,
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
    console.error('Hyrox Chat API error:', error)
    return Response.json(
      { error: 'Failed to get response' },
      { status: 500 }
    )
  }
}
