export type Response = {
  status: boolean;
  result: string;
};

export type Wave = {
  address: string;
  message: string;
  timestamp: Date;
};

export type ResponseArray = {
  status: boolean;
  result: Wave[];
  message?: string;
};
