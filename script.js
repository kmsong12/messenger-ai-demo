// fake conversations for each scenario

const chats = {
    study: [
      { from: "sam", text: "finals next week im dying" },
      { from: "mina", text: "we need a note app that syncs" },
      { from: "jay", text: "which one is better notion or obsidian" },
      { from: "you", text: "messenger.ai can pull best study tools" }
    ],
    travel: [
      { from: "eric", text: "we are going to boston right" },
      { from: "mina", text: "i need hotel recs near downtown" },
      { from: "jay", text: "also how are we getting there" },
      { from: "you", text: "let messenger.ai find transport and food" }
    ],
    sports: [
      { from: "sam", text: "what time is the knicks game" },
      { from: "jay", text: "i want odds too" },
      { from: "mina", text: "drop link to the stats page" },
      { from: "you", text: "messenger.ai will fetch live info" }
    ],
    fun: [
      { from: "eric", text: "i kinda like her" },
      { from: "mina", text: "text her rn" },
      { from: "sam", text: "i need a meme to send" },
      { from: "you", text: "messenger.ai finding cute gif and line" }
    ],
    calendar: [
      { from: "sam", text: "lets study together tuesday at 5pm" },
      { from: "mina", text: "can we do 5:30 instead" },
      { from: "jay", text: "i will forget unless someone sends calendar" },
      { from: "you", text: "messenger.ai will make a calendar invite now" }
    ]
  };
  
  // steps that show Dedalus logic
  
  const steps = {
    study: [
      {
        label: "layer 1",
        title: "recent topic: study tools",
        body: "agent scanned last 30 msgs and saw 3 people asking about note apps."
      },
      {
        label: "layer 2",
        title: "picked models",
        body: "chatgpt for ranking tools, web search for current apps."
      },
      {
        label: "layer 3",
        title: "response to chat",
        body: "Notion, Obsidian, Goodnotes links. Added youtube: 'study setup 2025'."
      }
    ],
    travel: [
      {
        label: "layer 1",
        title: "recent topic: weekend boston trip",
        body: "detected intent: transport, stay, food."
      },
      {
        label: "layer 2",
        title: "picked models",
        body: "travel agent tool, chatgpt for itinerary, maps or yelp for food."
      },
      {
        label: "layer 3",
        title: "response to chat",
        body: "sent 2 hotel links, bus vs train price, top 3 brunch spots."
      }
    ],
    sports: [
      {
        label: "layer 1",
        title: "recent topic: knicks game",
        body: "recognized team names, date, request for odds."
      },
      {
        label: "layer 2",
        title: "picked models",
        body: "sports stats model, news scrape, odds API."
      },
      {
        label: "layer 3",
        title: "response to chat",
        body: "live score link, win probability card, spread info."
      }
    ],
    fun: [
      {
        label: "layer 1",
        title: "recent topic: crush texting",
        body: "detected social intent not informational."
      },
      {
        label: "layer 2",
        title: "picked models",
        body: "chatgpt for tone, meme generator or gif search."
      },
      {
        label: "layer 3",
        title: "response to chat",
        body: "one playful line, gif suggestion, safety check for tone."
      }
    ],
    calendar: [
      {
        label: "layer 1",
        title: "recent topic: meeting time",
        body: "agent saw time words like tuesday and 530 and saw members agreeing."
      },
      {
        label: "layer 2",
        title: "picked models",
        body: "chatgpt to normalize date and time, calendar tool to build .ics."
      },
      {
        label: "layer 3",
        title: "response to chat",
        body: ".ics invite created with title study session, date next tuesday 530pm, attendees from chat."
      }
    ]
  };
  
  const chatMessagesEl = document.getElementById("chatMessages");
  const agentStepsEl = document.getElementById("agentSteps");
  const chatPanelEl = document.querySelector(".chat-panel");
  const scenarioButtons = document.querySelectorAll(".scenario-btn");
  
  function renderChat(scenario) {
    chatMessagesEl.innerHTML = "";
    chats[scenario].forEach(msg => {
      const div = document.createElement("div");
      div.classList.add("msg");
      if (msg.from === "you") {
        div.classList.add("user");
      } else {
        div.classList.add("sender");
      }
      div.textContent = msg.text;
      chatMessagesEl.appendChild(div);
    });
    
    // Add/remove background classes
    chatPanelEl.classList.remove("study-background", "travel-background", "fun-background", "sports-background", "calendar-background");
    if (scenario === "study") {
      chatPanelEl.classList.add("study-background");
    } else if (scenario === "travel") {
      chatPanelEl.classList.add("travel-background");
    } else if (scenario === "fun") {
      chatPanelEl.classList.add("fun-background");
    } else if (scenario === "sports") {
      chatPanelEl.classList.add("sports-background");
    } else if (scenario === "calendar") {
      chatPanelEl.classList.add("calendar-background");
    }
  }
  
  function renderSteps(scenario) {
    agentStepsEl.innerHTML = "";
    steps[scenario].forEach(step => {
      const card = document.createElement("div");
      card.classList.add("step-card");
  
      const label = document.createElement("div");
      label.classList.add("step-label");
      label.textContent = step.label;
  
      const title = document.createElement("div");
      title.classList.add("step-title");
      title.textContent = step.title;
  
      const body = document.createElement("div");
      body.classList.add("step-body");
      body.textContent = step.body;
  
      card.appendChild(label);
      card.appendChild(title);
      card.appendChild(body);
  
      agentStepsEl.appendChild(card);
    });
  }
  
  scenarioButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      scenarioButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const scenario = btn.dataset.scenario;
      renderChat(scenario);
      renderSteps(scenario);
    });
  });
  
  // initial view
  renderChat("study");
  renderSteps("study");
  