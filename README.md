# GMC One

**The complete one-stop companion for owners of 1973–1978 GMC Motorhomes.**

GMC One brings everything an owner of a classic GMC Motorhome (Kingsley, Royale, Eleganza, and the rest of the 1973–78 coaches) needs into a single, easy-to-use mobile app — maintenance tracking, plain-English repair guides, a trusted parts marketplace, an owner community, and trip planning tools built for these specific vehicles.

It is designed first and foremost for the people who actually own these coaches: a community that skews 60–80+, often not especially tech-savvy, and deeply knowledgeable about their machines. Every design decision favours clarity over cleverness.

---

## Who it's for

- **Primary:** Current owners, aged 60–80+
- **Secondary:** New buyers, restorers, mechanics, and enthusiasts

## Design principles

- **Senior-friendly first** — large fonts, high contrast, big tap targets, plain language
- **Two taps to anywhere** — any major function is reachable in two taps or fewer
- **Voice everywhere** — voice input and search available throughout
- **Works on the road** — strong offline support for guides, checklists, and logs
- **Warm and familiar** — a retro-modern look inspired by the coaches themselves

---

## What's inside (five tabs)

1. **My Garage** — Your vehicles, digital logbook, health score, document vault, and reminders.
2. **Learn & Fix** — Maintenance scheduler, checklists, a guided symptom checker, step-by-step repair guides, manuals, and torque/fluid references.
3. **Connect** — Owner map, events and rallies, a searchable Q&A, expert directory, and mentor matching.
4. **Marketplace** — Buy and sell parts and coaches, with condition grading, compatibility checks, and seller trust tools.
5. **On the Road** — Trip planner with GMC-friendly campgrounds, bridge/weight alerts, propane-aware fuel stops, and roadside help.

---

## Roadmap

| Phase | Focus | Timeline |
|-------|-------|----------|
| **1 — Foundation MVP** | Onboarding, vehicle registration, maintenance scheduler, core offline repair guides, logbook, basic community, simple listings | Months 1–4 |
| **2 — Community & Trust** | Owner map, events, verified experts, messaging, searchable Q&A, marketplace trust system | Months 5–8 |
| **3 — Intelligence Layer** | Symptom checker, VIN decoder, voice search, health score, video library, trip planner | Months 9–14 |
| **4 — Scale & Monetise** | Premium subscription, AI repair assistant (beta), marketplace commission, partnerships | Months 15–20 |

See [`docs/PRD.md`](docs/PRD.md) for the full product requirements (to come).

---

## Tech stack

- **Mobile app:** React Native (iOS + Android from one codebase)
- **Backend:** API server (Node.js)
- **License:** MIT

> Stack is provisional and may change as Phase 1 scope is finalised.

---

## Project structure

```
gmc-one/
├── app/                  # React Native mobile app
│   ├── src/
│   │   ├── screens/      # One folder per tab
│   │   ├── components/   # Shared UI components
│   │   ├── navigation/   # Tab & stack navigation
│   │   ├── services/     # API calls, notifications
│   │   ├── store/        # State management
│   │   └── assets/       # Images, fonts, icons
├── backend/              # API server
│   ├── routes/
│   ├── models/
│   └── controllers/
├── docs/                 # Design specs, PRD, guides
│   ├── PRD.md
│   └── design/
├── .github/
│   └── ISSUE_TEMPLATE/
└── README.md
```

---

## Getting started

> Setup instructions will firm up once the Phase 1 stack is scaffolded. For now:

```bash
git clone https://github.com/DJFlex/gmc-one.git
cd gmc-one
```

---

## Contributing

This is an early-stage private project. If you're a GMC owner, mechanic, or club member interested in helping shape it — especially with repair-guide accuracy or testing with older users — you're exactly who we want to hear from.

## License

[MIT](LICENSE)
