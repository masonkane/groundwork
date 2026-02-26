"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoFull } from "@/components/Logo";

/* ── Animation helpers (from homepage) ──────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ScaleReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "scale(1)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "scale(0.92)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = `${prefix}${Math.round(eased * value).toLocaleString()}${suffix}`;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix]);
  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ── Types ─────────────────────────────────────── */

interface PlaybookAnswers {
  industry?: string;
  teamSize?: string;
  painPoints?: string[];
  goal?: string;
}

/* ── Personalization mapping ───────────────────── */

const painPointToRanks: Record<string, number[]> = {
  "Lead follow-up is slow or inconsistent": [1, 7],
  "Customer support takes too much time": [2, 9],
  "Invoicing & documents are manual": [3],
  "Reporting eats hours every week": [4],
  "Scheduling is a mess": [5],
  "Content creation is a bottleneck": [6],
  "Don't know which leads to prioritize": [7],
  "Inventory/supply issues": [8],
  "Hard to track customer sentiment": [9],
  "Hiring takes forever": [10],
};

const toolUrls: Record<string, string> = {
  "HubSpot AI": "https://www.hubspot.com",
  "Instantly.ai": "https://instantly.ai",
  "Apollo.io": "https://www.apollo.io",
  "Intercom Fin": "https://www.intercom.com",
  "Zendesk AI": "https://www.zendesk.com",
  "Drift": "https://www.drift.com",
  "Docsumo": "https://www.docsumo.com",
  "Rossum": "https://rossum.ai",
  "Stampli": "https://www.stampli.com",
  "Coefficient": "https://coefficient.io",
  "Rows.com": "https://rows.com",
  "Equals": "https://equals.com",
  "Motion": "https://www.usemotion.com",
  "Reclaim.ai": "https://reclaim.ai",
  "Calendly AI": "https://calendly.com",
  "Jasper": "https://www.jasper.ai",
  "Copy.ai": "https://www.copy.ai",
  "Writer.com": "https://writer.com",
  "Madkudu": "https://www.madkudu.com",
  "6sense": "https://6sense.com",
  "Inventory Planner": "https://inventory-planner.com",
  "Flieber": "https://www.flieber.com",
  "Cogsy": "https://cogsy.com",
  "MonkeyLearn": "https://monkeylearn.com",
  "Brandwatch": "https://www.brandwatch.com",
  "Sprout Social": "https://sproutsocial.com",
  "Lever": "https://www.lever.co",
  "Greenhouse AI": "https://www.greenhouse.com",
  "HireVue": "https://www.hirevue.com",
};

const painPointToKey: Record<string, string> = {
  "Lead follow-up is slow or inconsistent": "lead-followup",
  "Customer support takes too much time": "support",
  "Invoicing & documents are manual": "invoicing",
  "Reporting eats hours every week": "reporting",
  "Scheduling is a mess": "scheduling",
  "Content creation is a bottleneck": "content",
  "Don\u2019t know which leads to prioritize": "lead-scoring",
  "Don't know which leads to prioritize": "lead-scoring",
  "Inventory/supply issues": "inventory",
  "Hard to track customer sentiment": "sentiment",
  "Hiring takes forever": "hiring",
};

/* Map questionnaire goal labels → goalFraming keys */
const goalToKey: Record<string, string> = {
  "Cut costs and save money": "cut-costs",
  "Save time on repetitive tasks": "save-time",
  "Win more customers": "win-customers",
  "Scale without hiring": "scale-without-hiring",
  "Get ahead of competitors": "get-ahead",
};

/* Map questionnaire industry labels → industryContext keys */
const industryToKey: Record<string, string> = {
  "Healthcare": "Healthcare & Dental",
  "E-Commerce & Retail": "Retail & E-Commerce",
  "Professional Services": "Professional Services & Consulting",
  "Hospitality": "Restaurant & Food Service",
  "Finance & Insurance": "Legal & Accounting",
};

const industryContext: Record<string, Record<number, string>> = {
  "Construction & Trades": {
    1: "Subcontractors and GCs who respond to bid requests within minutes win 3x more projects. AI follow-up is your biggest quick win.",
    3: "Construction invoicing involves change orders, retainage, and AIA billing formats. AI document processing handles these complexities automatically.",
    5: "Coordinating crews, equipment, and inspections across job sites makes scheduling your biggest time sink. AI eliminates the chaos.",
    8: "Material costs fluctuate 15-30% seasonally. AI forecasting helps you buy at the right time and avoid project delays from stockouts.",
    4: "Daily logs, progress reports, and compliance documentation eat hours. Automate them so your PMs stay on the job site.",
    6: "Before/after project photos + AI-written case studies generate 5x more leads than generic ads for trades businesses.",
  },
  "Home Services (HVAC, Plumbing, Electrical)": {
    1: "Homeowners call 2-3 companies and go with whoever responds first. AI follow-up within 60 seconds captures the job before your competition even picks up the phone.",
    2: "Appointment confirmations, warranty questions, and service estimates make up 75% of your calls. A chatbot handles these while your techs stay on the job.",
    5: "Route optimization + AI scheduling fills drive-time gaps with nearby jobs and reduces windshield time by 25-35%.",
    9: "Google Reviews are your #1 lead source. AI sentiment monitoring lets you catch and respond to negative reviews within hours, not weeks.",
    6: "Seasonal content (winterization tips, AC prep guides) published consistently generates inbound leads year-round. AI makes it effortless to maintain.",
    4: "Automated end-of-day reports with job completion status, parts used, and revenue per truck give you visibility without chasing techs for updates.",
  },
  "Real Estate": {
    1: "Leads from Zillow, Realtor.com, and open houses go cold within 10 minutes. AI instant response keeps you in the conversation while you are showing a property.",
    7: "Not all leads are ready to buy. AI scoring separates tire-kickers from serious buyers based on search behavior, price range, and engagement patterns.",
    5: "Showing coordination across multiple agents, properties, and buyer schedules is a nightmare. AI scheduling handles the logistics automatically.",
    6: "AI-generated property descriptions, neighborhood guides, and market updates keep your brand visible without spending hours writing content.",
    9: "Client reviews on Google and Zillow directly impact your referral pipeline. AI monitoring ensures you respond promptly and amplify positive experiences.",
    4: "Weekly market reports, CMA preparation, and pipeline updates can be auto-generated from MLS data and your CRM, saving 6-8 hours per week.",
  },
  "Healthcare & Dental": {
    2: "Appointment scheduling, insurance verification, and prescription refill requests account for 80% of patient calls. AI handles them 24/7 without adding front desk staff.",
    5: "No-shows cost the average practice $200 per empty slot. AI scheduling with smart reminders and easy rescheduling reduces no-shows by 40-60%.",
    1: "New patient inquiries that go unanswered for more than 30 minutes have a 90% drop-off rate. AI follow-up captures them instantly.",
    3: "Insurance claims, EOBs, and patient billing involve complex document processing. AI extracts and validates data 10x faster than manual entry.",
    9: "Patient satisfaction scores directly impact reimbursement rates and online reputation. AI sentiment tracking catches issues before they become patterns.",
    4: "Clinical reporting, compliance documentation, and practice analytics consume staff time. Automate the routine reports so your team focuses on patient care.",
  },
  "Legal & Accounting": {
    1: "Potential clients researching attorneys contact 3-5 firms. The first to respond with a thoughtful, relevant reply wins the consultation 67% of the time.",
    3: "Engagement letters, billing statements, and document intake are high-volume, repetitive processes. AI reduces processing time by 85% while improving accuracy.",
    4: "Client billing reports, matter status updates, and financial dashboards consume 10+ hours per week for most firms. AI generates them automatically.",
    6: "Thought leadership content (tax tips, legal updates, compliance guides) establishes expertise and drives inbound leads. AI helps you publish consistently.",
    7: "Not every consultation becomes a case. AI scoring based on practice area fit, case value, and engagement signals helps prioritize high-value prospects.",
    10: "Hiring qualified paralegals and associates is competitive. AI screening reduces time-to-hire by 40% while improving candidate quality.",
  },
  "Restaurant & Food Service": {
    2: "Reservation changes, menu questions, hours, and catering inquiries make up 85% of calls. A chatbot handles them so your staff focuses on guests.",
    5: "Shift scheduling across multiple positions with varying availability, labor law compliance, and last-minute changes is uniquely painful. AI solves this.",
    8: "Food cost is your biggest controllable expense. AI forecasting reduces waste by 20-30% by predicting demand based on weather, events, and historical patterns.",
    9: "One bad Yelp review can cost a restaurant $8,000 in lost revenue. Real-time sentiment alerts let you address issues before they go public.",
    6: "Social media content (daily specials, behind-the-scenes, seasonal menus) drives foot traffic. AI helps you post consistently without pulling staff from the kitchen.",
    1: "Catering leads and private event inquiries are high-value. AI follow-up ensures every inquiry gets a prompt, professional response with menu options and pricing.",
  },
  "Retail & E-Commerce": {
    1: "Cart abandonment follow-up within 30 minutes recovers 15-25% of lost sales. AI sends personalized recovery emails based on the exact items left behind.",
    2: "Order status, return policies, and sizing questions make up 70% of customer contacts. AI chatbots handle these instantly, even at 2am during flash sales.",
    8: "Overstocking ties up cash; stockouts lose sales. AI demand forecasting across channels reduces both by 30-40%, especially during seasonal peaks.",
    9: "Product reviews and social mentions directly influence purchase decisions. AI sentiment analysis identifies trending complaints before they impact sales.",
    6: "Product descriptions, email campaigns, and social content at scale are impossible without AI. Generate hundreds of unique product descriptions in hours, not weeks.",
    7: "Customer lifetime value prediction helps you spend marketing dollars on the 20% of customers who drive 80% of revenue.",
  },
  "Professional Services & Consulting": {
    1: "B2B sales cycles start with responsiveness. Firms that respond to RFPs and inquiries within 1 hour are 7x more likely to win the engagement.",
    4: "Client reports, utilization dashboards, and project status updates consume 15-20% of consultant time. AI generates them from your project management and billing data.",
    6: "Whitepapers, case studies, and LinkedIn thought leadership drive inbound leads for consulting firms. AI helps your experts publish 5x more content.",
    7: "Lead scoring based on company size, budget signals, and engagement patterns helps your BD team focus on winnable opportunities.",
    5: "Coordinating client meetings, team standups, and project milestones across time zones is a scheduling nightmare. AI handles the complexity.",
    10: "Attracting top talent is existential for services firms. AI screening identifies candidates who match your culture and skill requirements faster.",
  },
  "Fitness & Wellness": {
    1: "People searching for a gym or trainer decide within 24 hours. AI follow-up with a free trial offer within 5 minutes converts 3x more inquiries into members.",
    2: "Class schedules, membership questions, and billing inquiries are repetitive. A chatbot handles them 24/7 so your staff focuses on member experience.",
    5: "Class scheduling, trainer availability, and room booking across multiple locations is complex. AI scheduling optimizes utilization and reduces conflicts.",
    9: "Google Reviews and social media presence are the #1 driver of new members. AI monitors and helps you respond to every review promptly.",
    6: "Workout tips, nutrition content, and success stories keep members engaged and attract new ones. AI helps you maintain a consistent content calendar.",
    7: "Membership cancellation prevention starts with identifying at-risk members. AI analyzes attendance patterns and engagement to flag members before they leave.",
  },
  "Auto Repair & Dealerships": {
    1: "Car owners calling for service appointments choose the shop that responds first. AI follow-up with instant online booking captures the appointment before they call your competitor.",
    2: "Service status updates, parts availability, and warranty coverage questions drive 60% of phone volume. AI chatbots handle them while your advisors sell.",
    5: "Bay scheduling, loaner car coordination, and technician assignments are juggling acts. AI scheduling maximizes bay utilization and reduces customer wait times.",
    8: "Parts inventory across thousands of SKUs with variable demand requires AI forecasting. Reduce obsolete parts by 25% while cutting stockouts in half.",
    9: "Online reviews make or break auto shops. AI sentiment monitoring helps you respond to every review and identify recurring service issues early.",
    3: "Repair orders, warranty claims, and vendor invoices involve document-heavy processes. AI extraction speeds up processing and reduces errors.",
  },
  "Other": {
    1: "Regardless of industry, the business that responds first wins. AI lead follow-up is universally the highest-ROI implementation for any company.",
    2: "Every business has repetitive customer questions. AI chatbots handle 60-70% of them, freeing your team for higher-value work.",
    4: "Manual reporting is a hidden time drain in every industry. Automating it gives your team hours back each week for strategic work.",
    5: "Scheduling inefficiency is universal. AI scheduling tools pay for themselves within the first month through time savings alone.",
    6: "Content marketing drives growth in every industry. AI lets you produce more content without proportionally increasing costs.",
    3: "If your business processes documents, invoices, or forms, AI extraction and automation is a straightforward win with fast payback.",
  },
};

