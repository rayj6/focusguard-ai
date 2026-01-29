import { motion } from "framer-motion";
import { Globe, Smartphone, Monitor, Link, Trophy } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const steps = [
  {
    icon: Globe,
    titleKey: "howToStart.step1.title",
    descKey: "howToStart.step1.desc",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Smartphone,
    titleKey: "howToStart.step2.title",
    descKey: "howToStart.step2.desc",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Monitor,
    titleKey: "howToStart.step3.title",
    descKey: "howToStart.step3.desc",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Link,
    titleKey: "howToStart.step4.title",
    descKey: "howToStart.step4.desc",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Trophy,
    titleKey: "howToStart.step5.title",
    descKey: "howToStart.step5.desc",
    color: "from-yellow-500 to-amber-500",
  },
];

const HowToStart = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyan">{t("howToStart.title1")}</span>{" "}
            <span className="text-foreground">{t("howToStart.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("howToStart.subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-8 last:mb-0"
            >
              {/* Step Number */}
              <div className="flex-shrink-0 relative">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                >
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 glass-card p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {t(step.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-xl md:text-2xl font-bold text-gradient-cyan">
              {t("howToStart.tagline")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToStart;
