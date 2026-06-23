import Image from "next/image"


function Footer() {
  return (
    <div className='w-full bg-white dark:bg-black text-black dark:text-white p-4 md:p-8'>
      <div className='mt-2 border border-t-[1px] dark:border-white border-black/50  mb-4' /> 
      <div className='flex md:flex-row  flex-col items-center justify-between text-black/80 dark:text-white  font-light text-sm tracking-wider'>
        <div className="">Contanct Us</div>
        <div>Shipping Policy</div>
      </div>
      <div className="flex gap-4 items-center my-4 justify-center md:gap-8 flex-wrap">
        <Image height={25} width={22}
          className="dark:invert " 
          src="https://www.svgrepo.com/show/494341/facebook.svg" alt="" 
        />
        <Image height={25} width={22}
          src={'https://www.svgrepo.com/show/424911/instagram-logo-facebook-2.svg'}
          className="dark:invert" 
          alt="intagram logo"
        />
        <Image height={25} width={22}
          src={'https://www.svgrepo.com/show/510342/whatsapp.svg'}
          className="dark:invert" 
          alt="intagram logo"
        />
      </div>
      <div className="text-center dark:text-white">• • •</div>
    </div>
  )
}

export default Footer