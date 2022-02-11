export interface Log {
  shared: boolean;
  application: string;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: Date;
  responsibleDevice: string;
}

export interface VatResume {
  rate: number;
  netValue: number;
  tax: number;
  taxedValue: number;
  vatRecordCategoryId: string;
  vatRecordCategoryName: string;
}

export interface Denomination {
  name: string;
  quantity: number;
  value: number;
}

export interface TransactionDetail {
  moneyTypeId: string;
  moneyTypeName: string;
  denominations: Denomination[];
  transactionIdentifier: string;
}

export interface Payment {
  createdDate: Date;
  roundValue: number;
  amount: number;
  isPaymentWithFidelityCard: boolean;
  originalPaymentId: string;
  transactionDetail: TransactionDetail;
  change?: number;
  businessActorId: string;
}

export interface InvoiceAdditionalInformations {}

export interface Log2 {
  shared: boolean;
  application: string;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: Date;
  responsibleDevice: string;
}

export interface ProductAttribute {
  isMandatory: boolean;
  attributeNote: string;
  attributeValue: string;
}

export interface Component {
  isIngredient: boolean;
  productId: string;
  quantity: number;
}

export interface SaleItem {
  productId: string;
  vatRecordCategoryId: string;
  productAttributes: ProductAttribute[];
  components: Component[];
}

export interface Family {
  name: string;
}

export interface Category {
  name: string;
  categoryId: string;
  family: Family;
}

export interface Product {
  name: string;
  tags: any[];
  productId: string;
  category: Category;
}

export interface FinalUnitaryPriceVariation {
  roundValue: number;
  isPercentage: boolean;
  variation: number;
  variationName: string;
}

export interface VatRecordCategory {
  name: string;
  rate: number;
}

export interface Variation {
  name: string;
  isIngredient: boolean;
  price: number;
  quantity: number;
  quantityVariation: number;
  productId: string;
}

export interface Log3 {
  shared: boolean;
  application: string;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: Date;
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
  categoryId: string;
  family: Family2;
}

export interface Product2 {
  name: string;
  productId: string;
  category: Category2;
  tags: any[];
}

export interface VatRecordCategory2 {
  name: string;
  rate: number;
}

export interface Composition {
  log: Log3;
  priceListId: string;
  quantity: number;
  itemType: string;
  saleItem: SaleItem2;
  isFromBill: boolean;
  isSubtotal: boolean;
  orderItemName: string;
  isFromNumpad: boolean;
  course: number;
  modularParent: string;
  product: Product2;
  saleTypeName: string;
  priceListName: string;
  finalPrice: number;
  computedUnitaryPrice: number;
  originalOrderItemId: string;
  printedOrderItemName: string;
  vatRecordCategory: VatRecordCategory2;
  vatRecordCategoryId: string;
}

export interface OriginalOrderItem {
  log: Log2;
  priceListId: string;
  quantity: number;
  itemType: string;
  saleItem: SaleItem;
  isFromBill: boolean;
  isSubtotal: boolean;
  orderItemName: string;
  isFromNumpad: boolean;
  course: number;
  product: Product;
  saleTypeName: string;
  priceListName: string;
  finalPrice: number;
  computedUnitaryPrice: number;
  finalUnitaryPriceVariation: FinalUnitaryPriceVariation;
  originalOrderItemId: string;
  printedOrderItemName: string;
  vatRecordCategory: VatRecordCategory;
  vatRecordCategoryId: string;
  childrensId: string[];
  variations: Variation[];
  composition: Composition[];
  numberOfChildrens?: number;
  finalProductionCost?: number;
}

export interface Log4 {
  shared: boolean;
  application: string;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: Date;
  responsibleDevice: string;
}

export interface ProductAttribute2 {
  isMandatory: boolean;
  attributeNote: string;
  attributeValue: string;
}

export interface Component2 {
  isIngredient: boolean;
  productId: string;
  quantity: number;
}

export interface SaleItem3 {
  productId: string;
  vatRecordCategoryId: string;
  productAttributes: ProductAttribute2[];
  components: Component2[];
}

export interface Family3 {
  name: string;
}

export interface Category3 {
  name: string;
  categoryId: string;
  family: Family3;
}

export interface Product3 {
  name: string;
  tags: any[];
  productId: string;
  category: Category3;
}

export interface FinalUnitaryPriceVariation2 {
  roundValue: number;
  isPercentage: boolean;
  variation: number;
  variationName: string;
}

export interface VatRecordCategory3 {
  name: string;
  rate: number;
}

export interface Variation2 {
  name: string;
  isIngredient: boolean;
  price: number;
  quantity: number;
  quantityVariation: number;
  productId: string;
}

export interface Log5 {
  shared: boolean;
  application: string;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: Date;
  responsibleDevice: string;
}

export interface SaleItem4 {
  productId: string;
  vatRecordCategoryId: string;
}

export interface Family4 {
  name: string;
}

export interface Category4 {
  name: string;
  categoryId: string;
  family: Family4;
}

export interface Product4 {
  name: string;
  productId: string;
  category: Category4;
  tags: any[];
}

export interface VatRecordCategory4 {
  name: string;
  rate: number;
}

export interface Composition2 {
  log: Log5;
  priceListId: string;
  quantity: number;
  itemType: string;
  saleItem: SaleItem4;
  isFromBill: boolean;
  isSubtotal: boolean;
  orderItemName: string;
  isFromNumpad: boolean;
  course: number;
  modularParent: string;
  product: Product4;
  saleTypeName: string;
  priceListName: string;
  finalPrice: number;
  computedUnitaryPrice: number;
  originalOrderItemId: string;
  printedOrderItemName: string;
  vatRecordCategory: VatRecordCategory4;
  vatRecordCategoryId: string;
}

export interface PrintedOrderItem {
  log: Log4;
  priceListId: string;
  quantity: number;
  itemType: string;
  saleItem: SaleItem3;
  isFromBill: boolean;
  isSubtotal: boolean;
  orderItemName: string;
  isFromNumpad: boolean;
  course: number;
  product: Product3;
  saleTypeName: string;
  priceListName: string;
  finalPrice: number;
  computedUnitaryPrice: number;
  finalPriceWithSessionDiscounts: number;
  finalUnitaryPriceVariation: FinalUnitaryPriceVariation2;
  originalOrderItemId: string;
  printedOrderItemName: string;
  vatRecordCategory: VatRecordCategory3;
  vatRecordCategoryId: string;
  childrensId: string[];
  variations: Variation2[];
  composition: Composition2[];
  numberOfChildrens?: number;
  finalProductionCost?: number;
}

export interface Value {
  appVersion: string;
  log: Log;
  channels: string[];
  type: string;
  deviceId: string;
  orderId: string;
  businessActorId: string;
  documentType: string;
  deviceName: string;
  zNumber: string;
  vatResume: VatResume[];
  billNumber: string;
  payments: Payment[];
  fixedByApp: boolean;
  purpose: string;
  discountsTotal: number;
  hasEdoc: boolean;
  closedOrderId: string;
  paymentsTotal: number;
  creditTotal: number;
  didScanGiftBill: boolean;
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
}

export interface Receipt {
  id: string;
  cas: string;
  value: Value;
}
