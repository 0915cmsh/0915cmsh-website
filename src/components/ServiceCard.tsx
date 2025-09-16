import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-800 font-medium mt-auto"
      >
        자세히 보기 →
      </Link>
    </div>
  );
}