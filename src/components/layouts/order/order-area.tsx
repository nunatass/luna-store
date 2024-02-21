'use client';

import { useSearchParams } from 'next/navigation';
import { FailedSection } from './failed-section';
import { SuccessSection } from './success-section';
export function OrderArea() {
  const searchParams = useSearchParams();

  const orderStatus = searchParams.get('status');
  return (
    <div className="my-10">
      {orderStatus === 'success' && <SuccessSection />}
      {orderStatus !== 'success' && <FailedSection />}
    </div>
  );
}
