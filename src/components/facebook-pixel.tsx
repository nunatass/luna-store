'use client';

import * as pixel from '@/lib/fpixel';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import TiktokPixel from 'tiktok-pixel';

const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? '';
const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
    TiktokPixel.init(tiktokPixelId);
    TiktokPixel.pageView();
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
