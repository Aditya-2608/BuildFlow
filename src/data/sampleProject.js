export const nodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Frontend" },
  },
  {
    id: "2",
    position: { x: 400, y: 100 },
    data: { label: "Backend" },
  },
  {
    id: "3",
    position: { x: 700, y: 100 },
    data: { label: "Deployment" },
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
];