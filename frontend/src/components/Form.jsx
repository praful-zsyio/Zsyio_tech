import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { submitContact } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await submitContact(formData);
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      const errorMessage = error.response?.data?.detail || error.message || "Failed to send message. Please try again.";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 md:py-28 bg-[hsl(var(--base))]">
      {/* subtle background grid */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]
          bg-[size:24px_24px]
        "
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs text-[hsl(var(--subtext1))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            Contact
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text))]">
            Let’s Talk
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base">
            Have a project in mind or a question about our work?
            Reach out — we usually respond within one business day.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Info */}
          <div
            className="
              rounded-2xl border border-[hsl(var(--surface1))]
              bg-[hsl(var(--mantle))]/80
              backdrop-blur-xl
              p-8 space-y-8
            "
          >
            <div>
              <h3 className="text-xl font-semibold text-[hsl(var(--text))] mb-2">
                Get in touch
              </h3>
              <p className="text-sm text-[hsl(var(--subtext1))]">
                Whether you’re exploring an idea, need technical guidance,
                or want to collaborate — we’d love to hear from you.
              </p>
            </div>

            <ContactDetail
              icon={<MapPin className="w-5 h-5 text-[hsl(var(--blue))]" />}
              title="Location"
              detail="Indore India"
            />

            <ContactDetail
              icon={<Phone className="w-5 h-5 text-[hsl(var(--blue))]" />}
              title="Phone"
              detail="+91 9179182729"
            />

            <ContactDetail
              icon={<Mail className="w-5 h-5 text-[hsl(var(--blue))]" />}
              title="Email"
              detail="zsyio.official@zsyio.com"
            />
          </div>

          {/* RIGHT: Form */}
          <div
            className="
              rounded-2xl border border-[hsl(var(--surface1))]
              bg-[hsl(var(--mantle))]/80
              backdrop-blur-xl
              p-8
            "
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {status.message}
                </div>
              )}

              <Input
                name="name"
                placeholder="Your name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                placeholder="Your email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                name="phone"
                placeholder="Your phone (optional)"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="
                  w-full rounded-xl border border-[hsl(var(--surface2))]
                  bg-[hsl(var(--base))]
                  px-4 py-3
                  text-sm text-[hsl(var(--text))]
                  placeholder:text-[hsl(var(--subtext0))]
                  focus:outline-none focus:border-[hsl(var(--blue))]
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full rounded-xl
                  bg-[hsl(var(--blue))]
                  text-[hsl(var(--base))]
                  py-3 text-sm font-semibold
                  hover:bg-[hsl(var(--sapphire))]
                  transition-colors
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactDetail = ({ icon, title, detail }) => (
  <div className="flex items-start gap-4">
    <div
      className="
        flex items-center justify-center
        w-10 h-10 rounded-xl
        bg-[hsl(var(--blue))]/15
        border border-[hsl(var(--blue))]/30
      "
    >
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-semibold text-[hsl(var(--text))]">
        {title}
      </h4>
      <p className="text-sm text-[hsl(var(--subtext1))]">{detail}</p>
    </div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="
      w-full rounded-xl border border-[hsl(var(--surface2))]
      bg-[hsl(var(--base))]
      px-4 py-3
      text-sm text-[hsl(var(--text))]
      placeholder:text-[hsl(var(--subtext0))]
      focus:outline-none focus:border-[hsl(var(--blue))]
    "
  />
);

export default Contact;
