"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ChartIcon, UsersIcon, MicIcon, MailIcon } from "@/components/ui/Icons";
import { BOTTOM_NAV } from "@/lib/constants";

const icons = {
  home: HomeIcon,
  chart: ChartIcon,
  users: UsersIcon,
  mic: MicIcon,
  mail: MailIcon,
} as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#f6f6f6]/95 backdrop-blur-xl border-t border-[#e8e5e2] safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {BOTTOM_NAV.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          const isActive = pathname === item.href;

          if ("external" in item && item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 min-w-0 flex-1 py-1"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-[#97724f]" : "text-[#6b6b6b]"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium truncate transition-colors ${
                    isActive ? "text-[#97724f]" : "text-[#6b6b6b]"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 min-w-0 flex-1 py-1"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-[#97724f]" : "text-[#6b6b6b]"
                }`}
              />
              <span
                className={`text-[10px] font-medium truncate transition-colors ${
                  isActive ? "text-[#97724f]" : "text-[#6b6b6b]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
