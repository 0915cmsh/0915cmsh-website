import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Section({ children, className = '', style }: SectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-6 ${className}`} style={style}>
      {children}
    </section>
  );
}