let wishes: {
  id: number
  name: string
  message: string
  timestamp: string
}[] = []

export async function GET() {
  return new Response(JSON.stringify(wishes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  const newWish = {
    id: wishes.length + 1,
    name: body.name,
    message: body.message,
    timestamp: new Date().toISOString(),
  }
  wishes.unshift(newWish)

  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Birthday Wishes",
        embeds: [
          {
            title: `อวยพรวันเกิดโดยคุณ - ${body.name}`,
            description: body.message,
            color: 10181046,
            timestamp: newWish.timestamp,
          },
        ],
      }),
    })
  }

  return new Response(JSON.stringify(newWish), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}
