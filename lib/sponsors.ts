// Replace or add campaigns here. No fabricated destination or impression counts.
export const sponsors = [
  { id: "mfm", name: "Rádio MFM", logo: "/images/sponsors/mfm.png" },
  { id: "pumangol", name: "Pumangol", logo: "/images/sponsors/pumangol.png" },
  { id: "unitel", name: "Unitel", logo: "/images/sponsors/unitel.png" },
];

export type Campaign = {
  id: string;
  sponsorId: string;
  image?: string;
  imageAlt?: string;
  url?: string;
};

// Logo placements until the advertiser supplies a campaign image and destination.
export const campaigns: Campaign[] = [
  { id: "pumangol-destaque", sponsorId: "pumangol" },
  { id: "unitel-destaque", sponsorId: "unitel" },
  { id: "mfm-destaque", sponsorId: "mfm" },
];
