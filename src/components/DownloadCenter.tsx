import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Shield, Monitor, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadCenter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              Official{" "}
              <span className="text-gradient-cyan">Download Center</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Get the latest version of GFocus for your platform.
            </p>
          </div>

          {/* Download Container */}
          <div className="glass-card p-8 md:p-12">
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                All downloads are SHA-256 verified and code-signed
              </span>
            </div>

            {/* Download Buttons */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Windows */}
              <Button
                size="lg"
                className="h-auto py-6 px-8 bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/50 group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Monitor className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-left flex-grow">
                    <div className="font-semibold text-lg text-foreground">
                      Windows Installer
                    </div>
                    <div className="text-sm text-muted-foreground">
                      .exe • 64-bit
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Button>

              {/* macOS */}
              <Button
                size="lg"
                className="h-auto py-6 px-8 bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/50 group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Apple className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-left flex-grow">
                    <div className="font-semibold text-lg text-foreground">macOS Bundle</div>
                    <div className="text-sm text-muted-foreground">
                      .dmg • Universal
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
                <span>Latest Stable</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-accent">●</span>
                <span>SHA-256 Verified Secure</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-border" />
              <div>Released Jan 2, 2026</div>
            </div>
          </div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              Requires Windows 10+ or macOS 11+ • 4GB RAM • Webcam required for
              focus detection
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCenter;
