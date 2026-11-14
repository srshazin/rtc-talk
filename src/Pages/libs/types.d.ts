type User = {
  id: number;
  sub: number;
  name: string;
  picture: string;
  email: string;
};

type CallListItem = {
  id: number;
  name: string;
  at: number;
  type: "INCOMING" | "OUTGOING" | "MISSED";
  picture: string;
};
