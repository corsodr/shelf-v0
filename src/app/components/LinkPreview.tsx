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
    <div className="flex items-stretch mb-4 overflow-hidden">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow flex"
      >
        {image && (
          <div className="w-[60px] h-[60px] flex-shrink-0 bg-slate-100">
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
        )}
        <div className="flex flex-col justify-center flex-grow pl-3 pr-2 hover:bg-slate-200">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-slate-500">{domain}</p>
        </div>
      </a>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="px-3 flex items-center"
        >
          <X size={16} className="text-slate-500 hover:text-slate-700" />
        </button>
      )}
    </div>
  );
}