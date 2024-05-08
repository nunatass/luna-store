'use client';

import Script from 'next/script';

export const ToaltAffiliated = () => {
  return (
    <div>
      <Script
        async
        id="tolt-affiliated"
        src="https://cdn.tolt.io/tolt.js"
        data-tolt="8172a6a7-1b89-41ef-95ff-4f9b9b6f592c"
      />
    </div>
  );
};
