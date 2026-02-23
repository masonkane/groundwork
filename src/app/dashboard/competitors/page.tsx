"use client";

const insights = [
  { stat: "64%", title: "Using AI for Customer Service", desc: "Competitors in your industry have deployed chatbots, automated email responses, and AI-powered phone systems. Customers now expect instant responses." },
  { stat: "41%", title: "Automated Invoicing & Billing", desc: "Nearly half of your competitors have eliminated manual invoicing. They process payments faster and have significantly lower accounts receivable aging." },
  { stat: "37%", title: "AI-Powered Lead Generation", desc: "Competitors using AI for lead gen report 3.2x faster response times and 28% higher conversion rates on inbound inquiries." },
  { stat: "52%", title: "Predictive Scheduling & Dispatch", desc: "Over half of comparable businesses use AI to optimize scheduling. They complete 15-20% more jobs per week with the same crew size." },
  { stat: "29%", title: "Automated Marketing Content", desc: "AI-generated social media, email campaigns, and blog content is keeping competitors visible online without dedicated marketing staff." },
  { stat: "18%", title: "AI Contract & Document Analysis", desc: "Early adopters are using AI to review contracts, identify risk, and generate proposals 5x faster than manual processes." },
];

export default function CompetitorsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Competitive Intelligence</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">What businesses in your industry are already doing with AI.</p>
      </div>

      <div className="bg-[var(--black)] text-white rounded-2xl p-8">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Key Finding</p>
        <h2 className="text-2xl font-extrabold mb-3">Your competitors are not waiting.</h2>
        <p className="text-white/60 leading-relaxed">Based on industry analysis, the majority of comparable businesses in your sector have already implemented at least one AI solution. The companies moving fastest are seeing measurable advantages in speed, cost, and customer satisfaction.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {insights.map((item) => (
          <div key={item.title} className="bg-white border border-black/5 rounded-xl p-6 hover:border-black/10 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-extrabold mb-2">{item.stat}</div>
            <h3 className="text-sm font-bold mb-2">{item.title}</h3>
            <p className="text-xs text-[var(--mid-gray)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