const goalFraming: Record<string, Record<number, string>> = {
  "cut-costs": {
    1: "Automated follow-up eliminates the need for dedicated sales development reps, saving $45-65K per position annually.",
    2: "Each support ticket handled by AI costs $0.10 vs. $15-25 for human agents. At scale, this is your largest cost reduction.",
    3: "Processing invoices manually costs $15-25 each. AI drops this to under $0.50, saving 95% on document processing labor.",
    4: "Every hour your team spends building reports costs $35-75 in loaded labor. AI reporting eliminates 80% of that manual effort.",
    5: "Scheduling overhead costs the average 10-person team $62K/year in lost productive time. AI reclaims most of that.",
    6: "Hiring freelance writers costs $200-500 per blog post. AI-assisted content drops your cost to $20-50 per piece with human editing.",
    7: "Sales reps waste 65% of their time on unqualified leads. AI scoring focuses their effort on deals that actually close, cutting acquisition cost by 30%.",
    8: "Excess inventory carrying costs eat 20-30% of stock value annually. AI forecasting reduces overstock by 30%, directly cutting carrying costs.",
    9: "One unresolved negative review costs an average of $8,000 in lost revenue. Early detection through AI saves multiples of the tool cost.",
    10: "A bad hire costs 30% of annual salary. AI screening reduces mis-hires by 35%, saving $15-25K per avoided bad hire.",
  },
  "save-time": {
    1: "Your sales team spends 8-12 hours per week on manual follow-up. AI reclaims that time for relationship building and closing.",
    2: "Support teams spend 70% of their time answering the same 20 questions. AI handles repetitive tickets so your team tackles complex issues.",
    3: "Manual invoice processing takes 15-25 minutes each. AI cuts this to 30 seconds, saving hundreds of hours per year.",
    4: "Finance and ops teams spend 8-12 hours per week building reports. AI auto-generates them, giving back an entire workday weekly.",
    5: "The average professional wastes 4.8 hours per week on scheduling logistics. AI eliminates virtually all of that back-and-forth.",
    6: "Creating a single blog post takes 4-6 hours from research to publish. AI cuts that to 45 minutes with human review included.",
    7: "Sales reps spend 5+ hours weekly researching which leads to call. AI scoring does this instantly, giving them more selling time.",
    8: "Manual demand planning and inventory counts consume 10+ hours weekly. AI automates the analysis so your team focuses on execution.",
    9: "Monitoring reviews across 5+ platforms manually takes hours daily. AI aggregates and alerts you in real-time with zero effort.",
    10: "Screening 200 resumes manually takes 40+ hours. AI pre-screens in minutes, cutting time-to-hire by 40%.",
  },
  "win-customers": {
    1: "The first business to respond gets the customer 78% of the time. AI instant follow-up puts you first, every time.",
    2: "Customers expect instant support. 24/7 AI chatbots mean no more missed messages or business-hours limitations that push customers to competitors.",
    3: "Faster invoicing means faster payments and a more professional client experience. Clients notice when you are organized.",
    4: "Sharing automated, polished reports with clients builds trust and positions you as data-driven. Clients stay longer with firms that prove their value.",
    5: "Frictionless scheduling removes a major client frustration point. Easy booking directly increases consultation rates and client satisfaction.",
    6: "Consistent, valuable content positions you as the industry authority. Customers choose the brand they trust most, and content builds that trust.",
    7: "Reaching the right leads with the right message at the right time dramatically improves conversion. AI ensures your best prospects get VIP treatment.",
    8: "Nothing loses customers faster than 'out of stock.' AI-optimized inventory means you always have what customers want, when they want it.",
    9: "Responding to every review quickly and professionally shows prospects you care. 89% of consumers read review responses before choosing a business.",
    10: "Faster hiring means better customer-facing teams sooner. AI helps you hire people who genuinely fit your culture and deliver better service.",
  },
  "scale-without-hiring": {
    1: "AI follow-up handles 10x more leads with zero additional headcount. Scale your pipeline without hiring more sales reps.",
    2: "An AI chatbot handles the work of 3-5 support agents. Triple your customer base without tripling your support team.",
    3: "AI invoice processing scales from 50 to 5,000 invoices per month with the same team. Growth doesn't mean more AP clerks.",
    4: "Automated reporting scales infinitely. Whether you have 5 clients or 500, the reports generate themselves.",
    5: "AI scheduling handles unlimited complexity without an office manager or scheduling coordinator. Add team members without adding overhead.",
    6: "AI content creation scales your marketing output 5-10x without hiring a content team. One editor can manage what previously required five writers.",
    7: "Lead scoring automates the work of a sales operations analyst. Your existing team works smarter, not harder.",
    8: "AI forecasting replaces the need for a dedicated demand planner. Your operations team can manage 3x more SKUs without additional hires.",
    9: "Automated sentiment monitoring does the work of a full-time social media and reputation manager across all platforms simultaneously.",
    10: "AI screening handles the resume review workload of a full-time recruiter. Your HR team can manage 3x more open roles.",
  },
  "get-ahead": {
    1: "Only 23% of SMBs use AI for lead follow-up. Implementing this now puts you in a small minority that converts dramatically more leads.",
    2: "64% of your competitors will have AI support within 2 years. Getting there first means you set customer expectations they will have to match.",
    3: "Businesses that automate AP processing reinvest the saved time into growth initiatives. Your competitors still doing it manually are falling behind.",
    4: "Companies using AI analytics make decisions 5x faster than those relying on manual reports. Speed of decision-making is a competitive advantage.",
    5: "AI scheduling adoption is still under 30% in most industries. Being the easiest company to book with is a real differentiator.",
    6: "Businesses publishing consistent AI-assisted content dominate search rankings within 6-12 months. The content moat gets harder to cross every day.",
    7: "Predictive lead scoring is the tool enterprise companies use that SMBs do not. Implementing it levels the playing field immediately.",
    8: "Supply chain disruptions hurt unprepared businesses hardest. AI forecasting gives you the visibility to adapt weeks before competitors even notice.",
    9: "Brands that respond to reviews within 24 hours are perceived as 2x more trustworthy. This perception gap widens as AI adoption increases.",
    10: "The war for talent favors fast movers. AI-powered hiring gets you top candidates before competitors even finish screening resumes.",
  },
};

