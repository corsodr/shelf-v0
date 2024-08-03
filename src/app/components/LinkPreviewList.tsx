import LinkPreview from '@/app/components/LinkPreview';

export default function LinkPreviewList({ }) {
  return (
    <div>
      {videoPreviews.map((videoPreview) => (
        <LinkPreview 
          key={videoPreview.id} 
          videoPreview={videoPreview} 
          deleteVideoPreview={deleteVideoPreview}  />
      ))}
    </div>
  );
}