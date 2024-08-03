export default function LinkPreview() {
  return (
    <div className="flex mb-8">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex hover:bg-slate-100 rounded-lg">
          <img 
            src={thumbnail} 
            alt={`Thumbnail for ${title}`} 
            className="object-cover w-[192px] h=[108px] rounded-lg" 
          />
          <div className="flex flex-col justify-center w-[500px] ml-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-500">{channel}</p>
          </div>
        </div>
      </a>
    </div>
  );
}