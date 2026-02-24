"use client";

import { useState } from "react";

const tools = [
  { name: "HubSpot AI", category: "CRM & Sales Automation", match: 98, pricing: "$45/mo", description: "AI-powered CRM with lead scoring, email sequences, pipeline automation, and conversation intelligence. Free tier available.", features: ["Lead scoring", "Email sequences", "Pipeline automation", "Conversation AI"], bestFor: "Lead follow-up and sales pipeline", integrations: ["Gmail", "Outlook", "Slack", "Zapier", "WordPress"], setupTime: "1-2 hours", learningCurve: "Low", freeTrialDays: 14, whyForYou: "Your questionnaire showed lead follow-up as your biggest time sink. HubSpot's AI sequences respond to leads within minutes and automate 80% of your nurture process. The free CRM tier lets you start without commitment." },
  { name: "Docsumo", category: "Invoice & Document Processing", match: 95, pricing: "$29/mo", description: "AI document processing that extracts data from invoices, receipts, and forms with 99% accuracy. Integrates with QuickBooks.", features: ["Invoice extraction", "Receipt processing", "QuickBooks sync", "99% accuracy"], bestFor: "Invoice processing automation", integrations: ["QuickBooks", "Xero", "Sage", "Google Drive", "Dropbox"], setupTime: "30 minutes", learningCurve: "Very Low", freeTrialDays: 14, whyForYou: "You reported spending significant time on manual invoice entry. Docsumo processes invoices in seconds with 99% accuracy and pushes data directly to QuickBooks. Most users recover 15-20 hours per week." },
  { name: "Intercom Fin", category: "Customer Support AI", match: 92, pricing: "$74/mo", description: "AI chatbot that resolves 50%+ of customer inquiries instantly. Learns from your knowledge base and previous conversations.", features: ["24/7 AI support", "Knowledge base", "Human handoff", "Analytics"], bestFor: "Customer service automation", integrations: ["Slack", "Salesforce", "HubSpot", "Zapier", "Shopify"], setupTime: "2-3 hours", learningCurve: "Medium", freeTrialDays: 14, whyForYou: "Your customers expect instant responses but your team can not be available 24/7. Intercom Fin handles routine questions immediately and escalates complex issues to your team with full context." },
  { name: "ServiceTitan", category: "Field Service Management", match: 89, pricing: "$89/mo", description: "AI-powered scheduling, dispatching, and job management for trades and field service businesses.", features: ["Smart scheduling", "GPS dispatch", "Job costing", "Customer portal"], bestFor: "Smart scheduling and dispatch", integrations: ["QuickBooks", "Google Calendar", "Outlook", "GPS tracking"], setupTime: "4-6 hours", learningCurve: "Medium", freeTrialDays: 0, whyForYou: "Your scheduling process has manual bottlenecks. ServiceTitan's AI dispatch optimizes routes and assignments, helping you complete 15-20% more jobs per week with the same crew size." },
  { name: "ActiveCampaign", category: "Email Marketing AI", match: 87, pricing: "$29/mo", description: "AI-driven email marketing with predictive sending, content generation, and automated customer journeys.", features: ["Predictive send", "AI content", "Automation", "CRM built-in"], bestFor: "Email nurture sequences", integrations: ["Shopify", "WordPress", "Zapier", "Salesforce", "WooCommerce"], setupTime: "1-2 hours", learningCurve: "Low", freeTrialDays: 14, whyForYou: "Your post-sale communication is mostly manual. ActiveCampaign automates follow-ups, review requests, and re-engagement campaigns. Predictive sending delivers emails when each contact is most likely to open." },
  { name: "Birdeye", category: "Review & Reputation", match: 86, pricing: "$49/mo", description: "Automated review requests, AI response drafting, and reputation monitoring across all platforms.", features: ["Auto review requests", "AI responses", "Sentiment analysis", "Multi-platform"], bestFor: "Review management automation", integrations: ["Google Business", "Yelp", "Facebook", "Salesforce", "HubSpot"], setupTime: "1 hour", learningCurve: "Low", freeTrialDays: 7, whyForYou: "Online reviews directly impact your revenue. Birdeye automatically requests reviews after jobs, drafts personalized responses, and monitors sentiment across all platforms. Businesses see 2-3x more reviews within 60 days." },
  { name: "QuickBooks AI", category: "Bookkeeping & Accounting", match: 84, pricing: "$30/mo", description: "AI-powered transaction categorization, receipt matching, and financial forecasting built into QuickBooks.", features: ["Auto categorize", "Receipt match", "Cash flow forecast", "Tax prep"], bestFor: "Bookkeeping automation", integrations: ["All major banks", "Stripe", "PayPal", "Square", "Docsumo"], setupTime: "1 hour", learningCurve: "Low", freeTrialDays: 30, whyForYou: "Your monthly bookkeeping takes hours of manual categorization. QuickBooks AI learns your patterns and categorizes transactions with 95%+ accuracy. Receipt matching eliminates lost receipt headaches." },
  { name: "Jasper", category: "Content Generation", match: 82, pricing: "$49/mo", description: "AI content platform for marketing copy, social media posts, blog articles, and brand voice consistency.", features: ["Brand voice AI", "Template library", "Team collaboration", "Multi-channel"], bestFor: "Marketing content creation", integrations: ["Google Docs", "WordPress", "HubSpot", "Webflow", "Chrome"], setupTime: "30 minutes", learningCurve: "Low", freeTrialDays: 7, whyForYou: "Consistent marketing content keeps you visible but takes hours to create. Jasper generates on-brand copy for social media, emails, and your website in minutes. Train it on your voice and it sounds like you." },
  { name: "Calendly AI", category: "Scheduling", match: 80, pricing: "$12/mo", description: "Smart scheduling with AI-powered routing, buffer times, and availability optimization.", features: ["Smart routing", "Buffer management", "Team scheduling", "Integrations"], bestFor: "Client booking and scheduling", integrations: ["Google Calendar", "Outlook", "Zoom", "Teams", "Salesforce"], setupTime: "20 minutes", learningCurve: "Very Low", freeTrialDays: 14, whyForYou: "Every back-and-forth scheduling email wastes 10 minutes. Calendly eliminates it entirely. Clients book directly based on real-time availability. Smart buffers prevent back-to-back meetings." },
  { name: "Power BI", category: "Business Intelligence", match: 78, pricing: "$10/mo", description: "AI-powered dashboards and reporting with natural language queries and predictive analytics.", features: ["AI insights", "Natural language", "Auto dashboards", "Predictive"], bestFor: "Automated reporting and analytics", integrations: ["Excel", "SQL databases", "Salesforce", "Google Analytics", "QuickBooks"], setupTime: "2-3 hours", learningCurve: "Medium", freeTrialDays: 60, whyForYou: "Your monthly reporting process is manual and time-consuming. Power BI connects to all your data sources and generates visual dashboards automatically. Ask questions in plain English and get instant answers." },
];

