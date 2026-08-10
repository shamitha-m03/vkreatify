import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EASE = [0.16, 1, 0.3, 1];

const inputCls =
  "w-full bg-transparent border-b border-white/15 focus:border-[#ffd76a]/70 outline-none py-3.5 text-sm text-white placeholder:text-white/25 transition-colors duration-500";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "",
    budget: "",
    details: "",
  });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message received. The vKreatify team will get back to you.");
      setForm({ name: "", company: "", phone: "", email: "", service: "", budget: "", details: "" });
    } catch {
      toast.error("Could not send right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative px-6 sm:px-10 py-32 sm:py-56">
      <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-10">
        ( Start Something )
      </p>

      <h2 className="font-display font-semibold uppercase tracking-tight leading-[0.95] text-[clamp(2.4rem,7.5vw,6.8rem)] max-w-6xl mb-20 sm:mb-32">
        {["LET'S CREATE", "SOMETHING", "MEMORABLE."].map((line, i) => (
          <span key={line} className="mask-line">
            <motion.span
              className={`block ${i === 2 ? "text-stroke-gold" : ""}`}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <div className="grid lg:grid-cols-12 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-4 space-y-10"
        >
          <p className="text-sm leading-relaxed text-white/55 max-w-xs">
            Have a project, campaign, or brand idea? Tell us what you need, and
            the vKreatify team will get back to you.
          </p>
          <div className="space-y-6 font-mono-x text-xs">
            <div>
              <p className="text-white/30 tracking-[0.3em] uppercase mb-1.5">Instagram</p>
              <a
                data-testid="contact-instagram-link"
                data-cursor="link"
                href="https://instagram.com/vkreatify.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffd76a] hover:text-white transition-colors duration-500"
              >
                @vkreatify.digital
              </a>
            </div>
            <div>
              <p className="text-white/30 tracking-[0.3em] uppercase mb-1.5">Studio</p>
              <p className="text-white/60 leading-relaxed">
                Balaji Nagar, Coimbatore South<br />Tamil Nadu — 641044, India
              </p>
            </div>
            <div>
              <p className="text-white/30 tracking-[0.3em] uppercase mb-1.5">Phone / WhatsApp / Email</p>
              <p className="text-white/60">Shared on project inquiry</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          data-testid="contact-form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8"
        >
          <input data-testid="contact-input-name" required placeholder="Name *" value={form.name} onChange={set("name")} className={inputCls} />
          <input data-testid="contact-input-company" placeholder="Company Name" value={form.company} onChange={set("company")} className={inputCls} />
          <input data-testid="contact-input-phone" placeholder="Phone Number" value={form.phone} onChange={set("phone")} className={inputCls} />
          <input data-testid="contact-input-email" required type="email" placeholder="Email Address *" value={form.email} onChange={set("email")} className={inputCls} />
          <select data-testid="contact-select-service" required value={form.service} onChange={set("service")} className={`${inputCls} ${form.service ? "" : "text-white/25"} [&>option]:bg-[#0a0a0e]`}>
            <option value="" disabled>Service Required *</option>
            <option>Reels & Short-Form Video</option>
            <option>Creative Posters</option>
            <option>Visual Branding</option>
            <option>Social Media Content</option>
            <option>Brand Communication</option>
            <option>Something Else</option>
          </select>
          <select data-testid="contact-select-budget" value={form.budget} onChange={set("budget")} className={`${inputCls} ${form.budget ? "" : "text-white/25"} [&>option]:bg-[#0a0a0e]`}>
            <option value="" disabled>Project Budget</option>
            <option>Under ₹25,000</option>
            <option>₹25,000 — ₹75,000</option>
            <option>₹75,000 — ₹2,00,000</option>
            <option>Above ₹2,00,000</option>
          </select>
          <textarea
            data-testid="contact-input-details"
            required
            placeholder="Project Details *"
            rows={4}
            value={form.details}
            onChange={set("details")}
            className={`${inputCls} sm:col-span-2 resize-none`}
          />
          <div className="sm:col-span-2 pt-4">
            <button
              data-testid="contact-submit-button"
              data-cursor="link"
              type="submit"
              disabled={sending}
              className="group relative overflow-hidden rounded-full border border-[#ffd76a]/50 px-10 py-4 font-grotesk text-[11px] tracking-[0.25em] uppercase text-[#ffd76a] disabled:opacity-40"
            >
              <span className="absolute inset-0 bg-[#ffd76a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
              <span className="relative group-hover:text-[#050508] transition-colors duration-500">
                {sending ? "Sending..." : "Send Inquiry"}
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
