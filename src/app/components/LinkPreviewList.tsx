import LinkPreview from '@/app/components/LinkPreview';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

interface LinkPreviewListProps {
  linkPreviews: LinkPreview[];
  onDelete?: (index: number) => void;
  isEditing?: boolean;
}

export default function LinkPreviewList({ linkPreviews, onDelete, isEditing = false }: LinkPreviewListProps) {
  return (
    <div>
      {linkPreviews.map((linkPreview, index) => (
        <LinkPreview 
          key={('id' in linkPreview) ? linkPreview.id : `${linkPreview.url}-${index}`}
          linkPreview={linkPreview}
          onDelete={onDelete ? () => onDelete(index) : undefined}
          isEditing={isEditing}
        />
      ))}
    </div>
  );
}
