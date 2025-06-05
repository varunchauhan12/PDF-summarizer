export const parseSection = (section: string): { title: string; points: string[] } => {
  const lines = section.split("\n");
  const [title, ...content] = lines;
  const cleanedTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();
  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("•") || trimmedLine.startsWith("*")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });
  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanedTitle,
    points: points.filter((point) => point && !point.startsWith("#")),
  };
};