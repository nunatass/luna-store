
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link'
export function WaterProofHomeArea() {
  return (
    <div className="container my-24 flex w-full flex-col md:flex-row justify-between gap-12 items-center">
      <div className="h-full w-full">
        <Image
          src="/wphome.webp"
          alt="water proof img"
          width={700}
          height={500}
          className="h-[300px] w-full object-cover md:h-[500px] md:w-[700px]"
        />
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-2xl md:text-5xl">Resistant to water and sweat.</h2>
        <h3 className="text-xl md:text-4xl font-bold">Does not fade.</h3>
        <p className="text-sm">
          The jewelry that withstands water, sweat and perfume. It won&apos;t fade
          and retains its coating whether you choose 18K gold-plated or silver.
          The jewelry is specially designed to resist water and moisture with
          its unique PVD coating, so you can wear it without worry, whether it&apos;s
          swimming, in the shower or on the beach.
        </p>
        <Button asChild variant="outline"  aria-label="shop now button" className="mt-4 px-8 py-6">
          <Link href="/products">
          Shop now
          </Link>
        </Button>
      </div>
    </div>
  );
}
