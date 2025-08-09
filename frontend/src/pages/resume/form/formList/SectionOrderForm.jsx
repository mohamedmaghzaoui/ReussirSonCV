import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import axios from "axios";
import { GripVertical, Loader2 } from "lucide-react";

// Default labels for the sections
const defaultLabels = {
  profile: "Profil",
  education: "Éducation",
  experience: "Expérience",
  projects: "Projets",
  skills: "Compétences",
  languages: "Langues",
};

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Apply style to the list item for dragging
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-3 bg-base-200 rounded-lg shadow mb-2 cursor-move"
    >
      <span>{defaultLabels[id]}</span>
      <GripVertical className="opacity-50" />
    </li>
  );
}

export const SectionOrderForm = ({
  resume,
  setResume,
  goToPrevStep,
  goToNextStep,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL; // API URL from environment variables
  const [items, setItems] = useState(
    resume.section_order || Object.keys(defaultLabels),
  ); // State for section order
  const [loading, setLoading] = useState(false); // Loading state

  // Setting up drag sensors (Pointer and Keyboard sensors)
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle dragging items and changing their order
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const newOrder = arrayMove(
        items,
        items.indexOf(active.id),
        items.indexOf(over.id),
      );
      setItems(newOrder); // Update the section order
    }
  };

  // Save the new section order
  const saveSectionOrder = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true); // Set loading state
    try {
      await axios.put(`${apiUrl}/cvs/${resume.id}/`, {
        ...resume,
        section_order: items,
      });
      setResume({ ...resume, section_order: items }); // Update the resume state with the new order
      goToNextStep(); // Move to the next step
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l’ordre des sections :",
        error,
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg">
      <progress
        className="progress progress-primary w-full mb-4"
        value={90}
        max="100"
      ></progress>
      <h2 className="text-xl font-bold text-info-content mb-6">
        Réorganiser les sections
      </h2>

      <div className="max-w-md mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className="bg-base-100 p-4 rounded-box border border-base-300">
              {items.map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button onClick={goToPrevStep} className="btn">
          Précédent
        </button>
        <button onClick={saveSectionOrder} className="btn btn-primary">
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Suivant"}
        </button>
      </div>
    </div>
  );
};
