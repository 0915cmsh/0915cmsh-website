import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow flex flex-col h-full w-full">
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 break-words">{title}</h3>
      <p className="text-gray-600 mb-3 sm:mb-4 flex-grow text-sm sm:text-base break-words">{description}</p>
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-800 font-medium mt-auto text-sm sm:text-base break-words"
      >
        자세히 보기 →
      </Link>
    </div>
  );
}