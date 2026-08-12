import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQJsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/motion/reveal";
import type { Faq } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function FaqSection({
  faqs,
  title = "Questions, answered",
  eyebrow = "FAQ",
  className,
  headingId = "faq-heading",
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  className?: string;
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className={cn("border-b border-border", className)}>
      <FAQJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="label-mono text-brand">{eyebrow}</p>
          <h2 id={headingId} className="display mt-3 text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
