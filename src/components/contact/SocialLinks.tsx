import content from '@/content/contact.json';
import { SOCIAL_ICONS } from './socialIcons';

export function SocialLinks() {
  return (
    <div>
      <p className="mb-3 text-sm">{content.socialsLabel}</p>
      <ul className="flex flex-wrap gap-3">
        {content.socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="bg-ink text-cream focus-visible:outline-studio-500 grid size-12 place-items-center rounded-full transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {SOCIAL_ICONS[social.name.toLowerCase()] ?? social.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
