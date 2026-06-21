'use client';

function BigButton({name, onClick}) {
  return (
    <div className="text-black w-full bg-white hover:opacity-75 hover:scale-105 transition-all duration-200 ease-in-out rounded-sm px-4 py-2 cursor-pointer text-center " onClick={onClick}>
      {name}
    </div>
  )
}

export default BigButton