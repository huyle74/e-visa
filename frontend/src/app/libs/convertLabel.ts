export const convertToLabel = (value: string) => {
  if (!value) return "";

  const check = value.includes("_");
  if (check) {
    const splited = value.toLowerCase().split("_");

    const convert = splited.map((word: string) => {
      return word[0].toUpperCase() + word.slice(1);
    });

    return convert.join(" ");
  } else return value;
};

export const reverseLableToValue = (label: string) => {
  return label.trim().replaceAll(" ", "_").toUpperCase();
};
