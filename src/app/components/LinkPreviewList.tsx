import Preview from '@/app/components/Preview';

// review using preview.url for key 
export default function LinkPreviewList({ previews }) {
  return (
    <div>
      {previews.map((preview) => (
        <Preview 
            key={preview.url}
            preview={preview}
        />
      ))}
    </div>
  );
}