// English widget translations (conversations only - system stays in English)
export default {
  chat: {
    billing: {
      c1: 'Why was I charged $49 twice this month?',
      a1: 'Let me check your billing history right away.',
      a2: "You're right — I found a duplicate charge. This was a system error on our end. I'm initiating a refund now.",
      a3: "Refund processed! You'll see $49 back in your account within 2-3 days. I've also flagged this to prevent future duplicates.",
      c2: 'Great, thanks for sorting it out quickly.',
      a4: 'Of course! Sorry for the confusion. Anything else I can help with?'
    },
    order: {
      c1: "Where is my order #4521? It's been 5 days.",
      a1: 'Let me look that up for you right away.',
      a2: "I see your order is delayed at a sorting facility. This is unusual — let me escalate to our logistics team.",
      note: 'Customer frustrated (5 days wait). Order #4521 stuck at sorting. Needs priority resolution + compensation.',
      h1: "Hi Noa! I'm taking over. Let me contact the carrier directly.",
      h2: "Good news — I've flagged your package for priority handling. It'll arrive tomorrow by 6pm.",
      c2: "That's great, thank you so much!",
      h3: "You're welcome! I've also added a 15% discount to your next order as an apology for the delay."
    },
    tech: {
      c1: 'The API is throwing a 500 error on POST requests.',
      a1: 'Got it — let me check our system status.',
      a2: 'Our systems are fully operational. The 500 might be due to an invalid payload. Can you share your request body?',
      c2: 'Here it is: {"user": "test", "action": "create"}',
      a3: 'Found it! Your payload is missing the required "api_key" field. Add it and you should be good.',
      c3: 'That fixed it! Thanks a lot.',
      a4: 'Perfect! Let me know if you need anything else.'
    }
  },
  playbook: {
    step1: 'Customer requesting refund',
    step2: 'Matching policy rules',
    step3: 'Order #12847 confirmed',
    step4: 'Response sent in 4.2s'
  },
  tree: {
    step1: '"My order is late!"',
    step2trigger: 'High frustration',
    branchLeftBlocked: 'Blocked',
    branchRight: 'Routing to Maya'
  },
  rag: {
    userQuestion: 'What is the refund policy?',
    answer: 'Refunds are processed within <strong>14 business days</strong> of receiving the returned item.'
  }
};
