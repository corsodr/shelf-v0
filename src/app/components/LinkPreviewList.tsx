import LinkPreview from '@/app/components/LinkPreview';

// review using preview.url for key 
export default function LinkPreviewList({ previews }) {
  return (
    <div>
      {previews.map((preview) => (
        <LinkPreview 
            key={preview.url}
            preview={preview}
        />
      ))}
    </div>
  );
}