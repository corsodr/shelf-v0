import LinkPreview from '@/app/components/LinkPreview';

// preview id for key 
export default function LinkPreviewList({ previews }) {
  return (
    <div>
      {previews.map((preview, index) => (
        <LinkPreview 
            key={index}
            preview={preview}
        />
      ))}
    </div>
  );
}