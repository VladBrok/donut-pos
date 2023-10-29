export interface Showcase {
  isDrawerOpen: boolean;
}

function state(): Showcase {
  return {
    isDrawerOpen: false,
  };
}

export default state;
