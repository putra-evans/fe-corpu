export type IconConfig = {
  icon: string;
  color: string;
  bg: string;
};

export const activityConfig: Record<string, IconConfig> = {
  attendance: {
    icon: "mdi:clipboard-check",
    color: "text-green-500",
    bg: "bg-gray-100",
  },
  material_file: {
    icon: "material-symbols:picture-as-pdf",
    color: "text-red-500",
    bg: "bg-gray-100",
  },
  material_video: {
    icon: "mdi:video",
    color: "text-blue-500",
    bg: "bg-gray-100",
  },
  text: {
    icon: "mdi:file-document-outline",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  quiz: {
    icon: "mdi:help-circle",
    color: "text-yellow-500",
    bg: "bg-gray-100",
  },
  survey: {
    icon: "mdi:poll",
    color: "text-purple-500",
    bg: "bg-gray-100",
  },
  task: {
    icon: "mdi:clipboard-text",
    color: "text-indigo-500",
    bg: "bg-gray-100",
  },
  certificate: {
    icon: "mdi:certificate",
    color: "text-orange-500",
    bg: "bg-gray-100",
  },
};

export const requirementConfig: Record<string, IconConfig> = {
  file: {
    icon: "mdi:paperclip",
    color: "text-blue-500",
    bg: "bg-gray-100",
  },
  textarea: {
    icon: "mdi:text-box-outline",
    color: "text-green-500",
    bg: "bg-gray-100",
  },
  text: {
    icon: "mdi:form-textbox",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
};
