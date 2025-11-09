import { Mail, Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-slate-900">Coach Jatin</h4>
          <p className="mt-2 text-sm text-slate-600">Certified gym trainer helping you get leaner, stronger, and healthier with personalized diet guidance.</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Contact</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> coach.jatin@example.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Follow</h4>
          <a href="#" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 text-sm shadow">
            <Instagram className="h-4 w-4" /> @coach.jatin
          </a>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Coach Jatin. All rights reserved.</div>
    </footer>
  );
}
