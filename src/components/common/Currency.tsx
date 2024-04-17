import React from 'react';

import { readableNumber } from '@/lib/number';

import { CURRENCY } from '@/domain/models';

export default function Currency({
  currency,
  value,
}: {
  currency: string;
  value: number;
}) {
  return (
    <div className=''>
      {CURRENCY[currency]?.symbol}
      {readableNumber(value.toString())}
    </div>
  );
}
