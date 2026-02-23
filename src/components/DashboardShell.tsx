"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoFull } from "./Logo";

const navSections = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
    ],
  },
  {
    label: "Insights",
    items: [
      { name: "AI Opportunity Report", href: "/dashboard/report", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
      { name: "ROI & Cost Savings", href: "/dashboard/roi", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg> },
      { name: "AI Readiness Score", href: "/dashboard/readiness", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> },
      { name: "Competitive Intel", href: "/dashboard/competitors", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg> },
    ],
  },
  {
    label: "Action",
    items: [
      { name: "Quick Wins", href: "/dashboard/quick-wins", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg> },
      { name: "Playbooks", href: "/dashboard/playbooks", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg> },
      { name: "ROI Tracking", href: "/dashboard/tracking", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg> },
      { name: "Quarterly Audits", href: "/dashboard/audits", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
    ],
  },
  {
    label: "Resources",
    items: [
      { name: "Vendor & Tools", href: "/dashboard/vendors", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg> },
      { name: "Team Training", href: "/dashboard/training", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg> },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Settings", href: "/dashboard/settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
    ],
  },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--light-surface)] flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-black/5 z-50 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-black/5 ${collapsed ? "px-4 justify-center" : "px-5"}`}>
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" fill="none" className="w-7 h-7">
              <rect x="29" y="0" width="27" height="22" rx="8" fill="#080808" />
              <rect x="16" y="26" width="54" height="24" rx="8" fill="#080808" />
              <rect x="0" y="54" width="86" height="28" rx="9" fill="#080808" />
            </svg>
          ) : (
            <LogoFull className="h-6 w-auto" />
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map((section) => (
            <div key={section.label} className="mb-4">
              {!collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--mid-gray)]/40 px-2 mb-2">
                  {section.label}
                </p>
              )}
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                      active
                        ? "bg-[var(--black)] text-white"
                        : "text-[var(--mid-gray)] hover:bg-black/[0.03] hover:text-[var(--black)]"
                    } ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? item.name : undefined}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-12 items-center justify-center border-t border-black/5 text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`transition-transform ${collapsed ? "rotate-180" : ""}`}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {!collapsed && <span className="text-xs ml-2">Collapse</span>}
        </button>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}>
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-6 sticky top-0 z-30">
          <button className="lg:hidden text-[var(--mid-gray)]" onClick={() => setMobileOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 bg-[var(--light-surface)] rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-[var(--mid-gray)]">Hands-Off Plan</span>
            </div>
            <div className="w-8 h-8 bg-[var(--black)] text-white rounded-full flex items-center justify-center text-xs font-bold">
              J
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
