// frontend/src/pages/public/ContactPage.tsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true); setLoading(false); toast.success('Message sent!');
  };

  const inputCls = "w-full px-4 py-3 bg-cream-200 dark:bg-white/5 border border-cream-300 dark:border-white/10 rounded-xl text-stone-800 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 outline-none transition-all";

  return (
    <div className="bg-cream-100 dark:bg-slate-950 transition-colors">
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 dark:from-slate-950 dark:to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-sky-300/20 dark:bg-cyan-600/15 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-blue-300/15 dark:bg-transparent rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-100 dark:text-cyan-400 uppercase tracking-wider mb-4 animate-fade-in-down"><Sparkles className="w-4 h-4" />Contact</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white animate-fade-in-up">Get In Touch</h1>
          <p className="mt-5 text-lg text-sky-100 dark:text-slate-400 animate-fade-in-up delay-200">Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-left">
            <div>
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'support@iul.ac.in', href: 'mailto:support@iul.ac.in', color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10' },
                  { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '+91 123 456 7890', href: 'tel:+911234567890', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10' },
                  { icon: <MapPin className="w-4 h-4" />, label: 'Address', value: 'Department of CSE, Integral University, Kursi Road, Lucknow — 226026', color: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10' },
                  { icon: <Clock className="w-4 h-4" />, label: 'Hours', value: 'Monday - Friday\n9:00 AM - 5:00 PM IST', color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10' },
                ].map(item => (
                  <div key={item.label} className="flex gap-4">
                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
                    <div>
                      <p className="text-xs font-medium text-stone-400 dark:text-slate-500 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-stone-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors whitespace-pre-line text-sm mt-0.5 block">{item.value}</a>
                      ) : (
                        <p className="text-stone-700 dark:text-slate-300 whitespace-pre-line text-sm mt-0.5">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cream-200 dark:bg-white/[0.03] border border-cream-300 dark:border-white/10 rounded-2xl h-48 flex items-center justify-center">
              <div className="text-center text-stone-400 dark:text-slate-500"><MapPin className="w-8 h-8 mx-auto mb-2" /><p className="text-sm">Integral University, Lucknow</p></div>
            </div>
          </div>

          <div className="lg:col-span-3 animate-fade-in-right">
            {sent ? (
              <div className="bg-emerald-50 dark:bg-emerald-500/5 rounded-3xl border border-emerald-200 dark:border-emerald-500/20 p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-stone-800 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-stone-500 dark:text-slate-400 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="px-6 py-3 bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-500/25 transition-colors font-medium">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-cream-50 dark:bg-white/[0.03] rounded-3xl border border-cream-300 dark:border-white/10 p-8 shadow-lg dark:shadow-none space-y-5">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-1">Send us a Message</h2>
                <p className="text-sm text-stone-500 dark:text-slate-500 mb-6">Fill out the form below and we'll respond as soon as possible.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-stone-600 dark:text-slate-300 mb-2">Full Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} required className={inputCls} placeholder="Your name" /></div>
                  <div><label className="block text-sm font-medium text-stone-600 dark:text-slate-300 mb-2">Email *</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} required className={inputCls} placeholder="you@iul.ac.in" /></div>
                </div>
                <div><label className="block text-sm font-medium text-stone-600 dark:text-slate-300 mb-2">Subject *</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)} required className={inputCls}>
                    <option value="" className="dark:bg-slate-900">Select a topic</option>
                    <option value="account" className="dark:bg-slate-900">Account Issues</option>
                    <option value="password" className="dark:bg-slate-900">Password Reset</option>
                    <option value="allocation" className="dark:bg-slate-900">Allocation Question</option>
                    <option value="team" className="dark:bg-slate-900">Team Issue</option>
                    <option value="bug" className="dark:bg-slate-900">Report a Bug</option>
                    <option value="other" className="dark:bg-slate-900">Other</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-stone-600 dark:text-slate-300 mb-2">Message *</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} required rows={5} className={`${inputCls} resize-none`} placeholder="Tell us what you need help with..." />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-slate-700 dark:disabled:to-slate-700 disabled:text-stone-500 dark:disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20">
                  {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;