"use client";

const tools = [
  { name: "HubSpot AI", category: "CRM & Sales Automation", match: 98, pricing: "$45/mo", description: "AI-powered CRM with lead scoring, email sequences, pipeline automation, and conversation intelligence. Free tier available.", features: ["Lead scoring", "Email sequences", "Pipeline automation", "Conversation AI"], bestFor: "Lead follow-up and sales pipeline" },
  { name: "Docsumo", category: "Invoice & Document Processing", match: 95, pricing: "$29/mo", description: "AI document processing that extracts data from invoices, receipts, and forms with 99% accuracy. Integrates with QuickBooks.", features: ["Invoice extraction", "Receipt processing", "QuickBooks sync", "99% accuracy"], bestFor: "Invoice processing automation" },
  { name: "Intercom Fin", category: "Customer Support AI", match: 92, pricing: "$74/mo", description: "AI chatbot that resolves 50%+ of customer inquiries instantly. Learns from your knowledge base and previous conversations.", features: ["24/7 AI support", "Knowledge base", "Human handoff", "Analytics"], bestFor: "Customer service automation" },
  { name: "ServiceTitan", category: "Field Service Management", match: 89, pricing: "$89/mo", description: "AI-powered scheduling, dispatching, and job management for trades and field service businesses.", features: ["Smart scheduling", "GPS dispatch", "Job costing", "Customer portal"], bestFor: "Smart scheduling and dispatch" },
  { name: "ActiveCampaign", category: "Email Marketing AI", match: 87, pricing: "$29/mo", description: "AI-driven email marketing with predictive sending, content generation, and automated customer journeys.", features: ["Predictive send", "AI content", "Automation", "CRM built-in"], bestFor: "Email nurture sequences" },
  { name: "Birdeye", category: "Review & Reputation", match: 86, pricing: "$49/mo", description: "Automated review requests, AI response drafting, and reputation monitoring across all platforms.", features: ["Auto review requests", "AI responses", "Sentiment analysis", "Multi-platform"], bestFor: "Review management automation" },
  { name: "QuickBooks AI", category: "Bookkeeping & Accounting", match: 84, pricing: "$30/mo", description: "AI-powered transaction categorization, receipt matching, and financial forecasting built into QuickBooks.", features: ["Auto categorize", "Receipt match", "Cash flow forecast", "Tax prep"], bestFor: "Bookkeeping automation" },
  { name: "Jasper", category: "Content Generation", match: 82, pricing: "$49/mo", description: "AI content platform for marketing copy, social media posts, blog articles, and brand voice consistency.", features: ["Brand voice AI", "Template library", "Team collaboration", "Multi-channel"], bestFor: "Marketing content creation" },
  { name: "Calendly AI", category: "Scheduling", match: 80, pricing: "$12/mo", description: "Smart scheduling with AI-powered routing, buffer times, and availability optimization.", features: ["Smart routing", "Buffer management", "Team scheduling", "Integrations"], bestFor: "Client booking and scheduling" },
  { name: "Power BI", category: "Business Intelligence", match: 78, pricing: "$10/mo", description: "AI-powered dashboards and reporting with natural language queries and predictive analytics.", features: ["AI insights", "Natural language", "Auto dashboards", "Predictive"], bestFor: "Automated reporting and analytics" },
];

export default function VendorsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Vendor & Tool Recommendations</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">AI tools matched to your business needs, ranked by compatibility with your current stack.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-blue-900 mb-1">Why These Tools?</h2>
        <p className="text-xs text-blue-800/60 leading-relaxed">Each tool is scored based on your industry, tech stack, team comfort level, business size, and specific pain points from your questionnaire. Match percentage reflects how well each tool fits your exact situation.</p>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold">Benchmark Pricing</h2>
          <span className="text-[10px] bg-[var(--light-surface)] px-2.5 py-1 rounded-full font-medium text-[var(--mid-gray)]">Based on industry averages</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[var(--light-surface)] rounded-xl">
            <div className="text-2xl font-extrabold">$237</div>
            <div className="text-[10px] text-[var(--mid-gray)]">Avg. monthly AI tool spend</div>
          </div>
          <div className="text-center p-4 bg-[var(--light-surface)] rounded-xl">
            <div className="text-2xl font-extrabold text-green-600">14.2x</div>
            <div className="text-[10px] text-[var(--mid-gray)]">Avg. ROI on AI tool investment</div>
          </div>
          <div className="text-center p-4 bg-[var(--light-surface)] rounded-xl">
            <div className="text-2xl font-extrabold">3-6</div>
            <div className="text-[10px] text-[var(--mid-gray)]">Weeks to see first results</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tools.map((tool, i) => (
          <div key={tool.name} className="bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--light-surface)] border border-black/5 rounded-xl flex items-center justify-center text-sm font-bold">{i + 1}</div>
                <div>
                  <div className="text-sm font-bold flex items-center gap-2">
                    {tool.name}
                    {tool.match >= 95 && <span className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-semibold">Top Pick</span>}
                  </div>
                  <div className="text-[11px] text-[var(--mid-gray)]">{tool.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-green-600">{tool.match}% match</div>
                <div className="text-xs text-[var(--mid-gray)]">from {tool.pricing}</div>
              </div>
            </div>
            <p className="text-xs text-[var(--mid-gray)] leading-relaxed mb-3">{tool.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {tool.features.map((f) => (<span key={f} className="text-[10px] bg-[var(--light-surface)] px-2 py-0.5 rounded font-medium">{f}</span>))}
              </div>
              <span className="text-[10px] text-[var(--mid-gray)] whitespace-nowrap ml-3">Best for: {tool.bestFor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
