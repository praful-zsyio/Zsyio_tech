import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { getServiceBySlug, calculateEstimate, getEstimationRules } from "../../services/api";
import { addToCart } from "../../utils/cart";
import CartAndContact from "./CartAndContact";

// ─── Slug → Backend service_id map ────────────────────────────────────────────
// Maps any slug variant from MongoDB to the hardcoded backend serviceId keys.
const SLUG_TO_SERVICE_ID = {
  // Web Designing
  "web-designing": "web-designing",
  "web-design": "web-designing",
  "design": "web-designing",
  "ui-design": "web-designing",
  "digital-product-design": "web-designing",

  // Web Development
  "web-development": "web-development",
  "web-app-development": "web-development",
  "web-application-development": "web-development",
  "web-dev": "web-development",

  // Deployment
  "deployment": "deployment",
  "cloud-deployment": "deployment",

  // Hosting
  "hosting": "hosting",
  "cloud-hosting": "hosting",
  "web-hosting": "hosting",
  "cloud-web-hosting": "hosting",

  // App Development
  "app-development": "app-development",
  "mobile-app-solutions": "app-development",
  "mobile-app-dev": "app-development",
  "mobile-development": "app-development",

  // Logo Design
  "logo-designing": "logo-designing",
  "logo-design": "logo-designing",

  // Data Solutions
  "data-solutions": "data-solutions",
  "data-analytics": "data-solutions",
};

// Default inputs per service_id (used when API rules don't return for this service)
const DEFAULT_INPUTS = {
  "web-designing": { pages: 1, iterations: 1, logo: false },
  "web-development": { pages: 1, features: { cms: false, auth: false, payments: false } },
  "deployment": { environments: 1 },
  "company-details": { pages: 1 },
  "hosting": { years: 1 },
  "app-development": { screens: 5, platform: "single" },
  "logo-designing": { concepts: 1, revisions: 2 },
  "data-solutions": { dashboards: 1, integrations: 0 },
};

// Simple debounce
const useDebounce = (callback, delay) => {
  const timer = useRef();
  return useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};

