import { useState } from "react";
import { toast } from "react-hot-toast";
import "../styles/InvestorSurvey.css";

const INITIAL_FORM = {
  riskTolerance: "",
  investmentHorizon: "",
  monthlyCapacity: "",
  liquidityPreference: "",
  investmentGoal: "",
};

export default function InvestorSurvey({ profile, onSubmit }) {
  const [form, setForm] = useState(profile || INITIAL_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.riskTolerance) newErrors.riskTolerance = "Please select a risk tolerance.";
    if (!form.investmentHorizon) newErrors.investmentHorizon = "Please select an investment horizon.";
    if (!form.monthlyCapacity || Number(form.monthlyCapacity) < 1000)
      newErrors.monthlyCapacity = "Monthly capacity must be at least PKR 1,000.";
    if (!form.liquidityPreference) newErrors.liquidityPreference = "Please select a liquidity preference.";
    if (!form.investmentGoal) newErrors.investmentGoal = "Please select an investment goal.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in your vibe profile!");
      return;
    }
    setErrors({});
    onSubmit({
      ...form,
      monthlyCapacity: Number(form.monthlyCapacity),
    });
    toast.success("Vibe profile saved! Let's go.");
  }

  function RadioGroup({ field, options }) {
    return (
      <div className="form-field-radio-group">
        {options.map(({ value, label }) => (
          <label
            key={value}
            className={`form-field-radio ${
              form[field] === value ? "form-field-radio-selected" : ""
            }`}
          >
            <input
              type="radio"
              name={field}
              value={value}
              checked={form[field] === value}
              onChange={() => handleChange(field, value)}
            />
            {label}
          </label>
        ))}
      </div>
    );
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2 className="profile-form-title">Your Investor Vibe</h2>

      <div className="form-field">
        <label className="form-field-label">Risk Tolerance</label>
        <RadioGroup
          field="riskTolerance"
          options={[
            { value: "conservative", label: "Play it Safe" },
            { value: "moderate", label: "Middle Ground" },
            { value: "aggressive", label: "Go Big" },
          ]}
        />
        {errors.riskTolerance && (
          <span className="form-field-error">{errors.riskTolerance}</span>
        )}
      </div>

      <div className="form-field">
        <label className="form-field-label">Investment Horizon</label>
        <RadioGroup
          field="investmentHorizon"
          options={[
            { value: "short", label: "Short (1-2 yrs)" },
            { value: "medium", label: "Medium (3-5 yrs)" },
            { value: "long", label: "Long (5+ yrs)" },
          ]}
        />
        {errors.investmentHorizon && (
          <span className="form-field-error">{errors.investmentHorizon}</span>
        )}
      </div>

      <div className="form-field">
        <label className="form-field-label">Monthly Investment Capacity (PKR)</label>
        <input
          type="number"
          value={form.monthlyCapacity}
          onChange={(e) => handleChange("monthlyCapacity", e.target.value)}
          placeholder="Minimum 1,000"
          min="1000"
        />
        {errors.monthlyCapacity && (
          <span className="form-field-error">{errors.monthlyCapacity}</span>
        )}
      </div>

      <div className="form-field">
        <label className="form-field-label">Liquidity Preference</label>
        <RadioGroup
          field="liquidityPreference"
          options={[
            { value: "easy", label: "Need quick access" },
            { value: "moderate", label: "Some flexibility" },
            { value: "locked", label: "Can lock funds" },
          ]}
        />
        {errors.liquidityPreference && (
          <span className="form-field-error">{errors.liquidityPreference}</span>
        )}
      </div>

      <div className="form-field">
        <label className="form-field-label">Investment Goal</label>
        <select
          value={form.investmentGoal}
          onChange={(e) => handleChange("investmentGoal", e.target.value)}
        >
          <option value="">Select a goal...</option>
          <option value="wealth">Wealth Building</option>
          <option value="retirement">Retirement</option>
          <option value="emergency">Emergency Fund</option>
          <option value="purchase">Specific Purchase</option>
        </select>
        {errors.investmentGoal && (
          <span className="form-field-error">{errors.investmentGoal}</span>
        )}
      </div>

      <button type="submit" className="profile-form-submit btn-primary">
        Save Vibe MyVibe
      </button>
    </form>
  );
}
