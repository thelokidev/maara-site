import { Eye, EyeOff, Mic, Shield, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: EyeOff,
    title: "Screen Share Invisible",
    description: "Completely undetectable during screen shares and video calls. Your browser won't appear in any recordings or shared screens."
  },
  {
    icon: Zap,
    title: "Instant Toggle",
    description: "Press Ctrl+Shift+\\ from anywhere to instantly hide or show Maara. Works system-wide in milliseconds."
  },
  {
    icon: Mic,
    title: "Otter.ai Optimized",
    description: "Perfect for seamless meeting transcription. Run Otter.ai in the background without anyone knowing."
  },
  {
    icon: Shield,
    title: "Meeting Stealth",
    description: "Designed specifically for professionals who need discretion during meetings, calls, and presentations."
  },
  {
    icon: Eye,
    title: "Zero Footprint",
    description: "Leaves no traces in taskbars, alt-tab menus, or system monitors when hidden. Truly invisible."
  },
  {
    icon: Users,
    title: "Team Ready",
    description: "Deploy across your organization with team licenses and bulk management tools."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Maara?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The only browser built specifically for professionals who need complete invisibility during meetings and screen shares.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-background p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
