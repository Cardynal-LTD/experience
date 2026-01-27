/**
 * Cardynal Flow Widget
 * Step-by-step process visualization showing AI processing flow
 */

const FLOW_STEPS = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8M8 13h6"></path></svg>`,
    title: "Intent Detected",
    desc: "Customer requesting refund",
    status: "Analyzing"
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/><circle cx="12" cy="12" r="3"/></svg>`,
    title: "AI Playbook",
    desc: "Matching policy rules",
    status: "Processing"
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>`,
    title: "Data Verified",
    desc: "Order #12847 confirmed",
    status: "Validating"
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>`,
    title: "Resolved",
    desc: "Response sent in 4.2s",
    status: "Complete"
  }
];

class FlowWidget {
  constructor(containerId, steps = FLOW_STEPS) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.steps = steps;
    this.config = {
      stepDuration: 1800,
      pauseAtEnd: 2500,
      lineAnimDelay: 400
    };

    this.timeoutIds = [];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.render();
    this.cacheElements();
    this.schedule(() => this.animateStep(), 800);
  }

  render() {
    let html = `
      <div class="cfw-progress-container">
        <div class="cfw-progress-bar" id="cfw-progress-${this.container.id}"></div>
      </div>
      <div class="cfw-track-container">
        <div class="cfw-track" id="cfw-track-${this.container.id}">
    `;

    this.steps.forEach((step, i) => {
      html += `
        <div class="cfw-node" id="cfw-node-${this.container.id}-${i}">
          <span class="cfw-step-badge">${i + 1}</span>
          <div class="cfw-icon">${step.icon}</div>
          <div class="cfw-content">
            <div class="cfw-title">${step.title}</div>
            <div class="cfw-desc">${step.desc}</div>
          </div>
          <div class="cfw-status">
            <span class="cfw-status-dot"></span>
            ${step.status}
          </div>
        </div>
      `;
      if (i < this.steps.length - 1) {
        html += `<div class="cfw-line" id="cfw-line-${this.container.id}-${i}"></div>`;
      }
    });

    html += `</div></div>`;
    this.container.innerHTML = html;
  }

  cacheElements() {
    this.track = document.getElementById(`cfw-track-${this.container.id}`);
    this.progressBar = document.getElementById(`cfw-progress-${this.container.id}`);
    this.nodes = Array.from(this.container.querySelectorAll('.cfw-node'));
    this.lines = Array.from(this.container.querySelectorAll('.cfw-line'));
  }

  schedule(fn, delay) {
    const id = setTimeout(fn, delay);
    this.timeoutIds.push(id);
    return id;
  }

  clearAll() {
    this.timeoutIds.forEach(clearTimeout);
    this.timeoutIds = [];
  }

  centerOnNode(index) {
    const node = this.nodes[index];
    if (!node) return;
    const offset = node.offsetLeft + (node.offsetWidth / 2);
    this.track.style.transform = `translateX(-${offset}px)`;
  }

  updateProgress(index) {
    const percent = ((index + 1) / this.steps.length) * 100;
    this.progressBar.style.width = `${percent}%`;
  }

  resetAll() {
    this.nodes.forEach(n => {
      n.classList.remove('active', 'passed', 'success');
    });
    this.lines.forEach(l => {
      l.classList.remove('active', 'complete');
    });
    this.progressBar.style.width = '0%';
  }

  animateStep() {
    const node = this.nodes[this.currentIndex];
    const prevLine = this.lines[this.currentIndex - 1];

    // Mark previous nodes as passed
    for (let i = 0; i < this.currentIndex; i++) {
      this.nodes[i].classList.remove('active', 'success');
      this.nodes[i].classList.add('passed');
    }

    // Mark previous lines as complete
    for (let i = 0; i < this.currentIndex; i++) {
      this.lines[i].classList.add('active', 'complete');
    }

    // Activate current line
    if (prevLine) {
      prevLine.classList.add('active');
    }

    // Activate current node
    node.classList.remove('passed');
    if (this.currentIndex === this.steps.length - 1) {
      node.classList.add('success');
    } else {
      node.classList.add('active');
    }

    // Center and update progress
    this.centerOnNode(this.currentIndex);
    this.updateProgress(this.currentIndex);

    // Continue or loop
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this.schedule(() => this.animateStep(), this.config.stepDuration);
    } else {
      // End reached - restart after pause
      this.schedule(() => {
        this.resetAll();
        this.currentIndex = 0;
        this.centerOnNode(0);
        this.schedule(() => this.animateStep(), 600);
      }, this.config.pauseAtEnd);
    }
  }

  destroy() {
    this.clearAll();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

export { FlowWidget, FLOW_STEPS };
