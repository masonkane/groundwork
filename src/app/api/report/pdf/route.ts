import { NextResponse } from "next/server";

export async function GET() {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = W - margin * 2;
  let y = 20;

  const addPage = () => { doc.addPage(); y = 20; };
  const checkSpace = (needed: number) => { if (y + needed > 270) addPage(); };

  // Helper: draw section header
  const sectionHeader = (title: string) => {
    checkSpace(20);
    doc.setFillColor(8, 8, 8);
    doc.rect(margin, y, contentW, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 4, y + 7);
    doc.setTextColor(8, 8, 8);
    y += 16;
  };

  // ── Page 1: Cover ──
  doc.setFillColor(8, 8, 8);
  doc.rect(0, 0, W, 100, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("AI Opportunity Report", margin, 45);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Summit Electrical Contractors", margin, 58);
  doc.setFontSize(10);
  doc.text(`Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, margin, 70);
  doc.text("Prepared by Groundwork", margin, 80);

  doc.setTextColor(8, 8, 8);
  y = 115;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", margin, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const summary = "After analyzing your business operations, technology stack, team structure, and industry benchmarks, we identified 18 AI implementation opportunities across four key areas. These range from quick automations you can deploy this week to strategic plays that create lasting competitive advantages over 3-6 months.";
  const lines = doc.splitTextToSize(summary, contentW);
  doc.text(lines, margin, y);
  y += lines.length * 4.5 + 8;

  // Key metrics
  const metrics = [
    { label: "Projected Annual Savings", value: "$142,800" },
    { label: "ROI", value: "580%" },
    { label: "Opportunities Found", value: "18" },
    { label: "Quick Wins Ready Now", value: "5" },
    { label: "AI Readiness Score", value: "67/100" },
    { label: "Competitive Gap", value: "31% behind avg" },
  ];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Key Metrics", margin, y);
  y += 7;

  metrics.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * (contentW / 2);
    const yPos = y + row * 12;
    doc.setFillColor(242, 242, 242);
    doc.rect(x, yPos - 4, contentW / 2 - 3, 10, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 85);
    doc.text(m.label, x + 3, yPos + 1);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(8, 8, 8);
    doc.text(m.value, x + contentW / 2 - 6, yPos + 1, { align: "right" });
  });
  y += Math.ceil(metrics.length / 2) * 12 + 10;

  // ── Page 2: Recommendations ──
  addPage();
  sectionHeader("AI Recommendations by Category");

  const recommendations = [
    { category: "Operations", items: [
      { title: "Automate Invoice Processing", savings: "$28,800/yr", effort: "Low", timeline: "2-4 weeks" },
      { title: "AI-Powered Scheduling System", savings: "$21,600/yr", effort: "Medium", timeline: "4-6 weeks" },
      { title: "Predictive Inventory Management", savings: "$14,400/yr", effort: "Medium", timeline: "6-8 weeks" },
      { title: "Automated Reporting & Dashboards", savings: "$9,600/yr", effort: "Low", timeline: "3-5 weeks" },
      { title: "Document Processing Automation", savings: "$7,200/yr", effort: "Low", timeline: "2-3 weeks" },
      { title: "Quality Control AI Assistant", savings: "$12,000/yr", effort: "High", timeline: "8-12 weeks" },
    ]},
    { category: "Sales & Marketing", items: [
      { title: "AI Lead Follow-Up Sequences", savings: "$37,200/yr", effort: "Low", timeline: "2-3 weeks" },
      { title: "AI Proposal & Estimate Generator", savings: "$18,000/yr", effort: "Medium", timeline: "4-6 weeks" },
      { title: "Social Media Content Engine", savings: "$9,600/yr", effort: "Low", timeline: "1-2 weeks" },
      { title: "AI-Powered Review Management", savings: "$7,200/yr", effort: "Low", timeline: "2-3 weeks" },
      { title: "Competitive Price Intelligence", savings: "$14,400/yr", effort: "Medium", timeline: "6-8 weeks" },
    ]},
    { category: "Customer Experience", items: [
      { title: "AI Customer Communication Hub", savings: "$24,000/yr", effort: "Medium", timeline: "3-5 weeks" },
      { title: "Automated Project Updates", savings: "$8,400/yr", effort: "Medium", timeline: "4-6 weeks" },
      { title: "Post-Job Relationship Nurturing", savings: "$12,000/yr", effort: "Low", timeline: "2-3 weeks" },
      { title: "AI Satisfaction Monitoring", savings: "$6,000/yr", effort: "Medium", timeline: "4-6 weeks" },
    ]},
    { category: "Back Office", items: [
      { title: "AI Bookkeeping Assistant", savings: "$14,400/yr", effort: "Low", timeline: "2-3 weeks" },
      { title: "Smart HR & Onboarding", savings: "$9,600/yr", effort: "Medium", timeline: "4-6 weeks" },
      { title: "AI Contract Analysis", savings: "$7,200/yr", effort: "Low", timeline: "3-4 weeks" },
    ]},
  ];

  recommendations.forEach((cat) => {
    checkSpace(20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${cat.category} (${cat.items.length} opportunities)`, margin, y);
    y += 6;

    // Table header
    doc.setFillColor(242, 242, 242);
    doc.rect(margin, y - 3, contentW, 7, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(85, 85, 85);
    doc.text("Recommendation", margin + 2, y + 1);
    doc.text("Savings", margin + 100, y + 1);
    doc.text("Effort", margin + 128, y + 1);
    doc.text("Timeline", margin + 148, y + 1);
    doc.setTextColor(8, 8, 8);
    y += 7;

    cat.items.forEach((item) => {
      checkSpace(8);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(item.title, margin + 2, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 197, 94);
      doc.text(item.savings, margin + 100, y);
      doc.setTextColor(8, 8, 8);
      doc.setFont("helvetica", "normal");
      doc.text(item.effort, margin + 128, y);
      doc.text(item.timeline, margin + 148, y);
      y += 6;
    });
    y += 6;
  });

  // ── Page 3: Savings Breakdown ──
  addPage();
  sectionHeader("Savings Distribution");

  const areas = [
    { area: "Operations", savings: "$93,600", pct: "34%", items: 6 },
    { area: "Sales & Marketing", savings: "$86,400", pct: "28%", items: 5 },
    { area: "Customer Experience", savings: "$50,400", pct: "22%", items: 4 },
    { area: "Back Office", savings: "$31,200", pct: "16%", items: 3 },
  ];

  areas.forEach((a) => {
    doc.setFillColor(242, 242, 242);
    doc.rect(margin, y - 3, contentW, 10, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(a.area, margin + 3, y + 2);
    doc.text(a.savings, margin + 80, y + 2);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 85);
    doc.text(`${a.pct} of total | ${a.items} opportunities`, margin + 110, y + 2);
    doc.setTextColor(8, 8, 8);
    y += 13;
  });

  y += 8;
  sectionHeader("Implementation Timeline");

  const phases = [
    { phase: "Week 1-2: Quick Wins", desc: "5 low-effort automations. $7,300/mo savings.", items: "Invoice automation, Lead follow-up, Scheduling, Chatbot, Reports" },
    { phase: "Week 3-6: Core Automations", desc: "Deeper integrations. $3,100/mo additional.", items: "Inventory forecasting, Content pipeline, Lead scoring, Sentiment analysis" },
    { phase: "Month 2-3: Sales AI", desc: "Revenue-generating AI. $2,600/mo additional.", items: "Ad optimization, Social listening, Personalized recommendations" },
    { phase: "Month 3-6: Strategic Plays", desc: "Competitive moats. $1,500/mo additional.", items: "Quality control, Fleet optimization, Predictive maintenance, Churn prediction" },
  ];

  phases.forEach((p) => {
    checkSpace(22);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(p.phase, margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(p.desc, margin, y);
    y += 5;
    doc.setTextColor(85, 85, 85);
    const itemLines = doc.splitTextToSize(p.items, contentW);
    doc.text(itemLines, margin, y);
    doc.setTextColor(8, 8, 8);
    y += itemLines.length * 4 + 6;
  });

  // ── Page 4: Tool Recommendations ──
  addPage();
  sectionHeader("Recommended Tool Stack");

  const tools = [
    { name: "HubSpot AI", category: "CRM & Sales", price: "$45/mo", match: "98%" },
    { name: "Docsumo", category: "Invoice Processing", price: "$29/mo", match: "95%" },
    { name: "Intercom Fin", category: "Customer Support", price: "$74/mo", match: "92%" },
    { name: "ServiceTitan", category: "Field Service", price: "$89/mo", match: "89%" },
    { name: "ActiveCampaign", category: "Email Marketing", price: "$29/mo", match: "87%" },
    { name: "QuickBooks AI", category: "Bookkeeping", price: "$30/mo", match: "84%" },
  ];

  // Table header
  doc.setFillColor(242, 242, 242);
  doc.rect(margin, y - 3, contentW, 7, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(85, 85, 85);
  doc.text("Tool", margin + 2, y + 1);
  doc.text("Category", margin + 50, y + 1);
  doc.text("Price", margin + 110, y + 1);
  doc.text("Match", margin + 140, y + 1);
  doc.setTextColor(8, 8, 8);
  y += 8;

  tools.forEach((t) => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(t.name, margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.text(t.category, margin + 50, y);
    doc.text(t.price, margin + 110, y);
    doc.setTextColor(34, 197, 94);
    doc.text(t.match, margin + 140, y);
    doc.setTextColor(8, 8, 8);
    y += 7;
  });

  y += 10;
  sectionHeader("AI Readiness Score: 67/100");

  const dims = [
    { name: "Leadership Buy-In", score: "90/100", status: "Strong" },
    { name: "Process Automation", score: "74/100", status: "Strong" },
    { name: "Technology Stack", score: "72/100", status: "Strong" },
    { name: "Data Maturity", score: "65/100", status: "Moderate" },
    { name: "Team Readiness", score: "58/100", status: "Moderate" },
    { name: "AI Experience", score: "45/100", status: "Needs Work" },
  ];

  dims.forEach((d) => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(d.name, margin + 2, y);
    doc.setFont("helvetica", "bold");
    doc.text(d.score, margin + 60, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 85);
    doc.text(d.status, margin + 90, y);
    doc.setTextColor(8, 8, 8);
    y += 6;
  });

  // Footer on every page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 180);
    doc.text("Groundwork AI Opportunity Report | Confidential", margin, 290);
    doc.text(`Page ${i} of ${totalPages}`, W - margin, 290, { align: "right" });
  }

  const buffer = doc.output("arraybuffer");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Summit-Electrical-AI-Report.pdf"',
    },
  });
}
