import React, { useEffect, useState } from "react";
import { Calculator, Building2, Landmark, ShieldCheck, WalletCards } from "lucide-react";
import { calculateConstructionCost, calculateFinanceRoi, ConstructionTier } from "../../lib/calculators";
import { FinancePartner } from "../../types";
import { getFinancePartners } from "../../lib/firestore";
import { formatPrice } from "../../lib/utils";

const money = (value: number) => formatPrice(Math.round(value));

export const ConstructionCostCalculator: React.FC = () => {
  const [area, setArea] = useState(1200);
  const [tier, setTier] = useState<ConstructionTier>("standard");
  const [location, setLocation] = useState("Vrindavan");
  const estimate = calculateConstructionCost(area, tier, location);

  return (
    <div className="rounded-3xl border border-[#C9A84C]/25 bg-white p-5 shadow-lg sm:p-7" id="construction-cost-calculator">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-[#C45C1A]/10 p-3 text-[#C45C1A]"><Building2 className="h-6 w-6" /></div>
        <div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C45C1A]">Build Budget Planner</p><h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Construction Cost Calculator</h2></div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">Get a planning estimate for a Mathura or Vrindavan plot. Final costs vary by specification, approvals, material choice, and contractor quote.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="text-xs font-bold text-slate-600">Plot / built-up area (sq ft)<input type="number" min="100" value={area} onChange={(e) => setArea(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#C45C1A]" /></label>
        <label className="text-xs font-bold text-slate-600">Construction tier<select value={tier} onChange={(e) => setTier(e.target.value as ConstructionTier)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#C45C1A]"><option value="basic">Basic</option><option value="standard">Standard</option><option value="premium">Premium</option></select></label>
        <label className="text-xs font-bold text-slate-600">Location<select value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#C45C1A]"><option>Vrindavan</option><option>Mathura</option></select></label>
      </div>
      <div className="mt-6 rounded-2xl bg-[#0F172A] p-5 text-white"><div className="flex items-center justify-between gap-3"><span className="text-sm text-white/70">Estimated total</span><strong className="font-serif text-2xl text-[#FACC15]">{money(estimate.total)}</strong></div><div className="mt-4 grid grid-cols-3 gap-3 text-xs"><span><b className="block text-white/50">Materials</b>{money(estimate.materials)}</span><span><b className="block text-white/50">Labour</b>{money(estimate.labor)}</span><span><b className="block text-white/50">Finishing</b>{money(estimate.finishing)}</span></div><p className="mt-4 text-[11px] text-white/50">Indicative rate: {money(estimate.ratePerSqFt)} / sq ft</p></div>
    </div>
  );
};

export const FinanceRoiCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(4500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTenureYears, setLoanTenureYears] = useState(15);
  const [interestRate, setInterestRate] = useState(8.5);
  const [holdingYears, setHoldingYears] = useState(5);
  const result = calculateFinanceRoi({ propertyPrice, downPaymentPercent, loanTenureYears, interestRate, holdingYears });
  const fields = [
    ["Property price", propertyPrice, setPropertyPrice, 1000000, 30000000, 100000],
    ["Down payment %", downPaymentPercent, setDownPaymentPercent, 10, 80, 5],
    ["Loan tenure (years)", loanTenureYears, setLoanTenureYears, 1, 30, 1],
    ["Interest rate %", interestRate, setInterestRate, 5, 16, 0.1],
    ["Holding period (years)", holdingYears, setHoldingYears, 1, 20, 1],
  ] as const;
  return (
    <div className="rounded-3xl border border-[#C9A84C]/25 bg-white p-5 shadow-lg sm:p-7" id="finance-roi-calculator">
      <div className="flex items-start gap-3"><div className="rounded-2xl bg-[#0E7B6C]/10 p-3 text-[#0E7B6C]"><WalletCards className="h-6 w-6" /></div><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C45C1A]">Finance Scenario</p><h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Bank Finance & ROI Calculator</h2></div></div>
      <p className="mt-3 text-sm leading-6 text-slate-600">Model EMI, interest, and a simple appreciation-plus-rent scenario before you request lender guidance. This is illustrative, not a loan quote or investment guarantee.</p>
      <div className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">{fields.map(([label, value, setter, min, max, step]) => <label key={label} className="text-xs font-bold text-slate-600">{label}<div className="mt-1 flex items-center gap-3"><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setter(Number(e.target.value))} className="w-full accent-[#C45C1A]" /><input type="number" min={min} max={max} step={step} value={value} onChange={(e) => setter(Number(e.target.value))} className="w-28 rounded-xl border border-slate-200 px-2 py-2 text-sm text-slate-900 outline-none focus:border-[#C45C1A]" /></div></label>)}</div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3"><Result label="Monthly EMI" value={money(result.monthlyEmi)} /><Result label="Total interest" value={money(result.totalInterest)} /><Result label={`${holdingYears}-year projected ROI`} value={`${result.projectedRoiPercent.toFixed(1)}%`} /></div>
    </div>
  );
};

const Result = ({ label, value }: { label: string; value: string }) => <div className="rounded-2xl bg-[#0F172A] p-4 text-white"><span className="block text-[10px] uppercase tracking-wider text-white/55">{label}</span><strong className="mt-2 block font-serif text-xl text-[#FACC15]">{value}</strong></div>;

export const FinancePartnersTable: React.FC = () => {
  const [partners, setPartners] = useState<FinancePartner[]>([]);
  useEffect(() => { getFinancePartners().then(setPartners).catch(() => setPartners([])); }, []);
  return <section className="rounded-3xl border border-[#C9A84C]/25 bg-white p-5 shadow-lg sm:p-7" id="finance-partners"><div className="flex items-start gap-3"><div className="rounded-2xl bg-[#C9A84C]/15 p-3 text-[#A87800]"><Landmark className="h-6 w-6" /></div><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C45C1A]">Verified Finance Directory</p><h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Bank & NBFC Finance Options</h2></div></div><p className="mt-3 text-sm leading-6 text-slate-600">Compare published finance partners for eligible Mathura-Vrindavan buyers. Rates and approvals must be confirmed directly with the lender.</p>{partners.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500"><ShieldCheck className="mx-auto mb-2 h-6 w-6 text-[#0E7B6C]" />Verified bank and NBFC entries will appear here after admin publication.</div> : <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400"><th className="px-3 py-3">Lender</th><th className="px-3 py-3">Type</th><th className="px-3 py-3">Rate range</th><th className="px-3 py-3">Tenure</th><th className="px-3 py-3">Eligibility / notes</th></tr></thead><tbody>{partners.map((partner) => <tr key={partner.id} className="border-b border-slate-100"><td className="px-3 py-4 font-bold text-[#1A1A2E]">{partner.name}</td><td className="px-3 py-4"><span className="rounded-full bg-[#0E7B6C]/10 px-2 py-1 text-xs font-bold text-[#0E7B6C]">{partner.type}</span></td><td className="px-3 py-4 font-semibold text-[#C45C1A]">{partner.interestRateMin}% - {partner.interestRateMax}%</td><td className="px-3 py-4 text-slate-600">{partner.tenureYears}</td><td className="max-w-sm px-3 py-4 text-slate-600">{partner.eligibility}{partner.notes ? ` ${partner.notes}` : ""}</td></tr>)}</tbody></table></div>}</section>;
};
