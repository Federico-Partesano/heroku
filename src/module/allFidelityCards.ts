interface Source {
  app: string;
}

interface Log {
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  application: string;
  shared: boolean;
}

interface Value {
  source: Source;
  channels: string[];
  code: string;
  points: number;
  prepaidAmount: number;
  prepaidAmountTicket: number;
  isVirtual: boolean;
  type: string;
  log: Log;
}

export interface FidelityCard {
  id: string;
  cas: string;
  value: Value;
}
