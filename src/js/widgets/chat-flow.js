/**
 * Cardynal Chat Flow Demo Widget
 * Animated conversation simulation showing AI + Human support
 */

const CHAT_FLOW_CONFIG = {
  theme: 'dark',
  defaultLabels: {
    customer: 'Alex',
    ai: 'Cardynal AI',
    human: 'Support Agent: Maya'
  },
  timings: {
    typingMin: 1200,
    typingMax: 2200,
    afterMessage: 300,
    afterSystem: 600,
    betweenFlows: 2000
  },
  maxVisibleMessages: 6,
  playMode: 'sequential',
  flows: [
    {
      name: 'Technical Support',
      messages: [
        { type: 'customer', text: 'The API is throwing a 500 error on POST requests.' },
        { type: 'ai', text: 'Got it — let me check our system status.' },
        { type: 'system', text: 'Intent detected: technical_issue' },
        { type: 'tool', text: 'GET /status/current', glow: true },
        { type: 'tool', text: '✓ All systems operational' },
        { type: 'ai', text: 'Our systems are operational. Can you share your request body?' },
        { type: 'customer', text: '{"user": "test", "action": "create"}' },
        { type: 'tool', text: 'POST /validate/json', glow: true },
        { type: 'tool', text: '✗ Missing required field: api_key' },
        { type: 'ai', text: 'Found it! Your payload is missing the "api_key" field. Add it and you should be good.' },
        { type: 'customer', text: 'That fixed it! Thanks a lot.' },
        { type: 'ai', text: 'Perfect! Let me know if you need anything else.' }
      ]
    },
    {
      name: 'Order Tracking with Escalation',
      messages: [
        { type: 'customer', label: 'Noa', text: "Where is my order #4521? It's been 5 days." },
        { type: 'ai', text: 'Let me look that up for you right away.' },
        { type: 'system', text: 'Intent: order_tracking' },
        { type: 'tool', text: 'GET /orders/4521', glow: true },
        { type: 'tool', text: 'Status: Stuck at sorting facility' },
        { type: 'ai', text: 'I see your order is delayed — let me escalate to our logistics team.' },
        { type: 'system', text: 'Escalating to human agent' },
        { type: 'note', label: 'Handoff Note', text: 'Customer frustrated (5 days wait). Order #4521 stuck. Needs priority resolution.' },
        { type: 'human', label: 'Maya', text: "Hi Noa! I'm taking over. Let me contact the carrier directly." },
        { type: 'human', text: "Good news — your package will arrive tomorrow by 6pm." },
        { type: 'customer', label: 'Noa', text: "That's great, thank you so much!" }
      ]
    },
    {
      name: 'Refund Request',
      messages: [
        { type: 'customer', label: 'Jordan', text: 'I want a refund for order #8842. Product arrived damaged.' },
        { type: 'ai', text: "I'm sorry to hear that. Let me pull up your order." },
        { type: 'system', text: 'Intent: refund_request' },
        { type: 'tool', text: 'GET /orders/8842', glow: true },
        { type: 'tool', text: 'Order: $89.99 — Wireless Headphones' },
        { type: 'system', text: 'Policy check: Eligible for full refund' },
        { type: 'ai', text: "You're eligible for a full refund. Want me to process it now?" },
        { type: 'customer', label: 'Jordan', text: 'Yes please.' },
        { type: 'tool', text: 'POST /refunds/create', glow: true },
        { type: 'tool', text: '✓ Refund initiated: $89.99' },
        { type: 'ai', text: "Done! $89.99 will be back in your account within 3-5 business days." }
      ]
    }
  ]
};

class ChatFlowDemo {
  constructor(containerId, config = CHAT_FLOW_CONFIG) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.config = config;
    this.messages = [];
    this.isRunning = false;
    this.currentTimeout = null;
    this.currentFlowIndex = 0;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.render();
    this.start();

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  render() {
    const themeClass = this.config.theme === 'dark' ? 'cfd-theme-dark' : '';
    this.container.innerHTML = `
      <div class="cfd-container ${themeClass}">
        <div class="cfd-wrapper">
          <div class="cfd-messages" id="cfd-messages-${this.container.id}"></div>
        </div>
      </div>
    `;
    this.messagesContainer = this.container.querySelector(`#cfd-messages-${this.container.id}`);
  }

