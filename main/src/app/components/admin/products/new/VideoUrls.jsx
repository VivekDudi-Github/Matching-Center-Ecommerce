"use client";
import { YouTubeEmbed } from '@next/third-parties/google';
import { FileVideo2, Trash2Icon, XIcon } from 'lucide-react';
import  { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form';

export default function VideoUrls() {
  const [ytUrl, setYtUrl] = useState('');


  const {setValue ,control, formState: { errors } } = useFormContext();

  const videoIdsField = useWatch({
    name: 'videoIds',
    control: control,
    defaultValue: []
  });

  
  const handleRemoveId = (id) => {
    setValue('videoIds', videoIdsField.filter((videoId) => videoId !== id));
  }

  useEffect(() => {
    const id = getYouTubeID(ytUrl);
    if (id && !videoIdsField.includes(id)) {
      setValue('videoIds', [...videoIdsField, id]);
      setYtUrl('');
    }
  }, [ytUrl])

  function getYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  return (
    <section className="rounded-2xl bg-white shadow-sm shadow-black/20 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"> 
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-2 md:p-6">
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
          <FileVideo2 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Video URLs
          </h2>
          <p className="text-sm text-zinc-500">
            Add YouTube video URLs for this product.
          </p>
        </div>
      </div>

      <div className="md:p-6 md:pt-0 p-2">
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Urls
        </label>

        <div className="flex gap-3 relative">
          <input 
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className=" w-full rounded-xl border border-zinc-300 bg-white pr-10 px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          
          <button type='button' onClick={() => setYtUrl("")} className=' absolute right-2 top-1/2 -translate-y-1/2 rounded-md dark:bg-zinc-600 bg-zinc-900 hover:opacity-80 p-1 text-white'>
            <XIcon className='size-5' />
          </button>
        </div>

        <div className="pt-2 w-full grid grid-cols-4 ">

          {videoIdsField.map((id, index) => (
            <span
              key={id}
              className=" gap-2 col-span-2 relative rounded-xl max-h-48 border border-zinc-300 bg-white overflow-clip text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <div className=" w-full rounded-xl bg-black shadow-lg">                
                <YouTubeEmbed videoid={id} style="max-width: 100%; width: 100%;" />
              </div> 
              <button type="button"
                onClick={() => handleRemoveId(id)}
                className="rounded-full absolute top-2 right-2 bg-red-500 p-1.5 text-white shadow transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                <XIcon size={14} />
              </button>
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
