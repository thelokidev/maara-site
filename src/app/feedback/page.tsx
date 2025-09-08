"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type FeedbackCategory = 'bug' | 'idea' | 'question' | 'other';

interface FeedbackFormState {
  name: string;
  email: string;
  category: FeedbackCategory;
  message: string;
}

export default function FeedbackPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FeedbackFormState>({
    name: '',
    email: '',
    category: 'other',
    message: '',
  });

  const handleChange = (field: keyof FeedbackFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.details || data?.error || 'Failed to submit feedback');
      }
      toast({ title: 'Thank you!', description: 'Your feedback has been submitted.' });
      setForm({ name: '', email: '', category: 'other', message: '' });
      router.push('/');
    } catch (err: any) {
      toast({ title: 'Submission failed', description: err.message ?? 'Please try again later.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>We value your feedback</CardTitle>
              <CardDescription>Tell us what is working well and what we should improve.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug report</SelectItem>
                      <SelectItem value="idea">Feature idea</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" value={form.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="Share your thoughts..." className="min-h-[140px]" required />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => router.push('/')}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send feedback'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


