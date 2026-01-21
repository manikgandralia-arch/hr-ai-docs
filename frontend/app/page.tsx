"use client";

import { useState } from "react";

type FormState = {
  employee_name: string;
  employee_address: string;
  designation: string;
  department: string;
  company_name: string;
  work_location: string;
  reporting_manager: string;
  offer_date: string;
  joining_date: string;
  ctc: string;
  probation_months: string;
  notice_period: string;
  working_hours: string;
  hr_name: string;
};

const defaultForm: FormState = {
  employee_name: "",
  employee_address: "",
  designation: "",
  department: "",
  company_name: "",
  work_location: "",
  reporting_manager: "",
  offer_date: "",
  joining_date: "",
  ctc: "",
  probation_months: "",
  notice_period: "",
  working_hours: "",
  hr_name: "",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ docx_file?: string; ai_review?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  async function generate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-offer-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-2">HR AI Docs</h1>
      <p className="text-zinc-400 mb-8">Generate professional offer letters in seconds.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Box title="Employee Details">
          <Input label="Employee Name" value={form.employee_name} onChange={(v) => update("employee_name", v)} />
          <Input label="Employee Address" value={form.employee_address} onChange={(v) => update("employee_address", v)} />
          <Input label="Designation" value={form.designation} onChange={(v) => update("designation", v)} />
          <Input label="Department" value={form.department} onChange={(v) => update("department", v)} />
        </Box>

        <Box title="Company Details">
          <Input label="Company Name" value={form.company_name} onChange={(v) => update("company_name", v)} />
          <Input label="Work Location" value={form.work_location} onChange={(v) => update("work_location", v)} />
          <Input label="Reporting Manager" value={form.reporting_manager} onChange={(v) => update("reporting_manager", v)} />
          <Input label="HR Name" value={form.hr_name} onChange={(v) => update("hr_name", v)} />
        </Box>

        <Box title="Dates & Salary">
          <Input label="Offer Date (YYYY-MM-DD)" value={form.offer_date} onChange={(v) => update("offer_date", v)} />
          <Input label="Joining Date (YYYY-MM-DD)" value={form.joining_date} onChange={(v) => update("joining_date", v)} />
          <Input label="CTC (example: 6 LPA)" value={form.ctc} onChange={(v) => update("ctc", v)} />
          <Input label="Probation Months" value={form.probation_months} onChange={(v) => update("probation_months", v)} />
        </Box>

        <Box title="Terms">
          <Input label="Notice Period (days)" value={form.notice_period} onChange={(v) => update("notice_period", v)} />
          <Input label="Working Hours" value={form.working_hours} onChange={(v) => update("working_hours", v)} />
        </Box>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={generate}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Offer Letter"}
        </button>

        <button
          onClick={() => setForm(defaultForm)}
          className="px-6 py-3 rounded-xl border border-zinc-700"
        >
          Reset
        </button>
      </div>

      {error && <div className="mt-6 text-red-400 whitespace-pre-wrap">{error}</div>}

      {result && (
        <div className="mt-8 p-6 border border-zinc-700 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Result</h2>

          {result.docx_file && (
            <a
              className="inline-block px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700"
              href={`http://127.0.0.1:8000/download/${encodeURIComponent(result.docx_file)}`}
              target="_blank"
              rel="noreferrer"
            >
              Download DOCX
            </a>
          )}

          {result.ai_review && (
            <pre className="mt-5 text-zinc-300 whitespace-pre-wrap">{result.ai_review}</pre>
          )}
        </div>
      )}
    </div>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>
      <input
        className="w-full mt-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 outline-none focus:border-zinc-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
