import React from 'react'

function ColorCards({colors}) {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2 text-[10px] md:text-sm">
        {colors.map((color) => {
          const quantity = Number(color.quantity || 0);

          return (
            <div key={color.colorId}
              className={`
                group relative flex items-center gap-1
                rounded-full border p-0.5 w-fit
                 transition-all
                border-zinc-200 bg-zinc-900 text-white dark:border-black dark:bg-white dark:text-zinc-900 
              `}
              aria-label={`Select ${color.name}`}
            >
              {/* Switch */}
              <span className={`
                  h-3.5 w-3.5 rounded-full border  dark:border-black border-white `}
                style={{
                  backgroundColor:
                    color?.hex || "#d4d4d8",
                }}
              />

              {/* Name */}
              <span className="">
                {color.colorName}:
              </span>

              {/* Quantity */}
              <span
                className={` font-semibold`}>
                {(quantity)} m
              </span>
            </div>
          )}
        )}
        
      </div>
    </div>
  )
}

export default ColorCards