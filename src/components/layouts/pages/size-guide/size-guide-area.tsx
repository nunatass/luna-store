import ringSizeGuide from '@/assets/img/ringsize.jpg';
import Image from 'next/image';

export const SizeGuideArea = () => {
  return (
    <section className="container my-10">
      <div className="flex w-full flex-col gap-4">
        <p className="">
          To ensure that you select the right ring size, we provide you with our
          comprehensive ring size guide. This invaluable reference will assist
          you in finding the perfect size for your dream ring.
        </p>
        <div>
          <h6 className="font-semibold">Determining the right ring size</h6>
          <p className="">
            It&apos;s a problem that some people have certainly faced before:
            You have found a ring online that you absolutely have to have, the
            only drawback is the ring size. We&apos;ll tell you a few very
            simple methods that you can use to find out your ring size quickly
            and easily.
          </p>
        </div>
        <div>
          <h6 className="font-semibold">Ring size chart</h6>
          <p className="">
            If you already have a value, the ring size chart will help you
            determine your ring size. For example, if you have measured the
            inside diameter with a ruler or tape measure, you can use this value
            in the size chart to read off your standard ring size. Example: The
            inner diameter of your rings is 16.5 mm. According to the conversion
            table, the appropriate ring size is 52 in standard ring size or 6 in
            US ring size.
          </p>
        </div>
        <div>
          <h6 className="font-semibold">Ring size template</h6>
          <p className="">
            With the{' '}
            <a
              href="https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/stella-stone-ring-size-guide.pdf"
              target="_blank"
              className="underline"
            >
              ring size template
            </a>{' '}
            ⎙ you can easily determine your ring size. After you have downloaded
            and printed out the template free of charge, you can now determine
            your size in two ways. Either you place an existing, matching ring
            on the template and simply read off the size. Or you can cut along
            the dotted line and then put your finger through it. You can then
            read off your size below the ring template.
          </p>
          <p>
            Attention! Please follow the procedure on the{' '}
            <a
              href="https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/stella-stone-ring-size-guide.pdf"
              target="_blank"
              className="underline"
            >
              PDF
            </a>{' '}
            to ensure that nothing goes wrong when determining the ring size.
          </p>
        </div>
        <div className="relative mt-4 w-full">
          <Image src={ringSizeGuide} alt="ring size guide" />
        </div>
      </div>
    </section>
  );
};
