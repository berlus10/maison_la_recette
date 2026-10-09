import content from '@/content/contact.json';
import { SOCIAL_ICONS } from './socialIcons';

export function SocialLinks() {
  return (
    <div>
      <p className="mb-3 text-sm">{content.socialsLabel}</p>
      <ul className="flex flex-wrap gap-4">
        {content.socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline-studio-500 flex min-h-[5.5rem] min-w-[7.5rem] flex-col items-center justify-center gap-1 rounded-[1.5rem] bg-[#FBF8F2] px-5 py-3 text-base transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-w-[10rem]"
            >
              {SOCIAL_ICONS[social.name.toLowerCase()]}
              <span>{social.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