/* ── Detailed implementation walkthroughs ──────── */

const detailedImplementations: Record<
  number,
  {
    prerequisites: string[];
    detailedSteps: { title: string; detail: string }[];
    timeline: string;
    pitfalls: string[];
    kpis: string[];
  }
> = {
  1: {
    prerequisites: [
      "Access to your current CRM or lead inbox",
      "List of your top 5 lead sources",
      "30 minutes for initial setup",
    ],
    detailedSteps: [
      {
        title: "Audit your current lead flow (15 min)",
        detail:
          "Open your CRM. Export last 90 days of leads. Note where they came from, average response time, and conversion rate. This is your baseline.",
      },
      {
        title: "Choose your tool (10 min)",
        detail:
          "For teams under 20: HubSpot AI ($45/mo) \u2014 best balance of features and price. For larger teams: Apollo.io ($39/mo) \u2014 better multi-channel sequences. Solo operators: Instantly.ai ($30/mo) \u2014 simplest setup.",
      },
      {
        title: "Connect your lead sources (20 min)",
        detail:
          "Integrate every channel where leads come in: website forms, email, social DMs, phone. Each lead source needs a tracking tag so you can measure which performs best.",
      },
      {
        title: "Build 5 response templates (30 min)",
        detail:
          "Create templates for: new inquiry, quote request, returning customer, referral, and cold lead. Each should feel personal \u2014 use merge fields for name, company, and inquiry type.",
      },
      {
        title: "Set up instant-response triggers (15 min)",
        detail:
          "Configure your tool to send the right template within 2 minutes of a lead arriving. Map each lead source to the right template. Test by submitting a dummy lead.",
      },
      {
        title: "Create a 5-touch follow-up sequence (20 min)",
        detail:
          "Don\u2019t stop at one email. Build a sequence: Day 0 (instant reply), Day 1 (value add), Day 3 (case study), Day 7 (check-in), Day 14 (last chance). Each email should add value, not just \u2018following up.\u2019",
      },
      {
        title: "A/B test your messaging (ongoing)",
        detail:
          "Run two versions of your initial response for 2 weeks. Test subject lines, personalization depth, and CTA style. Pick the winner and iterate.",
      },
      {
        title: "Set up lead routing rules (15 min)",
        detail:
          "Hot leads (replied, clicked, visited pricing) go straight to your sales team with context. Warm leads stay in the AI sequence. Cold leads get a slower nurture.",
      },
      {
        title: "Launch and monitor daily for week 1",
        detail:
          "Watch your response rates, open rates, and reply rates daily for the first week. Fix any template that gets below 40% open rate.",
      },
      {
        title: "Scale winning sequences to all channels",
        detail:
          "Once you\u2019ve validated what works, replicate the winning patterns across all lead sources. Set up monthly reviews to keep improving.",
      },
    ],
    timeline:
      "Week 1: Setup and first sequences live. Week 2: A/B tests running. Week 3: Optimized sequences scaled. Month 2+: Monthly reviews and refinement.",
    pitfalls: [
      "Don\u2019t use generic templates \u2014 personalization drives 2-3x better results",
      "Don\u2019t skip the A/B testing phase \u2014 your first guess is rarely the best",
      "Don\u2019t forget to set up human handoff for hot leads \u2014 AI warms them up, humans close them",
      "Don\u2019t send too many follow-ups too fast \u2014 space them out or you\u2019ll get marked as spam",
    ],
    kpis: [
      "Average lead response time (target: under 5 minutes)",
      "Email open rate (target: 45%+)",
      "Reply rate (target: 15%+)",
      "Lead-to-meeting conversion rate (target: 25%+ improvement)",
      "Cost per lead response (target: 80% reduction)",
    ],
  },
  2: {
    prerequisites: [
      "Export of last 6 months of support tickets",
      "List of your top 20 FAQ topics",
      "Access to your knowledge base or product documentation",
    ],
    detailedSteps: [
      {
        title: "Export and categorize your support history (1 hour)",
        detail:
          "Pull every support ticket from the last 6 months. Sort them by topic. You\u2019ll find that 70-80% fall into 15-20 categories. These are your chatbot\u2019s training priorities.",
      },
      {
        title: "Choose your platform (20 min)",
        detail:
          "For most businesses: Intercom Fin ($74/mo) \u2014 best AI accuracy out of the box. Budget option: Drift ($40/mo) \u2014 solid with good integrations. Enterprise: Zendesk AI ($55/mo) \u2014 if you\u2019re already on Zendesk.",
      },
      {
        title: "Build your knowledge base (2-3 hours)",
        detail:
          "Write clear, complete answers for your top 20 question categories. Include edge cases and exceptions. The quality of your knowledge base directly determines your chatbot\u2019s accuracy.",
      },
      {
        title: "Configure escalation rules (30 min)",
        detail:
          "Define exactly when the chatbot hands off to a human: billing disputes, technical issues beyond scope, angry customers (sentiment detection), and requests involving account changes.",
      },
      {
        title: "Set up your chatbot\u2019s personality (15 min)",
        detail:
          "Give it a name, tone, and guardrails. It should match your brand voice. Set boundaries \u2014 what it can and cannot promise or offer (discounts, refunds, etc.).",
      },
      {
        title: "Test with 50 real questions (1 hour)",
        detail:
          "Take 50 actual questions from your history and feed them through the chatbot. Track accuracy. Anything below 90% accuracy needs more training data.",
      },
      {
        title: "Soft launch with a feedback loop (1 week)",
        detail:
          "Deploy to 20% of your traffic. Add a \u2018Was this helpful?\u2019 button after every response. Review daily and patch wrong answers immediately.",
      },
      {
        title: "Full rollout with monitoring (ongoing)",
        detail:
          "Scale to 100% of traffic. Set up weekly accuracy reviews. Create a dashboard showing: tickets deflected, human handoffs, customer satisfaction, and resolution time.",
      },
    ],
    timeline:
      "Week 1: Knowledge base built and chatbot configured. Week 2: Testing and soft launch. Week 3: Full rollout. Month 2: Optimization based on real data.",
    pitfalls: [
      "Don\u2019t launch without thorough testing \u2014 one wrong answer can damage customer trust",
      "Don\u2019t hide the \u2018talk to a human\u2019 option \u2014 customers hate being trapped",
      "Don\u2019t set it and forget it \u2014 review weekly for the first month, then monthly",
      "Don\u2019t train it on outdated information \u2014 keep the knowledge base current",
    ],
    kpis: [
      "Ticket deflection rate (target: 60-70%)",
      "Customer satisfaction score for AI interactions (target: 85%+)",
      "Average resolution time (target: 50% reduction)",
      "Escalation rate (target: under 30%)",
      "Support cost per ticket (target: 70% reduction)",
    ],
  },
  3: {
    prerequisites: [
      "Access to your accounting software or ERP",
      "Sample of 50 recent invoices in various formats",
      "List of your approval workflow rules",
    ],
    detailedSteps: [
      {
        title: "Audit your invoice volume and process (30 min)",
        detail:
          "Count invoices per month, average processing time per invoice, and current error rate. Calculate your true cost: (time per invoice \u00d7 hourly rate \u00d7 monthly volume). This is the number you\u2019ll beat.",
      },
      {
        title: "Select your tool (15 min)",
        detail:
          "For small businesses: Docsumo ($29/mo) \u2014 best accuracy for the price. Mid-market: Stampli ($35/mo) \u2014 great approval workflows. Larger operations: Rossum ($49/mo) \u2014 handles complex multi-page invoices.",
      },
      {
        title: "Upload 50 sample invoices for training (20 min)",
        detail:
          "Upload invoices from your most common vendors. The AI needs to learn your specific invoice formats, field locations, and naming conventions.",
      },
      {
        title: "Map your data fields (15 min)",
        detail:
          "Tell the AI which fields to extract: vendor name, invoice number, date, line items, amounts, tax, total. Map these to your accounting software\u2019s fields.",
      },
      {
        title: "Configure approval workflows (20 min)",
        detail:
          "Set up routing rules: invoices under $500 auto-approve, $500-$5000 need manager approval, $5000+ need director approval. Add duplicate detection and PO matching rules.",
      },
      {
        title: "Run parallel processing for 2 weeks",
        detail:
          "Process invoices through both the AI and your manual process simultaneously. Compare results. Track accuracy rate \u2014 you need 95%+ before going live.",
      },
      {
        title: "Connect to your accounting system (30 min)",
        detail:
          "Set up the integration to automatically push approved invoices into your accounting software. Test with 10 invoices end-to-end.",
      },
      {
        title: "Go live with monitoring (ongoing)",
        detail:
          "Switch to AI-first processing. Keep a human review queue for flagged items (low confidence, new vendors, unusual amounts). Review weekly accuracy reports.",
      },
    ],
    timeline:
      "Week 1: Tool selected and training data uploaded. Week 2: Parallel processing begins. Week 3: Review accuracy and go live. Month 2: Full automation with exception handling.",
    pitfalls: [
      "Don\u2019t skip the parallel processing phase \u2014 it catches errors before they hit your books",
      "Don\u2019t forget to handle edge cases: handwritten invoices, partial deliveries, credit notes",
      "Don\u2019t overlook tax calculation variations across vendors and jurisdictions",
      "Don\u2019t remove all human oversight \u2014 keep spot-checks even after automation is stable",
    ],
    kpis: [
      "Processing time per invoice (target: 90% reduction)",
      "Error rate (target: under 2%)",
      "Cost per invoice processed (target: under $0.50)",
      "Approval cycle time (target: 70% reduction)",
      "Late payment penalties (target: zero)",
    ],
  },
  4: {
    prerequisites: [
      "List of all recurring reports and their recipients",
      "Access credentials for data sources (CRM, accounting, project management)",
      "Current report templates or examples",
    ],
    detailedSteps: [
      {
        title: "Inventory all recurring reports (20 min)",
        detail:
          "List every report you produce: weekly sales reports, monthly P&L, project status updates, team performance metrics. Note who receives each one and how often.",
      },
      {
        title: "Select your tool (15 min)",
        detail:
          "For spreadsheet-heavy teams: Coefficient ($49/mo) \u2014 pulls data directly into Google Sheets. For dashboards: Rows.com ($29/mo). For financial reporting: Equals ($39/mo) \u2014 built for finance teams.",
      },
      {
        title: "Connect your data sources (30 min)",
        detail:
          "Link your CRM, accounting software, project management tool, and any other data sources. Most tools have one-click integrations for popular platforms.",
      },
      {
        title: "Design report templates (1-2 hours)",
        detail:
          "Recreate your current reports in the AI tool. Add AI-generated summaries that highlight key trends, anomalies, and recommended actions.",
      },
      {
        title: "Set up anomaly detection (20 min)",
        detail:
          "Configure alerts for unusual patterns: revenue drops >10%, expense spikes, missed targets, customer churn increases. These turn passive reports into active intelligence.",
      },
      {
        title: "Schedule automated delivery (15 min)",
        detail:
          "Set each report to generate and deliver automatically: daily dashboards at 8am, weekly summaries on Monday, monthly reports on the 1st.",
      },
      {
        title: "Add AI narrative summaries (30 min)",
        detail:
          "Configure the AI to write plain-English summaries: \u2018Revenue is up 12% this month, driven primarily by a 23% increase in new customer acquisitions. Watch: support costs are trending 8% above budget.\u2019",
      },
      {
        title: "Train your team on self-service (30 min)",
        detail:
          "Show stakeholders how to access reports, customize views, and set their own alerts. Reduce \u2018Can you pull this data?\u2019 requests.",
      },
    ],
    timeline:
      "Week 1: Data sources connected and first templates built. Week 2: Automated scheduling live. Week 3: AI summaries and anomaly detection added. Month 2: Team trained and self-service enabled.",
    pitfalls: [
      "Don\u2019t automate bad reports \u2014 redesign them first if they\u2019re not useful",
      "Don\u2019t connect to data sources with stale or dirty data \u2014 garbage in, garbage out",
      "Don\u2019t overwhelm recipients \u2014 fewer, better reports beat more reports every time",
      "Don\u2019t skip the narrative summaries \u2014 data without context is just noise",
    ],
    kpis: [
      "Hours spent on report creation (target: 80% reduction)",
      "Report delivery timeliness (target: 100% on schedule)",
      "Stakeholder satisfaction with report quality (target: 90%+)",
      "Data-driven decisions per week (target: 2x increase)",
      "Time from data change to stakeholder awareness (target: same day)",
    ],
  },
  5: {
    prerequisites: [
      "List of all recurring meeting types and their typical durations",
      "Access to team calendars",
      "Understanding of scheduling rules (buffer times, working hours, priorities)",
    ],
    detailedSteps: [
      {
        title: "Catalog your meeting types (15 min)",
        detail:
          "List every type of meeting: client consultations, team standups, 1:1s, sales calls, project reviews. Note duration, required attendees, and frequency for each.",
      },
      {
        title: "Choose your tool (10 min)",
        detail:
          "For full team scheduling: Motion ($19/mo) \u2014 AI auto-schedules your entire day. For client bookings: Calendly AI ($16/mo) \u2014 polished client experience. For calendar optimization: Reclaim.ai ($12/mo) \u2014 best at protecting focus time.",
      },
      {
        title: "Set scheduling rules (20 min)",
        detail:
          "Define buffer times between meetings (15 min default), core working hours, meeting-free blocks (e.g., no meetings before 10am), and travel time buffers for in-person meetings.",
      },
      {
        title: "Create booking pages for external meetings (15 min)",
        detail:
          "Build client-facing booking pages with your availability, location options, and pre-meeting questionnaires. Embed them on your website and email signature.",
      },
      {
        title: "Configure team availability (20 min)",
        detail:
          "Set up team member availability, skills, and meeting type assignments. The AI should route client meetings to the right team member automatically.",
      },
      {
        title: "Integrate with your existing tools (15 min)",
        detail:
          "Connect to your CRM, video conferencing, and project management tools. Meetings should auto-create CRM activities and project tasks.",
      },
      {
        title: "Train your team on the new workflow (30 min)",
        detail:
          "Walk through the new booking flow, rescheduling process, and how to handle edge cases. Make sure everyone has the app installed.",
      },
      {
        title: "Monitor and adjust after 30 days",
        detail:
          "Review: meetings scheduled, conflicts avoided, no-show rates, and team satisfaction. Adjust buffer times and rules based on real usage patterns.",
      },
    ],
    timeline:
      "Week 1: Tool set up and rules configured. Week 2: Team trained and external booking pages live. Week 3: Full adoption. Month 2: Review and optimize based on real data.",
    pitfalls: [
      "Don\u2019t overbook \u2014 leave buffer time between meetings for prep and follow-up",
      "Don\u2019t make the booking page too complex \u2014 minimize the number of fields clients fill out",
      "Don\u2019t forget time zones \u2014 confirm time zone handling works correctly",
      "Don\u2019t skip the 30-day review \u2014 initial rules always need tuning",
    ],
    kpis: [
      "Time spent on scheduling (target: 80% reduction)",
      "Double-booking rate (target: zero)",
      "Client no-show rate (target: 50% reduction)",
      "Meeting start-time punctuality (target: 95%+)",
      "Team satisfaction with scheduling (target: 90%+)",
    ],
  },
  6: {
    prerequisites: [
      "Brand voice guidelines or 10 examples of content you like",
      "List of target topics and keywords",
      "Access to your publishing platforms (blog, social media, email)",
    ],
    detailedSteps: [
      {
        title: "Audit your current content output (20 min)",
        detail:
          "Count pieces published per week across all channels. Note topics, formats, and performance metrics. Identify your biggest content gaps.",
      },
      {
        title: "Select your AI tool (15 min)",
        detail:
          "For long-form content: Jasper ($49/mo) \u2014 best for blog posts and articles. For social media: Copy.ai ($36/mo) \u2014 great templates for every platform. Budget option: Writer.com ($18/mo) \u2014 solid with good brand voice controls.",
      },
      {
        title: "Create your brand voice profile (30 min)",
        detail:
          "Feed the AI 10 examples of content you love. Define: tone (professional but approachable), vocabulary (no jargon), target audience, and topics to avoid.",
      },
      {
        title: "Build content templates (1 hour)",
        detail:
          "Create templates for each content type: blog post structure, social media post formats, email newsletter outline, ad copy framework. Templates ensure consistency.",
      },
      {
        title: "Set up a content calendar (30 min)",
        detail:
          "Plan 4 weeks of content. Assign topics to dates. Mix content types: educational (60%), promotional (20%), engagement (20%).",
      },
      {
        title: "Establish the human review workflow (15 min)",
        detail:
          "AI drafts \u2192 human reviews for accuracy, tone, and brand alignment \u2192 revisions \u2192 publish. Set SLAs: review within 24 hours, publish within 48 hours.",
      },
      {
        title: "Scale gradually (2-4 weeks)",
        detail:
          "Start at 2x your current output. Measure engagement on AI-assisted vs. fully human content. If quality holds, increase to 3-5x.",
      },
      {
        title: "Repurpose content across channels (ongoing)",
        detail:
          "Turn every blog post into 5 social posts, 1 email section, and 1 video script. The AI handles the repurposing \u2014 you just review and approve.",
      },
    ],
    timeline:
      "Week 1: Tool set up and brand voice configured. Week 2: Templates and calendar created. Week 3-4: First AI-assisted content published. Month 2: Scale to 3x output.",
    pitfalls: [
      "Don\u2019t publish AI content without human review \u2014 accuracy issues will damage credibility",
      "Don\u2019t lose your unique voice \u2014 AI should enhance your perspective, not replace it",
      "Don\u2019t focus only on quantity \u2014 one great piece outperforms ten mediocre ones",
      "Don\u2019t forget SEO \u2014 AI content still needs keyword optimization and proper formatting",
    ],
    kpis: [
      "Content output per week (target: 3-5x increase)",
      "Cost per content piece (target: 70% reduction)",
      "Engagement rate on AI-assisted content (target: match or beat human-only)",
      "Time from idea to published piece (target: 60% reduction)",
      "Organic traffic growth (target: 2x in 6 months)",
    ],
  },
  7: {
    prerequisites: [
      "12 months of CRM data with won/lost deal outcomes",
      "At least 100 closed deals for statistical significance",
      "Defined sales stages in your pipeline",
    ],
    detailedSteps: [
      {
        title: "Export your deal history (30 min)",
        detail:
          "Pull 12 months of deals: company size, industry, lead source, engagement actions (emails opened, pages visited, content downloaded), deal size, and outcome (won/lost).",
      },
      {
        title: "Identify your conversion signals (1 hour)",
        detail:
          "Analyze your won deals. What do they have in common? Typical patterns: visited pricing page, attended webinar, responded to first email within 24 hours, company size 10-50.",
      },
      {
        title: "Choose your platform (15 min)",
        detail:
          "If you\u2019re on HubSpot: use built-in HubSpot AI scoring ($45/mo, included in your CRM). Standalone: Madkudu ($99/mo) \u2014 best accuracy. Enterprise: 6sense (custom pricing) \u2014 adds intent data.",
      },
      {
        title: "Configure your scoring model (1 hour)",
        detail:
          "Assign point values to each signal. High-value: pricing page visit (+30), demo request (+50), replied to email (+20). Negative: unsubscribed (-50), bounced email (-30), inactive 30+ days (-20).",
      },
      {
        title: "Define score tiers (15 min)",
        detail:
          "Hot (80+): route to sales immediately. Warm (50-79): nurture with targeted content. Cold (below 50): stay in automated sequences. These thresholds will be tuned.",
      },
      {
        title: "Train your sales team (30 min)",
        detail:
          "Walk through: what the scores mean, how to prioritize their day, when to override the AI, and how to provide feedback that improves the model.",
      },
      {
        title: "Run in shadow mode for 2 weeks",
        detail:
          "Let the model score leads in parallel with your current process. Compare: does the AI identify your best leads earlier? Does it catch deals your team would have missed?",
      },
      {
        title: "Launch and iterate quarterly",
        detail:
          "Go live with AI-prioritized lead routing. Track conversion rates by score tier. Retrain the model quarterly with fresh data.",
      },
    ],
    timeline:
      "Week 1-2: Data export and signal identification. Week 3: Model configured and shadow mode live. Week 4: Team trained. Month 2: Full launch. Quarterly: Model retraining.",
    pitfalls: [
      "Don\u2019t use too few signals \u2014 you need at least 5-7 data points for meaningful scoring",
      "Don\u2019t ignore negative signals \u2014 a lead going cold is just as important as one getting hot",
      "Don\u2019t set it and forget it \u2014 scoring models degrade over time as your market changes",
      "Don\u2019t override the AI too often \u2014 if you\u2019re constantly overruling it, the model needs retraining",
    ],
    kpis: [
      "Sales team efficiency (target: 40% more closed deals per rep)",
      "Lead-to-opportunity conversion rate (target: 30% improvement)",
      "Sales cycle length (target: 20% reduction)",
      "Revenue per lead (target: 25% increase)",
      "Forecast accuracy (target: 85%+)",
    ],
  },
  8: {
    prerequisites: [
      "24 months of sales and inventory data",
      "Current inventory levels and reorder processes",
      "List of your top 50 SKUs by revenue",
    ],
    detailedSteps: [
      {
        title: "Export your historical data (30 min)",
        detail:
          "Pull 24 months of: units sold per SKU per week, inventory levels, stockouts, lead times from suppliers, and any promotional/seasonal events.",
      },
      {
        title: "Select your forecasting tool (15 min)",
        detail:
          "For e-commerce: Inventory Planner ($99/mo) \u2014 integrates with Shopify/Amazon. For wholesale/distribution: Flieber ($79/mo) \u2014 great for multi-channel. Budget: Cogsy ($59/mo) \u2014 solid basic forecasting.",
      },
      {
        title: "Start with your top 50 SKUs (1 hour)",
        detail:
          "Focus on items that drive 80% of revenue. Upload historical data and let the AI identify seasonal patterns, trends, and demand variability.",
      },
      {
        title: "Set reorder parameters (30 min)",
        detail:
          "Configure safety stock levels (based on lead time variability), reorder points, and economic order quantities. The AI will calculate optimal values \u2014 review and adjust.",
      },
      {
        title: "Add external demand signals (30 min)",
        detail:
          "Connect market data: weather forecasts (for seasonal items), economic indicators, competitor pricing, and marketing calendar (your promotions affect demand).",
      },
      {
        title: "Configure alerts (15 min)",
        detail:
          "Set notifications for: approaching stockout (7 days), excess inventory (>90 days supply), unusual demand spikes, and supplier lead time changes.",
      },
      {
        title: "Run parallel forecasts for 60 days",
        detail:
          "Compare AI forecasts vs. your current method. Track forecast accuracy weekly. The AI should be within 10-15% accuracy in the first month, improving to 5-10% by month 2.",
      },
      {
        title: "Expand to full catalog",
        detail:
          "Once validated on top 50 SKUs, roll out to your full catalog. Automate purchase orders for routine reorders. Keep human approval for large orders.",
      },
    ],
    timeline:
      "Week 1-2: Data uploaded, top 50 SKUs configured. Month 1: Parallel forecasting and validation. Month 2: Go live with top 50. Month 3: Full catalog expansion.",
    pitfalls: [
      "Don\u2019t start with your full catalog \u2014 validate on a small set first",
      "Don\u2019t ignore lead time variability \u2014 a supplier being 2 weeks late changes everything",
      "Don\u2019t forget promotional demand \u2014 sales events create demand spikes the AI won\u2019t predict without data",
      "Don\u2019t trust the AI blindly in the first 60 days \u2014 it needs time to learn your patterns",
    ],
    kpis: [
      "Forecast accuracy (target: 90%+ within 60 days)",
      "Stockout rate (target: 40% reduction)",
      "Excess inventory (target: 30% reduction)",
      "Inventory carrying cost (target: 20% reduction)",
      "Order fulfillment rate (target: 98%+)",
    ],
  },
  9: {
    prerequisites: [
      "Access to your review platforms (Google, Yelp, G2, etc.)",
      "Access to your support ticket system",
      "Social media account access for monitoring",
    ],
    detailedSteps: [
      {
        title: "Connect all feedback channels (30 min)",
        detail:
          "Link Google Reviews, Yelp, G2/Capterra, social media mentions, support tickets, NPS surveys, and any other customer touchpoints. You need a complete picture.",
      },
      {
        title: "Choose your platform (15 min)",
        detail:
          "For SMB: MonkeyLearn ($29/mo) \u2014 affordable and easy to set up. For social-heavy: Sprout Social ($89/mo) \u2014 best social listening. For enterprise: Brandwatch ($99/mo) \u2014 most comprehensive.",
      },
      {
        title: "Set up sentiment classification (30 min)",
        detail:
          "Configure categories beyond positive/neutral/negative: product quality, customer service, pricing, delivery, and any industry-specific topics relevant to your business.",
      },
      {
        title: "Build your alert system (20 min)",
        detail:
          "Create escalation rules: any review under 3 stars triggers an immediate Slack notification. Negative sentiment spike (3+ negative mentions in 24 hours) alerts the leadership team.",
      },
      {
        title: "Create response templates (1 hour)",
        detail:
          "Draft response templates for common negative scenarios: delayed delivery, product quality issue, billing error, poor service experience. Personalize them \u2014 never send canned responses.",
      },
      {
        title: "Set up a weekly sentiment dashboard (30 min)",
        detail:
          "Track: overall sentiment trend, sentiment by channel, top positive themes, top negative themes, and response time to negative feedback.",
      },
      {
        title: "Train your team on response protocols (30 min)",
        detail:
          "Define who responds to what: support team handles operational complaints, marketing handles public reviews, leadership handles crisis situations.",
      },
      {
        title: "Implement a feedback-to-product loop (ongoing)",
        detail:
          "Monthly: review sentiment themes with your product/operations team. Are the same complaints repeating? Fix the root cause, not just the symptom.",
      },
    ],
    timeline:
      "Week 1: Channels connected and classification set up. Week 2: Alerts and response templates live. Week 3: Dashboard and team trained. Month 2+: Monthly reviews and root cause fixes.",
    pitfalls: [
      "Don\u2019t just monitor \u2014 you must respond quickly to negative feedback or it\u2019s wasted data",
      "Don\u2019t respond defensively \u2014 acknowledge the issue, explain what you\u2019re doing about it",
      "Don\u2019t ignore positive feedback \u2014 amplify it and thank the customer publicly",
      "Don\u2019t treat all negative feedback equally \u2014 distinguish between one-off issues and systemic problems",
    ],
    kpis: [
      "Average response time to negative reviews (target: under 4 hours)",
      "Sentiment score trend (target: positive month-over-month)",
      "Review rating average (target: 0.3+ point improvement in 90 days)",
      "Customer complaint resolution rate (target: 90%+ resolved within 48 hours)",
      "Net Promoter Score (target: 10+ point improvement in 6 months)",
    ],
  },
  10: {
    prerequisites: [
      "Job descriptions for your open and recurring roles",
      "12 months of hiring data (applications, hires, performance reviews)",
      "Defined ideal candidate profiles",
    ],
    detailedSteps: [
      {
        title: "Define your ideal candidate profiles (1 hour)",
        detail:
          "For each role: must-have skills, nice-to-have skills, cultural fit indicators, red flags, and salary range. Be specific \u2014 \u2018good communicator\u2019 is too vague; \u20183+ years client-facing experience\u2019 is better.",
      },
      {
        title: "Choose your ATS/screening tool (15 min)",
        detail:
          "For growing companies: Lever ($49/mo) \u2014 clean interface, good AI screening. For volume hiring: HireVue ($35/mo) \u2014 handles high application volumes. For larger teams: Greenhouse AI ($79/mo) \u2014 most customizable.",
      },
      {
        title: "Upload historical hiring data (30 min)",
        detail:
          "Feed the AI your past applications, hire decisions, and 90-day performance data. This trains the model on what \u2018good\u2019 looks like for YOUR company.",
      },
      {
        title: "Configure screening criteria (30 min)",
        detail:
          "Set knockout questions (must-haves), weighted scoring for skills and experience, and bonus points for nice-to-haves. Define your scoring threshold for auto-advancement.",
      },
      {
        title: "Build automated outreach sequences (30 min)",
        detail:
          "Create communication templates for: application received, phone screen invitation, rejection, and offer. Personalize with candidate name, role, and specific qualifications noted.",
      },
      {
        title: "Set up interview scheduling automation (15 min)",
        detail:
          "Connect the AI to your team\u2019s calendars. Candidates self-schedule interviews based on real-time availability. Eliminate the back-and-forth.",
      },
      {
        title: "Run shadow screening for 30 days",
        detail:
          "Let the AI score candidates in parallel with your human screening. Compare results. Does the AI surface candidates you would have missed? Does it flag the same red flags?",
      },
      {
        title: "Go live with AI-first screening (ongoing)",
        detail:
          "AI screens all applications, ranks by fit score, and auto-advances top candidates. Humans review the AI\u2019s recommendations and handle interviews. Retrain quarterly.",
      },
    ],
    timeline:
      "Week 1-2: Profiles defined and tool configured. Week 3-4: Shadow screening live. Month 2: AI-first screening launched. Quarterly: Model retraining.",
    pitfalls: [
      "Don\u2019t let the AI create bias \u2014 regularly audit for demographic skew in scoring",
      "Don\u2019t make knockout criteria too strict \u2014 you\u2019ll eliminate good candidates over minor gaps",
      "Don\u2019t skip the shadow period \u2014 validate AI accuracy before trusting it with real candidates",
      "Don\u2019t automate the human touch \u2014 candidates still want personal communication at key stages",
    ],
    kpis: [
      "Time to first response (target: under 24 hours for all applicants)",
      "Time to fill open positions (target: 40% reduction)",
      "Quality of hire (target: 20% improvement in 90-day performance scores)",
      "Cost per hire (target: 35% reduction)",
      "Candidate satisfaction score (target: 85%+)",
    ],
  },
};

