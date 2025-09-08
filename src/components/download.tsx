import { Button } from '@/components/ui/button';
import { Download, Monitor, Apple, Shield, Zap, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReleaseInfo {
  version: string;
  releaseName: string;
  publishedAt: string;
  description: string;
  windowsDownloadUrl?: string;
  macDownloadUrl?: string;
  downloadCount: number;
}

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
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReleaseInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/github/releases');

        if (!response.ok) {
          if (response.status === 404) {
            const errorData = await response.json();
            setError(`${errorData.error} Visit: ${errorData.repository}`);
          } else {
            throw new Error('Failed to fetch release information');
          }
          return;
        }

        const data: ReleaseInfo = await response.json();
        setReleaseInfo(data);
      } catch (err) {
        console.error('Error fetching release info:', err);
        setError('Failed to load download links. Check console for details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleaseInfo();
  }, []);

  const getDownloadUrl = (platform: 'windows' | 'mac') => {
    if (!releaseInfo) return '#';

    if (platform === 'windows') {
      return releaseInfo.windowsDownloadUrl || '#';
    } else if (platform === 'mac') {
      return releaseInfo.macDownloadUrl || '#';
    }

    return '#';
  };

  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <section id="download" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Download Maara</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the truly undetectable browser for your platform. Start your stealth browsing experience today.
          </p>
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Please check back later or contact support.
              </p>
            </div>
          )}
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
              disabled={isLoading || !releaseInfo?.windowsDownloadUrl}
            >
              <a
                href={getDownloadUrl('windows')}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Download className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Loading...' : `Download for Windows ${releaseInfo?.version || ''}`}
              </a>
            </Button>

            {releaseInfo && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                {formatDownloadCount(releaseInfo.downloadCount)} downloads • v{releaseInfo.version}
              </p>
            )}
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
              disabled={isLoading || !releaseInfo?.macDownloadUrl}
            >
              <a
                href={getDownloadUrl('mac')}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Download className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Loading...' : `Download for Mac ${releaseInfo?.version || ''}`}
              </a>
            </Button>

            {releaseInfo && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                {formatDownloadCount(releaseInfo.downloadCount)} downloads • v{releaseInfo.version}
              </p>
            )}
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
