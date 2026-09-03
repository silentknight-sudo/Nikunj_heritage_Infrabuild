export type ConstructionTier = "basic" | "standard" | "premium";

const constructionRates: Record<ConstructionTier, { label: string; rate: number }> = {
  basic: { label: "Basic", rate: 1800 },
  standard: { label: "Standard", rate: 2400 },
  premium: { label: "Premium", rate: 3200 },
};

export interface ConstructionEstimate {
  area: number;
  location: string;
  tier: ConstructionTier;
  ratePerSqFt: number;
  total: number;
  materials: number;
  labor: number;
  finishing: number;
}

export function calculateConstructionCost(area: number, tier: ConstructionTier, location = "Vrindavan"): ConstructionEstimate {
  const safeArea = Math.max(0, Number(area) || 0);
  const selected = constructionRates[tier] || constructionRates.standard;
  const locationMultiplier = location.toLowerCase().includes("mathura") ? 0.98 : 1;
  const total = Math.round(safeArea * selected.rate * locationMultiplier);
  return {
    area: safeArea,
    location,
    tier,
    ratePerSqFt: Math.round(selected.rate * locationMultiplier),
    total,
    materials: Math.round(total * 0.45),
    labor: Math.round(total * 0.3),
    finishing: total - Math.round(total * 0.45) - Math.round(total * 0.3),
  };
}

export interface FinanceRoiEstimate {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  monthlyEmi: number;
  totalLoanPayment: number;
  totalInterest: number;
  holdingYears: number;
  projectedPropertyValue: number;
  projectedRentalIncome: number;
  projectedNetGain: number;
  projectedRoiPercent: number;
}

export function calculateFinanceRoi({
  propertyPrice,
  downPaymentPercent,
  loanTenureYears,
  interestRate,
  holdingYears,
  annualAppreciationRate = 10,
  annualRentalYield = 4,
}: {
  propertyPrice: number;
  downPaymentPercent: number;
  loanTenureYears: number;
  interestRate: number;
  holdingYears: number;
  annualAppreciationRate?: number;
  annualRentalYield?: number;
}): FinanceRoiEstimate {
  const price = Math.max(0, Number(propertyPrice) || 0);
  const downPayment = Math.min(100, Math.max(0, Number(downPaymentPercent) || 0));
  const loanAmount = price * (1 - downPayment / 100);
  const tenureMonths = Math.max(1, Math.round(Number(loanTenureYears) * 12));
  const monthlyRate = Math.max(0, Number(interestRate) || 0) / 1200;
  const monthlyEmi = monthlyRate === 0
    ? loanAmount / tenureMonths
    : loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalLoanPayment = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalLoanPayment - loanAmount);
  const years = Math.max(1, Number(holdingYears) || 1);
  const projectedPropertyValue = price * Math.pow(1 + Math.max(0, annualAppreciationRate) / 100, years);
  const projectedRentalIncome = price * (Math.max(0, annualRentalYield) / 100) * years;
  const investedCapital = price * (downPayment / 100);
  const projectedNetGain = Math.max(0, projectedPropertyValue - price + projectedRentalIncome - (totalInterest * Math.min(years / loanTenureYears, 1)));
  return {
    propertyPrice: price,
    downPayment: investedCapital,
    loanAmount,
    monthlyEmi,
    totalLoanPayment,
    totalInterest,
    holdingYears: years,
    projectedPropertyValue,
    projectedRentalIncome,
    projectedNetGain,
    projectedRoiPercent: investedCapital > 0 ? (projectedNetGain / investedCapital) * 100 : 0,
  };
}

export const constructionTierLabels = constructionRates;
