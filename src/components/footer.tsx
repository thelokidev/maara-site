import Logo from '@/components/logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Maara</span>
            </div>
            <div className="flex gap-6 text-muted-foreground">
                <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Maara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
