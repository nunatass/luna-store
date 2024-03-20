import { termsAndConditionsData } from '@/data/terms-and-conditions';

export const TermsAndConditionsArea = () => {
  return (
    <section className="container mt-10 pb-20 ">
      <div className="flex w-full flex-col gap-8 lg:w-[70%]">
        {termsAndConditionsData.map((section, index) => (
          <div
            key={section.title ?? index}
            className="flex w-full flex-col gap-2"
          >
            {section.title && (
              <h2 className="text-lg font-semibold">{section.title}</h2>
            )}

            {section.content.map((paragraph) => (
              <p key={paragraph.slice(0, 10)} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
