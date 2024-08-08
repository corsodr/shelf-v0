export default function LinkPreview({ linkPreview }) {
  const { url, domain, title, image } = linkPreview;

  return (
    <div className="flex mb-4">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <div className="flex w-[800px] h-[117px] gap-5 hover:bg-slate-100 rounded-lg">
          {image && 
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className="object-cover w-[208px] rounded-lg" 
            />
            }
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text text-slate-600">{domain}</p>
            </div>
        </div>
      </a>
    </div>
  );
}