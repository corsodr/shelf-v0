import { X } from 'lucide-react';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

interface LinkPreviewProps {
  linkPreview: LinkPreview;
  onDelete?: () => void;
}

export default function LinkPreview({ linkPreview, onDelete }: LinkPreviewProps) {
  const { url, domain, title, image } = linkPreview;

  return (
    <div
      className="flex items-center gap-3 mb-4 border border-slate-300 rounded"
    >
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow"
      >
        <div className="flex w-[600px] h-[117px] rounded overflow-hidden hover:bg-slate-200">
          {image && (
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className=" w-[117px] rounded" 
            />
          )}
          <div className={`flex flex-col justify-center ${image ? 'ml-5' : 'p-5'}`}>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-600">{domain}</p>
          </div>
        </div>
      </a>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
        >
          <X size={20}/>
        </button>
      )}
    </div>
  );
}