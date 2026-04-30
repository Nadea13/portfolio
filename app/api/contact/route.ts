import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // ตรวจสอบข้อมูลเบื้องต้น
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not defined');
      return NextResponse.json({ error: 'Webhook configuration missing' }, { status: 500 });
    }

    // จัดรูปแบบข้อความที่จะส่งเข้า Discord
    const discordMessage = {
      embeds: [
        {
          title: '📩 New Contact Message',
          color: 3447003, // Blue color
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Message', value: message },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'Portfolio Website' },
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to send to Discord' }, { status: 500 });
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