export default function VendorsPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(tools.map(t => t.category)))];
  const filtered = filter === "All" ? tools : tools.filter(t => t.category === filter);
  const totalCost = tools.slice(0, 5).reduce((s, t) => s + parseInt(t.pricing.replace(/[^0-9]/g, "")), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Vendor & Tool Recommendations</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">AI tools matched to your business. Click any tool for a full breakdown of why it fits and how to get started.</p>
      </div>

      {/* Stack summary */}
      <div className="bg-white border-2 border-black/[0.06] rounded-2xl p-5 sm:p-6 shadow-[0_1px_40px_rgba(0,0,0,0.04)]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-4">Your Recommended Stack (Top 5)</h2>
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-4">
          <div className="text-center p-3 sm:p-4 bg-red-50 rounded-xl border border-red-100 min-w-[110px]">
            <div className="text-lg sm:text-xl font-extrabold text-red-600">${totalCost}/mo</div>
            <div className="text-[9px] sm:text-[10px] text-red-400">Tool investment</div>
          </div>
          <span className="text-lg font-extrabold text-[var(--mid-gray)]">vs</span>
          <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100 min-w-[110px]">
            <div className="text-lg sm:text-xl font-extrabold text-green-600">$11,900/mo</div>
            <div className="text-[9px] sm:text-[10px] text-green-500">Projected savings</div>
          </div>
          <span className="text-lg font-extrabold text-[var(--mid-gray)]">=</span>
          <div className="text-center p-3 sm:p-4 bg-[var(--black)] rounded-xl min-w-[110px]">
            <div className="text-lg sm:text-xl font-extrabold text-white">{Math.round(11900/totalCost)}x ROI</div>
            <div className="text-[9px] sm:text-[10px] text-white/40">Return</div>
          </div>
        </div>
        <p className="text-xs text-[var(--mid-gray)] text-center">Start with your top 3 based on Quick Wins. Add tools as you progress through implementation phases.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "CRM & Sales Automation", "Invoice & Document Processing", "Customer Support AI", "Scheduling", "Email Marketing AI"].map(f => (
          <button key={f} onClick={() => { setFilter(f); setExpandedIdx(null); }} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${filter === f ? "bg-[var(--black)] text-white" : "bg-white border border-black/5 text-[var(--mid-gray)] hover:bg-[var(--light-surface)]"}`}>{f === "All" ? "All Tools" : f}</button>
        ))}
      </div>

      {/* Tools */}
      <div className="space-y-3">
        {filtered.map((tool) => {
          const globalIdx = tools.indexOf(tool);
          const isOpen = expandedIdx === globalIdx;
          return (
            <div key={tool.name} className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <button onClick={() => setExpandedIdx(isOpen ? null : globalIdx)} className="w-full p-5 flex items-center justify-between text-left hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-[var(--light-surface)] border border-black/5 rounded-xl flex items-center justify-center text-sm font-bold shrink-0">{globalIdx + 1}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold flex items-center gap-2 flex-wrap">
                      {tool.name}
                      {tool.match >= 95 && <span className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-semibold border border-green-100">Top Pick</span>}
                    </div>
                    <div className="text-[11px] text-[var(--mid-gray)]">{tool.category} · {tool.pricing}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-extrabold text-green-600">{tool.match}%</div>
                    <div className="text-[9px] text-[var(--mid-gray)]">match</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${isOpen ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-black/5 p-5 space-y-4">
                  {/* Why For You */}
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                    <h4 className="text-xs font-bold text-green-800 mb-1">Why This Fits Your Business</h4>
                    <p className="text-xs text-green-700/80 leading-relaxed">{tool.whyForYou}</p>
                  </div>

                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{tool.description}</p>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                      <div className="text-xs font-bold">{tool.pricing}</div>
                      <div className="text-[9px] text-[var(--mid-gray)]">Starting price</div>
                    </div>
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                      <div className="text-xs font-bold">{tool.setupTime}</div>
                      <div className="text-[9px] text-[var(--mid-gray)]">Setup time</div>
                    </div>
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                      <div className="text-xs font-bold">{tool.learningCurve}</div>
                      <div className="text-[9px] text-[var(--mid-gray)]">Learning curve</div>
                    </div>
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                      <div className="text-xs font-bold">{tool.freeTrialDays > 0 ? `${tool.freeTrialDays} days` : "No trial"}</div>
                      <div className="text-[9px] text-[var(--mid-gray)]">Free trial</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.features.map(f => (
                        <span key={f} className="text-[10px] bg-[var(--light-surface)] border border-black/5 px-2.5 py-1 rounded-lg font-medium">{f}</span>
                      ))}
                    </div>
                  </div>

                  {/* Integrations */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2">Integrates With</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.integrations.map(i => (
                        <span key={i} className="text-[10px] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg font-medium text-blue-700">{i}</span>
                      ))}
                    </div>
                  </div>

                  {/* Match bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[var(--light-surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${tool.match}%` }} />
                    </div>
                    <span className="text-xs font-bold text-green-600">{tool.match}% match</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
