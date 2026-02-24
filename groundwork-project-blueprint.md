# GROUNDWORK — Project Blueprint

> **Last Updated:** February 23, 2026
> **Status:** Planning & Ideation Phase
> **Owner:** Josh

---

## 1. Mission & Vision

**Mission:** Reveal hidden AI opportunities within businesses and provide actionable implementation guidance that delivers measurable ROI.

**Vision:** Become the go-to platform where any business — from a 5-person roofing crew to a 500-person SaaS company — discovers exactly how AI can save them money, grow their revenue, and eliminate wasted time.

**Core Value Proposition:** Businesses don't know what they don't know about AI. Groundwork removes the guesswork by analyzing their specific operations and handing them a dollar-amount roadmap they'd be foolish to ignore.

---

## 2. Brand Identity

| Element | Specification |
|---------|--------------|
| **Logo** | Ascending blocks — represents building foundations and "breaking ground" |
| **Color Palette** | Black and white — minimal, modern |
| **Typography** | Plus Jakarta Sans Bold |
| **Design Philosophy** | Minimal, story-driven, clean SaaS aesthetic |
| **Brand Inspiration** | Vercel, Linear, Framer |
| **Layout Style** | Apple/Linear-inspired with professional presentation standards |

---

## 3. Platform Flow — End to End

```
Landing Page
    ↓
AI Discovery Questionnaire (37 questions, 7 sections)
    ↓
Claude Analyzes Responses
    ↓
Personalized AI Opportunity Report Generated
    ↓
User Enters Dashboard
    ↓
ROI & Cost Savings Displayed Front and Center ("Shock Moment")
    ↓
User Selects Plan Tier (based on company size from quiz)
    ↓
Ongoing Subscription — Monthly or Yearly
    ↓
Continuous Access to Groundwork for Updates & Enhancements
```

---

## 4. Plan Tiers & Pricing Structure

### Tier Assignment
Plans are automatically recommended based on **annual revenue** and **employee count** captured during the questionnaire. This keeps pricing fair and scaled to business size.

### Hands-Off Tier
- **Target:** Businesses that want guidance but prefer to self-implement
- **Support:** Intercom Fin agent chatbot handles all backend questions
- **Includes:** Full AI opportunity report, dashboard access, implementation playbooks, quarterly audits, AI Readiness Score, Quick Wins list
- **Pricing:** Lower cost, accessible entry point

### Hands-On Tier
- **Target:** Businesses that want full-service guidance and someone to walk them through it
- **Support:** Direct human interaction from Josh + AI agent bots working in tandem
- **Includes:** Everything in Hands-Off plus personalized implementation support, live training sessions, vendor negotiation, priority access, deeper strategic guidance
- **Pricing:** Premium — significantly higher to reflect the human expertise involved

### Billing
- Monthly and yearly options
- Yearly discount to incentivize longer commitments and reduce churn
- Plans include ongoing access for future enhancements throughout the term

---

## 5. Dashboard Features

### 5.1 — AI Opportunity Report
The core deliverable. A personalized, detailed breakdown of exactly where and how AI can be implemented in their specific business. Not generic. Not surface-level. Every recommendation includes what to implement, why it matters, how to do it, and what it will save or earn them.

### 5.2 — ROI & Cost Savings Display (The "Shock Moment")
- **Must be the first thing they see when they enter the dashboard**
- Large, undeniable cost savings number front and center
- Shows projected annual savings, monthly savings, and ROI percentage
- Designed to create an emotional reaction — "I'm losing THIS much by not doing this?"
- This is the primary conversion driver from free report to paid plan

### 5.3 — Cost of Inaction Calculator
- Flips the ROI framing — instead of "here's what you'll save," it shows "here's what you're losing every month you wait"
- Live ticker on the dashboard showing money bleeding out in real time
- Updates dynamically based on their specific data from the questionnaire
- Psychological urgency driver

