"use client";

import { useState, useEffect } from "react";
import { showToast } from "@/components/Toast";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(() => {
    if (typeof window === 'undefined') return { email: true, sms: false, weekly: true, quarterly: true };
    try {
      const saved = localStorage.getItem('gw_notification_settings');
      return saved ? JSON.parse(saved) : { email: true, sms: false, weekly: true, quarterly: true };
    } catch { return { email: true, sms: false, weekly: true, quarterly: true }; }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCompany, setEditCompany] = useState("Summit Electrical Contractors");
  const [editContact, setEditContact] = useState("Mike Reeves");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gw_account_info");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.companyName) setEditCompany(parsed.companyName);
        if (parsed.contactName) setEditContact(parsed.contactName);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('gw_notification_settings', JSON.stringify(notifications));
  }, [notifications]);

  const accountFields = [
    { label: "Company Name", value: editCompany },
    { label: "Contact Name", value: editContact },
    { label: "Email", value: "mike@summitelectrical.com" },
    { label: "Industry", value: "Electrical Contracting" },
    { label: "Company Size", value: "45 employees" },
    { label: "Annual Revenue", value: "$8M" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Manage your account, subscription, and notification preferences.</p>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowUpgradeModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full mx-4 p-6 space-y-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold">Choose Your Plan</h2>
              <button onClick={() => setShowUpgradeModal(false)} className="text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Hands-Off */}
            <div className="p-4 bg-[var(--light-surface)] rounded-xl border border-black/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold">Hands-Off</div>
                  <div className="text-xs text-[var(--mid-gray)]">$297/month</div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">Current</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--mid-gray)] mb-3">
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>AI opportunity report</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Dashboard access</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Implementation playbooks</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Quarterly audits</li>
              </ul>
              <a href="mailto:hello@groundwork.ai?subject=Hands-Off%20Plan%20Inquiry" className="text-xs font-semibold text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Contact Us →</a>
            </div>

            {/* Hands-On */}
            <div className="p-4 bg-[var(--black)] text-white rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold">Hands-On</div>
                  <div className="text-xs text-white/50">$997/month</div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/10">Recommended</span>
              </div>
              <ul className="space-y-1.5 text-xs text-white/60 mb-3">
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Everything in Hands-Off</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Personalized implementation support</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Live training sessions</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Vendor negotiation support</li>
                <li className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>Priority access</li>
              </ul>
              <a href="mailto:hello@groundwork.ai?subject=Hands-On%20Plan%20Inquiry" className="text-xs font-semibold text-white/80 hover:text-white transition-colors">Contact Us →</a>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5">
        {/* Account */}
        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Account Information</h2>
          {isEditing ? (
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">Company Name</label>
                <input
                  type="text"
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  className="w-full text-sm font-medium bg-white rounded-lg px-4 py-2.5 border border-black/10 focus:border-black/30 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">Contact Name</label>
                <input
                  type="text"
                  value={editContact}
                  onChange={(e) => setEditContact(e.target.value)}
                  className="w-full text-sm font-medium bg-white rounded-lg px-4 py-2.5 border border-black/10 focus:border-black/30 focus:outline-none transition-colors"
                />
              </div>
              {accountFields.slice(2).map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">{field.label}</label>
                  <div className="text-sm font-medium bg-[var(--light-surface)] rounded-lg px-4 py-2.5 border border-black/5">{field.value}</div>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => {
                    localStorage.setItem("gw_account_info", JSON.stringify({ companyName: editCompany, contactName: editContact }));
                    setIsEditing(false);
                    showToast("Account info saved");
                  }}
                  className="text-xs font-semibold bg-[var(--black)] text-white px-4 py-2 rounded-lg hover:bg-[var(--dark-surface)] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    try {
                      const saved = localStorage.getItem("gw_account_info");
                      if (saved) {
                        const parsed = JSON.parse(saved);
                        setEditCompany(parsed.companyName || "Summit Electrical Contractors");
                        setEditContact(parsed.contactName || "Mike Reeves");
                      } else {
                        setEditCompany("Summit Electrical Contractors");
                        setEditContact("Mike Reeves");
                      }
                    } catch {
                      setEditCompany("Summit Electrical Contractors");
                      setEditContact("Mike Reeves");
                    }
                    setIsEditing(false);
                  }}
                  className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {accountFields.map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">{field.label}</label>
                    <div className="text-sm font-medium bg-[var(--light-surface)] rounded-lg px-4 py-2.5 border border-black/5">{field.value}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsEditing(true)} className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] mt-4 transition-colors">Edit Account Info</button>
            </>
          )}
        </div>

        {/* Subscription */}
        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Subscription</h2>
          <div className="p-4 bg-[var(--light-surface)] rounded-xl border border-black/5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-bold">Hands-Off Plan</div>
                <div className="text-xs text-[var(--mid-gray)]">$297/month</div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {["Full AI opportunity report", "Interactive dashboard", "8 implementation playbooks", "Quarterly AI audits", "ROI tracking", "Vendor recommendations"].map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-[var(--black)] text-white rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-bold">Upgrade to Hands-On</div>
                <div className="text-xs text-white/50">$997/month</div>
              </div>
              <button onClick={() => setShowUpgradeModal(true)} className="text-xs font-semibold bg-white text-[var(--black)] px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">Upgrade</button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-white/60">
              {["Everything in Hands-Off", "Dedicated implementation team", "Live training sessions", "Vendor negotiation support", "Priority support", "Custom integrations"].map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Notifications</h2>
          <div className="space-y-3">
            {[
              { key: "email" as const, label: "Email notifications", desc: "Implementation tips, new tool recommendations, and savings alerts" },
              { key: "sms" as const, label: "SMS alerts", desc: "Critical updates only: audit reminders and major savings milestones" },
              { key: "weekly" as const, label: "Weekly progress digest", desc: "Summary of implementation progress and savings tracked this week" },
              { key: "quarterly" as const, label: "Quarterly audit reminders", desc: "Get reminded 2 weeks before each quarterly audit" },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg">
                <div>
                  <div className="text-xs font-semibold">{pref.label}</div>
                  <div className="text-[10px] text-[var(--mid-gray)]">{pref.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${notifications[pref.key] ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${notifications[pref.key] ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data */}
        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Data & Privacy</h2>
          <div className="space-y-3">
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/api/report/pdf";
                link.download = "Summit-Electrical-AI-Report.pdf";
                link.click();
                showToast("Downloading report PDF");
              }}
              className="w-full flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg hover:bg-black/[0.03] transition-colors"
            >
              <div>
                <div className="text-xs font-semibold">Export your data</div>
                <div className="text-[10px] text-[var(--mid-gray)]">Download your full report, questionnaire responses, and tracking data</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button
              onClick={() => { window.location.href = "/questionnaire"; }}
              className="w-full flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg hover:bg-black/[0.03] transition-colors"
            >
              <div>
                <div className="text-xs font-semibold">Retake questionnaire</div>
                <div className="text-[10px] text-[var(--mid-gray)]">Update your business information for more accurate recommendations</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure? This will clear all your data.")) {
                  const keys = Object.keys(localStorage).filter((k) => k.startsWith("gw_"));
                  keys.forEach((k) => localStorage.removeItem(k));
                  window.location.href = "/";
                }
              }}
              className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100/50 transition-colors text-red-600"
            >
              <div>
                <div className="text-xs font-semibold">Delete account</div>
                <div className="text-[10px] text-red-400">Permanently delete your account and all associated data</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
