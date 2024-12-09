import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { 
  DndContext, 
  DragOverlay,
  useSensor, 
  useSensors, 
  MouseSensor,
  TouchSensor,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { ComponentDrawer } from "~/components/ComponentDrawer";
import { DroppableGrid } from "~/components/DroppableGrid";
import { ConfigurationPanel } from "~/components/ConfigurationPanel";
import type { QuizComponent } from "~/types/quiz";
import { getStoredComponents, saveComponents } from "~/services/quizStore.server";

export async function loader() {
  return json({
    components: getStoredComponents(),
    availableComponents: [
      { id: "progress", type: "progress", label: "Progress Bar" },
      { id: "timer", type: "timer", label: "Timer" },
      { id: "question", type: "question", label: "Question Text" },
      { id: "image", type: "image", label: "Image" },
      { id: "options", type: "options", label: "Options" },
    ],
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const components = JSON.parse(formData.get("components") as string);
  saveComponents(components);
  return json({ success: true });
}

function DragOverlayContent({ label }: { label: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-blue-500">
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-sm text-gray-500">Drop to place</div>
    </div>
  );
}

export default function AdminView() {
  const { availableComponents, components: initialComponents } = useLoaderData<typeof loader>();
  const [components, setComponents] = useState<QuizComponent[]>(initialComponents);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<QuizComponent | null>(null);
  const submit = useSubmit();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 8,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && over.id === "grid") {
      const cell = document.elementFromPoint(
        event.activatorEvent.clientX,
        event.activatorEvent.clientY
      )?.closest('[data-x]');

      if (cell) {
        const x = parseInt(cell.getAttribute('data-x') || '0', 10);
        const y = parseInt(cell.getAttribute('data-y') || '0', 10);

        const draggedComponent = availableComponents.find(
          (c) => c.id === active.id
        );

        if (draggedComponent) {
          const isOccupied = components.some(
            (comp) => comp.position.x === x && comp.position.y === y
          );

          if (!isOccupied) {
            const newComponent: QuizComponent = {
              id: `${draggedComponent.id}-${Date.now()}`,
              type: draggedComponent.type as QuizComponent["type"],
              position: { x, y },
              config: {},
            };

            const updatedComponents = [...components, newComponent];
            setComponents(updatedComponents);
            setSelectedComponent(newComponent);

            submit(
              { components: JSON.stringify(updatedComponents) },
              { method: "post" }
            );
          }
        }
      }
    }

    setActiveId(null);
  };

  const handleConfigSave = (id: string, config: QuizComponent["config"]) => {
    const updatedComponents = components.map((comp) =>
      comp.id === id ? { ...comp, config } : comp
    );
    
    setComponents(updatedComponents);
    setSelectedComponent(null);
    
    submit(
      { components: JSON.stringify(updatedComponents) },
      { method: "post" }
    );
  };

  const handleComponentClick = (component: QuizComponent) => {
    setSelectedComponent(component);
  };

  const handleDeleteComponent = (componentId: string) => {
    const updatedComponents = components.filter((comp) => comp.id !== componentId);
    setComponents(updatedComponents);
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
    
    submit(
      { components: JSON.stringify(updatedComponents) },
      { method: "post" }
    );
  };

  const activeDraggable = activeId ? availableComponents.find(c => c.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ComponentDrawer components={availableComponents} />
        
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg">
            <DroppableGrid 
              components={components}
              onComponentClick={handleComponentClick}
              onDeleteComponent={handleDeleteComponent}
            />
          </div>
        </div>

        <DragOverlay>
          {activeDraggable && (
            <DragOverlayContent label={activeDraggable.label} />
          )}
        </DragOverlay>
      </DndContext>

      {selectedComponent && (
        <ConfigurationPanel
          component={selectedComponent}
          onSave={handleConfigSave}
          onCancel={() => setSelectedComponent(null)}
        />
      )}
    </div>
  );
}