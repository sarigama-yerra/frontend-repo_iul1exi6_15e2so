import { useState } from "react";
import { Calculator } from "lucide-react";

const goals = [
  { key: "fat_loss", label: "Fat Loss" },
  { key: "muscle_gain", label: "Muscle Gain" },
  { key: "maintenance", label: "Maintenance" },
];

export default function PlanForm({ onGenerate }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activity: "moderate",
    goal: "fat_loss",
    dietary: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        dietary: checked
          ? [...f.dietary, value]
          : f.dietary.filter((v) => v !== value),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <section id="plan" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Get Your Personalized Diet Plan</h2>
          <p className="mt-2 text-slate-600">Answer a few quick questions and Jatin will tailor a plan just for you.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-600 focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Age</label>
                <input name="age" type="number" min="12" max="90" value={form.age} onChange={handleChange} required className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-600 focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-600 focus:border-indigo-600">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Height (cm)</label>
                <input name="height" type="number" value={form.height} onChange={handleChange} required className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-600 focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Weight (kg)</label>
                <input name="weight" type="number" value={form.weight} onChange={handleChange} required className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-600 focus:border-indigo-600" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700">Activity Level</label>
                <select name="activity" value={form.activity} onChange={handleChange} className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-600 focus:border-indigo-600">
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="athlete">Athlete</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700">Goal</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {goals.map((g) => (
                    <label key={g.key} className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer ${form.goal===g.key?"border-indigo-600 bg-indigo-50":"border-slate-300"}`}>
                      <input type="radio" name="goal" value={g.key} checked={form.goal===g.key} onChange={handleChange} />
                      <span className="text-sm">{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700">Dietary Preferences</label>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  {['vegetarian','vegan','dairy_free','gluten_free','keto'].map((d)=> (
                    <label key={d} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2">
                      <input type="checkbox" value={d} checked={form.dietary.includes(d)} onChange={handleChange} />
                      <span className="capitalize">{d.replace('_',' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-5 py-3 font-medium shadow hover:bg-indigo-700 transition-colors">
              <Calculator className="h-4 w-4" /> Generate Plan
            </button>
          </form>
        </div>
        <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900">How it works</h3>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• We estimate your daily calories using Mifflin-St Jeor formula adjusted for activity.</li>
            <li>• We align macros to your goal: higher protein for muscle, lower carbs for fat loss.</li>
            <li>• We consider your dietary preferences when listing foods.</li>
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-indigo-50 text-indigo-800 p-3">Balanced macros</div>
            <div className="rounded-lg bg-emerald-50 text-emerald-800 p-3">Whole foods first</div>
            <div className="rounded-lg bg-amber-50 text-amber-800 p-3">Hydration focus</div>
            <div className="rounded-lg bg-pink-50 text-pink-800 p-3">Sustainable habits</div>
          </div>
        </div>
      </div>
    </section>
  );
}
