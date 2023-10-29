export interface ICounter {
  count: number;
}

function state(): ICounter {
  return {
    count: -1,
  };
}

export default state;
