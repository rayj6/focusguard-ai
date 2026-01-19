import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Shield, Monitor, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const DownloadCenter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const WINDOWS_DOWNLOAD_URL =
    "https://github.com/rayj6/focusguard-ai/releases/download/auto/GFocus_V1.3.exe";
  const MAC_DOWNLOAD_URL =
    "https://github.com/rayj6/focusguard-ai/releases/download/mac/GFocus_V1.3.dmg";

  return (
    <section id="download" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t("download.title1")}
              <span className="text-gradient-cyan">
                {" "}
                {t("download.title2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("download.subtitle")}
            </p>
          </div>

          {/* Download Container */}
          <div className="glass-card p-8 md:p-12">
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                {t("download.verified")}
              </span>
            </div>

            {/* Download Buttons */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Windows */}
              <Button
                onClick={() => window.open(WINDOWS_DOWNLOAD_URL, "_blank")}
                size="lg"
                className="h-auto py-6 px-8 bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/50 group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Monitor className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-left flex-grow">
                    <div className="font-semibold text-lg text-foreground">
                      {t("download.windows")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("download.windowsInfo")}
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Button>

              {/* macOS */}
              <Button
                onClick={() => window.open(MAC_DOWNLOAD_URL, "_blank")}
                size="lg"
                className="h-auto py-6 px-8 bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/50 group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Apple className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-left flex-grow">
                    <div className="font-semibold text-lg text-foreground">
                      {t("download.mac")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("download.macInfo")}
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Button>
            </div>

            {/* Version Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <span className="font-mono bg-secondary px-2 py-1 rounded">
                  v1.0.4
                </span>
                <span>{t("download.latestStable")}</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-accent">●</span>
                <span>{t("download.sha256")}</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-border" />
              <div>{t("download.released")}</div>
            </div>
          </div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>{t("download.requirements")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCenter;
