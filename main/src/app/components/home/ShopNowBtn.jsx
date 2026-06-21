'use client';
import BigButton from '../BigButton';

function ShopNowBtn() {
  return (
    <div className='w-36 h-24 mt-4 mx-auto text-lg font-light'>
      <BigButton name={'Shop Now'} onClick={() => alert('Coming Soon')} />
    </div>
  )
}

export default ShopNowBtn