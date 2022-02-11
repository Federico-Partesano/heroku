interface Log {
  application: string;
  shared: boolean;
  modifiedDate: string;
  createdDate: string;
  createdBy: string;
  modifiedBy: string;
  responsibleDevice: string;
}

interface TotalPerDocumentType {
  documentType: string;
  total: number;
  number: number;
}

interface CategoriesStat {
  name: string;
  value: number;
  quantity: number;
}

interface ProductsStat {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

interface VatResume {
  id: string;
  rate: number;
  name: string;
  tax: number;
  netValue: number;
  taxedValue: number;
}

interface PaymentsMethod {
  moneyTypeId: string;
  value: number;
}

interface TotalPerDocumentType2 {
  documentType: string;
  total: number;
  number: number;
}

interface CategoriesStat2 {
  name: string;
  value: number;
  quantity: number;
}

interface ProductsStat2 {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

interface VatResume2 {
  id: string;
  rate: number;
  name: string;
  tax: number;
  netValue: number;
  taxedValue: number;
}

interface PaymentsMethod2 {
  moneyTypeId: string;
  value: number;
}

interface TrainingIncluded {
  nDocs: number;
  total: number;
  nFiscalDocs: number;
  fiscalTotal: number;
  averageCover: number;
  totalPerDocumentType: TotalPerDocumentType2[];
  categoriesStats: CategoriesStat2[];
  productsStats: ProductsStat2[];
  nSittingPeople: number;
  vatResume: VatResume2[];
  paymentsMethods: PaymentsMethod2[];
  discountsTotal: number;
  refundsTotal: number;
  totalPerSourceType: any[];
}

interface TotalPerDocumentType3 {
  documentType: string;
  total: number;
  number: number;
}

interface CategoriesStat3 {
  name: string;
  value: number;
  quantity: number;
}

interface ProductsStat3 {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

interface VatResume3 {
  id: string;
  rate: number;
  name: string;
  tax: number;
  netValue: number;
  taxedValue: number;
}

interface PaymentsMethod3 {
  moneyTypeId: string;
  value: number;
}

interface ExcludeInvoice {
  nDocs: number;
  total: number;
  nFiscalDocs: number;
  fiscalTotal: number;
  averageCover: number;
  totalPerDocumentType: TotalPerDocumentType3[];
  categoriesStats: CategoriesStat3[];
  productsStats: ProductsStat3[];
  nSittingPeople: number;
  vatResume: VatResume3[];
  paymentsMethods: PaymentsMethod3[];
  discountsTotal: number;
  refundsTotal: number;
  totalPerSourceType: any[];
}

interface Stats {
  nDocs: number;
  total: number;
  nFiscalDocs: number;
  fiscalTotal: number;
  averageCover: number;
  totalPerDocumentType: TotalPerDocumentType[];
  categoriesStats: CategoriesStat[];
  productsStats: ProductsStat[];
  nSittingPeople: number;
  vatResume: VatResume[];
  paymentsMethods: PaymentsMethod[];
  discountsTotal: number;
  refundsTotal: number;
  totalPerSourceType: any[];
  trainingIncluded: TrainingIncluded;
  excludeInvoice: ExcludeInvoice;
}

export interface Value {
  type: string;
  channels: string[];
  log: Log;
  appVersion: string;
  deviceId: string;
  deviceName: string;
  zNumber: string;
  note: string;
  closureDate: string;
  DGFETotal: number;
  APPTotal: number;
  APPTotalNoFiscality: number;
  closedPaymentSessionIds: string[];
  closurePrintedSuccessfully: boolean;
  printerCommandGivenDate: string;
  printerReturnFromCommandDate: string;
  responsibleDeviceId: string;
  stats: Stats;
  firstClosedPaymentSessionDate: string;
  lastClosureDate?: any;
}

export type Closure = {
  id: string;
  cas: string;
  value: Value;
  mediumReceipt?: number;
};
