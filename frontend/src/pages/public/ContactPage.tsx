// frontend/src/pages/public/ContactPage.tsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
    toast.success('Message sent!');
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-cyan-600 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <MessageSquare className="w-12 h-12 text-cyan-200 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Get In Touch</h1>
          <p className="mt-4 text-lg text-cyan-100">Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'support@iul.ac.in', href: 'mailto:support@iul.ac.in', color: 'bg-blue-100 text-blue-600' },
                  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 123 456 7890', href: 'tel:+911234567890', color: 'bg-green-100 text-green-600' },
                  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: 'Department of CSE, Integral University, Kursi Road, Lucknow — 226026', color: 'bg-purple-100 text-purple-600' },
                  { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Monday - Friday\n9:00 AM - 5:00 PM IST', color: 'bg-orange-100 text-orange-600' },
                ].map(item => (
                  <div key={item.label} className="flex gap-4">
                    <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-900 hover:text-blue-600 transition-colors whitespace-pre-line">{item.value}</a>
                      ) : (
                        <p className="text-gray-900 whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Integral University, Lucknow</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-green-50 rounded-2xl border border-green-200 p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white rounded-2xl border p-8 shadow-sm space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-sm text-gray-500 mb-6">Fill out the form below and we'll respond as soon as possible.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@iul.ac.in" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a topic</option>
                    <option value="account">Account Issues</option>
                    <option value="password">Password Reset</option>
                    <option value="allocation">Allocation Question</option>
                    <option value="team">Team Issue</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} required rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us what you need help with..." />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
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