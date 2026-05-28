# GMC One — Product Requirements Document

> **Status:** Draft v1. Phase 1 (MVP) specified in depth; later phases summarised. Open decisions flagged inline.
> **Last updated:** May 2026

---

## 1. Overview

GMC One is a mobile app that brings everything an owner of a 1973–1978 GMC Motorhome needs into one place: maintenance tracking, plain-English repair guides, a trusted parts marketplace, an owner community, and trip tools built for these specific coaches.

The defining constraint of this product is its audience. Most owners are aged 60–80+ and many are not comfortable with modern apps. Every requirement in this document is subordinate to one rule: **if a feature is powerful but confusing to a 72-year-old, it is wrong.** Clarity beats capability, always.

### 1.1 Goals

1. Replace the scattered shoebox of receipts, forum bookmarks, and half-remembered service dates with one reliable record per coach.
2. Help owners do — or confidently understand — common repairs themselves.
3. Connect owners to each other and to trustworthy parts, without exposing them to fraud.
4. Be genuinely usable by someone who has never enjoyed using an app before.

### 1.2 Non-goals (for now)

- Not a general classic-vehicle app. GMC 1973–78 only, until proven.
- Not a social network. Community serves the coaches, not engagement metrics.
- Not a payments company. (See §6 on the marketplace decision.)

### 1.3 Success metrics

| Metric | Phase 1 target | Why it matters |
|--------|---------------|----------------|
| Onboarding completion (start → first vehicle saved) | ≥ 80% | The 60+ drop-off risk is the whole ballgame |
| Users who set at least one maintenance reminder | ≥ 60% | Proves the core value landed |
| Logbook entries per active user per month | ≥ 2 | The habit we're building |
| 30-day retention | ≥ 40% | Honest signal the app is wanted |
| Repair guide opened offline at least once | tracked | Validates the offline bet |

Targets are deliberately modest; this is a small, specific community, not a growth-hacking play.

---

## 2. Target users

**Primary — the current owner (60–80+).** Owns one or two coaches, often for decades. Knows the vehicle intimately but not technology. Wants reminders, records, and help finding parts. Frustrated by tiny text, jargon, and apps that assume prior knowledge.

**Secondary:**
- *New buyer / restorer* — needs guides, community, and parts most of all.
- *Mechanic / expert owner* — a contributor, not just a consumer; the source of trustworthy content.
- *Enthusiast* — lurks, reads, occasionally buys.

Personas to be expanded in `docs/design/personas.md` (not yet written).

---

## 3. Design requirements (apply to every feature)

These are non-negotiable and cut across all tabs.

- **Type size:** Body text minimum 18pt, primary actions 20pt+. User-adjustable larger.
- **Contrast:** WCAG AA minimum; aim AAA for body text.
- **Tap targets:** Minimum 48×48pt, generously spaced. Assume imperfect dexterity.
- **Two-tap rule:** Any major function reachable in ≤2 taps from app open.
- **Language:** Plain English. Banned words include "dashboard", "feed", "sync". Use "your coaches", "what's new", "saving" instead.
- **Voice:** Voice input available on every search and text field. (Full voice search is Phase 3, but the input affordance ships early.)
- **Errors:** No error codes. Every error states what happened and what to do next, in a sentence.
- **Forgiveness:** Destructive actions confirm. Nothing important is one tap from gone.

---

## 4. Navigation

Five bottom tabs, fixed, always visible, labelled with both icon and word:

1. **My Garage** (home)
2. **Learn & Fix**
3. **Connect**
4. **Marketplace**
5. **On the Road**

The app always opens to My Garage.

---

## 5. Phase 1 — Foundation MVP (Months 1–4)

This is what gets built first. Everything here is specified to a "definition of done." Features from other tabs not listed in this section are **out of scope for Phase 1** and summarised later in §7.

### 5.1 Authentication & onboarding

The single most important flow in the app. If onboarding fails, nothing else matters.

**Requirements:**
- Sign up with email or phone number. No mandatory password complexity theatre; allow passwordless (emailed code) as the primary path to avoid password frustration.
- **Camera-guided VIN registration:** A clear, illustrated prompt — "Point your camera at your VIN plate. On most coaches it's [location with photo]." Manual entry always available as a fallback, never buried.
- **Quick Win:** Before onboarding ends, the user sets their first maintenance reminder. They leave onboarding having already received value.
- **Plain-English tour:** A short, skippable, full-screen walkthrough in conversational language — not floating tooltips.

**Definition of done:**
- A first-time user can go from app open to a saved vehicle with one reminder set, unaided, in under 5 minutes.
- Tested with at least five real users aged 65–75 before sign-off.

### 5.2 Vehicle registration (My Garage)