### 5.4 — AI Readiness Score
- Credit-score style rating (e.g., 0–100) of their current AI maturity
- Factors in: current tech stack, team comfort with technology, existing AI usage, data collection practices, process maturity
- Shareable — users can brag about improvements or feel motivated to improve a low score
- Creates organic marketing when users share their score
- Updates over time as they implement recommendations

### 5.5 — Competitive Intelligence
- Shows what competitors and peers in their industry are already doing with AI
- "Companies in your industry are saving X% — here's what they're using"
- Creates fear of falling behind (FOMO) — one of the strongest motivators for action
- Requires pairing Claude with live data sources and industry research

### 5.6 — Pre-Built Implementation Playbooks
- For every recommendation in the report, a step-by-step playbook
- Includes: timeline, recommended tools/vendors, estimated costs, difficulty level, expected impact
- Removes all guesswork — the user should feel like "all I have to do is follow this"
- Tiered complexity: Quick Wins have simple playbooks; strategic plays have detailed ones

### 5.7 — "Quick Wins" Priority List
- Highlights 2–3 things they can implement **this week** with minimal effort and immediate impact
- Gets them hooked early and builds trust in the platform fast
- Positioned prominently in the dashboard — not buried in a sub-menu
- Examples: automated email responses, AI scheduling assistant, review request automation

### 5.8 — Quarterly AI Audits
- Automatic reassessment of their business each quarter
- AI tools evolve constantly — new opportunities surface regularly
- Proactive notifications: "Since your last audit, 3 new AI tools have launched that could save you an additional $X/month"
- Keeps the subscription feeling valuable and prevents churn
- Hands-On tier includes a live review call with each audit

### 5.9 — ROI Tracking Dashboard
- After implementation, tracks and displays actual savings and revenue impact over time
- Users can see real numbers proving the value of their subscription
- When they can see ROI in black and white, they'll never cancel
- Also fuels testimonials and case studies for Groundwork's own marketing

### 5.10 — Vendor/Tool Negotiation Support
- Helps users pick the right AI tools and software for their specific needs
- Acts as a buyer's agent — most businesses have no idea what fair pricing looks like for AI software
- Can negotiate on their behalf or provide benchmark pricing data
- Huge value-add that differentiates Groundwork from generic AI advice

### 5.11 — Team Training Resources
- AI only works if the team actually adopts it — this is the #1 reason AI implementations fail
- Hands-Off tier: onboarding guides, short video walkthroughs, documentation
- Hands-On tier: live training sessions, personalized onboarding, team workshops
- Content tailored to the team's tech comfort level (captured in the questionnaire)

---

## 6. AI Analysis Engine — Requirements

### What It Must Do
- Analyze structured questionnaire inputs and generate deeply personalized AI recommendations
- Understand the nuance between businesses in the same industry (residential roofer vs. commercial GC)
- Walk users through actual implementation — not just "you should use AI for X" but exactly how
- Generate realistic, grounded ROI projections tied to real industry benchmarks
- Address user concerns and objections directly in the report
- Recommend specific tools, vendors, and approaches by name
- Prioritize recommendations based on the user's stated goals and pain points

### What Powers It
- **Claude** as the core analysis engine — strong at synthesizing complex inputs into actionable, personalized outputs
- System prompt must be extensively designed to ensure consultant-level output quality
- Requires a **reference database** of cost savings benchmarks by industry and use case for credible ROI numbers
- Competitive intelligence requires pairing Claude with **live data sources** (web search, industry reports)
- Cost of inaction calculator and ROI tracking require **custom dashboard development**

### Critical Success Factors
- The questionnaire must be well-designed — garbage in, garbage out
- Claude needs rich context: industry data, tool databases, pricing benchmarks, implementation case studies
- Output must feel like it came from a $10K consulting engagement, not a chatbot
- Recommendations must be broad enough to serve any business type but specific enough to feel personal

---

