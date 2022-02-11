import { Closure, Value } from "../module/closures";
import { PaymentSession } from "../module/paymentSession";
import { ObjectReduce } from "../module/types";
import dayjs from "dayjs";
import { formatDate, formatNumber } from "./format";
import { ModifiedClosure } from "../module/modifiedClosure";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);
export const countSales = (resp: Array<Closure>) =>
  resp.reduce(
    (
      { netValue, taxedValue }: ObjectReduce,
      { value: { stats, log } }
    ): ObjectReduce => {
      return {
        netValue:
          netValue +
          (stats
            ? stats.vatResume.reduce((acc, { netValue }) => acc + netValue, 0)
            : 0),
        taxedValue: taxedValue + (stats ? stats.vatResume.reduce((acc, { taxedValue }) => acc + taxedValue, 0) : 0),
      };
    },
    { netValue: 0, taxedValue: 0 }
  );

export const countQuantity = (resp: Array<Closure>) =>
  resp.reduce(
    (
      { quantity }: { quantity: number },
      { value: { stats } }
    ): { quantity: number } => ({
      quantity:
        quantity +
        (stats
          ? stats.categoriesStats.reduce(
              (acc, { quantity, name }) =>
                acc +
                (name === "PATATA COMPOSTA" ||
                name === "LE CLASSICHE" ||
                name === "A ROTAZIONE"
                  ? quantity
                  : 0),
              0
            )
          : 0),
    }),
    { quantity: 0 }
  );
export const countSalesRealTime = (resp: Array<PaymentSession>) =>
  resp.reduce(
    (
      { netValue, taxedValue }: ObjectReduce,
      { value: { vatResume } }
    ): ObjectReduce => ({
      netValue:
        netValue +
        (vatResume
          ? vatResume.reduce((acc, { netValue }) => acc + netValue, 0)
          : 0),
      taxedValue:
        taxedValue +
        (vatResume
          ? vatResume.reduce((acc, { taxedValue }) => acc + taxedValue, 0)
          : 0),
    }),
    { netValue: 0, taxedValue: 0 }
  );

export const filterArrayClosuresByDates = (
  dateFrom: string,
  dateTo: string,
  array: Closure[]
) => {
  return array.filter(
    ({
      value: {
        log: { createdDate },
      },
    }) =>
      (dayjs(createdDate).isAfter(dayjs(dateFrom).format("YYYY-MM-DD")) ||
        dayjs(createdDate).format("YYYY-MM-DD") ===
          dayjs(dateFrom).format("YYYY-MM-DD")) &&
      (dayjs(createdDate).isBefore(dayjs(dateTo).format("YYYY-MM-DD")) ||
        dayjs(createdDate).format("YYYY-MM-DD") ===
          dayjs(dateTo).format("YYYY-MM-DD"))
  );
};

export const countSalesReceipts = (resp: Array<PaymentSession>) =>
  resp.reduce(
    ({ netValue, taxedValue }: ObjectReduce, { value }): ObjectReduce => ({
      netValue:
        netValue +
        (value
          ? value.vatResume.reduce((acc, { netValue }) => acc + netValue, 0)
          : 0),
      taxedValue:
        taxedValue +
        (value
          ? value.vatResume.reduce((acc, { taxedValue }) => acc + taxedValue, 0)
          : 0),
    }),
    { netValue: 0, taxedValue: 0 }
  );

export const countMediumReceiptDay = (value: Value) => {
  const resp = value.stats
    ? value.stats.categoriesStats.reduce(
        (acc, { name, quantity, value }) =>
          acc +
          (name === "LE CLASSICHE" ||
          name === "PATATA COMPOSTA" ||
          name === "A ROTAZIONE"
            ? quantity
            : 0),

        0
      )
    : 0;
  return resp;
};