- Add one or more vehicles: year, model (Kingsley / Royale / Eleganza / etc.), VIN, and photos.
- Each vehicle has its own profile page — the hub everything else hangs off.
- VIN stored but **not** decoded in Phase 1 (decoder is Phase 3 — see §8 data dependency).

**Definition of done:** A user can add, edit, photograph, and delete a vehicle, and switch between multiple vehicles in ≤2 taps.

### 5.3 Maintenance scheduler & reminders

The feature that proves the app's worth.

**Requirements:**
- Schedule services by **time** (e.g. every 6 months) and/or **mileage** (e.g. every 3,000 miles).
- Push reminders fire ahead of the due point, not on the day it's already overdue.
- **Bundled alerts:** Multiple due items arrive as one notification, never a barrage.
- **Snooze with reason:** Already done / Parts on order / Will do next month. "Already done" logs it automatically.
- **Time-of-day preference:** User picks when reminders arrive.
- Pre-loaded service templates for common GMC intervals so users aren't building schedules from scratch.

**Definition of done:** A user can create a reminder, receive it, snooze it with a reason, and mark it done (which writes to the logbook).

### 5.4 Digital logbook

- Records maintenance, repairs, trips, and costs.
- Photo attachments (receipts, before/after).
- Per-vehicle history, viewable as a simple chronological list.
- Completing a reminder writes an entry automatically.

**Definition of done:** A user can add a dated entry with notes, cost, and a photo, and see the full history for a vehicle.

### 5.5 Core repair guides (offline)

- A starter set of step-by-step guides for the most common jobs (target: ~50 at launch, sourced via club/expert partnership — see §8).
- Each guide tagged by skill level: Beginner / Intermediate / Expert.
- Plain language, large photos, numbered steps.
- **Fully available offline** once the app has been opened online at least once.

**Definition of done:** A user with no internet connection can open, read, and navigate a downloaded repair guide.

### 5.6 Basic community

- A simple, chronological list of owner posts (a "what's new" — never called a "feed").
- Post text and photos; comment on posts.
- Read-only when offline.
- Moderation tooling for at least one admin from day one.

**Definition of done:** A user can post, view others' posts, and comment. Out of scope for Phase 1: private messaging, Q&A tagging, owner map (all Phase 2).

### 5.7 Simple parts listings

Deliberately minimal in Phase 1. **No payments, no escrow, no transactions** — see the marketplace decision in §6.

- Users can post a part for sale: photos, description, condition grade (NOS / Excellent / Good / Fair / As-is), asking price, and a contact method.
- Users can browse and search listings.
- Contact happens off-platform (the buyer messages the seller); the app brokers no money in Phase 1.

**Definition of done:** A user can post a listing with a photo and condition grade, and browse others' listings.

### 5.8 Offline mode

- Available offline: repair guides, all checklists, the user's own logbook (their full history, not a 30-day window).
- Read-only offline: community posts last loaded.
- Not available offline: marketplace.
- A clear, plain indicator tells the user when they're offline and what still works.

> **Change from original spec:** the original capped offline logbook at "last 30 days." For a community that takes six-week cross-country trips, that's the wrong limit. Phase 1 caches the user's *entire own* logbook, since it's their data and not large.

**Definition of done:** With the device in airplane mode, guides, checklists, and the user's full logbook are fully usable, and the offline state is clearly signalled.

---

## 6. Open decision: the marketplace

This is the highest-risk, highest-liability part of the product, and the choice shapes cost, timeline, and legal exposure. It is **not decided** and is recorded here for a deliberate decision before Phase 2.

**Phase 1 takes no risk:** listings are informational only; no money moves through the app.

**The Phase 2+ options:**

| Option | Pros | Cons |
|--------|------|------|
| **A. Full native escrow + payments** (original spec) | Most trust, most control, commission revenue | Expensive to build, payments are regulated, fraud against elderly users is a reputational catastrophe, overkill for a few thousand users |
| **B. Listings + hand-off to PayPal Goods & Services** | Buyer protection comes free from PayPal; near-zero build cost; familiar to older users | No commission revenue from the transaction itself; less "in-app" polish |
| **C. Defer marketplace past Phase 2** | Focus engineering on the features that drove people to install | Delays a feature owners explicitly want |

**Recommendation (non-binding):** Option B. It delivers the trust the audience needs by leaning on an institution they already know, at a fraction of the cost and risk of building payments. Native escrow is hard to justify economically against a market of ~9,000–12,000 coaches. Revisit native payments only if marketplace volume ever proves it worthwhile.

**Decision owner:** Dejai. **Needed by:** start of Phase 2 planning.

---

## 7. Open decision: the AI repair assistant

Slated for Phase 4 in the original plan. Recorded here because it carries real-world safety liability.

A GMC Motorhome is a ~6-ton vehicle with brakes, steering, fuel, and onboard propane. Wrong AI advice on any of those systems can hurt someone. This is categorically different from advising on a stuck glovebox.

