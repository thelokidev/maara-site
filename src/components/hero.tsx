import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            The Truly Undetectable Browser
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Maara is invisible during screen shares and perfect for seamless Otter.ai transcription in meetings. Use Ctrl+Shift+\ to instantly hide/unhide your browser without anyone knowing.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#download">Download Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl shadow-2xl overflow-hidden border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Simulated screen with meeting interface */}
              <div className="w-4/5 h-4/5 bg-slate-800 rounded-lg shadow-inner relative overflow-hidden border border-slate-700">
                {/* Video call interface mockup */}
                <div className="absolute top-4 left-4 right-4 h-12 bg-slate-700 rounded flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-slate-300 text-sm font-medium">Video Call - Screen Sharing</div>
                  <div className="w-8 h-6 bg-slate-600 rounded"></div>
                </div>
                
                {/* Main content area */}
                <div className="mt-20 p-6 space-y-4">
                  <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                  <div className="h-32 bg-slate-700 rounded border border-slate-600"></div>
                </div>
                
                {/* Invisible browser hint */}
                <div className="absolute bottom-4 right-4 bg-primary/20 border border-primary/30 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Maara Running (Invisible)
                  </div>
                </div>
              </div>
              
              {/* Keyboard shortcut indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-slate-100 px-4 py-2 rounded-full text-sm font-mono border border-slate-700">
                Press Ctrl+Shift+\ to toggle
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
