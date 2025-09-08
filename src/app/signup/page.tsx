import Link from "next/link"
import { signup } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"

export default async function SignupPage({ searchParams }: { searchParams?: Promise<{ message?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">Maara</CardTitle>
          </Link>
          <CardDescription>
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {resolvedSearchParams?.message && (
                <div className="text-sm font-medium text-destructive">
                    {resolvedSearchParams.message}
                </div>
            )}
            <Button formAction={signup} className="w-full">
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
