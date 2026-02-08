import englishContent from "@/content/english.json";
import tamilContent from "@/content/tamil.json";

export type Language = "en" | "ta";

export type FormId = "form6" | "form7" | "form8";

export interface FormContent {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  color: string;
  fullDescription: string;
  eligibility: string[];
  documentsRequired: string[];
  steps: string[];
  videoUrl: string;
  applyUrl: string;
  applyButtonText: string;
}

export interface ContentData {
  meta: { language: string; languageLabel: string; direction: string };
  header: { title: string; subtitle: string; district: string; languageToggleLabel: string };
  home: { heading: string; subheading: string };
  forms: Record<string, FormContent>;
  common: Record<string, string>;
}

const contentMap: Record<Language, ContentData> = {
  en: englishContent as ContentData,
  ta: tamilContent as ContentData,
};

export function getContent(language: Language): ContentData {
  return contentMap[language];
}

export function getFormContent(
  language: Language,
  formId: FormId
): FormContent | undefined {
  const content = getContent(language);
  return content.forms[formId];
}

export function getAllFormIds(): FormId[] {
  return ["form6", "form7", "form8"];
}
