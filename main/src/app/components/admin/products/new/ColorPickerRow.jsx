'use client';
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

function ColorPickerRow({ index }) {
  const { register, setValue, control } = useFormContext();

  
  const hexPickerValue = useWatch({ 
    control, 
    name: `colors.${index}.hex` 
  });
  const hexTextValue = useWatch({ control, name: `colors.${index}.hexText` });



  // Sync: When the color picker box changes, update the text input box
  useEffect(() => {
    if (hexPickerValue && hexPickerValue !== hexTextValue) {
      setValue(`colors.${index}.hexText`, hexPickerValue, { shouldDirty: true });
    }
  }, [hexPickerValue, setValue, index]);



  // Sync: When the user types a hex text value, update the color picker box
  useEffect(() => {
  
    if (hexTextValue && /^#[0-9A-F]{6}$/i.test(hexTextValue) && hexTextValue !== hexPickerValue) {
      setValue(`colors.${index}.hex`, hexTextValue, { shouldDirty: true });
    }
  }, [hexTextValue, setValue, index]);

  return (
    <div className="flex gap-3">
      <input 
        {...register(`colors.${index}.hex`, { required: "Hex color is required" })}
        type="color"
        className="h-12 w-14 rounded-lg border cursor-pointer"
      />

      <input
        {...register(`colors.${index}.hexText`, { 
          required: "Hex code text is required",
          pattern: {
            value: /^#[0-9A-F]{6}$/i,
            message: "Must be a valid hex code (e.g. #1E3A8A)"
          }
        })}
        type="text"
        placeholder="#1E3A8A"
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
      />
    </div>
  );
}

export default ColorPickerRow;
