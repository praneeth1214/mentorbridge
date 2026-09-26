import { useState } from 'react'
import {
  CheckCircle, AlertCircle, AlertTriangle, Info, X,
  ArrowRight, Loader, Search, Shield, Sparkles, Bell
} from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <h2 className="text-lg font-bold text-[#0f172a] mb-1 uppercase tracking-widest text-xs border-b border-[#e2e8f0] pb-3 mb-6">{title}</h2>
      {children}
    </div>
  )
}

export default function DesignSystem() {
  const [toastVisible, setToastVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [progress, setProgress] = useState(67)

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[#f5f3ff] border border-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          Design System
        </div>
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">MENTORBRIDGE Design System</h1>
        <p className="text-[#64748b] text-sm">Tokens, components, and patterns used across the product.</p>
      </div>

      {/* Colors */}
      <Section title="Colors">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Navy 900', hex: '#0f172a', bg: 'bg-[#0f172a]', light: true },
            { name: 'Navy 700', hex: '#334155', bg: 'bg-[#334155]', light: true },
            { name: 'Muted', hex: '#64748b', bg: 'bg-[#64748b]', light: true },
            { name: 'Border', hex: '#e2e8f0', bg: 'bg-[#e2e8f0]', light: false },
            { name: 'Indigo 600', hex: '#4f46e5', bg: 'bg-[#4f46e5]', light: true },
            { name: 'Indigo 50', hex: '#eef2ff', bg: 'bg-[#eef2ff]', light: false },
            { name: 'Violet 600', hex: '#7c3aed', bg: 'bg-[#7c3aed]', light: true },
            { name: 'Emerald 500', hex: '#10b981', bg: 'bg-[#10b981]', light: true },
          ].map(color => (
            <div key={color.name} className="rounded-xl overflow-hidden border border-[#e2e8f0]">
              <div className={`${color.bg} h-16`}></div>
              <div className="p-3 bg-white">
                <div className="text-xs font-semibold text-[#0f172a]">{color.name}</div>
                <div className="text-xs text-[#94a3b8] font-mono">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-4 bg-white rounded-xl border border-[#e2e8f0] p-6">
          <div>
            <div className="text-4xl font-bold text-[#0f172a] tracking-tight">Display / H1</div>
            <div className="text-xs text-[#94a3b8] mt-1">Inter Bold · 36px · -0.025em</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0f172a]">Heading / H2</div>
            <div className="text-xs text-[#94a3b8] mt-1">Inter Bold · 24px</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-[#0f172a]">Subheading / H3</div>
            <div className="text-xs text-[#94a3b8] mt-1">Inter Semibold · 18px</div>
          </div>
          <div>
            <div className="text-base text-[#334155]">Body text. Used for descriptions, paragraphs, and main content throughout the application.</div>
            <div className="text-xs text-[#94a3b8] mt-1">Inter Regular · 16px · 1.6 line-height</div>
          </div>
          <div>
            <div className="text-sm text-[#475569]">Small body. Labels, secondary content, and supporting text.</div>
            <div className="text-xs text-[#94a3b8] mt-1">Inter Regular · 14px</div>
          </div>
          <div>
            <div className="text-xs text-[#94a3b8] uppercase tracking-widest font-semibold">LABEL / CAPTION</div>
            <div className="text-xs text-[#94a3b8] mt-1">Inter Semibold · 11px · widest tracking · uppercase</div>
          </div>
          <div>
            <div className="font-mono text-sm text-[#475569]">a3f8c2d91e4b7065f2183a4c6e9d0b2f8</div>
            <div className="text-xs text-[#94a3b8] mt-1">JetBrains Mono · 14px · Hash values, code</div>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center gap-2">
              Primary
              <ArrowRight size={14} />
            </button>
            <button className="bg-white border border-[#e2e8f0] hover:border-[#c7d2fe] text-[#475569] font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm">
              Secondary
            </button>
            <button className="text-indigo-600 hover:bg-[#eef2ff] font-medium px-5 py-2.5 rounded-xl text-sm transition-all">
              Ghost
            </button>
            <button className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm">
              Dark
            </button>
            <button className="bg-[#e2e8f0] text-[#94a3b8] font-semibold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed">
              Disabled
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5">
              <Loader size={12} className="animate-spin" />
              Loading...
            </button>
            <button className="bg-[#ecfdf5] border border-emerald-100 text-emerald-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5">
              <CheckCircle size={12} />
              Success
            </button>
            <button className="bg-[#fff1f2] border border-rose-100 text-rose-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5">
              <X size={12} />
              Destructive
            </button>
          </div>
        </div>
      </Section>

      {/* Inputs */}
      <Section title="Inputs">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Default</label>
              <input type="text" placeholder="Enter value..." className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Focused state</label>
              <input type="text" placeholder="Focused..." className="w-full px-3.5 py-2.5 rounded-lg border border-indigo-400 ring-2 ring-indigo-100 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-rose-500 mb-1.5">Error state</label>
              <input type="text" defaultValue="invalid@" className="w-full px-3.5 py-2.5 rounded-lg border border-rose-300 ring-2 ring-rose-100 text-sm focus:outline-none text-[#0f172a]" />
              <p className="text-xs text-rose-500 mt-1">Please enter a valid email address</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-600 mb-1.5">Success state</label>
              <input type="text" defaultValue="praneeth@iitb.ac.in" className="w-full px-3.5 py-2.5 rounded-lg border border-emerald-300 ring-2 ring-emerald-100 text-sm focus:outline-none text-[#0f172a]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">With icon</label>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input type="text" placeholder="Search mentors..." className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100" />
            </div>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 flex flex-wrap gap-2">
          {[
            { label: 'Default', bg: 'bg-[#f1f5f9]', text: 'text-[#475569]' },
            { label: 'Indigo', bg: 'bg-[#eef2ff]', text: 'text-indigo-700' },
            { label: 'Violet', bg: 'bg-[#f5f3ff]', text: 'text-violet-700' },
            { label: 'Emerald', bg: 'bg-[#ecfdf5]', text: 'text-emerald-700' },
            { label: 'Amber', bg: 'bg-[#fffbeb]', text: 'text-amber-700' },
            { label: 'Rose', bg: 'bg-[#fff1f2]', text: 'text-rose-700' },
            { label: 'Navy', bg: 'bg-[#0f172a]', text: 'text-white' },
          ].map(badge => (
            <span key={badge.label} className={`inline-flex items-center ${badge.bg} ${badge.text} text-xs font-semibold px-2.5 py-1 rounded-full`}>
              {badge.label}
            </span>
          ))}
        </div>
      </Section>

      {/* Alerts */}
      <Section title="Alerts">
        <div className="space-y-3">
          {[
            { type: 'success', icon: CheckCircle, title: 'Mentor connected!', desc: 'Rajesh Kumar accepted your mentorship request.', bg: 'bg-[#ecfdf5]', border: 'border-[#a7f3d0]', title_color: 'text-emerald-800', desc_color: 'text-emerald-700', icon_color: 'text-emerald-500' },
            { type: 'error', icon: AlertCircle, title: 'Connection failed', desc: 'Unable to connect. Please check your internet and try again.', bg: 'bg-[#fff1f2]', border: 'border-rose-200', title_color: 'text-rose-800', desc_color: 'text-rose-600', icon_color: 'text-rose-500' },
            { type: 'warning', icon: AlertTriangle, title: 'Trust chain warning', desc: 'Tampering detected in record #3. Chain integrity may be compromised.', bg: 'bg-[#fffbeb]', border: 'border-amber-200', title_color: 'text-amber-800', desc_color: 'text-amber-600', icon_color: 'text-amber-500' },
            { type: 'info', icon: Info, title: 'New mentors available', desc: '3 new professionals matching your challenge profile joined this week.', bg: 'bg-[#eef2ff]', border: 'border-indigo-100', title_color: 'text-indigo-800', desc_color: 'text-indigo-600', icon_color: 'text-indigo-500' },
          ].map(alert => (
            <div key={alert.type} className={`flex items-start gap-3 p-4 rounded-xl border ${alert.bg} ${alert.border}`}>
              <alert.icon size={18} className={`${alert.icon_color} flex-shrink-0 mt-0.5`} />
              <div>
                <div className={`text-sm font-semibold ${alert.title_color}`}>{alert.title}</div>
                <div className={`text-xs ${alert.desc_color} mt-0.5`}>{alert.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress Indicators">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-[#334155]">Chain Integrity</span>
              <span className="text-xs text-[#64748b]">{progress}%</span>
            </div>
            <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(Number(e.target.value))} className="mt-2 w-full accent-indigo-600" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin"></div>
              <span className="text-sm text-[#475569]">Loading</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse-dot" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
              <span className="text-sm text-[#475569]">AI analyzing</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-500 animate-pulse-dot" />
              <span className="text-sm text-[#475569]">Processing</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Empty states */}
      <Section title="Empty States">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-dashed border-[#e2e8f0] p-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center mx-auto mb-3">
              <Search size={18} className="text-indigo-400" />
            </div>
            <div className="text-sm font-semibold text-[#334155] mb-1">No mentors found</div>
            <p className="text-xs text-[#94a3b8] mb-4">Try describing your challenge with more detail.</p>
            <button className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-semibold">
              Refine search <ArrowRight size={13} />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-dashed border-[#e2e8f0] p-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center mx-auto mb-3">
              <Shield size={18} className="text-emerald-500" />
            </div>
            <div className="text-sm font-semibold text-[#334155] mb-1">Trust Ledger is empty</div>
            <p className="text-xs text-[#94a3b8] mb-4">Records will appear here once you start a mentor search.</p>
            <button className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-semibold">
              Find a mentor <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </Section>

      {/* Toast / Modal demo */}
      <Section title="Toasts & Modals">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => { setToastVisible(true); setTimeout(() => setToastVisible(false), 3000) }}
            className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <Bell size={14} />
            Show Toast
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm"
          >
            Open Modal
          </button>
        </div>

        {/* Toast */}
        {toastVisible && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <div className="bg-[#0f172a] text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-[280px]">
              <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-semibold">Request sent successfully</div>
                <div className="text-xs text-white/60">Rajesh Kumar will respond within 24h</div>
              </div>
              <button onClick={() => setToastVisible(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-bold text-[#0f172a] text-lg">Request Mentorship</h3>
                  <p className="text-[#64748b] text-sm mt-0.5">Send a request to Rajesh Kumar</p>
                </div>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#475569] transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">Message (optional)</label>
                <textarea rows={3} placeholder="Introduce yourself and describe your challenge briefly..." className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#475569] font-medium py-2.5 rounded-xl text-sm transition-colors border border-[#e2e8f0]">Cancel</button>
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                  Send Request <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Loading skeleton */}
      <Section title="Skeleton / Loading States">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl skeleton flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 skeleton rounded-lg w-1/3"></div>
              <div className="h-3 skeleton rounded-lg w-1/2"></div>
              <div className="h-3 skeleton rounded-lg w-2/3"></div>
              <div className="flex gap-2 mt-3">
                <div className="h-6 skeleton rounded-full w-16"></div>
                <div className="h-6 skeleton rounded-full w-20"></div>
                <div className="h-6 skeleton rounded-full w-14"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-8 w-12 skeleton rounded-lg"></div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
