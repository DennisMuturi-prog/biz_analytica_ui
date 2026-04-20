import FileUpload04 from "@/components/file-upload-04"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/upload")({
  component: RouteComponent,
})

function RouteComponent() {
  return <FileUpload04></FileUpload04>
}
