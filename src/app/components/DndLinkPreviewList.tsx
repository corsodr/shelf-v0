import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DndLinkPreview from '@/app/components/DndLinkPreview';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreviewType = APIPreview | DBLinkPreview;

interface DndLinkPreviewListProps {
  linkPreviews: LinkPreviewType[];
  onReorder: (newOrder: LinkPreviewType[]) => void;
  onDelete?: (index: number) => void;
}

export default function DndLinkPreviewList({ linkPreviews, onReorder, onDelete }: DndLinkPreviewListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = linkPreviews.findIndex(item => item.url === active.id);
      const newIndex = linkPreviews.findIndex(item => item.url === over?.id);
      const newOrder = arrayMove(linkPreviews, oldIndex, newIndex);
      onReorder(newOrder);
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={linkPreviews.map(lp => lp.url)}
        strategy={verticalListSortingStrategy}
      >
        {linkPreviews.map((linkPreview, index) => (
          <DndLinkPreview
            key={linkPreview.url}
            linkPreview={linkPreview}
            onDelete={onDelete ? () => onDelete(index) : undefined}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}