"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function FeedbackPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const createMailtoHref = (): string => {
    const subject = encodeURIComponent("Maara Feedback");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    return `mailto:support@maara.pro?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = createMailtoHref();
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>We would love to hear your thoughts and suggestions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Share your feedback..." rows={6} required />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit">Send Feedback</Button>
                <a className="text-sm text-muted-foreground underline" href="mailto:support@maara.pro">Or email support@maara.pro</a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