  start() {
    this.isRunning = true;
    this.runLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  destroy() {
    this.stop();
    this.messages = [];
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  async runLoop() {
    while (this.isRunning) {
      const flow = this.getNextFlow();
      await this.runFlow(flow);
      if (this.isRunning) {
        await this.delay(this.config.timings.betweenFlows);
      }
    }
  }

  getNextFlow() {
    const flows = this.config.flows;
    if (this.config.playMode === 'random') {
      return flows[Math.floor(Math.random() * flows.length)];
    }
    const flow = flows[this.currentFlowIndex];
    this.currentFlowIndex = (this.currentFlowIndex + 1) % flows.length;
    return flow;
  }

  async runFlow(flow) {
    for (const msg of flow.messages) {
      if (!this.isRunning) break;

      const showTyping = msg.typing !== false &&
        (msg.type === 'customer' || msg.type === 'ai' || msg.type === 'human');

      const label = msg.label || this.config.defaultLabels[msg.type] || null;

      if (showTyping) {
        await this.showTyping(msg.type, label);
      }

      await this.addMessage(msg.type, label, msg.text, msg.glow || false);

      const delayTime = msg.delay ||
        (msg.type === 'system' || msg.type === 'tool'
          ? this.config.timings.afterSystem
          : this.config.timings.afterMessage);

      await this.delay(delayTime);
    }
  }

  async addMessage(type, label, content, withGlow = false) {
    const message = { type, label, content, withGlow, id: Date.now() + Math.random() };
    this.messages.push(message);

    while (this.messages.length > this.config.maxVisibleMessages) {
      await this.removeOldestMessage();
    }

    this.renderMessage(message);
  }

  renderMessage(message) {
    const el = document.createElement('div');
    el.className = `cfd-message cfd-message--${message.type}`;
    if (message.withGlow) el.classList.add('cfd-glow');
    el.dataset.id = message.id;

    let html = '';

    if (message.type === 'note') {
      const headerText = message.label || 'Internal Note';
      html += `<div class="cfd-bubble"><div class="cfd-note-header">${headerText}</div>${this.escapeHtml(message.content)}</div>`;
    } else {
      if (message.label && (message.type === 'customer' || message.type === 'ai' || message.type === 'human')) {
        html += `<span class="cfd-message__label">${message.label}</span>`;
      }
      html += `<div class="cfd-bubble">${this.escapeHtml(message.content)}</div>`;
    }

    el.innerHTML = html;
    this.messagesContainer.appendChild(el);
  }

  async removeOldestMessage() {
    const oldest = this.messages.shift();
    const el = this.messagesContainer.querySelector(`[data-id="${oldest.id}"]`);

    if (el) {
      el.classList.add('cfd-exiting');
      await this.delay(this.reducedMotion ? 0 : 300);
      el.remove();
    }
  }

  async showTyping(type, label) {
    const typingId = 'typing-' + Date.now();

    const el = document.createElement('div');
    el.className = `cfd-message cfd-message--${type}`;
    el.dataset.id = typingId;

    let html = '';
    if (label) {
      html += `<span class="cfd-message__label">${label}</span>`;
    }
    html += `
      <div class="cfd-typing">
        <span class="cfd-typing__dot"></span>
        <span class="cfd-typing__dot"></span>
        <span class="cfd-typing__dot"></span>
      </div>
    `;
    el.innerHTML = html;

    this.messages.push({ id: typingId, isTyping: true, type });

    while (this.messages.length > this.config.maxVisibleMessages) {
      await this.removeOldestMessage();
    }

    this.messagesContainer.appendChild(el);

    const duration = this.getRandomInt(this.config.timings.typingMin, this.config.timings.typingMax);
    await this.delay(this.reducedMotion ? 150 : duration);

    const typingIndex = this.messages.findIndex(m => m.id === typingId);
    if (typingIndex > -1) {
      this.messages.splice(typingIndex, 1);
    }
    el.remove();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(ms) {
    return new Promise(resolve => {
      this.currentTimeout = setTimeout(resolve, ms);
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Export for use
export { ChatFlowDemo, CHAT_FLOW_CONFIG };
