export interface ICounter {
  count: number;
}

function state(): ICounter {
  return {
    count: 0,
  };
}

export default state;
