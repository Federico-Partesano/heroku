import { Closure } from "../module/closures";
const fakeClosure = (date: string, taxedValue: number): Closure => {
  return {
    id: "closure:B172E11E-C958-4017-9ADE-98EAACAC8CE6",
    cas: "1637636391137509376",
    value: {
      type: "closure",
      channels: ["lct_12640"],
      log: {
        application: "eat",
        shared: false,
        modifiedDate: "2021-11-22T10:00:00.074Z",
        createdDate: "2021-11-22T09:56:48Z",
        createdBy: "Tecnico",
        modifiedBy: "api-couchbase | handle closures stats",
        responsibleDevice: "undefined | api-couchbase",
      },
      appVersion: "3.2.1118",
      deviceId: "device:9e7b978e-0e3a-4623-9bb0-e43e4dc4f465",
      deviceName: "Stampante",
      zNumber: "1422",
      note: "",
      closureDate: `2021-11-${date}T09:56:52Z`,
      DGFETotal: 211.1,
      APPTotal: 119.8,
      APPTotalNoFiscality: 0,
      closedPaymentSessionIds: [
        "closed_payment_session:727B24F6-B629-4117-9958-4B098EBA3270",
        "closed_payment_session:89E427C8-C46B-4E03-8466-EA5D8E87FF38",
        "closed_payment_session:3806E9C5-6031-4D64-BC41-EF6B1EB85635",
        "closed_payment_session:E591AF7E-C802-450D-BECE-E3041E17D0F2",
        "closed_payment_session:CFD1C8F3-70BA-4766-A57F-EE8CBB86D2E9",
        "closed_payment_session:4BFF7CCF-95B2-4A22-91AB-1D43F287E1D4",
      ],
      closurePrintedSuccessfully: true,
      printerCommandGivenDate: "2021-11-22T09:56:48Z",
      printerReturnFromCommandDate: "2021-11-22T09:56:52Z",
      responsibleDeviceId: "249f0f60-4b7a-11ec-8d70-33e68349c892",
      stats: {
        nDocs: 5,
        total: 240.8,
        nFiscalDocs: 5,
        fiscalTotal: 240.8,
        averageCover: 0,
        totalPerDocumentType: [
          {
            documentType: "invoice",
            total: 121,
            number: 1,
          },
          {
            documentType: "fiscal.bill",
            total: 119.8,
            number: 4,
          },
        ],
        categoriesStats: [
          {
            name: "Categoria DEMO",
            value: 240.8,
            quantity: 23,
          },
        ],
        productsStats: [
          {
            id: "product:9d5aafb8-6634-45a3-93d8-778b39b4f190",
            name: "prodotto test",
            value: 240.8,
            quantity: 23,
          },
        ],
        nSittingPeople: 0,
        vatResume: [
          {
            id: "vat_record_category:a0ce8e05-2480-470f-a21e-a6f56a7d8e84",
            rate: 10,
            name: "repart-1",
            tax: 21.89,
            netValue: 218.91,
            taxedValue: taxedValue,
          },
        ],
        paymentsMethods: [
          {
            moneyTypeId: "money_type:cash",
            value: 240.8,
          },
        ],
        discountsTotal: 12.2,
        refundsTotal: 0,
        totalPerSourceType: [],
        trainingIncluded: {
          nDocs: 6,
          total: 251.8,
          nFiscalDocs: 6,
          fiscalTotal: 251.8,
          averageCover: 0,
          totalPerDocumentType: [
            {
              documentType: "training.bill",
              total: 11,
              number: 1,
            },
            {
              documentType: "invoice",
              total: 121,
              number: 1,
            },
            {
              documentType: "fiscal.bill",
              total: 119.8,
              number: 4,
            },
          ],
          categoriesStats: [
            {
              name: "Categoria DEMO",
              value: 251.8,
              quantity: 24,
            },
          ],
          productsStats: [
            {
              id: "product:9d5aafb8-6634-45a3-93d8-778b39b4f190",
              name: "prodotto test",
              value: 251.8,
              quantity: 24,
            },
          ],
          nSittingPeople: 0,
          vatResume: [
            {
              id: "vat_record_category:a0ce8e05-2480-470f-a21e-a6f56a7d8e84",
              rate: 10,
              name: "repart-1",
              tax: 22.89,
              netValue: 228.91,
              taxedValue: 251.8,
            },
          ],
          paymentsMethods: [
            {
              moneyTypeId: "money_type:cash",
              value: 251.8,
            },
          ],
          discountsTotal: 12.2,
          refundsTotal: 0,
          totalPerSourceType: [],
        },
        excludeInvoice: {
          nDocs: 4,
          total: 119.8,
          nFiscalDocs: 4,
          fiscalTotal: 119.8,
          averageCover: 0,
          totalPerDocumentType: [
            {
              documentType: "fiscal.bill",
              total: 119.8,
              number: 4,
            },
          ],
          categoriesStats: [
            {
              name: "Categoria DEMO",
              value: 119.8,
              quantity: 12,
            },
          ],
          productsStats: [
            {
              id: "product:9d5aafb8-6634-45a3-93d8-778b39b4f190",
              name: "prodotto test",
              value: 119.8,
              quantity: 12,
            },
          ],
          nSittingPeople: 0,
          vatResume: [
            {
              id: "vat_record_category:a0ce8e05-2480-470f-a21e-a6f56a7d8e84",
              rate: 10,
              name: "repart-1",
              tax: 10.89,
              netValue: 108.91,
              taxedValue: 119.8,
            },
          ],
          paymentsMethods: [
            {
              moneyTypeId: "money_type:cash",
              value: 119.8,
            },
          ],
          discountsTotal: 12.2,
          refundsTotal: 0,
          totalPerSourceType: [],
        },
      },
      firstClosedPaymentSessionDate: "2021-11-22T09:54:26Z",
      lastClosureDate: null,
    },
  };
};
export const fakeClosures: Array<Closure> = [
  fakeClosure("26", 100),
  fakeClosure("28", 120),
  fakeClosure("29", 34),
  fakeClosure("27", 12),
];