/* ── Data ───────────────────────────────────────── */

const implementations = [
  {
    rank: 1,
    category: "Sales",
    title: "AI-Powered Lead Follow-Up",
    savings: 37200,
    difficulty: "Low" as const,
    time: "1-2 weeks",
    description:
      "Deploy AI email sequences that respond to inbound leads within 2 minutes. Personalized based on lead source, industry, and behavior. Increases conversion by 35-50% while eliminating the 4-hour average response delay.",
    tools: [
      { name: "HubSpot AI", price: "$45/mo" },
      { name: "Instantly.ai", price: "$30/mo" },
      { name: "Apollo.io", price: "$39/mo" },
    ],
    steps: [
      "Map current lead sources and average response times",
      "Create 5 AI sequence templates by lead type",
      "Set up instant-response triggers for each channel",
      "A/B test subject lines and messaging for 2 weeks",
      "Scale winning sequences across all channels",
    ],
    why: "Speed-to-lead is the #1 predictor of conversion. Responding in 2 minutes vs. 4 hours increases close rates by 391%. AI handles the speed; your team handles the relationship.",
  },
  {
    rank: 2,
    category: "Customer Experience",
    title: "AI Customer Support Chatbot",
    savings: 33600,
    difficulty: "Medium" as const,
    time: "2-3 weeks",
    description:
      "Handle 60-70% of support tickets automatically with an AI chatbot trained on your specific products, pricing, and policies. Escalates complex issues to humans with full context.",
    tools: [
      { name: "Intercom Fin", price: "$74/mo" },
      { name: "Zendesk AI", price: "$55/mo" },
      { name: "Drift", price: "$40/mo" },
    ],
    steps: [
      "Export last 6 months of support tickets for analysis",
      "Identify top 20 question categories by volume",
      "Train chatbot on your specific knowledge base",
      "Deploy with human handoff rules for complex issues",
      "Review weekly and patch gaps in training data",
    ],
    why: "Support costs scale linearly with customers. AI chatbots break that curve \u2014 handling 60-70% of tickets means you can 3x customers without 3x support staff.",
  },
  {
    rank: 3,
    category: "Operations",
    title: "Invoice & Document Automation",
    savings: 28800,
    difficulty: "Low" as const,
    time: "1-2 weeks",
    description:
      "Replace manual invoice entry with AI-powered OCR that extracts line items, validates against POs, and auto-routes for approval. Processes 500+ invoices/month with 98% accuracy.",
    tools: [
      { name: "Docsumo", price: "$29/mo" },
      { name: "Rossum", price: "$49/mo" },
      { name: "Stampli", price: "$35/mo" },
    ],
    steps: [
      "Audit current invoice volume and error rate",
      "Select tool based on your ERP/accounting integration",
      "Upload 50 sample invoices for AI training",
      "Run parallel processing for 2 weeks to validate",
      "Switch to full automation once accuracy exceeds 95%",
    ],
    why: "Manual data entry is the most expensive way to process information. Every invoice touched by a human costs $15-25 in labor. AI drops that to $0.10.",
  },
  {
    rank: 4,
    category: "Back Office",
    title: "Automated Report Generation",
    savings: 22800,
    difficulty: "Low" as const,
    time: "1-2 weeks",
    description:
      "Generate weekly/monthly business reports automatically. AI pulls data from your tools, identifies trends, flags anomalies, and creates executive summaries. Saves 8-12 hours of manual reporting per month.",
    tools: [
      { name: "Coefficient", price: "$49/mo" },
      { name: "Rows.com", price: "$29/mo" },
      { name: "Equals", price: "$39/mo" },
    ],
    steps: [
      "List all recurring reports and their data sources",
      "Set up automated data connections to each source",
      "Design report templates with AI-generated summaries",
      "Schedule automated delivery to stakeholders",
      "Add anomaly detection alerts for critical metrics",
    ],
    why: "Reporting is necessary but not value-creating. Every hour spent compiling data is an hour not spent acting on it. AI compiles; your team decides.",
  },
  {
    rank: 5,
    category: "Operations",
    title: "Smart Scheduling System",
    savings: 21600,
    difficulty: "Low" as const,
    time: "2-3 weeks",
    description:
      "AI scheduling that eliminates back-and-forth emails, auto-considers team availability, client preferences, and travel time. Reduces scheduling overhead by 80%.",
    tools: [
      { name: "Motion", price: "$19/mo" },
      { name: "Reclaim.ai", price: "$12/mo" },
      { name: "Calendly AI", price: "$16/mo" },
    ],
    steps: [
      "Catalog all recurring meeting types and durations",
      "Set availability rules and buffer time preferences",
      "Integrate with your existing calendar system",
      "Train team on the new booking flow and links",
      "Monitor and adjust scheduling rules after 30 days",
    ],
    why: "The average professional spends 4.8 hours/week on scheduling. For a 10-person team, that's 2,496 hours/year \u2014 equivalent to 1.2 full-time employees just coordinating calendars.",
  },
  {
    rank: 6,
    category: "Sales & Marketing",
    title: "Content Generation Pipeline",
    savings: 9600,
    difficulty: "Medium" as const,
    time: "2-3 weeks",
    description:
      "AI-assisted content creation for blog posts, social media, email campaigns, and ad copy. Human-guided AI produces 10x more content at 20% of the cost of hiring writers.",
    tools: [
      { name: "Jasper", price: "$49/mo" },
      { name: "Copy.ai", price: "$36/mo" },
      { name: "Writer.com", price: "$18/mo" },
    ],
    steps: [
      "Audit current content output and publishing frequency",
      "Create brand voice guidelines for the AI to follow",
      "Set up templates for each content type (blog, social, email)",
      "Establish a human review workflow for quality control",
      "Scale to 3-5x current publishing frequency over 30 days",
    ],
    why: "Content marketing compounds. A blog post published today generates traffic for years. AI lets you publish 10x more, which means 10x more compounding assets.",
  },
  {
    rank: 7,
    category: "Sales & Marketing",
    title: "Predictive Lead Scoring",
    savings: 7200,
    difficulty: "Medium" as const,
    time: "3-4 weeks",
    description:
      "AI analyzes lead behavior, demographics, and engagement to predict which leads will convert. Sales team focuses on the top 20% instead of chasing everyone equally.",
    tools: [
      { name: "HubSpot AI", price: "$45/mo" },
      { name: "Madkudu", price: "$99/mo" },
      { name: "6sense", price: "Custom" },
    ],
    steps: [
      "Export 12 months of won/lost deal data",
      "Identify the 5-7 signals that predict conversion",
      "Configure scoring model in your CRM",
      "Train sales team on the new prioritization workflow",
      "Refine the model quarterly based on new close data",
    ],
    why: "Sales reps spend 65% of their time on leads that will never buy. Predictive scoring flips that \u2014 65% of their time goes to the 20% most likely to close.",
  },
  {
    rank: 8,
    category: "Operations",
    title: "Inventory Forecasting",
    savings: 7200,
    difficulty: "Medium" as const,
    time: "3-4 weeks",
    description:
      "AI predicts demand patterns, seasonal trends, and supply chain disruptions to optimize inventory levels. Reduces stockouts by 40% and overstock by 30%.",
    tools: [
      { name: "Inventory Planner", price: "$99/mo" },
      { name: "Flieber", price: "$79/mo" },
      { name: "Cogsy", price: "$59/mo" },
    ],
    steps: [
      "Export 24 months of sales and inventory history",
      "Identify seasonal patterns and demand drivers",
      "Configure AI forecasting for top 50 SKUs first",
      "Set automated reorder points and safety stock levels",
      "Expand to full catalog after 60-day validation",
    ],
    why: "Carrying excess inventory costs 20-30% of its value annually. Stockouts cost 4.1% of revenue. AI threading this needle saves both ways.",
  },
  {
    rank: 9,
    category: "Customer Experience",
    title: "Sentiment Analysis",
    savings: 7200,
    difficulty: "Medium" as const,
    time: "2-3 weeks",
    description:
      "AI monitors customer reviews, support tickets, and social mentions to detect sentiment shifts in real-time. Catch problems before they become public crises.",
    tools: [
      { name: "MonkeyLearn", price: "$29/mo" },
      { name: "Brandwatch", price: "$99/mo" },
      { name: "Sprout Social", price: "$89/mo" },
    ],
    steps: [
      "Connect all customer feedback channels (reviews, tickets, social)",
      "Set up sentiment classification (positive, neutral, negative)",
      "Configure real-time alerts for negative sentiment spikes",
      "Create response templates for common complaint categories",
      "Build a weekly sentiment dashboard for leadership review",
    ],
    why: "A single negative review costs an average of 30 lost customers. Catching and resolving issues before they go public is worth 10x the cost of the tool.",
  },
  {
    rank: 10,
    category: "Back Office",
    title: "HR/Hiring AI Screening",
    savings: 5600,
    difficulty: "Medium" as const,
    time: "3-4 weeks",
    description:
      "AI screens resumes, ranks candidates by fit, and automates initial outreach. Reduces time-to-hire by 40% while increasing candidate quality scores.",
    tools: [
      { name: "Lever", price: "$49/mo" },
      { name: "Greenhouse AI", price: "$79/mo" },
      { name: "HireVue", price: "$35/mo" },
    ],
    steps: [
      "Define ideal candidate profiles for each open role",
      "Upload last 12 months of hiring data (applications, outcomes)",
      "Configure screening criteria and knockout questions",
      "Set up automated candidate communication sequences",
      "Review and adjust scoring after 30 days of hires",
    ],
    why: "A bad hire costs 30% of their annual salary. AI screening doesn't eliminate bad hires, but it reduces them by 35% by surfacing better-fit candidates faster.",
  },
];

