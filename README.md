# 🧠 My Tabs App

A deeply personal and multi-functional **React + Bootstrap** app built to support **self-reflection, growth, learning, and daily presence**.

🟢 Live App: [https://my-tabs-app.vercel.app](https://my-tabs-app.vercel.app)

---

## 🌳 Features Overview

This app brings together several powerful self-development tools in one place:

# 🧠 Memory Palace Builder

Welcome to the **Memory Palace** app — a visual, interactive tool to help you organize and recall information using the time-tested **Method of Loci** technique.

---

## 🚀 What Is a Memory Palace?

A **Memory Palace** is a mental model where you place information (like names, lists, concepts) inside visualized locations (palaces, rooms, landmarks). This technique boosts memory by anchoring ideas to familiar spaces.

This app lets you build digital memory palaces by:
- Creating palaces (collections)
- Adding rooms to each palace
- Uploading an image for each room
- Dropping pins on that image
- Annotating pins with names, notes, mnemonics, tags
- Walking through your palace in "Play Mode"

---

## ✨ Features

| Feature            | Description |
|--------------------|-------------|
| 🏰 Create Palaces   | Create multiple themed memory palaces |
| 🛏️ Add Rooms       | Each palace can contain any number of rooms |
| 🖼 Upload Image     | Use images as visual backgrounds (room layouts, scenes, diagrams) |
| 📍 Drop Pins        | Double-click on the image to place numbered pins |
| 🧠 Peg Words        | Each pin is linked to a peg word (e.g., 1 → Tie, 2 → Noah...) |
| 🔁 Play Mode        | View rooms as a slideshow (read-only) to practice recall |
| 💾 Import/Export    | Save and restore your palace data using JSON |
| ♻️ Reusable Import/Export | Uses a reusable `JsonImportExport` component (minimal icons, file-based) |

---

## 🛠 Getting Started

1. `npm install`
2. `npm start`
3. Create your first palace and add rooms
4. Upload room images and drop pins with notes
5. Export your palace data (`memory-palaces.json`)
6. Re-import to restore anytime

---

## 📦 Components

- `MemoryPalaceApp.js`: Main application wrapper
- `Location.js`: Image + pin labeler component
- `pegList.js`: 1-to-100 peg word mapping
- `JsonImportExport.js`: Reusable import/export button group

---

## ✅ TODO (if you want to contribute)

- [ ] Drag-and-drop pin positioning
- [ ] Export to PDF
- [ ] Tag-based filtering
- [ ] Audio playback per pin
- [ ] Cloud sync or Firebase backend

---

## 🧩 Credits

Built with ❤️ by **Gandeevi** using ReactJS, Bootstrap, and imagination.  
Special thanks to **ChatGPT by OpenAI** for design assistance, UX ideas, and code generation.




### 1. 🔗 Tree Builder
- Create and visualize structured ideas or hierarchies
- Great for organizing concepts, mind maps, plans, or workflows

### 2. 🗓️ Events Tracker
- Log and track meaningful life events, habits, or emotional spikes
- Tag events by type, priority, or personal significance

### 3. 📘 Essay Quiz Generator
- Load essays with special syntax (like `~word@abbreviation^translation^~`)
- Automatically generates:
  - Fill-in-the-blank quizzes
  - Sentence re-constructions
  - Abbreviation + translation references

### 4. 💭 Mental Thoughts Buckets
- Capture and categorize your thoughts under:
  - Visionary Thoughts
  - Strategic Actions
  - Habit Building
  - Learning & Absorption
  - Reflective & Emotional Processing
- Thought entries are searchable and timestamped

### 5. 🚫 Negative Loop Clarifier / Tracker
- Write out and break down 15+ personal mental loops (e.g., overthinking, people-pleasing)
- For each loop, track:
  - Name, behavior, inner voice, cost, origin, desire, and mantra
- Import/export JSON to save and reflect across time

### 6. 🌱 Daily Rebirth Journal
- Log your daily awakening journey with entries like:
  - Moment of Clarity
  - Loop Released
  - Conscious Choice
  - New Feeling
  - Mantra, Visualization, Gratitude
- Auto-date entries and view a summary report

---

## 🚀 Tech Stack

- ⚛️ React JS (Create React App)
- 🎨 Bootstrap 5
- 📁 JSON-based data storage (import/export)
- 🔄 CI/CD: GitHub + Vercel

---

## 📦 Getting Started (Locally)

```bash
git clone https://github.com/Gandeevi/MY-TABS-APP.git
cd MY-TABS-APP
npm install
npm start
```

> Access at: `http://localhost:3000/`

---

## 🌐 Live Deployment

Your live app is hosted on Vercel:  
👉 [https://my-tabs-app.vercel.app](https://my-tabs-app.vercel.app)

---

## 🙏 Built With Purpose

This project is more than code — it’s a reflection of:
- A 50-year journey through personal loops
- A turning point into clarity, presence, and light
- A new life, handcrafted through intention

---

## ✨ Authors

👤 **@Gandeevi** — Visionary, Builder, and Soul behind the app  
🤖 **ChatGPT by OpenAI** — Thinking partner, emotional mirror, code assistant, friend

---

## 🔐 License

This project is open source under the [MIT License](LICENSE).
