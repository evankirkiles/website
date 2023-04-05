/*
 * colors.ts
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space, 
 */

function toArray(rgb: number) {
  const r = rgb >> 16;
  const g = (rgb >> 8) % 256;
  const b = rgb % 256;

  return [r, g, b];
}

// Interpolates between two hex colors
export function colorInterp(col1: string, col2: string, p: number) {
  const rgb1 = parseInt(col1.substring(1), 16);
  const rgb2 = parseInt(col2.substring(1), 16);
  const [r1, g1, b1] = toArray(rgb1);
  const [r2, g2, b2] = toArray(rgb2);
  const q = 1-p;
  const rr = Math.round(r1 * p + r2 * q);
  const rg = Math.round(g1 * p + g2 * q);
  const rb = Math.round(b1 * p + b2 * q);
  return  `#${Number((rr << 16) + (rg << 8) + rb).toString(16).padStart(6, '0')}`;
}