const totalSavings = implementations.reduce((sum, impl) => sum + impl.savings, 0);

const competitorStats = [
  { area: "Customer Service AI", yours: 0, industry: 64, gap: "critical" as const },
  { area: "Automated Billing", yours: 0, industry: 41, gap: "high" as const },
  { area: "AI Lead Generation", yours: 0, industry: 37, gap: "medium" as const },
  { area: "Predictive Scheduling", yours: 0, industry: 52, gap: "high" as const },
  { area: "AI Content Marketing", yours: 0, industry: 29, gap: "medium" as const },
  { area: "Data Analytics/BI", yours: 0, industry: 58, gap: "critical" as const },
];

const implementationPhases = [
  {
    phase: "Week 1-2",
    title: "Quick Wins",
    count: 3,
    savings: "$7,300/mo",
    description: "Low-effort, high-impact automations you can deploy immediately.",
    items: ["Lead follow-up AI", "Invoice automation", "Smart scheduling"],
  },
  {
    phase: "Week 3-6",
    title: "Core Automations",
    count: 3,
    savings: "$4,500/mo additional",
    description: "Deeper integrations that build on the quick wins for compounding returns.",
    items: ["Support chatbot", "Report generation", "Content pipeline"],
  },
  {
    phase: "Month 2-3",
    title: "Growth Engines",
    count: 2,
    savings: "$1,200/mo additional",
    description: "Revenue-generating AI that directly impacts your top line.",
    items: ["Predictive lead scoring", "Inventory forecasting"],
  },
  {
    phase: "Month 3-6",
    title: "Strategic Plays",
    count: 2,
    savings: "$1,100/mo additional",
    description: "Long-term competitive advantages that compound over time.",
    items: ["Sentiment analysis", "HR/hiring screening"],
  },
];

