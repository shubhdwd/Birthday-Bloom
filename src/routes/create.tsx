import { createFileRoute } from "@tanstack/react-router";
import { CreateSurprise } from "@/components/creator/CreateSurprise";

export const Route = createFileRoute("/create")({
  component: CreatePage,
});

function CreatePage() {
  return <CreateSurprise />;
}
