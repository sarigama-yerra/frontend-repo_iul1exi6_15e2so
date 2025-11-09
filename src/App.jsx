import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlanForm from "./components/PlanForm";
import PlanResult from "./components/PlanResult";
import Footer from "./components/Footer";

function App() {
  const [planData, setPlanData] = useState(null);
  const resultRef = useRef(null);

  const handleGenerate = (data) => {
    setPlanData(data);
  };

  useEffect(() => {
    if (planData && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [planData]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <Hero />
      <PlanForm onGenerate={handleGenerate} />
      <div ref={resultRef}>{planData && <PlanResult data={planData} />}</div>
      <Footer />
    </div>
  );
}

export default App;
