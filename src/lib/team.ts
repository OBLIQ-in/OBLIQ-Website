/**
 * People shown in the "Team Behind OBLIQ.io" section on /contact-us.
 * Same members as obliqq.framer.ai/contact-us — add someone by adding an
 * entry here; the section needs no changes.
 */
export interface TeamMember {
  name: string;
  role: string;
  /** Background shown under the role, e.g. schools or achievements */
  credentials: string[];
  linkedin: string;
}

export const team: TeamMember[] = [
  {
    name: "Naman Jha",
    role: "Co-founder",
    credentials: ["IIT Madras", "University of Cambridge", "University of Illinois USA", "NIT Trichy"],
    linkedin: "https://www.linkedin.com/in/naman-iitm/",
  },
  {
    name: "Amrita Kumari",
    role: "Co-founder",
    credentials: ["BVCOEP", "4× Hackathon Winner"],
    linkedin: "https://www.linkedin.com/in/amrita-kumari-803a17261/",
  },
];
