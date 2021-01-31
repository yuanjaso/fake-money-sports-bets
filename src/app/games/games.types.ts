export type Team = {
  name: string;
  moneyLine: number;
  spread: number;
  spreadOdds: number;
};

export type Game = {
  home: Team;
  away: Team;
};
