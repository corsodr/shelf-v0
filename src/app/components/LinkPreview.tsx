import React from 'react';
import { X } from 'lucide-react';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

interface LinkPreviewProps {
  linkPreview: LinkPreview;
  onDelete?: () => void;
  isEditing?: boolean;
}

export default function LinkPreview({ linkPreview, onDelete, isEditing = false }: LinkPreviewProps) {
  const { url, domain, title, image } = linkPreview;

  return (
    <div className="flex items-stretch mb-4 overflow-hidden rounded-lg group hover:bg-slate-200 transition-colors duration-200">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow flex"
      >
        {image && (
          <div className="w-[60px] h-[60px] flex-shrink-0">
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className={`flex flex-col justify-center flex-grow pl-3 ${isEditing ? '' : 'pr-3'}`}>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-slate-500">{domain}</p>
        </div>
      </a>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="px-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <X size={16} className="text-slate-500 hover:text-slate-700" />
        </button>
      )}
    </div>
  );
}