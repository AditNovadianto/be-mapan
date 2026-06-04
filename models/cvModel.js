const normalizeLines = (text) => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const extractSectionByHeadings = (text, possibleHeadings, stopHeadings) => {
  const lines = normalizeLines(text);

  const startIndex = lines.findIndex((line) =>
    possibleHeadings.some((heading) =>
      line.toLowerCase().includes(heading.toLowerCase()),
    ),
  );

  if (startIndex === -1) return [];

  const result = [];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const currentLine = lines[i].toLowerCase();

    const isStopHeading = stopHeadings.some((heading) =>
      currentLine.includes(heading.toLowerCase()),
    );

    if (isStopHeading) break;

    result.push(lines[i]);
  }

  return result;
};

const splitSkills = (skillsLines) => {
  return skillsLines
    .join(",")
    .split(/,|•|\||;/)
    .map((skill) => skill.trim())
    .filter(Boolean);
};

export async function generateCVJSON(text) {
  const email =
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || null;

  const phone = text.match(/(\+62|62|0)8[1-9][0-9]{6,11}/)?.[0] || null;

  const stopHeadings = [
    "profile",
    "summary",
    "education",
    "educational background",
    "experience",
    "work experience",
    "professional experience",
    "skills",
    "technical skills",
    "projects",
    "certifications",
    "organization",
    "organizational experience",
    "languages",
    "achievement",
  ];

  const skillsSection = extractSectionByHeadings(
    text,
    ["skills", "technical skills", "core skills", "tools"],
    stopHeadings,
  );

  const educationSection = extractSectionByHeadings(
    text,
    ["education", "educational background", "academic background"],
    stopHeadings,
  );

  const experienceSection = extractSectionByHeadings(
    text,
    ["work experience", "professional experience", "experience"],
    stopHeadings,
  );

  return {
    full_name:
      text
        .split("\n")
        .find((line) => line.trim())
        ?.trim() || null,
    email,
    phone,
    skills: splitSkills(skillsSection),
    education: educationSection,
    experiences: experienceSection,
    raw_text: text,
  };
}
