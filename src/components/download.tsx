import { Button } from '@/components/ui/button';
import { Download, Monitor, Apple, Shield, Zap } from 'lucide-react';

const downloadLinks = {
  windows: "#", // Replace with actual Windows download link
  mac: "#",     // Replace with actual Mac download link
};

const systemRequirements = {
  windows: {
    os: "Windows 10 or later",
    memory: "4GB RAM minimum",
    storage: "500MB free space"
  },
  mac: {
    os: "macOS 10.15 or later",
    memory: "4GB RAM minimum", 
    storage: "500MB free space"
  }
};

export default function DownloadSection() {
  return (
    <section id="download" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Download Maara</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the truly undetectable browser for your platform. Start your stealth browsing experience today.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Windows Download */}
          <div className="bg-card p-8 rounded-xl border shadow-sm">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Windows</h3>
                <p className="text-muted-foreground">For Windows PCs</p>
              </div>
            </div>
            
            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              <p>• {systemRequirements.windows.os}</p>
              <p>• {systemRequirements.windows.memory}</p>
              <p>• {systemRequirements.windows.storage}</p>
            </div>

            <Button 
              size="lg" 
              className="w-full" 
              asChild
            >
              <a href={downloadLinks.windows} download>
                <Download className="mr-2 h-5 w-5" />
                Download for Windows
              </a>
            </Button>
          </div>

          {/* Mac Download */}
          <div className="bg-card p-8 rounded-xl border shadow-sm">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <Apple className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">macOS</h3>
                <p className="text-muted-foreground">For Mac computers</p>
              </div>
            </div>
            
            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              <p>• {systemRequirements.mac.os}</p>
              <p>• {systemRequirements.mac.memory}</p>
              <p>• {systemRequirements.mac.storage}</p>
            </div>

            <Button 
              size="lg" 
              className="w-full" 
              asChild
            >
              <a href={downloadLinks.mac} download>
                <Download className="mr-2 h-5 w-5" />
                Download for Mac
              </a>
            </Button>
          </div>
        </div>

        {/* Key Features After Download */}
        <div className="bg-secondary/50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Complete Invisibility</h4>
              <p className="text-sm text-muted-foreground">Undetectable during screen shares and recordings</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Instant Toggle</h4>
              <p className="text-sm text-muted-foreground">Ctrl+Shift+\ to hide/show instantly</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                <Monitor className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Meeting Ready</h4>
              <p className="text-sm text-muted-foreground">Optimized for Otter.ai and transcription</p>
            </div>
          </div>
        </div>

        {/* Installation Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Installation takes less than 2 minutes. No browser extensions required.
          </p>
        </div>
      </div>
    </section>
  );
}
