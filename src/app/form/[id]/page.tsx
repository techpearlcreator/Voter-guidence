import FormGuidePage from "@/components/FormGuidePage";
import { FormId } from "@/lib/content";

export function generateStaticParams() {
  return [{ id: "form6" }, { id: "form7" }, { id: "form8" }];
}

export default async function FormDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FormGuidePage formId={id as FormId} />;
}
