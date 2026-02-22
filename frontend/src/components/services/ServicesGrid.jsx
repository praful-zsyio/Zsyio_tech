import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../../services/api";
import * as LucideIcons from "lucide-react";
import { addToCart } from "../../utils/cart";
import { getIcon } from "../../utils/iconMap";

const ServicesGrid = ({ isInView = true }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    getServices()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setServices(data);
        const initQty = {};
        data.forEach(s => { initQty[s.slug || s.id] = 1; });
        setQuantities(initQty);
      })
      .catch(err => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleQtyChange = (key, delta) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(1, (prev[key] || 1) + delta),
    }));
  };

  const handleAddToCart = (service) => {
    const key = service.slug || service.id;
    const qty = quantities[key] || 1;
    const baseRate = Number(service.base_rate) || 0;

    addToCart({
      id: key,
      title: service.title,
      amount: baseRate * qty,
      quantity: qty,
      slug: key,
    });

    setAddedMap(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [key]: false }));
    }, 1800);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-72 rounded-2xl border border-[hsl(var(--surface1))] bg-[hsl(var(--mantle))]/60 animate-pulse" />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center text-[hsl(var(--subtext1))] py-12 mb-24">
        <p className="text-lg font-medium">No services found.</p>
        <p className="text-sm mt-2 opacity-70">Services will appear here once added to the database.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24"
    >
      {services.map((service, index) => {
        const Icon = getIcon(service.icon, service.title);
        const key = service.slug || service.id || index;
        const qty = quantities[key] || 1;
        const isAdded = addedMap[key];

        return (
          <motion.article
            key={key}
            variants={item}
            className="
              group relative h-full
              rounded-2xl border border-[hsl(var(--surface1))]
              bg-[hsl(var(--mantle))]/80
              backdrop-blur-xl
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:border-[hsl(var(--blue))]
              hover:shadow-[0_0_28px_rgba(56,189,248,0.22)]
              flex flex-col
            "
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--blue))]/15 border border-[hsl(var(--blue))]/30 mb-4">
              <Icon className="w-6 h-6 text-[hsl(var(--blue))]" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[hsl(var(--text))] mb-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[hsl(var(--subtext1))] leading-relaxed grow mb-4">
              {service.description}
            </p>

            {/* Price Display */}
            <div className="mb-3 mt-auto">
              <span className="text-sm text-[hsl(var(--subtext1))]">Starts from </span>
              <span className="text-lg font-bold text-[hsl(var(--blue))]">
                ₹{Number(service.base_rate || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* ── Quantity Selector ── */}
            <div className="flex items-center justify-between mb-3 rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/60 px-3 py-2">
              <span className="text-xs text-[hsl(var(--subtext1))] font-medium select-none">Qty</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQtyChange(key, -1)}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="
                    w-7 h-7 rounded-lg flex items-center justify-center
                    border border-[hsl(var(--surface2))]
                    text-[hsl(var(--subtext1))]
                    hover:border-[hsl(var(--blue))] hover:text-[hsl(var(--blue))]
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-all duration-150 text-base font-bold
                    select-none
                  "
                >
                  −
                </button>
                <span className="text-sm font-semibold text-[hsl(var(--text))] w-5 text-center tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => handleQtyChange(key, +1)}
                  aria-label="Increase quantity"
                  className="
                    w-7 h-7 rounded-lg flex items-center justify-center
                    border border-[hsl(var(--surface2))]
                    text-[hsl(var(--subtext1))]
                    hover:border-[hsl(var(--blue))] hover:text-[hsl(var(--blue))]
                    transition-all duration-150 text-base font-bold
                    select-none
                  "
                >
                  +
                </button>
              </div>
              <span className="text-xs font-semibold text-[hsl(var(--blue))] tabular-nums">
                ₹{(Number(service.base_rate || 0) * qty).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Bottom accent line */}
            <div className="mb-3 h-[2px] w-0 bg-[hsl(var(--blue))] group-hover:w-full transition-all duration-300 rounded-full" />

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(service)}
                className="
                  flex-1 rounded-xl border border-[hsl(var(--blue))]/60
                  px-3 py-2 text-xs font-semibold
                  text-[hsl(var(--blue))]
                  hover:bg-[hsl(var(--blue))]/10
                  transition-all duration-200 relative overflow-hidden
                "
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-1 text-green-400"
                    >
                      ✓ Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      + Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => navigate(`/estimate/${service.slug}`)}
                className="
                  flex-1 rounded-xl
                  bg-[hsl(var(--blue))] text-white
                  px-3 py-2 text-xs font-semibold
                  hover:opacity-90
                  transition-all duration-200
                "
              >
                Get Estimate
              </button>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
};

export default ServicesGrid;
