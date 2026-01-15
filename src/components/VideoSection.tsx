import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Smartphone, Monitor } from "lucide-react";

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Video Player Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Setup in <span className="text-gradient-cyan">60 Seconds</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Watch how easy it is to get started with GFocus on all your
              devices.
            </p>
          </div>

          {/* Video Container */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-2 glow-cyan">
              <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden group cursor-pointer">
                {/* Placeholder for video - could be replaced with actual YouTube embed */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-secondary">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <p className="text-muted-foreground">Click to play demo</p>
                  </div>
                </div>

                {/* Video timestamp overlay */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-background/80 backdrop-blur-sm text-sm text-muted-foreground">
                  2:34
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              One Ecosystem, All Platforms
            </h3>
            <p className="text-muted-foreground">
              Seamlessly sync between your desktop and mobile devices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Desktop App Mock */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-5 h-5 text-primary" />
                <span className="font-semibold">Desktop App</span>
              </div>
              <div className="aspect-[16/10] bg-secondary rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 p-4">
                  <div className="h-full rounded-md border border-border bg-background/50 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="h-3 w-24 bg-foreground/20 rounded" />
                          <div className="h-2 w-16 bg-muted-foreground/20 rounded mt-1" />
                        </div>
                      </div>
                      <div className="h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                        <span className="text-4xl font-bold text-gradient-cyan">
                          87%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 bg-primary/20 rounded" />
                        <div className="flex-1 h-8 bg-accent/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile App Mock */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="font-semibold">Mobile App</span>
              </div>
              <div className="flex justify-center">
                <div className="w-48 aspect-[9/19] bg-secondary rounded-3xl overflow-hidden relative border-4 border-border">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-background rounded-b-xl" />
                  <div className="p-4 pt-8">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">
                            87%
                          </span>
                        </div>
                        <div className="h-2 w-20 bg-foreground/20 rounded mx-auto" />
                      </div>
                      <div className="h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl" />
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Store Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            <a
              href="https://apps.apple.com/vn/app/gfocus/id6757530044?l=vi"
              className="download-btn"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">
                  Download on the
                </div>
                <div className="font-semibold">App Store</div>
              </div>
            </a>
            <a href="#" className="download-btn">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Eye icon for the desktop mock
const Eye = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default VideoSection;
