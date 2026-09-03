import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 8787);
const root = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "100kb" }));
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const constructionRates = { basic: 1800, standard: 2400, premium: 3200 };

app.post("/api/construction-cost", (req, res) => {
  const area = Math.max(0, Number(req.body.area) || 0);
  const tier = constructionRates[req.body.tier] ? req.body.tier : "standard";
  const location = String(req.body.location || "Vrindavan");
  const multiplier = location.toLowerCase().includes("mathura") ? 0.98 : 1;
  const total = Math.round(area * constructionRates[tier] * multiplier);
  const materials = Math.round(total * 0.45);
  const labor = Math.round(total * 0.3);
  res.json({ area, location, tier, ratePerSqFt: Math.round(constructionRates[tier] * multiplier), total, materials, labor, finishing: total - materials - labor });
});

app.post("/api/finance-roi", (req, res) => {
  const price = Math.max(0, Number(req.body.propertyPrice) || 0);
  const downPaymentPercent = Math.min(100, Math.max(0, Number(req.body.downPaymentPercent) || 0));
  const tenureYears = Math.max(1, Number(req.body.loanTenureYears) || 1);
  const interestRate = Math.max(0, Number(req.body.interestRate) || 0);
  const holdingYears = Math.max(1, Number(req.body.holdingYears) || 1);
  const loanAmount = price * (1 - downPaymentPercent / 100);
  const months = Math.round(tenureYears * 12);
  const monthlyRate = interestRate / 1200;
  const monthlyEmi = monthlyRate === 0 ? loanAmount / months : loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalLoanPayment = monthlyEmi * months;
  const totalInterest = Math.max(0, totalLoanPayment - loanAmount);
  const projectedPropertyValue = price * Math.pow(1.1, holdingYears);
  const projectedRentalIncome = price * 0.04 * holdingYears;
  const investedCapital = price * downPaymentPercent / 100;
  const projectedNetGain = Math.max(0, projectedPropertyValue - price + projectedRentalIncome - totalInterest * Math.min(holdingYears / tenureYears, 1));
  res.json({ propertyPrice: price, downPayment: investedCapital, loanAmount, monthlyEmi, totalLoanPayment, totalInterest, holdingYears, projectedPropertyValue, projectedRentalIncome, projectedNetGain, projectedRoiPercent: investedCapital ? projectedNetGain / investedCapital * 100 : 0 });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(root, "dist")));
  app.get("*", (_, res) => res.sendFile(path.join(root, "dist", "index.html")));
}

app.listen(port, () => console.log(`Nikunj API listening on port ${port}`));
