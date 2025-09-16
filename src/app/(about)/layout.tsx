import AboutTabs from '@/components/AboutTabs';
import Section from '@/components/Section';
import { COMPANY } from '@/lib/company';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-blue-700 text-white">
        <Section className="py-14 text-center">
          <h1 className="text-[44px] leading-[1.1] font-bold tracking-[-0.02em]">회사소개</h1>
          <p className="mt-2 opacity-90">{COMPANY.tagline}</p>
        </Section>
      </div>
      <Section className="-mt-6">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <AboutTabs />
        </div>
      </Section>
      <Section className="py-16">{children}</Section>
    </div>
  );
}