export const countMediumReceipt = (
  daySales: { taxedValue: number },
  array: Array<Closure>
) => {
  const { getMediumReceipt, getMediumPotetoesReceipt } = array.reduce(
    ({ getMediumReceipt, getMediumPotetoesReceipt }, { value }) => {
      getMediumReceipt =
        getMediumReceipt +
        (value.closedPaymentSessionIds
          ? value.closedPaymentSessionIds.length
          : 0);
      getMediumPotetoesReceipt =
        getMediumPotetoesReceipt + countMediumReceiptDay(value);

      return { getMediumReceipt, getMediumPotetoesReceipt };
    },

    { getMediumReceipt: 0, getMediumPotetoesReceipt: 0 }
  );

  return {
    getMediumReceipt: getMediumReceipt,
    getMediumPotetoesReceipt: getMediumPotetoesReceipt,
  };
};

export const countVariationPrecDay = (
  week: ModifiedClosure<Closure>[],
  index: number
) =>
  index + 1 <= week.length - 1
    ? week[index].sales.taxedValue
      ? formatNumber(
          ((week[index].sales.taxedValue -
            (week[index + 1].sales.taxedValueForIncompleteWeek !== undefined
              ? week[index + 1].sales.taxedValueForIncompleteWeek!.taxedValue
              : week[index + 1].sales.taxedValueForIncompleteMonth !== undefined
              ? week[index + 1].sales.taxedValueForIncompleteMonth!.taxedValue
              : week[index + 1].sales.taxedValue)) /
            week[index].sales.taxedValue) *
            100
        )
      : -100
    : 0;

export const countVariationWeekDay = (
  week: ModifiedClosure<Closure>[],
  index: number,
  element: { date: string; sales: { taxedValue: number } }
) => {
  const precWeekDay = week.find(
    (day) =>
      formatDate(day.date) ===
      dayjs(element.date).subtract(7, "days").format("YYYY-MM-DD")
  );

  return precWeekDay
    ? formatNumber(
        ((element.sales.taxedValue - precWeekDay.sales.taxedValue) /
          element.sales.taxedValue) *
          100
      )
    : -1;
};

export const countVariationMonthDay = (
  week: ModifiedClosure<Closure>[],
  index: number,
  element: { date: string; sales: { taxedValue: number } }
) => {
  const precMonthDay = week.find(
    (day) =>
      formatDate(day.date) ===
      dayjs(element.date).subtract(1, "month").format("YYYY-MM-DD")
  );

  return precMonthDay
    ? formatNumber(
        ((element.sales.taxedValue - precMonthDay.sales.taxedValue) /
          element.sales.taxedValue) *
          100
      )
    : -1;
};

export const countVariationWeekOfMonth = (
  week: ModifiedClosure<Closure>[],
  element: { date: string; sales: { taxedValue: number } }
) => {
  const precMonthDay = week.find(
    (day) =>
      dayjs(day.date.split("/")[0]).add(1, "days").week() ===
      dayjs(element.date.split("/")[0]).add(1, "days").week() - 4
  );

  return precMonthDay
    ? formatNumber(
        ((element.sales.taxedValue - precMonthDay.sales.taxedValue) /
          element.sales.taxedValue) *
          100
      )
    : -1;
};

export const insertVariationsDay = (week: ModifiedClosure<Closure>[]) => {
  return week.map((element, index) => ({
    ...element,
    variationPrecDay: countVariationPrecDay(week, index),
    variationPrecWeek: countVariationWeekDay(week, index, element),
    variationPrecMonth: countVariationMonthDay(week, index, element),
  }));
};

export const insertVariationWeekDay = (week: ModifiedClosure<Closure>[]) => {
  return week.map((element, index) => ({
    ...element,
    variationPrecWeek: countVariationPrecDay(week, index),
    variationPrecMonth: countVariationWeekOfMonth(week, element),
  }));
};

export const insertVariationMonth = (month: ModifiedClosure<Closure>[]) => {
  return month.map((element, index) => ({
    ...element,
    variationPrecMonth: countVariationPrecDay(month, index),
  }));
};
