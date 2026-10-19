/**
 * Portfolio source of truth.
 *
 * Add a photograph:
 * 1. Place the file in `public/images/projects/` with a descriptive filename.
 * 2. Append an entry here. Order is the order on the page.
 * 3. Set `category` only when the picture clearly supports it.
 * 4. Leave `title` and `description` empty unless the image itself justifies them.
 *
 * Entries whose files are missing are omitted at build time and are never shown
 * as broken images. Do not point `src` at stock or generated photographs.
 *
 * Frames:
 * - `full`   edge-to-edge photograph
 * - `pair`   grouped with the neighbouring pair entry
 * - `narrow` kept close to its native width (for smaller files)
 * - `modest` centered, medium width
 */

export const categories = {
  awnings: "Σύγχρονες Τέντες",
  pergolas: "Βιοκλιματικές Πέργκολες",
  "drop-arm": "Τέντες με Αντηρίδα",
  special: "Ειδικές Κατασκευές",
  commercial: "Επαγγελματικοί Χώροι",
  hospitality: "Ξενοδοχειακές Εφαρμογές",
} as const;

export type ProjectCategory = keyof typeof categories;

export type ProjectFrame = "full" | "pair" | "narrow" | "modest";

export type Project = {
  id: string;
  src: string;
  alt: string;
  category: ProjectCategory;
  title?: string;
  description?: string;
  frame: ProjectFrame;
  /** Tailwind object-position utility. Keeps the construction in frame. */
  focus: string;
  width: number;
  height: number;
};

export const projects: Project[] = [
  {
    id: "drop-arm-balcony",
    src: "/images/projects/drop-arm-awning-balcony.jpg",
    alt: "Μεγάλη λευκή τέντα με αντηρίδα σε μπαλκόνι κατοικίας",
    category: "drop-arm",
    frame: "full",
    focus: "object-[28%_center]",
    width: 1280,
    height: 960,
  },
  {
    id: "rooftop-seating",
    src: "/images/projects/rooftop-reed-seating.jpg",
    alt: "Σκιασμένος εξωτερικός χώρος εστίασης με ψάθινες επιφάνειες και τραπεζοκαθίσματα",
    category: "commercial",
    frame: "pair",
    focus: "object-[center_62%]",
    width: 2000,
    height: 2667,
  },
  {
    id: "storefront-dome",
    src: "/images/projects/storefront-dome-awning.jpg",
    alt: "Καμπύλη λευκή τέντα πάνω από είσοδο επαγγελματικού χώρου",
    category: "commercial",
    frame: "pair",
    focus: "object-center",
    width: 720,
    height: 540,
  },
  {
    id: "louvered-pergola",
    src: "/images/projects/louvered-pergola.jpg",
    alt: "Πέργκολα με περσίδες αλουμινίου σε σύγχρονο κτίριο",
    category: "pergolas",
    frame: "pair",
    focus: "object-center",
    width: 960,
    height: 720,
  },
  {
    id: "corner-awnings",
    src: "/images/projects/corner-building-awnings.jpg",
    alt: "Λευκές τέντες σε διαδοχικά μπαλκόνια γωνιακού κτιρίου",
    category: "awnings",
    frame: "pair",
    focus: "object-center",
    width: 720,
    height: 540,
  },
  {
    id: "square-shade",
    src: "/images/projects/square-shade-garden.jpg",
    alt: "Λευκή τετράγωνη κατασκευή σκίασης σε κήπο",
    category: "special",
    frame: "pair",
    focus: "object-[center_28%]",
    width: 960,
    height: 1280,
  },
  {
    id: "metal-canopy",
    src: "/images/projects/metal-canopy-garden.jpg",
    alt: "Μεταλλική κατασκευή σκίασης με επίπεδο σκέπαστρο σε κήπο",
    category: "special",
    frame: "pair",
    focus: "object-[center_40%]",
    width: 1120,
    height: 840,
  },
  {
    id: "folding-arm",
    src: "/images/projects/folding-arm-awning-balcony.jpg",
    alt: "Λευκή τέντα με βραχίονες και κυματιστό τελείωμα σε μπαλκόνι",
    category: "awnings",
    frame: "pair",
    focus: "object-[40%_42%]",
    width: 1280,
    height: 960,
  },
  {
    id: "printed-landscape",
    src: "/images/projects/printed-landscape-awning.jpg",
    alt: "Τέντα με ψηφιακή εκτύπωση παράκτιου τοπίου σε μπαλκόνι",
    category: "awnings",
    frame: "pair",
    focus: "object-center",
    width: 800,
    height: 600,
  },
  {
    id: "floral-canopy",
    src: "/images/projects/floral-print-canopy.jpg",
    alt: "Κατασκευή σκίασης με ύφασμα που φέρει floral εκτύπωση",
    category: "special",
    frame: "pair",
    focus: "object-top",
    width: 1280,
    height: 960,
  },
  {
    id: "timber-pergola",
    src: "/images/projects/timber-pergola-terrace.jpg",
    alt: "Ξύλινη πέργκολα με λευκό ύφασμα και εξωτερική τραπεζαρία",
    category: "special",
    frame: "pair",
    focus: "object-center",
    width: 604,
    height: 453,
  },
  {
    id: "courtyard-arms",
    src: "/images/projects/drop-arm-awning-courtyard.jpg",
    alt: "Λευκή τέντα με ορατές αντηρίδες σε αυλή κτιρίου",
    category: "drop-arm",
    frame: "pair",
    focus: "object-[68%_center]",
    width: 1280,
    height: 960,
  },
  {
    id: "balcony-building",
    src: "/images/projects/balcony-awnings-building.jpg",
    alt: "Λευκές τέντες στα μπαλκόνια πολυώροφης κατοικίας",
    category: "awnings",
    frame: "pair",
    focus: "object-center",
    width: 604,
    height: 453,
  },
  {
    id: "facade-awnings",
    src: "/images/projects/facade-awnings.jpg",
    alt: "Λευκές τέντες κατά μήκος της όψης κτιρίου",
    category: "awnings",
    frame: "pair",
    focus: "object-center",
    width: 720,
    height: 540,
  },
  {
    id: "street-awning",
    src: "/images/projects/balcony-awning-street.jpg",
    alt: "Λευκή τέντα μπαλκονιού σε πρόσοψη κτιρίου",
    category: "awnings",
    frame: "pair",
    focus: "object-[center_42%]",
    width: 800,
    height: 600,
  },
  {
    id: "dome-seaside",
    src: "/images/projects/dome-canopy-seaside.jpg",
    alt: "Φωτιζόμενη θολωτή κατασκευή σκίασης δίπλα στη θάλασσα το σούρουπο",
    category: "special",
    frame: "narrow",
    focus: "object-center",
    width: 382,
    height: 510,
  },
  {
    id: "carport-shade",
    src: "/images/projects/fabric-carport-shade.jpg",
    alt: "Υφασμάτινη σκίαση σε χώρο στάθμευσης",
    category: "special",
    frame: "modest",
    focus: "object-center",
    width: 604,
    height: 453,
  },
];

export function projectById(id: string, list: Project[] = projects) {
  return list.find((project) => project.id === id);
}
