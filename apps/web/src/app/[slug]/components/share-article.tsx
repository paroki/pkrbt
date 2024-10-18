"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  BrandsFacebookF,
  BrandsTwitter,
  BrandsWhatsapp,
  SolidLink,
} from "../../../components/icons/socials";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ShareArticle() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Set current URL on client side
    setCurrentUrl(window.location.href);
  }, []);

  const { toast } = useToast();

  interface SocialsProps {
    name: string;
    path: string;
    element: React.JSX.Element;
  }

  const links: SocialsProps[] = [
    {
      path: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      element: <BrandsFacebookF />,
      name: "Facebook",
    },
    {
      path: `https://api.whatsapp.com/send?text=Baca%20ini:%20${currentUrl}`,
      element: <BrandsWhatsapp />,
      name: "Whatsapp",
    },
    {
      path: `https://twitter.com/intent/tweet?text=${currentUrl}`,
      element: <BrandsTwitter />,
      name: "Twitter",
    },
  ];

  return (
    <ul className="flex justify-center gap-6 my-8 border-y border-gray-100 rounded p-2 py-4">
      {links.map((item, index) => (
        <li key={index}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  target="_blank"
                  href={item.path}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 block active:bg-gray-300"
                >
                  {item.element}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bagikan ke {item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
      <li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="p-2 bg-gray-100 rounded text-gray-500 block hover:text-primary-700 hover:bg-gray-200 transition-all active:bg-gray-300"
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);
                  toast({
                    description: "Tautan berhasil disalin!",
                    duration: 1000,
                  });
                }}
              >
                <SolidLink />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Salin tautan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    </ul>
  );
}
