export const convertToLabel = (value: string) => {
  if (!value) return "";
  const splited = value.toLowerCase().split("_");
  const result =
    splited[0][0].toUpperCase() + splited[0].slice(1) + " " + splited.slice(1);
  return result.replaceAll(",", " ");
};

export const reverseLableToValue = (label: string) => {
  return label.trim().replaceAll(" ", "_").toUpperCase();
};