**The options:**

| Option | Notes |
|--------|-------|
| **A. Keep, with hard guardrails** | Heavy disclaimers, sourcing from verified guides only, confidence limits |
| **B. Keep, but never touch safety-critical systems** | Assistant explicitly refuses brakes / steering / fuel / propane and routes those to a verified expert or guide |
| **C. Cut entirely** | Lowest risk; relies on human experts and curated guides |

**Recommendation (non-binding):** Option B at minimum, possibly C. If kept, the assistant must hard-decline safety-critical systems, never improvise a procedure, and only surface content a verified expert has reviewed. This decision can wait until Phase 4 but the guardrail principle should be agreed early so it isn't bolted on late.

**Decision owner:** Dejai. **Needed by:** Phase 4 planning. Guardrail principle: agree now.

---

## 8. Data-source dependencies (must resolve before committing)

Several planned features are really data-acquisition problems wearing a feature costume. None should be promised to users until a source is identified.

| Feature | Phase | Data needed | Status |
|---------|-------|-------------|--------|
| VIN decoder + build sheet lookup | 3 | Original GMC build/VIN data for 1973–78 | **No source identified** |
| Recall & TSB tracker | 1–2 (deferred) | Recall/TSB records for these models | **No source identified** |
| Estimated resale value | 1 (deferred) | Reliable classic-coach pricing data | **No source identified** |
| Parts price history | 4 | Historical sale prices | Only exists if the marketplace generates it |
| Core repair guides (~50) | 1 | Verified, accurate guides | **Depends on club/expert partnership** |
| Paint code / trim reference | 2 | Factory colour/trim data by year | **No source identified** |

**Implication:** Repair-guide sourcing is on the Phase 1 critical path — without it, the MVP's flagship feature is empty. The club partnership (see §10) is therefore not just marketing; it's a build dependency.

---

## 9. Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| 60+ onboarding drop-off | High | Paper-prototype test with real 65–75 users *before* code; Quick Win in onboarding |
| Community cold-start (no users → no value) | High | Pre-seed via club partnership before launch (target 200 founding members) |
| Repair-guide accuracy | High | Verified-expert review; skill-level tagging; never publish unreviewed safety content |
| No repair-guide source by Phase 1 | High | Treat club partnership as a build dependency, not marketing |
| Marketplace fraud against elderly users | High | Phase 1 brokers no money; lean on PayPal protection in Phase 2 (pending §6) |
| Small total market (~9k–12k coaches) | Medium | Keep build lean; resist features the market can't sustain; expansion path later |
| AI assistant safety liability | Medium–High | Guardrails per §7; never touch safety-critical systems unreviewed |

---

## 10. Pre-launch: the club partnership

The cold-start problem and the repair-guide gap have the same solution: partner with the GMC Motorhome Club and active owner groups *before* launch.

- Seed with ~200 founding members, ~50 reviewed repair guides, and a set of starter listings.
- Offer founding members a lifetime premium badge.
- This is on the critical path for Phase 1, not a Phase 2 nicety.

---

## 11. Build phases (summary)

Phase 1 is specified above. Later phases are directional and will each get their own detailed spec before work begins.

- **Phase 1 — Foundation MVP (M1–4):** §5 above.
- **Phase 2 — Community & Trust (M5–8):** Owner map, events/rallies, verified expert directory, private messaging, searchable tagged Q&A, marketplace trust model (per §6), club chapter affiliation.
- **Phase 3 — Intelligence Layer (M9–14):** Symptom checker (decision tree), VIN decoder (pending data), full voice search, coach health score, curated video library, trip planner + campgrounds, service-history export.
- **Phase 4 — Scale & Monetise (M15–20):** Premium subscription, AI repair assistant (per §7), marketplace commission (if Option A chosen), price history, restoration showcase, partnership integrations.

---

## 12. Monetisation (directional)

- **Freemium:** Core features — vehicle records, reminders, logbook, guides, community, listings — stay free. Premium adds advanced reminders, marketplace priority, ad-free use, and export tools.
- **Marketplace:** Commission only if native payments are chosen (§6); none under the PayPal hand-off model.
- **Sponsorships:** GMC parts specialists.
- **Club partnerships.**

> The plain-English pitch promises a "free app." The free tier must genuinely deliver that promise — records, reminders, guides, community — or early reviews from this tight-knit community will punish the product. Premium is a convenience layer, not a hostage situation.

---

## 13. Open questions

- Final marketplace model (§6).
- AI assistant scope and guardrails (§7).
- Repair-guide sourcing agreement (§8, §10).
- Which exact ~50 guides ship at launch.
- iOS + Android both at launch, or one first?
- Personas — to be written into `docs/design/personas.md`.

---

*This is a living document. As decisions in §6, §7, and §8 are resolved, fold them into the body and note the change.*
