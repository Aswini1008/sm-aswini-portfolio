import { createFileRoute } from "@tanstack/react-router";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Aswini S M | Software Developer & Programming Trainer" },
      {
        name: "description",
        content:
          "Aswini S M is a software developer, final-year engineering student, and programming trainer building practical web experiences.",
      },
      { property: "og:title", content: "Aswini S M | Software Developer & Programming Trainer" },
      {
        property: "og:description",
        content:
          "Explore Aswini S M’s web development projects, technical skills, experience, and programming education work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});