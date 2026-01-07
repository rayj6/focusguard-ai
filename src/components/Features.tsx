import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Brain, RefreshCw, Shield, Zap, Eye } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Local Edge AI",
    description: "Processing happens on your device, not the cloud. Your webcam data never leaves your machine.",
    highlight: "Privacy-first",
    size: "large",
  },
  {
    icon: Brain,
    title: "Crystal Engine",
    description: "Custom-trained neural networks that learn your specific habits and focus patterns over time.",
    highlight: "Personalized",
    size: "medium",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync",
    description: "6-digit secure pairing between Desktop and Mobile. Get instant alerts wherever you are.",
    highlight: "Cross-platform",
    size: "medium",
  },
  {
    icon: Eye,
    title: "Focus Detection",
    description: "Advanced gaze tracking and posture analysis to understand when you're truly in the zone.",
    highlight: "Accurate",
    size: "small",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Receive push notifications the moment your focus drifts, with optional proof images.",
    highlight: "Real-time",
    size: "small",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with end-to-end encryption for team deployments.",
    highlight: "Secure",
    size: "small",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
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
        
        {feature.size === "large" && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Zero cloud uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Features = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

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
            How It <span className="text-gradient-cyan">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cutting-edge technology designed to protect your productivity without compromising your privacy.
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

export default Features;
