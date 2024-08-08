import LinkPreview from '@/app/components/LinkPreview';

// review using preview.url for key 
export default function LinkPreviewList({ linkPreviews }) {
  return (
    <div>
      {linkPreviews.map((linkPreview) => (
        <LinkPreview 
            key={linkPreview.url}
            linkPreview={linkPreview}
        />
      ))}
    </div>
  );
}