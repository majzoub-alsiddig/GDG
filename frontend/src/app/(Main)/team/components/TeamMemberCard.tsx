// app/team/components/TeamMemberCard.tsx
import type { TeamMember } from "../types";
import {
  GitHubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./icons";

type IconType = (props: { className?: string }) => JSX.Element;

type SocialEntry = {
  key: string;
  href: string;
  label: string;
  Icon: IconType;
};

function getSocials(member: TeamMember): SocialEntry[] {
  const { socials } = member;
  const entries: (SocialEntry | null)[] = [
    socials.github && {
      key: "github",
      href: socials.github,
      label: "GitHub",
      Icon: GitHubIcon,
    },
    socials.linkedin && {
      key: "linkedin",
      href: socials.linkedin,
      label: "LinkedIn",
      Icon: LinkedInIcon,
    },
    socials.instagram && {
      key: "instagram",
      href: socials.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
    },
    socials.twitter && {
      key: "twitter",
      href: socials.twitter,
      label: "X",
      Icon: TwitterIcon,
    },
    socials.website && {
      key: "website",
      href: socials.website,
      label: "Website",
      Icon: GlobeIcon,
    },
  ];
  return entries.filter((entry): entry is SocialEntry => Boolean(entry));
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const socials = getSocials(member);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)]">
      {/* Portrait photo - 3:4 for people-first visual rhythm */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <img
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {/* Bottom fade for legibility when a small overlay is used */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-base font-bold leading-snug text-gray-900 sm:text-[17px]">
          {member.name}
        </h3>

        {/* Tiny Google-colour accent under the name */}
        <span
          aria-hidden="true"
          className="mt-2 block h-[3px] w-8 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
        />

        <p className="mt-2 text-sm font-medium text-[#1a73e8]">
          {member.role}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {member.about}
        </p>

        {socials.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-1">
            {socials.map(({ key, href, label, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile of ${member.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}