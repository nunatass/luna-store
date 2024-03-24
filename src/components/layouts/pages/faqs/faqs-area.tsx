import faqImg from '@/assets/img/banner-faq.webp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqsData } from '@/data/faqs-data';
import Image from 'next/image';

export const FAQsArea = () => {
  return (
    <section className="container my-10">
      <div className="flex w-full flex-col">
        <p>
          We&apos;ve included answers to some of our more frequently asked
          questions below.
        </p>
        <p>
          Not finding the answer you need? Don&apos;t worry, simply send us a
          message at support@stellastone.store and we will get back to you
          within 24 hours.
        </p>
        <div className="mt-8 flex w-full flex-col justify-between md:flex-row">
          <div className="h-full w-full">
            <Image
              src={faqImg}
              alt="faq img"
              width={600}
              height={600}
              className="h-[200px] w-full object-cover md:h-[600px] md:w-[600px]"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqsData.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index + 1}`}>
                <AccordionTrigger className="">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {' '}
                  <p className="whitespace-pre-line	 text-base">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
