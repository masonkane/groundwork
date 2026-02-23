"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, weekly: true, quarterly: true });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Manage your account, subscription, and notification preferences.</p>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5">
        {/* Account */}
        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Account Information</h2>
          <div className="grid gap-4">
            {[
              { label: "Company Name", value: "Acme Construction LLC" },
              { label: "Contact Name", value: "Josh Freeland" },
              { label: "Email", value: "josh@acmeconstruction.com" },
              { label: "Industry", value: "Construction / Electrical" },
              { label: "Company Size", value: "11-50 employees" },
              { label: "Annual Revenue", value: "$1M - $5M" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">{field.label}</label>
                <div className="text-sm font-medium bg-[var(--light-surface)] rounded-lg px-4 py-2.5 border border-black/5">{field.value}</div>
              </div>
            ))}
          </div>
          <button className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] mt-4 transition-colors">Edit Account Info</button>
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
              <button className="text-xs font-semibold bg-white text-[var(--black)] px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">Upgrade</button>
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
            <button className="w-full flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg hover:bg-black/[0.03] transition-colors">
              <div>
                <div className="text-xs font-semibold">Export your data</div>
                <div className="text-[10px] text-[var(--mid-gray)]">Download your full report, questionnaire responses, and tracking data</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg hover:bg-black/[0.03] transition-colors">
              <div>
                <div className="text-xs font-semibold">Retake questionnaire</div>
                <div className="text-[10px] text-[var(--mid-gray)]">Update your business information for more accurate recommendations</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100/50 transition-colors text-red-600">
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
