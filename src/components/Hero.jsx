import { Rocket, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-pink-50" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 text-indigo-700 px-3 py-1 text-xs font-medium ring-1 ring-indigo-600/20">
            <Star className="h-3.5 w-3.5" /> Your AI Fitness Coach
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Meet Jatin — Your Personal Gym Trainer
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Get a smart, personalized diet plan tailored to your goals, body type, and lifestyle. Build muscle, lose fat, or maintain — Jatin has your back.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#plan" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-5 py-3 font-medium shadow hover:bg-indigo-700 transition-colors">
              <Rocket className="h-4 w-4" /> Get Your Plan
            </a>
            <a href="#about" className="inline-flex items-center rounded-lg bg-white text-slate-900 px-5 py-3 font-medium shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition-colors">
              Learn More
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square md:aspect-[4/5] rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
            <div className="h-full w-full rounded-[22px] bg-white grid place-items-center p-8">
              <img
                src="https://images.unsplash.com/photo-1596357395104-5b5e7b36a8dc?q=80&w=1600&auto=format&fit=crop"
                alt="Coach Jatin"
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
