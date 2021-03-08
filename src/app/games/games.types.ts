export type Team = {
  name: string;
  moneyLine: number;
  spread: number;
  spreadOdds: number;
  // ! here for a POC but could remove later
  score: number;
};

export type Game = {
  home: Team;
  away: Team;
};
