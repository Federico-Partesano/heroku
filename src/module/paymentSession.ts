export interface Log {
  application: string;
  shared: boolean;
  modifiedDate: Date;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  responsibleDevice: string;
}

export interface VatResume {
  rate: number;
  netValue: number;
  taxedValue: number;
  tax: number;
  vatRecordCategoryId: string;
  vatRecordCategoryName: string;
}

export interface TransactionDetail {
  moneyTypeId: string;
  moneyTypeName: string;
}

export interface Payment {
  createdDate: Date;
  amount: number;
  roundValue: number;
  isPaymentWithFidelityCard: boolean;
  originalPaymentId: string;
  transactionDetail: TransactionDetail;
  businessActorId: string;
}

export interface InvoiceAdditionalInformations {}

export interface Log2 {
  application: string;
  shared: boolean;
  modifiedDate: Date;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  responsibleDevice: string;
}

export interface SaleItem {
  productId: string;
  vatRecordCategoryId: string;
}

export interface Family {
  name: string;
}

export interface Category {
  name: string;
  description: string;
  tags: any[];
  categoryId: string;
  family: Family;
}

export interface Product {
  name: string;
  tags: any[];
  productId: string;
  category: Category;
}

export interface VatRecordCategory {
  name: string;
  rate: number;
}

export interface FinalUnitaryPriceVariation {
  isPercentage: boolean;
  roundValue: number;
  variationName: string;
  variation: number;
}

export interface OriginalOrderItem {
  log: Log2;
  priceListId: string;
  quantity: number;
  itemType: string;
  saleItem: SaleItem;
  isFromBill: boolean;
  orderItemName: string;
  isSubtotal: boolean;
  course: number;
  isFromNumpad: boolean;
  saleTypeName: string;
  product: Product;
  finalPrice: number;
  priceListName: string;
  computedUnitaryPrice: number;
  originalOrderItemId: string;
  printedOrderItemName: string;
  vatRecordCategory: VatRecordCategory;
  vatRecordCategoryId: string;
  finalUnitaryPriceVariation: FinalUnitaryPriceVariation;
  variations: any[];
}

export interface Log3 {
  application: string;
  shared: boolean;
  modifiedDate: Date;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  responsibleDevice: string;
}

export interface SaleItem2 {
  productId: string;
  vatRecordCategoryId: string;
}

export interface Family2 {
  name: string;
}

export interface Category2 {
  name: string;
  description: string;
  tags: any[];
  categoryId: string;
  family: Family2;
}

export interface Product2 {
  name: string;
  tags: any[];
  productId: string;
  category: Category2;
}

export interface VatRecordCategory2 {
  name: string;
  rate: number;
}

export interface FinalUnitaryPriceVariation2 {
  isPercentage: boolean;
  roundValue: number;
  variationName: string;
  variation: number;
}

export interface PrintedOrderItem {
  log: Log3;
  priceListId: string;
  quantity: number;
  itemType: string;
  saleItem: SaleItem2;
  isFromBill: boolean;
  orderItemName: string;
  isSubtotal: boolean;
  course: number;
  isFromNumpad: boolean;
  saleTypeName: string;
  product: Product2;
  finalPrice: number;
  priceListName: string;
  computedUnitaryPrice: number;
  finalPriceWithSessionDiscounts: number;
  originalOrderItemId: string;
  printedOrderItemName: string;
  vatRecordCategory: VatRecordCategory2;
  vatRecordCategoryId: string;
  finalUnitaryPriceVariation: FinalUnitaryPriceVariation2;
  variations: any[];
}
type DocumentType =
  | "fiscal.bill"
  | "customer.slip"
  | "invoice"
  | "payment.pre.bill"
  | "training.bill";
export interface Value {
  type: string;
  channels: string[];
  log: Log;
  appVersion: string;
  deviceId: string;
  documentType: DocumentType;
  businessActorId: string;
  vatResume: VatResume[];
  billNumber: string;
  deviceName: string;
  zNumber: string;
  payments: Payment[];
  closedOrderId: string;
  fixedByApp: boolean;
  purpose: string;
  discountsTotal: number;
  hasEdoc: boolean;
  paymentsTotal: number;
  creditTotal: number;
  didScanGiftBill: boolean;
  orderId: string;
  receiptAmount: number;
  fiscalPrintError: string;
  invoiceAdditionalInformations: InvoiceAdditionalInformations;
  originalOrderItems: OriginalOrderItem[];
  originalOrderLogCreatedDate: Date;
  originalOrderTotal: number;
  printSessionIdentifier: string;
  printedOrderItems: PrintedOrderItem[];
  responsibleDeviceId: string;
  successfullyPrintedOnFiscal: boolean;
  variableCostsTotal: number;
  closureDate: Date;
  closureId: string;
  realOrderItemsBehindFakeOrderItem: any[];
}

export interface PaymentSession {
  id: string;
  cas: string;
  value: Value;
}
