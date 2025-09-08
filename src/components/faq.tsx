import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What makes Maara truly undetectable?",
    answer: "Maara is completely invisible during screen shares and video calls. Unlike regular browsers, it won't appear in screen recordings or when sharing your screen, making it perfect for discreet Otter.ai transcription during meetings.",
  },
  {
    question: "How do I hide and show the browser?",
    answer: "Simply press Ctrl+Shift+\\ to instantly hide or show Maara. This keyboard shortcut works from anywhere on your system and makes the browser vanish without a trace in milliseconds.",
  },
  {
    question: "Does it work with Otter.ai?",
    answer: "Absolutely! Maara is optimized for seamless Otter.ai integration. You can run Otter.ai transcription in the background during meetings without anyone knowing, as Maara remains invisible during screen shares.",
  },
  {
    question: "Will others see Maara during video calls?",
    answer: "No, that's the whole point! Maara is designed to be completely invisible during screen shares, video calls, and screen recordings. Your meeting participants will never know you're using it for transcription.",
  },
  {
    question: "How does the free trial work?",
    answer: "The free trial gives you 10 minutes of stealth browsing to test Maara's undetectable features. You can try the Ctrl+Shift+\\ shortcut and see how it remains invisible during screen shares.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, Maara runs locally on your machine and doesn't store or access your browsing data. Your meeting transcriptions and browsing activity remain completely private and secure.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We've got answers.
            </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
