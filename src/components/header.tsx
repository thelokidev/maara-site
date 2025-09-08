import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { createClient } from '@/lib/supabase/server';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/app/auth/actions';

async function UserMenu({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
           <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={signOut}>
          <DropdownMenuItem asChild>
              <button type="submit" className="w-full text-left cursor-pointer">Sign Out</button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between rounded-full border bg-card px-4 sm:px-6 py-2 shadow-sm">
          <Link href="/" className="flex items-center gap-2 font-bold text-base sm:text-lg">
            <Logo className="h-7 w-7 text-primary" />
            <span>Maara</span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
            <Link href="#download" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Use cases</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/feedback" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex">Feedback</Link>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
