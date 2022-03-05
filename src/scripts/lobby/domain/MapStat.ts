
export default interface MapStat {
  name: string;
  matches: number;
  loss: number;
  wins: number;
  percentage: {
    loss: string;
    wins: string;
  }
}