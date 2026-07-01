'use client';
import Link from 'next/link';
import BigButton from '../BigButton';

function ShopNowBtn({id}) {
  return (
    <Link href={id ? '/shop/id' : 'shop'} className='w-36 h-24 mt-4 mx-auto text-lg font-light'> 
      <BigButton name={'Shop Now'} />
    </Link>
  )
}

export default ShopNowBtn