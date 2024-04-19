'use client';

import * as pixel from '@/lib/fpixel';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import TiktokPixel from 'tiktok-pixel';

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
    TiktokPixel.init('COHBQ7BC77U0PSRU1NNG');
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.fbPixelId}
      />
    </div>
  );
};

export default FacebookPixel;
