// Keep a repeated strip in its middle copy, preserving its exact visual offset.
export function wrapSponsorOffset(offset: number, cycleWidth: number) {
  if (cycleWidth <= 0) return offset;
  return (((offset % cycleWidth) + cycleWidth) % cycleWidth) + cycleWidth;
}
