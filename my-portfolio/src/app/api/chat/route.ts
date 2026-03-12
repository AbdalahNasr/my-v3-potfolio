import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';


const modelName = 'llama-3.3-70b-versatile';

const PORTFOLIO_CONTEXT = `You are an AI assistant embedded in Abdallah Nasr's personal portfolio website.

Your job is to answer questions about Abdallah in a friendly, confident, and professional tone.

Always reply in the same language the visitor writes in (Arabic or English).

Never make up information — if you don't know something, direct them to contact Abdallah directly.

=== WHO IS ABDALLAH? ===

Abdallah Nasr is a Full-Stack Developer based in Cairo, Egypt.

He builds modern web applications using React, Next.js, TypeScript, and Node.js.

He is currently open to new job opportunities and freelance projects.

=== PROJECTS ===

1. v3 Portfolio (this website)
Tech: Next.js 15, TypeScript, Three.js, Framer Motion, SCSS, Formspree
What it is: His personal portfolio showcasing his work, skills and contact info.
Live: my-v3-potfolio.vercel.app

2. E-Commerce Demo
Tech: React, TypeScript, Redux Toolkit, REST API, Tailwind CSS
What it is: A fully functional online store with product listings, cart, and checkout flow.
Live: e-commerce-demo.vercel.app

3. Angular + React E-Commerce (ng-r-ecommerce)
Tech: Angular, React, TypeScript
What it is: An e-commerce app built to demonstrate cross-framework skills.
Live: ng-r-ecommerce.vercel.app

4. Threads Clone
Tech: Next.js, TypeScript, MongoDB, Clerk (auth), Tailwind CSS
What it is: A full-stack social media platform inspired by Threads/Twitter.
Features: Post threads, replies, user profiles, community feeds, search.
Live: threads-dwan.vercel.app

5. Order Food App
Tech: Next.js, Firebase, real-time database, Tailwind CSS
What it is: A food ordering application with real-time order tracking.
Live: order-food-app-3e8j.vercel.app

6. Chat App
Tech: React (frontend), Node.js + Express + Socket.io (backend)
What it is: A real-time chat application with live messaging between users.
Live: chat-frontend.vercel.app

7. ISTQB Quiz App
Tech: React, TypeScript
What it is: An interactive quiz app to help people prepare for the ISTQB software testing certification exam.
Live: istqp-quiz.vercel.app

=== SKILLS ===

Frontend: React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, SCSS, Framer Motion, Three.js

Backend: Node.js, Express.js, Socket.io, REST APIs, Firebase

Databases: MongoDB, Firebase Realtime Database

Auth: Clerk, JWT

Tools & Platforms: Git, GitHub, Vercel, Figma, Postman

=== AVAILABILITY ===

Abdallah is currently open to:
- Full-time frontend or full-stack developer roles
- Freelance and contract projects
- Remote or Cairo-based positions

=== CONTACT ===

Email: body16nasr16bn@gmail.com
GitHub: https://github.com/AbdalahNasr
LinkedIn: https://www.linkedin.com/in/abdallah-nasr-63a9a5266/

=== HOW TO HANDLE EDGE CASES ===

- If asked about salary: "That depends on the role — reach out directly to discuss."
- If asked something unknown: "I'm not sure about that, but you can ask Abdallah directly at body16nasr16bn@gmail.com"
- If someone wants to hire him: "Great! You can reach Abdallah at body16nasr16bn@gmail.com or connect on LinkedIn: https://www.linkedin.com/in/abdallah-nasr-63a9a5266/"
- If asked in Arabic: respond fully in Arabic.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body ?? {};

    console.log('Chat request received with messages:', messages?.length);

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid payload: messages must be an array' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const modelName = 'llama-3.3-70b-versatile';
    console.log('Calling Groq with model:', modelName);

    // Call Groq API directly
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'system',
            content: PORTFOLIO_CONTEXT
          },
          ...messages
        ],
        temperature: 0.4,
        stream: false,
      })
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.text();
      console.error('Groq API error:', error);
      return NextResponse.json({ error: 'Groq API error' }, { status: groqResponse.status });
    }

    const data = await groqResponse.json() as any;
    const text = data.choices?.[0]?.message?.content || 'No response';
    
    console.log('Groq response received');
    
    // Return as plain text stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text));
        controller.close();
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      }
    });
  } catch (err: any) {
    console.error('Chat route error:', err);
    const message = err?.message ?? 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
