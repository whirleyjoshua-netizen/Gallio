'use client';

import { FileSpreadsheet, Clock, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProblemCard {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const problems: ProblemCard[] = [
  {
    icon: FileSpreadsheet,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Scattered Records',
    description:
      "Student achievements live in spreadsheets, filing cabinets, and coaches' heads. When it matters most, nothing is in one place.",
  },
  {
    icon: Clock,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    title: 'Recruiting Friction',
    description:
      'Athletes scramble to build highlight reels and stat sheets. Coaches manually compile data for every college inquiry.',
  },
  {
    icon: GraduationCap,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-500',
    title: 'Lost Potential',
    description:
      'By graduation, years of growth, projects, and milestones are forgotten. No structured record of who students became.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problems" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          The Current Reality
        </p>

        {/* Section Heading */}
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Every school faces the same challenge
        </h2>

        {/* Problem Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="rounded-2xl border border-border bg-background p-6 shadow-sm"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${problem.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${problem.iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {problem.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
