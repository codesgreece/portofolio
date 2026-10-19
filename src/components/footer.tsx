import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer id="footer" className="bg-[#07111C] text-[#F7F7F2]">
      <div className="border-t border-white/15 px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <p className="font-display text-[clamp(1.8rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.03em]">
          {site.nameUpper}
        </p>
        <p className="mt-4 max-w-md text-[#B9C5CE]">{site.tagline}</p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[0.68rem] tracking-[0.18em] text-[#B9C5CE]">ΤΟΠΟΘΕΣΙΑ</p>
            <p className="mt-3 text-lg">{site.address}</p>
          </div>
          <div>
            <p className="text-[0.68rem] tracking-[0.18em] text-[#B9C5CE]">ΕΠΙΚΟΙΝΩΝΙΑ</p>
            <a
              href={site.phoneHref}
              className="mt-3 flex min-h-11 items-center gap-3 text-lg hover:text-[#318BC3]"
            >
              <Phone aria-hidden size={16} />
              {site.phoneDisplay}
            </a>
            <a
              href={site.emailHref}
              className="flex min-h-11 items-center gap-3 break-all hover:text-[#318BC3]"
            >
              <Mail aria-hidden size={16} />
              {site.email}
            </a>
            <a
              href={site.websiteHref}
              className="mt-2 inline-flex min-h-11 items-center hover:text-[#318BC3]"
              target="_blank"
              rel="noreferrer"
            >
              {site.websiteLabel}
            </a>
          </div>
          <div>
            <p className="text-[0.68rem] tracking-[0.18em] text-[#B9C5CE]">ΚΟΙΝΩΝΙΚΑ</p>
            <a
              href={site.instagramHref}
              className="mt-3 inline-flex min-h-11 items-center hover:text-[#318BC3]"
              target="_blank"
              rel="noreferrer"
            >
              Instagram {site.instagramLabel}
            </a>
            <p className="mt-2 text-[#F7F7F2]">Facebook {site.facebookLabel}</p>
          </div>
        </div>

        <p className="mt-16 text-sm text-[#B9C5CE]">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
