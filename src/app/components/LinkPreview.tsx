export default function LinkPreview({ preview }) {
  const { title, url, image } = preview;
  console.log('preview', preview);
  return (
    <div className="flex mb-8">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex hover:bg-slate-100 rounded-lg">
          <img 
            src={image} 
            alt={`Thumbnail for ${title}`} 
            className="object-cover w-[192px] h=[108px] rounded-lg" 
          />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </a>
    </div>
  );
}