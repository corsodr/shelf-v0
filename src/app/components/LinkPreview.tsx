import React from 'react';
import { X } from 'lucide-react';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

interface LinkPreviewProps {
  linkPreview: LinkPreview;
  onDelete?: () => void;
}

export default function LinkPreview({ linkPreview, onDelete }: LinkPreviewProps) {
  const { url, domain, title, image, favicon } = linkPreview;

  return (
    <div className="flex items-stretch mb-4 border border-slate-300 rounded overflow-hidden">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow flex"
      >
        {image && (
          <div className="w-[200px] h-[120px] flex-shrink-0 bg-slate-100">
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className="flex flex-col justify-center flex-grow p-3 hover:bg-slate-100">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center">
            {favicon && (
              <img 
                src={favicon} 
                alt={`Favicon for ${domain}`} 
                className="w-5 h-5 mr-2"
              />
            )}
            <p className="text-slate-600 truncate">{domain}</p>
          </div>
        </div>
      </a>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="px-3 hover:bg-slate-200 flex items-center"
        >
          <X size={20}/>
        </button>
      )}
    </div>
  );
}