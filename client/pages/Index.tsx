import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Eye, Archive } from "lucide-react";

export default function Index() {
  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-3 border-b border-border/30 flex-shrink-0">
        <div className="text-lg font-semibold tracking-wide text-foreground font-serif">
          CultureVerse Lens
        </div>
        <nav className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Demo
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Archive
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-5 overflow-auto">
        {/* Hero Section */}
        <div className="text-center max-w-4xl flex-shrink-0">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2 tracking-wide">
            CultureVerse Lens
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide">
            AI + AR platform that brings local crafts and traditions to life.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-5xl flex-shrink-0">
          {/* Left Column - Functional Card */}
          <div className="flex flex-col items-center">
            <div className="glass soft-shadow w-full rounded-2xl p-5 backdrop-blur-lg bg-white/40 border border-white/60">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-4 text-center">
                Upload or Scan
              </h2>

              {/* Dropzone Mockup */}
              <div className="border-2 border-dashed border-muted mb-4 rounded-xl p-6 bg-secondary/30 flex flex-col items-center justify-center min-h-[160px]">
                <Upload className="w-10 h-10 text-muted-foreground mb-2" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground text-center">
                  Drop image or tap to scan
                </p>
              </div>

              {/* Sample Thumbnail */}
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-200 to-amber-300 mb-4 mx-auto shadow-md" />

              {/* Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-dark hover:to-gold text-white font-semibold py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                  size="sm"
                >
                  Identify Craft
                </Button>
                <Button
                  variant="ghost"
                  className="w-full border border-foreground/20 text-foreground hover:bg-foreground/5 py-2 text-sm rounded-lg font-medium transition-all duration-200"
                  size="sm"
                >
                  Try Demo
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-2xs text-muted-foreground text-center mt-3 font-light tracking-tight">
                AI-powered cultural recognition • No signup required
              </p>
            </div>
          </div>

          {/* Right Column - AR Mockup */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full mb-2">
              {/* Mockup Device Frame */}
              <div className="relative rounded-2xl overflow-hidden soft-glow soft-shadow">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 aspect-video rounded-2xl border-6 border-slate-900 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder craft image with overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-pink-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-300 rounded-lg mx-auto mb-2 opacity-80" />
                      <p className="text-xs text-foreground/60">Craft Recognition</p>
                    </div>
                  </div>

                  {/* AR Overlay Badge */}
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-lg border border-white/30">
                    <p className="text-xs font-semibold text-foreground tracking-tight">
                      Kolam Art Detected
                    </p>
                  </div>

                  {/* Line animation mockup */}
                  <div className="absolute inset-0 opacity-40">
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M 50 50 Q 100 75 150 50 T 150 150"
                        stroke="rgba(37, 99, 235, 0.5)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="200"
                        strokeDashoffset="200"
                        style={{
                          animation: "drawLine 3s ease-in-out infinite",
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Caption under mockup */}
              <p className="text-center text-xs text-muted-foreground mt-2 font-light tracking-tight">
                Lightweight AR preview — how the craft is created.
              </p>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-3xl flex-shrink-0">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-gold/15 rounded-full flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-medium text-foreground">AI Recognition</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-gold/15 rounded-full flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-medium text-foreground">AR Story Overlay</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-gold/15 rounded-full flex items-center justify-center mb-2">
              <Archive className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-medium text-foreground">Community Archive</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-2 text-2xs text-muted-foreground/60 border-t border-border/30 font-light tracking-tight flex-shrink-0">
        For demo only — screenshot for pitch deck
      </footer>

      <style>{`
        @keyframes drawLine {
          0% {
            stroke-dashoffset: 200;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }

        @media (max-width: 1024px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
}