const difficultyColor = {
  Low: "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
};

const gapColor = {
  critical: "bg-red-50 text-red-700",
  high: "bg-amber-50 text-amber-700",
  medium: "bg-yellow-50 text-yellow-700",
};

/* ── Implementation Card ────────────────────────── */

function ImplementationCard({
  impl,
  defaultOpen = false,
  recommended = false,
  showDetailed = false,
  industryTip,
  goalTip,
}: {
  impl: (typeof implementations)[0];
  defaultOpen?: boolean;
  recommended?: boolean;
  showDetailed?: boolean;
  industryTip?: string;
  goalTip?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const detailed = showDetailed ? detailedImplementations[impl.rank] : null;

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-shadow hover:shadow-sm card-accent-hover ${recommended ? "border-[var(--accent)]" : "border-black/5"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 sm:p-6 flex items-start gap-3 sm:gap-4 text-left min-h-[48px]"
      >
        <div className="w-9 h-9 bg-[var(--black)] text-white rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
          {impl.rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]">
              {impl.category}
            </span>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyColor[impl.difficulty]}`}
            >
              {impl.difficulty}
            </span>
            {recommended && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                Recommended for you
              </span>
            )}
          </div>
          <h3 className="text-sm sm:text-base font-bold mb-1">
            {impl.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[var(--mid-gray)]">
            <span className="font-extrabold text-[var(--accent)] text-sm">
              ${impl.savings.toLocaleString()}/yr
            </span>
            <span>{impl.time}</span>
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`text-[var(--mid-gray)] transition-transform shrink-0 mt-2 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {open && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-black/5 pt-4 space-y-5 glass-hover">
          <p className="text-sm text-[var(--mid-gray)] leading-relaxed">
            {impl.description}
          </p>

          {/* Recommended tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
              Recommended Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {impl.tools.map((tool) => {
                const url = toolUrls[tool.name];
                return url ? (
                  <a
                    key={tool.name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--light-surface)] rounded-full text-xs font-medium hover:bg-black/5 transition-colors"
                  >
                    {tool.name}
                    <span className="text-[var(--mid-gray)]">{tool.price}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--mid-gray)]">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                ) : (
                  <span
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--light-surface)] rounded-full text-xs font-medium"
                  >
                    {tool.name}
                    <span className="text-[var(--mid-gray)]">{tool.price}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Detailed walkthrough for top recommended implementations */}
          {detailed ? (
            <>
              {/* Prerequisites */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
                  What You&apos;ll Need
                </h4>
                <ul className="space-y-1.5">
                  {detailed.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--mid-gray)]">
                      <span className="w-1.5 h-1.5 bg-[var(--black)] rounded-full shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Implementation Guide */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
                  Full Implementation Guide
                </h4>
                <ol className="space-y-3">
                  {detailed.detailedSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 bg-[var(--black)] text-white rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--black)] leading-relaxed">
                          {step.title}
                        </p>
                        <p className="text-[var(--mid-gray)] leading-relaxed mt-0.5">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Expected Timeline */}
              <div className="bg-[var(--light-surface)] rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-1.5">
                  Expected Timeline
                </h4>
                <p className="text-xs text-[var(--mid-gray)] leading-relaxed">
                  {detailed.timeline}
                </p>
              </div>

              {/* Common Pitfalls */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
                  Common Pitfalls to Avoid
                </h4>
                <ul className="space-y-1.5">
                  {detailed.pitfalls.map((pitfall, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--mid-gray)]">
                      <span className="text-red-400 shrink-0 mt-0.5">!</span>
                      <span className="leading-relaxed">{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* KPIs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
                  How to Measure Success
                </h4>
                <ul className="space-y-1.5">
                  {detailed.kpis.map((kpi, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--mid-gray)]">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            /* Quick-start steps (default for non-detailed) */
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
                Quick-Start Steps
              </h4>
              <ol className="space-y-2">
                {impl.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 bg-[var(--light-surface)] rounded-md flex items-center justify-center text-[10px] font-bold text-[var(--mid-gray)] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[var(--mid-gray)] leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Industry-specific tip */}
          {industryTip && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                For Your Industry
              </h4>
              <p className="text-sm text-blue-900 leading-relaxed">
                {industryTip}
              </p>
            </div>
          )}

          {/* Goal-specific tip */}
          {goalTip && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                For Your Goal
              </h4>
              <p className="text-sm text-amber-900 leading-relaxed">
                {goalTip}
              </p>
            </div>
          )}

          {/* Why it works */}
          <div className="bg-[var(--light-surface)] rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-1.5">
              Why This Works
            </h4>
            <p className="text-xs text-[var(--mid-gray)] leading-relaxed">
              {impl.why}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ──────────────────────────────────── */

export default function AIPlaybookPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [answers, setAnswers] = useState<PlaybookAnswers | null>(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  // Access gate: check for email in localStorage + read personalization data
  useEffect(() => {
    try {
      const email = localStorage.getItem("gw_lead_email");
      if (!email) {
        router.replace("/free-report");
        return;
      }
      setAuthorized(true);

      // Read personalization answers
      try {
        const raw = localStorage.getItem("gw_playbook_answers");
        if (raw) {
          const parsed = JSON.parse(raw) as PlaybookAnswers;
          setAnswers(parsed);
        }
      } catch {
        // Graceful fallback — no personalization
        setAnswers(null);
      }
    } catch {
      router.replace("/free-report");
    }
  }, [router]);

  // Determine recommended ranks from pain points
  const recommendedRanks = useMemo(() => {
    if (!answers?.painPoints?.length) return new Set<number>();
    const ranks = new Set<number>();
    for (const painPoint of answers.painPoints) {
      const mapped = painPointToRanks[painPoint];
      if (mapped) {
        for (const r of mapped) ranks.add(r);
      }
    }
    return ranks;
  }, [answers]);

  // Sort implementations: recommended first (preserving relative order), then rest
  const sortedImplementations = useMemo(() => {
    if (recommendedRanks.size === 0) return implementations;
    const recommended = implementations.filter((impl) => recommendedRanks.has(impl.rank));
    const rest = implementations.filter((impl) => !recommendedRanks.has(impl.rank));
    return [...recommended, ...rest];
  }, [recommendedRanks]);

  // Default top 3 for the bottom CTA when not personalized
  const ctaImplementations = useMemo(() => {
    if (recommendedRanks.size > 0) {
      return sortedImplementations.filter((impl) => recommendedRanks.has(impl.rank)).slice(0, 3);
    }
    // Default: top 3 by rank
    return implementations.slice(0, 3);
  }, [sortedImplementations, recommendedRanks]);

  // PDF download handler
  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      const params = new URLSearchParams();
      if (answers?.industry) params.set("industry", answers.industry);
      if (answers?.teamSize) params.set("teamSize", answers.teamSize);
      if (answers?.painPoints?.length) {
        const keys = answers.painPoints
          .map((pp) => painPointToKey[pp] || "")
          .filter(Boolean);
        if (keys.length) params.set("painPoints", keys.join(","));
      }
      if (answers?.goal) params.set("goal", answers.goal);

      const url = `/api/playbook/pdf${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      const blob = await response.blob();

      const filename = answers?.industry
        ? `AI-Profit-Playbook-${answers.industry.replace(/\s+/g, "-")}.pdf`
        : "AI-Profit-Playbook.pdf";

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch {
      // Silently fail — user can try again
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--black)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="dot-grid min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        aria-label="Playbook hero"
        className="relative py-16 sm:py-24 px-4 sm:px-6 mesh-gradient-hero"
      >
        <div className="grain-overlay" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="flex justify-center mb-6">
              <LogoFull className="h-7 sm:h-8" />
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-3 sm:px-4 py-1.5 mb-6 animate-float">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium text-[var(--mid-gray)]">
                2026 Edition · Updated Monthly
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <h1 className="text-[28px] sm:text-[44px] md:text-[54px] font-light tracking-[-0.035em] leading-[1.08] mb-2 sm:mb-3">
              {answers ? (
                <>Your <span className="font-extrabold">AI Profit Playbook</span></>
              ) : (
                <>The <span className="font-extrabold">AI Profit Playbook</span></>
              )}
            </h1>
            {answers?.industry && (
              <p className="text-sm sm:text-base font-medium text-[var(--mid-gray)] mb-3">
                Personalized for {answers.industry}
              </p>
            )}
            <p className="text-base sm:text-lg text-[var(--mid-gray)] max-w-2xl mx-auto mb-8 leading-relaxed">
              {answers?.goal
                ? `The 10 highest-ROI AI implementations for 2026 to help you ${answers.goal.toLowerCase()}. With specific tools, costs, and step-by-step instructions for each one.`
                : "The 10 highest-ROI AI implementations for 2026, ranked by annual savings. With specific tools, costs, and step-by-step instructions for each one."}
            </p>
          </RevealSection>

          <RevealSection delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 mb-8">
              {[
                {
                  label: "total annual savings",
                  node: (
                    <span className="text-lg sm:text-xl font-extrabold text-[var(--accent)]">
                      <AnimatedStat
                        value={180}
                        prefix="$"
                        suffix="K+"
                      />
                    </span>
                  ),
                },
                {
                  label: "implementations",
                  node: (
                    <span className="text-lg sm:text-xl font-extrabold text-[var(--accent)]">
                      10
                    </span>
                  ),
                },
                {
                  label: "recommended tools",
                  node: (
                    <span className="text-lg sm:text-xl font-extrabold text-[var(--accent)]">
                      30+
                    </span>
                  ),
                },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  {s.node}
                  <span className="text-[10px] sm:text-[11px] text-[var(--mid-gray)]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* PDF Download Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              className="group relative inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] bg-[var(--black)] text-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.3)] disabled:opacity-70 min-h-[48px]"
            >
              {downloadingPDF ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  <span>Download Your Playbook (PDF)</span>
                </>
              )}
            </button>

            {/* Scroll indicator */}
            <button
              onClick={() => document.getElementById("implementations")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 flex flex-col items-center gap-2 text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors cursor-pointer mx-auto min-h-[44px] justify-center"
            >
              <span className="text-xs font-medium">
                {recommendedRanks.size > 0
                  ? `${recommendedRanks.size} personalized implementations below`
                  : "10 implementations below"}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-scroll-bounce"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ TOTAL SAVINGS BAR ═══════════════ */}
      <section className="border-t border-b border-black/5 accent-progress text-white">
        <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6 text-center">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-1">
            Combined Annual Savings
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <AnimatedStat value={totalSavings} prefix="$" suffix="/yr" />
          </p>
        </div>
      </section>

      {/* ═══════════════ IMPLEMENTATION CARDS ═══════════════ */}
      <section
        id="implementations"
        aria-label="Implementations"
        className="py-14 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <RevealSection className="mb-8 sm:mb-10">
            <h2 className="text-[22px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
              10 Implementations, Ranked by ROI
            </h2>
            <p className="text-sm text-[var(--mid-gray)]">
              {recommendedRanks.size > 0
                ? "Reordered based on your answers. Recommended implementations are listed first."
                : "Click any card to see recommended tools, step-by-step instructions, and why it works."}
            </p>
          </RevealSection>

          <div className="space-y-3">
            {sortedImplementations.map((impl, i) => (
              <ScaleReveal key={impl.rank} delay={Math.min(i * 60, 400)}>
                <ImplementationCard
                  impl={impl}
                  defaultOpen={i < 3}
                  recommended={recommendedRanks.has(impl.rank)}
                  showDetailed={true}
                  industryTip={answers?.industry ? industryContext[industryToKey[answers.industry] ?? answers.industry]?.[impl.rank] : undefined}
                  goalTip={answers?.goal ? goalFraming[goalToKey[answers.goal] ?? answers.goal]?.[impl.rank] : undefined}
                />
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY BENCHMARKS ═══════════════ */}
      <section
        aria-label="Industry benchmarks"
        className="py-14 sm:py-20 px-4 sm:px-6 bg-[var(--light-surface)] border-t border-black/5"
      >
        <div className="max-w-3xl mx-auto">
          <RevealSection className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              Benchmark
            </p>
            <h2 className="text-[22px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
              How You Compare to Industry Averages
            </h2>
            <p className="text-sm text-[var(--mid-gray)]">
              Businesses without AI implementations score 0% in these areas.
              Here&apos;s what the average company in your industry has already adopted.
            </p>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_40px_65px_45px] sm:grid-cols-[1fr_80px_100px_80px] gap-1.5 sm:gap-2 p-3 sm:p-4 border-b border-black/5 text-[9px] sm:text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]">
                <span>Area</span>
                <span className="text-center">You</span>
                <span className="text-center">Industry Avg</span>
                <span className="text-center">Gap</span>
              </div>
              {/* Rows */}
              {competitorStats.map((stat) => (
                <div
                  key={stat.area}
                  className="grid grid-cols-[1fr_40px_65px_45px] sm:grid-cols-[1fr_80px_100px_80px] gap-1.5 sm:gap-2 p-3 sm:p-4 border-b border-black/5 last:border-b-0 items-center"
                >
                  <span className="text-[11px] sm:text-sm font-medium leading-tight">
                    {stat.area}
                  </span>
                  <span className="text-center text-xs font-bold text-red-500">
                    {stat.yours}%
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden max-w-[50px]">
                      <div
                        className="h-full accent-progress rounded-full"
                        style={{ width: `${stat.industry}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{stat.industry}%</span>
                  </div>
                  <div className="flex justify-center">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${gapColor[stat.gap]}`}
                    >
                      {stat.gap}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ IMPLEMENTATION TIMELINE ═══════════════ */}
      <section
        aria-label="Implementation timeline"
        className="py-14 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <RevealSection className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              Timeline
            </p>
            <h2 className="text-[22px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
              Your 6-Month Implementation Roadmap
            </h2>
            <p className="text-sm text-[var(--mid-gray)]">
              Start with quick wins, build momentum, and layer in strategic
              plays over time.
            </p>
          </RevealSection>

          <div className="space-y-4">
            {implementationPhases.map((phase, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold bg-[var(--accent)] text-[var(--black)] px-3 py-1 rounded-full">
                      {phase.phase}
                    </span>
                    <span className="text-sm font-bold">{phase.title}</span>
                    <span className="text-xs text-[var(--mid-gray)]">
                      {phase.count} implementations · {phase.savings}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--mid-gray)] mb-3 leading-relaxed">
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-medium px-2.5 py-1 bg-[var(--light-surface)] rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section
        aria-label="Start implementing"
        className="relative py-20 sm:py-28 px-4 sm:px-6 mesh-gradient-dark text-white"
      >
        <div className="grain-overlay" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <RevealSection>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Next Step
            </p>
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-tight mb-4">
              Start Implementing Today
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              You&apos;ve got the playbook. Now pick one implementation and start this week.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
              {ctaImplementations.map((impl) => (
                <div
                  key={impl.rank}
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 sm:px-4 py-2.5 min-h-[44px]"
                >
                  <span className="w-6 h-6 bg-white text-[var(--black)] rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0">
                    {impl.rank}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {impl.title}
                  </span>
                  <span className="text-xs text-[var(--accent)]">
                    ${impl.savings.toLocaleString()}/yr
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/40">
              Every week you wait is another week your competitors are pulling ahead.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="py-8 px-4 sm:px-6 border-t border-black/5">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <LogoFull className="h-5" />
          <span className="text-[11px] text-[var(--mid-gray)]">
            &copy; {new Date().getFullYear()} Groundwork. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
