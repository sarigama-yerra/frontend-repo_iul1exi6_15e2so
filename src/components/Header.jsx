import { Dumbbell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-indigo-600" />
          <span className="font-bold tracking-tight text-slate-900 text-lg">Coach Jatin</span>
        </a>
        <nav className="flex items-center gap-6 text-sm text-slate-700">
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#plan" className="hover:text-indigo-600 transition-colors">Get Plan</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <User className="h-4 w-4" /> Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
