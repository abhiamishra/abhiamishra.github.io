// the hero's ball and the page's ball are the same ball. at the very top of
// the page the hero animates it; as soon as you scroll, the hero freezes and
// the page terrain takes it over from wherever the hero left it, rolling it
// down the page. scroll back to the top and the hero picks it up again.

export const ballHandoff = {
  // where the hero is drawing its ball, in document px (null until it draws)
  hero: null as [number, number] | null,
};

export const scrolledAway = () => window.scrollY >= 1;
