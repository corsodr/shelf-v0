import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, GripVertical } from 'lucide-react';
import { APIPreview, DBLinkPreview } from '../types/types';

interface DndLinkPreviewProps {
  linkPreview: APIPreview | DBLinkPreview;
  onDelete?: () => void;
}

export default function DndLinkPreview({ linkPreview, onDelete }: DndLinkPreviewProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: linkPreview.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative flex items-stretch mb-4 pl-8"> 
      <div {...attributes} {...listeners} className="absolute left-2 top-0 bottom-0 flex items-center">
        <GripVertical size={20} className="text-slate-400" />
      </div>
      <a 
        href={linkPreview.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow flex"
      >
        {linkPreview.image && (
          <img 
            src={linkPreview.image} 
            alt={`Thumbnail for ${linkPreview.title}`} 
            className="w-[60px] h-[60px] object-cover rounded-lg" 
          />
        )}
        <div className="flex flex-col justify-center pl-3 pr-3">
          <h3 className="font-medium">{linkPreview.title}</h3>
          <p className="text-sm text-slate-500">{linkPreview.domain}</p>
        </div>
      </a>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center"
        >
          <X size={20} className="text-slate-500 hover:text-slate-700" />
        </button>
      )}
    </div>
  );
}