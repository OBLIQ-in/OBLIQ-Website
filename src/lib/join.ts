/**
 * Field rules for the Join Our Team application.
 *
 * Shared by the form (src/components/sections/join-form.tsx) and the
 * /api/join route, so a request that skips the browser still gets the
 * same checks.
 */
import { positions } from "./positions";

export const joinFields = [
  "name",
  "email",
  "phone",
  "education",
  "linkedin",
  "github",
  "position",
  "resume",
  "availability",
  "note",
] as const;

export type JoinField = (typeof joinFields)[number];
export type JoinValues = Record<JoinField, string>;

const requiredMessages: Partial<Record<JoinField, string>> = {
  name: "Please enter your name.",
  email: "Please enter your email address.",
  linkedin: "Please add your LinkedIn profile link.",
  position: "Please choose the position you're applying for.",
  resume: "Please add a link to your resume.",
};

export const requiredFields = new Set(Object.keys(requiredMessages) as JoinField[]);

/** Fields that must hold a full http(s) link when filled in. */
const linkFields = new Set<JoinField>(["linkedin", "github", "resume"]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isWebLink(value: string) {
  try {
    return /^https?:$/.test(new URL(value.trim()).protocol);
  } catch {
    return false;
  }
}

/** The error message for one field, or undefined when it's fine. */
export function validateField(field: JoinField, values: JoinValues): string | undefined {
  const value = values[field].trim();

  if (value === "") return requiredMessages[field];
  if (field === "email" && !EMAIL_PATTERN.test(value)) {
    return "Please enter a valid email address, like jane@gmail.com.";
  }
  if (linkFields.has(field) && !isWebLink(value)) {
    return "Please enter a full link starting with https://";
  }
  if (field === "position" && !(positions as readonly string[]).includes(value)) {
    return "Please choose the position you're applying for.";
  }
  return undefined;
}

/** Every field's error message; empty when the whole application is valid. */
export function validateApplication(values: JoinValues): Partial<Record<JoinField, string>> {
  const errors: Partial<Record<JoinField, string>> = {};
  for (const field of joinFields) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}
