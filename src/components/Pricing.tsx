import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EnterpriseContactModal from "./EnterpriseContactModal";

const pricingPlans = [
  {
    name: "Free",
    subtitle: "The Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 Hour daily working limit",
      "1 Connected device",
      "Standard AI Recognition",
      "Basic focus reports",
    ],
    cta: "Get Started",
    popular: false,
    badge: null,
  },
  {
    name: "Pro",
    subtitle: "The Power User",
    monthlyPrice: 12,
    yearlyPrice: 59,
    features: [
      "Unlimited working hours",
      "Multiple device sync",
      "Personalized AI Brain Training",
      "Push Alerts with Proof Images",
      "30-day History",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    badge: "Recommended",
  },
  {
    name: "Enterprise",
    subtitle: "The Team Leader",
    monthlyPrice: 4.98,
    yearlyPrice: 4.98 * 12 * 0.8,
    perUser: true,
    minUsers: 5,
    features: [
      "All Pro features",
      "Admin Team Dashboard",
      "Productivity Analytics",
      "Dedicated Support",
      "Custom AI Optimization",
      "SSO Integration",
    ],
    cta: "Contact Sales",
    popular: false,
    badge: "Min 5 users",
  },
];

const PricingCard = ({
  plan,
  isYearly,
  index,
  onEnterpriseClick,
}: {
  plan: typeof pricingPlans[0];
  isYearly: boolean;
  index: number;
  onEnterpriseClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const displayPrice = plan.perUser
    ? price.toFixed(2)
    : isYearly && plan.yearlyPrice > 0
    ? plan.yearlyPrice
    : plan.monthlyPrice;

  const handlePlanClick = () => {
    if (plan.name === "Free") {
      // Scroll to download section
      const downloadSection = document.getElementById("download");
      if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (plan.name === "Enterprise") {
      // Open enterprise contact modal
      onEnterpriseClick();
    } else {
      // Navigate to payment page for Pro
      const planKey = `${plan.name.toLowerCase()}${isYearly ? "-yearly" : "-monthly"}`;
      navigate(`/payment?plan=${planKey}`);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`pricing-card group relative cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] ${plan.popular ? "pricing-card-featured" : ""}`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={plan.popular ? "badge-pro" : "badge-enterprise"}>
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          {plan.popular && <Sparkles className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />}
          {plan.name === "Enterprise" && <Users className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />}
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{plan.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">{plan.subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold group-hover:text-primary transition-colors">
            ${typeof displayPrice === "number" ? displayPrice : displayPrice}
          </span>
          <span className="text-muted-foreground group-hover:text-foreground/70 transition-colors">
            {plan.perUser ? "/user" : ""}/{isYearly && plan.yearlyPrice > 0 ? "year" : "mo"}
          </span>
        </div>
        {isYearly && plan.yearlyPrice > 0 && !plan.perUser && (
          <p className="text-sm text-accent mt-1">
            Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year
          </p>
        )}
        {plan.minUsers && (
          <p className="text-sm text-muted-foreground mt-1">
            Minimum {plan.minUsers} users
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={handlePlanClick}
        className={`w-full transition-all duration-300 ${
          plan.popular
            ? "bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground hover:scale-105 glow-cyan"
            : "bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground hover:scale-105 border border-border"
        }`}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <>
      <section id="pricing" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, Transparent <span className="text-gradient-cyan">Pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Choose the plan that fits your productivity needs. No hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
                Yearly
              </span>
              {isYearly && (
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                  Save up to 60%
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                isYearly={isYearly}
                index={index}
                onEnterpriseClick={() => setIsEnterpriseModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      <EnterpriseContactModal
        isOpen={isEnterpriseModalOpen}
        onClose={() => setIsEnterpriseModalOpen(false)}
      />
    </>
  );
};

export default Pricing;
