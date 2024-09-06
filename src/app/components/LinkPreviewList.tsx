import LinkPreview from '@/app/components/LinkPreview';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

export default function LinkPreviewList({ linkPreviews }: { linkPreviews: LinkPreview[] }) {
  return (
    <div>
      {linkPreviews.map((linkPreview, index) => (
        <LinkPreview 
          key={('id' in linkPreview) ? linkPreview.id : `${linkPreview.url}-${index}`}
          linkPreview={linkPreview}
        />
      ))}
    </div>
  );
}
