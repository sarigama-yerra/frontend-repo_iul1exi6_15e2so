import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";

function calcBMR({ gender, weight, height, age }) {
  const w = Number(weight);
  const h = Number(height);
  const a = Number(age);
  return gender === "male"
    ? 10 * w + 6.25 * h - 5 * a + 5
    : 10 * w + 6.25 * h - 5 * a - 161;
}

function activityMultiplier(level) {
  return {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9,
  }[level] || 1.55;
}

function macroSplit(goal) {
  switch (goal) {
    case "fat_loss":
      return { protein: 0.35, carbs: 0.35, fat: 0.30 };
    case "muscle_gain":
      return { protein: 0.30, carbs: 0.45, fat: 0.25 };
    default:
      return { protein: 0.30, carbs: 0.40, fat: 0.30 };
  }
}

function kcalToGrams(kcal, pct) {
  const p = kcal * pct;
  // protein & carbs 4 kcal/g, fat 9 kcal/g -> handled by caller
  return p;
}

function foodSuggestions(dietary = []) {
  const avoid = new Set(dietary);
  const picks = {
    proteins: [
      "Chicken breast",
      "Egg whites",
      avoid.has("vegan") ? null : "Greek yogurt",
      avoid.has("vegan") || avoid.has("vegetarian") ? null : "Salmon",
      avoid.has("vegan") ? "Tofu" : "Tofu",
      avoid.has("vegan") ? "Tempeh" : "Turkey mince",
      "Lentils",
    ].filter(Boolean),
    carbs: ["Oats", "Quinoa", "Brown rice", "Sweet potato", "Mixed berries"],
    fats: [
      avoid.has("dairy_free") ? "Avocado" : "Avocado",
      "Olive oil",
      "Almonds",
      "Chia seeds",
      "Peanut butter",
    ],
  };
  return picks;
}

export default function PlanResult({ data }) {
  const result = useMemo(() => {
    if (!data) return null;
    const bmr = calcBMR(data);
    const tdee = Math.round(bmr * activityMultiplier(data.activity));
    const adjust = data.goal === "fat_loss" ? -400 : data.goal === "muscle_gain" ? 300 : 0;
    const targetCalories = Math.max(1200, tdee + adjust);

    const split = macroSplit(data.goal);
    const proteinKcal = kcalToGrams(targetCalories, split.protein);
    const carbKcal = kcalToGrams(targetCalories, split.carbs);
    const fatKcal = kcalToGrams(targetCalories, split.fat);

    const protein = Math.round(proteinKcal / 4);
    const carbs = Math.round(carbKcal / 4);
    const fat = Math.round(fatKcal / 9);

    return { tdee, targetCalories, protein, carbs, fat };
  }, [data]);

  if (!data) return null;

  const foods = foodSuggestions(data.dietary);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="rounded-2xl ring-1 ring-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h3 className="text-2xl font-bold">{data.name ? `${data.name}, h` : "H"}ere's your plan</h3>
          <p className="text-white/80">Calories and macros tailored to your goal.</p>
        </div>
        <div className="bg-white p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Daily Calories" value={`${result.targetCalories} kcal`} />
              <StatCard label="Protein" value={`${result.protein} g`} />
              <StatCard label="Carbs" value={`${result.carbs} g`} />
              <StatCard label="Fat" value={`${result.fat} g`} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">Sample Day</h4>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <Meal title="Breakfast" items={[
                  `${foods.proteins[0]} + ${foods.carbs[0]} + ${foods.fats[0]}`,
                  "Black coffee or green tea",
                ]} />
                <Meal title="Lunch" items={[
                  `${foods.proteins[1] || foods.proteins[0]} + ${foods.carbs[1]} + salad with olive oil",
                ]} />
                <Meal title="Snack" items={[
                  `${foods.proteins[2] || foods.proteins[0]} + ${foods.carbs[4]}`,
                ]} />
                <Meal title="Dinner" items={[
                  `${foods.proteins[3] || foods.proteins[0]} + ${foods.carbs[2]} + ${foods.fats[1]}`,
                ]} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Coach Notes</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <Note>Prioritize 2–3 liters of water daily.</Note>
              <Note>Aim for 7–8 hours of sleep to optimize recovery.</Note>
              <Note>Get 8–12k steps per day for general health.</Note>
              {data.goal === "muscle_gain" && (
                <Note>Progressively overload your lifts and keep protein high.</Note>
              )}
              {data.goal === "fat_loss" && (
                <Note>Maintain a consistent calorie deficit and keep protein up.</Note>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Meal({ title, items }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="font-medium text-slate-900">{title}</div>
      <ul className="mt-1 text-slate-700 list-disc list-inside">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function Note({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}
