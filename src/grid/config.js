// Grid configuration - single source of truth for layout
export const GRID = {
  // Desktop
  COLUMNS: 12,
  MAX_WIDTH: 1700,
  PADDING: 50,
  GAP: 15, // Column gap
  ROW_GAP: "2rem", // Row gap for content spacing

  // Mobile (breakpoint and below)
  COLUMNS_MOBILE: 4,
  PADDING_MOBILE: 20,
  GAP_MOBILE: "1rem",
  ROW_GAP_MOBILE: "1.5rem",

  // Breakpoint
  BREAKPOINT: "768px",
};

export default GRID;