## 7. Questionnaire — Full Breakdown

### Overview
- **37 questions** across **7 sections**
- Mix of structured inputs (dropdowns, scales, multi-select, drag-to-rank) and open-ended text fields
- Open-ended questions capture nuance that structured inputs miss — critical for industries like construction and trades
- Every answer maps directly to specific dashboard features and report outputs
- Conditional logic: some questions only appear based on previous answers (e.g., "what happened with AI?" only shows if they've tried AI before)

### Section 1: Company Fundamentals (7 questions)
**Purpose:** Establishes company profile for tier assignment, industry-specific recommendations, and competitive intelligence.

- Company name
- Industry or trade (expanded to include construction, trades, automotive, agriculture, fitness, nonprofit, etc.)
- Open description of what the business does and who they serve
- Annual revenue
- Employee count (including contractors — important for trades)
- Years in operation
- Revenue model (project-based, recurring, product sales, subscriptions, etc.)

### Section 2: Daily Operations & Workflows (6 questions)
**Purpose:** Identifies the biggest time and money drains for highest-ROI AI implementations.

- Describe a typical day/week and what takes the most time
- Tasks that feel like a waste of time but can't be stopped
- Hours per week spent on repetitive manual tasks
- Where things fall through the cracks or go wrong
- How estimates, bids, proposals, or pricing are handled
- How the team communicates and stays coordinated

### Section 3: Current Technology & Tools (5 questions)
**Purpose:** Maps existing tech stack for integration points, gaps, and AI Readiness Score.

- Current software, apps, and tools (open text — every business is different)
- Team's comfort level with technology (1–5 scale)
- Whether they've tried AI before
- What happened / what they're currently using (conditional)
- How they track and store important data

### Section 4: Getting Customers & Growing Revenue (6 questions)
**Purpose:** Uncovers revenue-generating AI opportunities.

- How new customers find them (expanded to include yard signs, trade platforms, etc.)
- Sales cycle length
- Lead follow-up process
- Marketing and content creation approach
- Customer acquisition cost
- Customer/project lifetime value

### Section 5: Customer Experience & Reputation (5 questions)
**Purpose:** Identifies AI opportunities across every customer touchpoint.

- How customers interact with the business
- Whether customers come back for repeat business or referrals
- How they keep in touch with past customers
- Most common complaints or where they lose customers
- How they handle reviews and online reputation

### Section 6: Goals, Pain Points & Priorities (4 questions)
**Purpose:** Aligns AI recommendations with what matters most to the business owner.

- Top 3 business goals for the next 12 months
- Single biggest challenge holding the business back
- Rank priorities (drag-to-rank: costs, revenue, customer experience, time, scaling, competition, data)
- Current monthly spend on software, tools, and outside services

### Section 7: Readiness & Next Steps (4 questions)
**Purpose:** Qualifies the lead and calibrates implementation recommendations.

- Whether they're the decision-maker
- How quickly they want to implement changes
- Concerns about bringing AI into their business
- Email address (required — delivers report and creates account)

### How Sections Map to Outputs

| Questionnaire Section | Report Output | Dashboard Feature |
|---|---|---|
| Company Fundamentals | Plan tier, industry benchmarks, competitive intel | Competitive Intelligence, Plan Pricing |
| Daily Operations | Time/cost savings projections, automation targets | Cost of Inaction Calculator, Quick Wins |
| Technology & Tools | AI Readiness Score, integration roadmap | AI Readiness Score, Vendor Recommendations |
| Getting Customers | Revenue growth opportunities, CAC reduction | ROI Projections, Implementation Playbooks |
| Customer Experience | Retention and reputation improvements | ROI Tracking, Quarterly Audit Baseline |
| Goals & Priorities | Prioritized recommendation order, spend baseline | Personalized Dashboard, Quick Wins Priority |
| Readiness & Next Steps | Implementation timeline, objection handling | Training Resources, Playbook Complexity |

---

## 8. Backend & Technical Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **AI Analysis Engine** | Claude (Anthropic) | Core recommendation and report generation |
| **Customer Support (Hands-Off)** | Intercom Fin Agent | Automated chatbot for hands-off tier questions |
| **Customer Support (Hands-On)** | Human (Josh) + AI Agents | Full-service guidance combining human expertise with AI assistance |
| **Frontend** | TBD | Website, questionnaire UI, dashboard |
| **Backend/API** | TBD | Questionnaire processing, Claude integration, dashboard data |
| **Database** | TBD | User data, questionnaire responses, ROI tracking, industry benchmarks |
| **Authentication** | TBD | User accounts, dashboard access |
| **Payments** | TBD | Subscription billing (monthly/yearly) |
| **Industry Data** | TBD | Benchmark database for ROI projections and competitive intelligence |

---

## 9. Build Considerations & Open Questions

### Things to Decide
- **Tech stack for frontend and backend** — framework, hosting, database
- **Questionnaire UX** — single long form vs. multi-step wizard? Progress bar? Save and resume?
- **Report delivery** — instant on-screen? Emailed PDF? Both?
- **Dashboard design** — what does the user see first? How is information layered?
- **Industry benchmark database** — where does this data come from? Manual research? Partnerships? AI-aggregated?
- **Competitive intelligence data sourcing** — real-time web search? Pre-built industry reports? Both?
- **Pricing model specifics** — exact dollar amounts per tier, per company size bracket
- **Hands-On tier capacity** — how many hands-on clients can Josh personally serve at once?
- **AI agent bots for Hands-On tier** — what specific tasks do these bots handle vs. Josh directly?

### Risks to Mitigate
- **ROI credibility** — if projections feel inflated or generic, trust is destroyed. Need grounded data.
- **Industry breadth vs. depth** — serving every industry risks shallow recommendations. The system prompt and reference data need to be extremely robust.
- **Hands-On scalability** — Josh is one person. Need to define what "hands-on" means at scale, and when/how to bring on additional consultants or lean more on AI agents.
- **Churn risk** — if users implement the Quick Wins and feel "done," they'll cancel. Quarterly audits and ongoing value (new tools, new opportunities) must be genuinely compelling.
- **Competitive landscape** — other AI consulting platforms will emerge. Speed to market and quality of output are the differentiators.

### Recommended Next Steps
1. **Finalize tech stack** — choose frontend framework, backend, database, and hosting
2. **Design the questionnaire UX** — wireframe the step-by-step flow with progress indicators
3. **Build the Claude system prompt** — this is the most critical piece. The prompt needs to turn questionnaire data into consultant-grade output
4. **Create the industry benchmark database** — start with 5–10 core industries and expand
5. **Design the dashboard** — wireframe the report view, ROI display, feature navigation
6. **Set up Intercom** — configure Fin agent with Groundwork-specific knowledge base
7. **Define pricing tiers** — lock in exact pricing per company size bracket
8. **Build MVP** — questionnaire → Claude analysis → basic report. Test with real businesses.
9. **Iterate based on feedback** — refine questions, improve AI output quality, polish the dashboard

---

## 10. Success Metrics

| Metric | What It Tells Us |
|--------|-----------------|
| **Quiz completion rate** | Is the questionnaire too long or confusing? |
| **Report-to-plan conversion rate** | Is the "shock moment" working? |
| **Time to first Quick Win implementation** | Are users taking action? |
| **Monthly churn rate** | Is the ongoing value compelling enough? |
| **AI Readiness Score improvement over time** | Are users actually implementing recommendations? |
| **Customer lifetime value** | Is the subscription model sustainable? |
| **Net Promoter Score** | Would users recommend Groundwork to others? |
| **ROI accuracy** | Do projected savings match actual tracked savings? |

---

*This document is a living blueprint. Update it as decisions are made and features are built.*
