"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Manage your account and subscription.</p>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5">
        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Account Information</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">Company Name</label>
              <div className="text-sm font-medium bg-[var(--light-surface)] rounded-lg px-4 py-2.5">Acme Construction LLC</div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">Email</label>
              <div className="text-sm font-medium bg-[var(--light-surface)] rounded-lg px-4 py-2.5">josh@acmeconstruction.com</div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--mid-gray)] block mb-1">Industry</label>
              <div className="text-sm font-medium bg-[var(--light-surface)] rounded-lg px-4 py-2.5">Construction</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-sm font-bold mb-4">Subscription</h2>
          <div className="flex items-center justify-between p-4 bg-[var(--light-surface)] rounded-xl">
            <div>
              <div className="text-sm font-bold">Hands-Off Plan</div>
              <div className="text-xs text-[var(--mid-gray)]">Full report, dashboard, playbooks, quarterly audits</div>
            </div>
            <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">Active</span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-sm font-bold mb-2">Upgrade to Hands-On</h2>
          <p className="text-xs text-[var(--mid-gray)] mb-4">Get personalized implementation support, live training sessions, vendor negotiation, and priority access.</p>
          <button className="bg-[var(--black)] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[var(--dark-surface)] transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