/* ─────────────── COMPONENT ─────────────── */
const EstimateSection = () => {
  const navigate = useNavigate();
  const { serviceId: rawSlug } = useParams();

  // Normalize slug → backend serviceId
  const serviceId = SLUG_TO_SERVICE_ID[rawSlug?.toLowerCase()] || rawSlug;

  const [service, setService] = useState(null);
  const [inputs, setInputs] = useState({});
  const [total, setTotal] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [calcError, setCalcError] = useState(null);
  const [added, setAdded] = useState(false);

  // ── Fetch service + rules on mount ─────────────────────────────────────────
  useEffect(() => {
    if (!rawSlug) return;

    // Fetch service details (use raw slug for MongoDB lookup)
    getServiceBySlug(rawSlug)
      .then(res => setService(res.data))
      .catch(() => {
        // Try normalized serviceId as fallback
        getServiceBySlug(serviceId)
          .then(res => setService(res.data))
          .catch(err => console.error("Error fetching service:", err));
      });

    // Fetch estimation rules
    getEstimationRules()
      .then(res => {
        const rules = res.data || {};
        const ruleInputs = rules[serviceId] || rules[rawSlug];
        if (ruleInputs) {
          setInputs(JSON.parse(JSON.stringify(ruleInputs)));
        } else {
          // Use hardcoded defaults so inputs are populated and calc runs immediately
          const defaults = DEFAULT_INPUTS[serviceId];
          if (defaults) {
            setInputs(JSON.parse(JSON.stringify(defaults)));
          }
        }
      })
      .catch(() => {
        // Fall back to hardcoded defaults on API error
        const defaults = DEFAULT_INPUTS[serviceId];
        if (defaults) setInputs(JSON.parse(JSON.stringify(defaults)));
      });
  }, [rawSlug, serviceId]);

  // ── Calculate on inputs change ──────────────────────────────────────────────
  const calculateResult = useCallback((currentInputs) => {
    if (!serviceId || Object.keys(currentInputs).length === 0) return;
    setCalcError(null);
    calculateEstimate({ serviceId, params: currentInputs })
      .then(res => {
        setTotal(res.data.estimatedCost || 0);
        setBreakdown(res.data.breakdown || []);
      })
      .catch(err => {
        console.error("Calculation error:", err);
        setCalcError("Could not calculate estimate. Please try again.");
      });
  }, [serviceId]);

  const debouncedCalculate = useDebounce(calculateResult, 400);

  useEffect(() => {
    if (Object.keys(inputs).length > 0) {
      debouncedCalculate(inputs);
    }
  }, [inputs, debouncedCalculate]);

  // ── Cart handler ────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (total === 0) {
      alert("Please adjust your inputs to get an estimate before adding to cart.");
      return;
    }
    addToCart({
      id: rawSlug,
      title: service?.title || rawSlug,
      amount: total,
      quantity: 1,
      slug: rawSlug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!service) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[hsl(var(--surface1))] rounded w-1/2" />
          <div className="h-64 bg-[hsl(var(--surface1))] rounded-2xl" />
        </div>
      </div>
    );
  }

  const hasInputsForService = !!DEFAULT_INPUTS[serviceId];

  return (
    <section className="pt-28 pb-32 max-w-4xl mx-auto px-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--subtext1))] hover:text-[hsl(var(--text))] transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-semibold mb-8">
        {service.title} – Cost Estimation
      </h1>

      <div className="rounded-2xl border border-[hsl(var(--surface1))] bg-[hsl(var(--mantle))]/80 p-8 space-y-6">

        {/* ── No inputs mapped for this service ─────────────────────── */}
        {!hasInputsForService ? (
          <div className="text-center py-8 text-[hsl(var(--subtext1))]">
            <p className="text-lg font-medium mb-2">Custom Estimation Required</p>
            <p className="text-sm">
              Please contact us directly for a custom quote for <strong>{service.title}</strong>.
            </p>
          </div>
        ) : (
          <>
            {/* ── WEB DESIGNING ─────────────────────────────────── */}
            {serviceId === "web-designing" && (
              <>
                <Input label="Number of Pages" value={inputs.pages ?? 1} min={1}
                  onChange={(v) => setInputs(p => ({ ...p, pages: v }))} />
                <Input label="Design Iterations" value={inputs.iterations ?? 1} min={1}
                  onChange={(v) => setInputs(p => ({ ...p, iterations: v }))} />
                <Checkbox label="Include Logo Design" checked={inputs.logo ?? false}
                  onChange={(v) => setInputs(p => ({ ...p, logo: v }))} />
              </>
            )}

            {/* ── WEB DEVELOPMENT ───────────────────────────────── */}
            {serviceId === "web-development" && (
              <>
                <Input label="Number of Pages" value={inputs.pages ?? 1} min={1}
                  onChange={(v) => setInputs(p => ({ ...p, pages: v }))} />
                {["cms", "auth", "payments"].map((key) => (
                  <Checkbox key={key}
                    label={{ cms: "CMS Integration", auth: "Authentication System", payments: "Payment Gateway" }[key]}
                    checked={inputs.features?.[key] ?? false}
                    onChange={(v) => setInputs(p => ({
                      ...p, features: { ...p.features, [key]: v }
                    }))} />
                ))}
              </>
            )}

            {/* ── DEPLOYMENT ────────────────────────────────────── */}
            {serviceId === "deployment" && (
              <Input label="Number of Environments" value={inputs.environments ?? 1} min={1}
                onChange={(v) => setInputs(p => ({ ...p, environments: v }))} />
            )}

            {/* ── COMPANY DETAILS ───────────────────────────────── */}
            {serviceId === "company-details" && (
              <Input label="Number of Pages" value={inputs.pages ?? 1} min={1}
                onChange={(v) => setInputs(p => ({ ...p, pages: v }))} />
            )}

            {/* ── HOSTING ───────────────────────────────────────── */}
            {serviceId === "hosting" && (
              <Input label="Years of Hosting" value={inputs.years ?? 1} min={1}
                onChange={(v) => setInputs({ years: v })} />
            )}

            {/* ── APP DEVELOPMENT ───────────────────────────────── */}
            {serviceId === "app-development" && (
              <>
                <Input label="Number of Screens" value={inputs.screens ?? 5} min={1}
                  onChange={(v) => setInputs(p => ({ ...p, screens: v }))} />
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[hsl(var(--text))]">Platform</span>
                  <select
                    value={inputs.platform ?? "single"}
                    onChange={(e) => setInputs(p => ({ ...p, platform: e.target.value }))}
                    className="border border-[hsl(var(--surface2))] rounded-lg p-2.5 bg-[hsl(var(--base))] text-[hsl(var(--text))]"
                  >
                    <option value="single">Android or iOS</option>
                    <option value="both">Android + iOS</option>
                  </select>
                </label>
              </>
            )}

            {/* ── LOGO DESIGNING ────────────────────────────────── */}
            {serviceId === "logo-designing" && (
              <>
                <Input label="Number of Concepts" value={inputs.concepts ?? 1} min={1}
                  onChange={(v) => setInputs(p => ({ ...p, concepts: v }))} />
                <Input label="Number of Revisions" value={inputs.revisions ?? 2} min={0}
                  onChange={(v) => setInputs(p => ({ ...p, revisions: v }))} />
              </>
            )}

            {/* ── DATA SOLUTIONS ────────────────────────────────── */}
            {serviceId === "data-solutions" && (
              <>
                <Input label="Number of Dashboards" value={inputs.dashboards ?? 1} min={1}
                  onChange={(v) => setInputs(p => ({ ...p, dashboards: v }))} />
                <Input label="Number of Integrations" value={inputs.integrations ?? 0} min={0}
                  onChange={(v) => setInputs(p => ({ ...p, integrations: v }))} />
              </>
            )}
          </>
        )}

        {/* ── BREAKDOWN + TOTAL ─────────────────────────────────────── */}
        <div className="border-t border-[hsl(var(--surface1))] pt-6 mt-6 space-y-4">

          {calcError && (
            <p className="text-sm text-red-400 text-center">{calcError}</p>
          )}

          {breakdown.length > 0 && (
            <div className="space-y-2 mb-4">
              {breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm text-[hsl(var(--subtext1))]">
                  <span>{item.label}</span>
                  <span className="tabular-nums">₹{item.value.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-[hsl(var(--surface1))]">
            <span className="text-lg font-semibold text-[hsl(var(--text))]">Estimated Total</span>
            <span className="text-2xl font-bold text-[hsl(var(--blue))]">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* ── ADD TO CART ───────────────────────────────────────────── */}
        <button
          onClick={handleAddToCart}
          className={`
            w-full rounded-xl mt-4 py-3
            font-semibold text-white
            transition-all duration-300
            ${added
              ? "bg-green-500"
              : total > 0
                ? "bg-[hsl(var(--blue))] hover:opacity-90"
                : "bg-[hsl(var(--surface2))] cursor-not-allowed opacity-60"
            }
          `}
        >
          {added ? "✓ Added to Cart!" : total > 0 ? "Add to Cart" : "Adjust inputs to get estimate"}
        </button>
      </div>

      <CartAndContact />
    </section>
  );
};

export default EstimateSection;

/* ─────────── REUSABLE INPUTS ─────────── */
const Input = ({ label, value, onChange, min = 0 }) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-[hsl(var(--text))]">{label}</span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, Number(value) - 1))}
        className="w-9 h-9 rounded-lg border border-[hsl(var(--surface2))] text-[hsl(var(--text))] hover:border-[hsl(var(--blue))] hover:text-[hsl(var(--blue))] transition font-bold text-lg flex items-center justify-center select-none"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
        className="flex-1 border border-[hsl(var(--surface2))] rounded-lg p-2.5 bg-[hsl(var(--base))] text-[hsl(var(--text))] text-center tabular-nums outline-none focus:border-[hsl(var(--blue))]"
      />
      <button
        type="button"
        onClick={() => onChange(Number(value) + 1)}
        className="w-9 h-9 rounded-lg border border-[hsl(var(--surface2))] text-[hsl(var(--text))] hover:border-[hsl(var(--blue))] hover:text-[hsl(var(--blue))] transition font-bold text-lg flex items-center justify-center select-none"
      >
        +
      </button>
    </div>
  </label>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked
        ? "bg-[hsl(var(--blue))] border-[hsl(var(--blue))]"
        : "border-[hsl(var(--surface2))]"
        }`}
    >
      {checked && <span className="text-white text-xs">✓</span>}
    </div>
    <span className="text-sm text-[hsl(var(--text))]">{label}</span>
  </label>
);
