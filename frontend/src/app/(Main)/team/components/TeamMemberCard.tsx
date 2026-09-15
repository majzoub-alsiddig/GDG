// app/team/components/TeamMemberCard.tsx
import type { JSX } from "react";
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
    socials.github ? { key: "github", href: socials.github, label: "GitHub", Icon: GitHubIcon } : null,
    socials.linkedin ? { key: "linkedin", href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon } : null,
    socials.instagram ? { key: "instagram", href: socials.instagram, label: "Instagram", Icon: InstagramIcon } : null,
    socials.twitter ? { key: "twitter", href: socials.twitter, label: "X", Icon: TwitterIcon } : null,
    socials.website ? { key: "website", href: socials.website, label: "Website", Icon: GlobeIcon } : null,
  ];
  return entries.filter((entry): entry is SocialEntry => Boolean(entry));
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const socials = getSocials(member);

  return (
    <article className="group flex w-full flex-col rounded-2xl bg-white p-4 ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] sm:w-[280px] sm:p-5">
      {/* Square image — fills padded width, rounded corners */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>

      {/* Content — centered under the image */}
      <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="text-base font-bold leading-snug text-gray-900 sm:text-[17px]">
          {member.name}
        </h3>

        <span
          aria-hidden="true"
          className="mt-2 block h-[3px] w-8 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
        />

        <p className="mt-2 text-sm font-medium text-[#1a73e8]">{member.role}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {member.about}
        </p>

        {socials.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
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