import { useState } from 'react';
import { X } from 'lucide-react';

export default function LinkPreview({ linkPreview, onDelete }) {
  const { url, domain, title, image } = linkPreview;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative mb-4 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      {onDelete && isHovered && (
        <button
          onClick={(e) => onDelete()}
        >
          <X size={16}/>
        </button>
      )}
    </div>
  );
}