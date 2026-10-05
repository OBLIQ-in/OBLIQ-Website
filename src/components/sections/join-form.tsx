"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { positions } from "@/lib/positions";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "education"
  | "linkedin"
  | "github"
  | "position"
  | "resume"
  | "availability"
  | "note";

type Values = Record<FieldName, string>;

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  education: "",
  linkedin: "",
  github: "",
  position: "",
  resume: "",
  availability: "",
  note: "",
};

const required = new Set<FieldName>(["name", "email", "linkedin", "position", "resume"]);

function isWebLink(value: string) {
  try {
    return /^https?:$/.test(new URL(value.trim()).protocol);
  } catch {
    return false;
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: FieldName, values: Values): string | undefined {
  const empty = values[field].trim() === "";

  if (required.has(field) && empty) {
    return {
      name: "Please enter your name.",
      email: "Please enter your email address.",
      linkedin: "Please add your LinkedIn profile link.",
      position: "Please choose the position you're applying for.",
      resume: "Please add a link to your resume.",
    }[field as "name" | "email" | "linkedin" | "position" | "resume"];
  }
  if (field === "email" && !empty && !EMAIL_PATTERN.test(values.email.trim())) {
    return "Please enter a valid email address, like jane@gmail.com.";
  }
  if (field === "resume" && !empty && !isWebLink(values.resume)) {
    return "Please enter a full link starting with https://";
  }
  return undefined;
}

// Posts to our own /api/join route, which forwards to the form service.
async function submitApplication(values: Values, company: string): Promise<boolean> {
  try {
    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, company }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const boxClass = cn(
  "w-full rounded-[10px] bg-[var(--surface)] font-rounded text-base text-[var(--ink)] shadow-[var(--field-shadow)]",
  "placeholder:text-[var(--ink-muted)] outline-none transition-shadow",
  "focus-visible:ring-2 focus-visible:ring-[var(--ink)]",
  "aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[var(--danger)]"
);

function Field({
  id,
  label,
  isRequired,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  isRequired?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-rounded text-[15px] font-medium leading-[1.5] text-[var(--ink-soft)]">
        {label}
        {isRequired && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="font-rounded text-sm text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function JoinForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  function setValue<K extends FieldName>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the person fixes it
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, next) }));
  }

  function onBlur(field: FieldName) {
    setErrors((e) => ({ ...e, [field]: validate(field, values) }));
  }

  // Props shared by every control: id, required state, and the error wiring
  function control(field: FieldName) {
    const error = errors[field];
    return {
      id: `join-${field}`,
      name: field,
      required: required.has(field),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `join-${field}-error` : undefined,
      onBlur: () => onBlur(field),
    };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const all = Object.keys(initialValues) as FieldName[];
    const found = Object.fromEntries(all.map((f) => [f, validate(f, values)]));
    setErrors(found);

    const firstInvalid = all.find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`join-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("loading");
    trackEvent("Form Submit", { form: "join", position: values.position });
    const company = new FormData(e.currentTarget).get("company");
    const ok = await submitApplication(values, typeof company === "string" ? company : "");
    setStatus(ok ? "sent" : "error");
  }

  const text = (field: Exclude<FieldName, "position">) => ({
    ...control(field),
    value: values[field],
    onChange: (e: { target: { value: string } }) => setValue(field, e.target.value),
  });

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative grid w-full grid-cols-1 gap-6 rounded-2xl bg-[var(--surface)]/70 p-6 sm:grid-cols-2 sm:p-10"
    >
      <Field id="join-name" label="Name" isRequired error={errors.name}>
        <input {...text("name")} type="text" autoComplete="name" placeholder="Eg. Jane Smith" className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-email" label="Email" isRequired error={errors.email}>
        <input {...text("email")} type="email" autoComplete="email" placeholder="jane@gmail.com" className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-phone" label="Phone Number" error={errors.phone}>
        <input {...text("phone")} type="tel" autoComplete="tel" placeholder="Contact no." className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-education" label="Education" error={errors.education}>
        <input {...text("education")} type="text" placeholder="College/University" className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-linkedin" label="LinkedIn Profile" isRequired error={errors.linkedin} className="sm:col-span-2">
        <input {...text("linkedin")} type="url" inputMode="url" placeholder="Link" className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-github" label="GitHub Profile (Optional)" error={errors.github} className="sm:col-span-2">
        <input {...text("github")} type="url" inputMode="url" placeholder="Link" className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-position" label="Position Applying For" isRequired error={errors.position} className="sm:col-span-2">
        <select
          {...control("position")}
          value={values.position}
          onChange={(e) => setValue("position", e.target.value)}
          className={cn(boxClass, "h-12 px-4", !values.position && "text-[var(--ink-muted)]")}
        >
          <option value="" disabled>
            Select…
          </option>
          {positions.map((p) => (
            <option key={p} value={p} className="text-[var(--ink)]">
              {p}
            </option>
          ))}
        </select>
      </Field>

      <Field id="join-resume" label="Resume Link" isRequired error={errors.resume} className="sm:col-span-2">
        <input
          {...text("resume")}
          type="url"
          inputMode="url"
          placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
          className={cn(boxClass, "h-12 px-4")}
        />
      </Field>

      <Field id="join-availability" label="Availability" error={errors.availability} className="sm:col-span-2">
        <input {...text("availability")} type="text" placeholder="Hours available per week" className={cn(boxClass, "h-12 px-4")} />
      </Field>

      <Field id="join-note" label="Any Note (Optional)" error={errors.note} className="sm:col-span-2">
        <textarea
          {...text("note")}
          placeholder="So we can know more about you"
          className={cn(boxClass, "h-[100px] resize-y rounded-[4px] p-2.5")}
        />
      </Field>

      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className={cn(
            "group relative flex h-[55px] w-full items-center justify-center overflow-hidden rounded-full",
            "bg-[var(--ink)] font-rounded text-base font-semibold text-[var(--on-ink)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2",
            "disabled:cursor-wait disabled:opacity-80"
          )}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--on-ink)]/40 border-t-[color:var(--on-ink)]" />
              Sending…
            </span>
          ) : (
            // "Submit" slides up and "Send a message" slides in on hover, like the design
            <span className="block h-[19px] overflow-hidden">
              <span className="flex flex-col items-center leading-[19px] transition-transform duration-300 group-hover:-translate-y-[19px] group-focus-visible:-translate-y-[19px] motion-reduce:transition-none">
                <span>Submit</span>
                <span aria-hidden="true">Send a message</span>
              </span>
            </span>
          )}
        </button>

        <p role="status" className="text-center font-rounded text-sm text-[var(--ink-soft)]">
          {status === "sent" && `Thanks, ${values.name.trim()}! We got your application and will get back to you soon.`}
        </p>
        {status === "error" && (
          <p role="alert" className="text-center font-rounded text-sm text-[var(--danger)]">
            Something went wrong and your application wasn&apos;t sent. Please try again, or email us at {siteConfig.email.support}.
          </p>
        )}
      </div>
    </form>
  );
}
