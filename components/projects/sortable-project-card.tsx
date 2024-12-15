import { Project } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProjectCard from "./project-card";

interface SortableProjectCardProps {
  project: Project;
  onClick: () => void;
  onDelete: () => void;
}

export default function SortableProjectCard({
  project,
  onClick,
  onDelete,
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    gridRow: isDragging ? "span 1" : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ProjectCard
        project={project}
        onProjectClick={() => onClick()}
        onDeleteClick={() => onDelete()}
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>
  );
}
