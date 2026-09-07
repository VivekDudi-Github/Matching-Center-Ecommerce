"use client";

function SideBardSkeleton() {
    return (
        <div className="flex flex-col gap-9 text-zinc-900 dark:text-zinc-100">
          
          <div className="h-10 rounded-lg bg-zinc-700 animate-pulse"/> 

          <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="h-4 w-16 rounded-lg bg-zinc-700 animate-pulse"/> 
            <div className="h-4 w-6 rounded-lg bg-zinc-700 animate-pulse"/>
          </div>
         <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="h-4 w-22 rounded-lg bg-zinc-700 animate-pulse"/> 
            <div className="h-4 w-6 rounded-lg bg-zinc-700 animate-pulse"/>
          </div>
          <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="h-4 w-12 rounded-lg bg-zinc-700 animate-pulse"/> 
            <div className="h-4 w-6 rounded-lg bg-zinc-700 animate-pulse"/>
          </div>

          <div className="h-5 rounded-lg bg-zinc-700 animate-pulse"/> 

          <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="h-4 w-12 rounded-lg bg-zinc-800 animate-pulse"/> 
            <div className="h-6 w-12 rounded-md bg-zinc-800 animate-pulse"/>
          </div>


          <div className="h-10 rounded-lg bg-zinc-700 animate-pulse order-t border-zinc-200 dark:border-zinc-800 "/> 


        </div>  
  )     
}

export default SideBardSkeleton