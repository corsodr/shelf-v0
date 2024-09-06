import React from 'react';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

export default function LinkPreview({ linkPreview }: { linkPreview: LinkPreview }) {
  const { url, domain, title, image } = linkPreview;

  return (
    <div className="flex items-stretch mb-4">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow flex"
      >
        {image && (
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className="w-[60px] h-[60px] object-cover rounded-lg" 
            />
        )}
        <div className="flex flex-col justify-center pl-3 pr-3">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-slate-500">{domain}</p>
        </div>
      </a>
    </div>
  );
}