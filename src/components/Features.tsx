import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Brain, RefreshCw, Shield, Zap, Eye } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Features = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const features = [
    {
      icon: Cpu,
      title: t("features.localAI.title"),
      description: t("features.localAI.description"),
      highlight: t("features.localAI.highlight"),
      size: "large",
      badges: [t("features.localAI.badge1"), t("features.localAI.badge2")],
    },
    {
      icon: Brain,
      title: t("features.crystal.title"),
      description: t("features.crystal.description"),
      highlight: t("features.crystal.highlight"),
      size: "medium",
    },
    {
      icon: RefreshCw,
      title: t("features.sync.title"),
      description: t("features.sync.description"),
      highlight: t("features.sync.highlight"),
      size: "medium",
    },
    {
      icon: Eye,
      title: t("features.focus.title"),
      description: t("features.focus.description"),
      highlight: t("features.focus.highlight"),
      size: "small",
    },
    {
      icon: Zap,
      title: t("features.alerts.title"),
      description: t("features.alerts.description"),
      highlight: t("features.alerts.highlight"),
      size: "small",
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.description"),
      highlight: t("features.security.highlight"),
      size: "small",
    },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("features.title1")} <span className="text-gradient-cyan">{t("features.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureType {
  icon: typeof Cpu;
  title: string;
  description: string;
  highlight: string;
  size: string;
  badges?: string[];
}

const FeatureCard = ({ feature, index }: { feature: FeatureType; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`feature-card group ${sizeClasses[feature.size as keyof typeof sizeClasses]}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
            <feature.icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
            {feature.highlight}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>
        
        {feature.size === "large" && feature.badges && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {feature.badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Features;