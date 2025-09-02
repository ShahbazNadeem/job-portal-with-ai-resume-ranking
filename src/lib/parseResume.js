import nlp from "compromise";

// quick helpers
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_RE =
  /(\+\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{4}/g;
const DATE_RE =
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)\.?[-\s]?\d{2,4}|\b\d{2}\/\d{4}\b/gi;

const SECTION_HEADERS = [
  "experience",
  "work experience",
  "employment",
  "professional experience",
  "education",
  "skills",
  "projects",
  "certifications",
];

function splitIntoSections(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const sections = {};
  let current = "summary";
  sections[current] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    const header = SECTION_HEADERS.find(h => lower.startsWith(h));
    if (header) {
      current = header.includes("experience") ? "experience"
        : header.includes("education") ? "education"
          : header.includes("skill") ? "skills"
            : header.includes("project") ? "projects"
              : header.includes("certification") ? "certifications"
                : header;
      if (!sections[current]) sections[current] = [];
    } else {
      sections[current].push(line);
    }
  }
  return sections;
}

export function parseResumeText(text) {
  const doc = nlp(text);
  const emails = [...new Set(text.match(EMAIL_RE) || [])];
  const phones = [...new Set(text.match(PHONE_RE) || [])];

  // naive guess for name: first person entity found
  const people = doc.people().out("array");
  const name = people.length ? people[0] : undefined;

  const sections = splitIntoSections(text);

  // Experience: look for lines with Company/Role + dates
  const exp = [];
  (sections.experience || []).forEach(l => {
    const dates = l.match(DATE_RE) || [];
    if (dates.length) {
      exp.push({
        line: l,
        startDate: dates[0] || null,
        endDate: dates[1] || null,
      });
    }
  });

  // Education: degree/university heuristics
  const education = (sections.education || []).map(l => {
    const hasDeg = /(B\.?Sc|M\.?Sc|B\.?E|B\.?Tech|M\.?Tech|MBA|BS|MS|PhD|Bachelor|Master|Doctor)/i.test(l);
    return hasDeg ? { line: l } : null;
  }).filter(Boolean);

  // Skills block → comma/pipe/newline split
  const skills = (sections.skills || [])
    .join(", ")
    .split(/[,|•;]\s*/)
    .map(s => s.trim())
    .filter(Boolean);

  // Projects / Certifications (keep raw lines for MVP)
  const projects = (sections.projects || []).map(l => ({ line: l }));
  const certifications = (sections.certifications || []).map(l => ({ line: l }));

  return {
    personal: {
      name,
      email: emails[0],
      phone: phones[0],
    },
    workExperience: exp,
    education,
    skills,
    projects,
    certifications,
    raw: { sections }, // useful for debugging
  };
}
