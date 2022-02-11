export interface Sales {
  netValue: number;
  taxedValue: number;
  quantity: number;
  taxedValueForIncompleteWeek?:
    | { netValue: number; taxedValue: number }
    | undefined;
  taxedValueForIncompleteMonth?:
    | { netValue: number; taxedValue: number }
    | undefined;
}

export interface Log {
  modifiedDate: Date;
  createdDate: Date;
  application: string;
  modifiedBy: string;
  createdBy: string;
  shared: boolean;
  responsibleDevice: string;
}

export interface TotalPerDocumentType {
  documentType: string;
  total: number;
  number: number;
}

export interface CategoriesStat {
  name: string;
  value: number;
  quantity: number;
}

export interface ProductsStat {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

export interface VatResume {
  id: string;
  rate: number;
  name: string;
  tax: number;
  netValue: number;
  taxedValue: number;
}

export interface PaymentsMethod {
  moneyTypeId: string;
  value: number;
}

export interface TotalPerDocumentType2 {
  documentType: string;
  total: number;
  number: number;
}

export interface CategoriesStat2 {
  name: string;
  value: number;
  quantity: number;
}

export interface ProductsStat2 {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

export interface VatResume2 {
  id: string;
  rate: number;
  name: string;
  tax: number;
  netValue: number;
  taxedValue: number;
}

export interface PaymentsMethod2 {
  moneyTypeId: string;
  value: number;
}

export interface TrainingIncluded {
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

export interface TotalPerDocumentType3 {
  documentType: string;
  total: number;
  number: number;
}

export interface CategoriesStat3 {
  name: string;
  value: number;
  quantity: number;
}

export interface ProductsStat3 {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

export interface VatResume3 {
  id: string;
  rate: number;
  name: string;
  tax: number;
  netValue: number;
  taxedValue: number;
}

export interface PaymentsMethod3 {
  moneyTypeId: string;
  value: number;
}

export interface ExcludeInvoice {
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

export interface Stats {
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
  appVersion: string;
  channels: string[];
  log: Log;
  type: string;
  deviceId: string;
  zNumber: string;
  note: string;
  closureDate: Date;
  DGFETotal: number;
  deviceName: string;
  APPTotal: number;
  APPTotalNoFiscality: number;
  closedPaymentSessionIds: string[];
  closurePrintedSuccessfully: boolean;
  printerCommandGivenDate: Date;
  printerReturnFromCommandDate: Date;
  responsibleDeviceId: string;
  stats: Stats;
  firstClosedPaymentSessionDate: Date;
  referenceDate: string;
  referenceWeekDay: number;
  lastClosureDate: Date;
  xmlReport: string;
  txtReport: string;
  txtReportImageUrl: string;
  fixedByBackendDate?: Date;
  isDGFETotalCalculated?: boolean;
}

export interface ArrayModifiedClosure {
  id: string;
  cas: string;
  value: Value;
  mediumReceipt: number;
  mediumPotatoesReceipt: number;
}

export interface ModifiedClosure<T = ArrayModifiedClosure> {
  date: string;
  sales: Sales;
  closures: T[];
  numberClosures: number;
  totalmediumReceipt: number;
  totalMediumPotetoesReceipt: number;
}
