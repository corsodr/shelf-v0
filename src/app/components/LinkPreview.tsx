import React from 'react';

export default function LinkPreview({ linkPreview }) {
  const { url, domain, title, image } = linkPreview;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-4 w-full"
    >
      <div className="flex w-[800px] h-[117px] bg-slate-100 hover:bg-slate-200 rounded-lg overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={`Thumbnail for ${title}`} 
            className="object-cover w-[208px]" 
          />
        )}
        <div className={`flex flex-col justify-center ${image ? 'ml-5' : 'p-5'}`}>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-slate-600">{domain}</p>
        </div>
      </div>
    </a>
  );
}