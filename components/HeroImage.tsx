import Image from "next/image";

/**
 * Full-bleed hero background photo.
 * Drop a licensed image at public/hero-surgeon.jpg (landscape works best).
 * The gradient overlay keeps the white hero text readable.
 */
export function HeroImage() {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* Backing color so the hero never looks broken if the image is missing */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700" />

      <Image
        src="/hero-surgeon.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover [object-position:72%_center]"
      />

      {/* Left-weighted darkening so the white hero text stays readable over the
          light purple gradient, fading out before the brain on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-900/25 to-transparent" />
    </div>
  );
}
