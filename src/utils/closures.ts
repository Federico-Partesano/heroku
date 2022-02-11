import { Closure } from "../module/closures";
import dayjs from "dayjs";
import { countMediumReceipt, countQuantity, countSales } from "./functions";
import { formatNumber, weekOfMonth } from "./format";
import { ModifiedClosure } from "../module/modifiedClosure";
export const getDays = (
  dates: number,
  dateFrom: string,
  resp: Array<Closure>
) => {
  let array: ModifiedClosure<Closure>[] = [];
  for (let index = 0; index <= dates; index++) {
    const dayClosures: Array<Closure> = resp.filter(
      (element) =>
        dayjs(element.value.log.createdDate).format("YYYY-MM-DD") ===
        dayjs(dateFrom as string)
          .subtract(index, "days")
          .format("YYYY-MM-DD")
    );
    const daySales = dayClosures && countSales(dayClosures);
    const dayClosuresWithMediumReceipt =
      dayClosures &&
      dayClosures.map((element) => ({
        ...element,

        mediumReceipt:
          element.value.closedPaymentSessionIds && element.value.stats
            ? Number(
                (
                  element.value.stats.total /
                  element.value.closedPaymentSessionIds.length
                ).toFixed(2)
              )
            : 0,
        mediumPotatoesReceipt: element.value.stats
          ? element.value.stats.total /
            element.value.stats.categoriesStats.reduce(
              (acc, { name, quantity }) =>
                acc +
                (name === "LE CLASSICHE" ||
                name === "PATATA COMPOSTA" ||
                name === "A ROTAZIONE"
                  ? quantity
                  : 0),
              0
            )
          : 0,
      }));
    const { quantity } = dayClosures && countQuantity(dayClosures);
    const { getMediumReceipt, getMediumPotetoesReceipt } = countMediumReceipt(
      daySales,
      dayClosuresWithMediumReceipt
    );

    const totalmediumReceipt =
      dayClosures &&
      (dayClosures.length > 0
        ? formatNumber(daySales.taxedValue / getMediumReceipt)
        : 0);

    const totalMediumPotetoesReceipt =
      dayClosures && dayClosures.length > 0
        ? formatNumber(daySales.taxedValue / getMediumPotetoesReceipt)
        : 0;

    dayClosures &&
      array.push({
        date: dayjs(dateFrom as string)
          .subtract(index, "days")
          .format("YYYY-MM-DD"),
        sales: {
          netValue: daySales.netValue,
          taxedValue: daySales.taxedValue,
          quantity: quantity,
        },
        closures: dayClosuresWithMediumReceipt,
        numberClosures: dayClosures.length,
        totalmediumReceipt,
        totalMediumPotetoesReceipt,
      });
  }

  // (vatResume2.reduce((acc, { taxedValue }) => acc + taxedValue, 0) /
  //       vatResume1.reduce((acc, { taxedValue }) => acc + taxedValue, 0)) *
  //       100 -
  //     100
  return array;
};
// I DON'T USE!!
export const getWeekDays = (datesDistance: number, resp: Array<Closure>) => {
  let array: Array<{
    date: string;
    sales: {
      netValue: number;
      taxedValue: number;
      quantity: number;
    };
    totalmediumReceipt: number;
    totalMediumPotetoesReceipt: number;
    // closures: Array<Closure>;
    // numberClosures: number;
  }> = [];
  for (let index = 0; index < datesDistance; index++) {
    const dayClosures: Array<Closure> = resp.filter(
      (element: Closure) =>
        dayjs(element.value.log.createdDate).format("YYYY-MM-DD") ===
        dayjs().subtract(index, "days").format("YYYY-MM-DD")
    );
    const daySales = dayClosures && countSales(dayClosures);
    const { quantity } = dayClosures && countQuantity(dayClosures);

    const { getMediumReceipt, getMediumPotetoesReceipt } = countMediumReceipt(
      daySales,
      dayClosures
    );

    // const totalMediumPotetoesReceipt = daySales.taxedValue / getMediumPotetoesReceipt;
    const totalMediumPotetoesReceipt =
      dayClosures && dayClosures.length > 0
        ? formatNumber(daySales.taxedValue / getMediumPotetoesReceipt)
        : 0;

    const totalmediumReceipt =
      dayClosures && dayClosures.length > 0
        ? formatNumber(daySales.taxedValue / getMediumReceipt)
        : 0;

    dayClosures &&
      array.push({
        date: dayjs().subtract(index, "days").format("YYYY-MM-DD"),
        sales: {
          netValue: Number(daySales.netValue.toFixed(2)),
          taxedValue: Number(daySales.taxedValue.toFixed(2)),
          quantity: quantity,
        },
        totalmediumReceipt,
        totalMediumPotetoesReceipt,

        // closures: dayClosures,
        // numberClosures: dayClosures.length,
      });
  }
  return array;
};

export const getMonthWeeks = (
  datesDistance: number,
  dateTo: string,
  resp: Array<Closure>
) => {
  let array: Array<{
    date: string;
    sales: {
      netValue: number;
      taxedValue: number;
      quantity: number;
      taxedValueForIncompleteWeek:
        | { taxedValue: number; netValue: number }
        | undefined;
    };
    totalmediumReceipt: number;
    totalMediumPotetoesReceipt: number;
    // closures: Array<Closure>;
    // numberClosures: number;
  }> = [];
  let incompleteWeek = 0;
  let arrayTaxedIncompleteWeek;
  let weekArray: Array<Closure> = [];
  for (let index = 0; index <= datesDistance; index++) {
    let isIncomplete = false;
    const dayClosures: Array<Closure> = resp.filter(
      (element: Closure) =>
        dayjs(element.value.log.createdDate).format("YYYY-MM-DD") ===
        dayjs(dateTo).subtract(index, "days").format("YYYY-MM-DD")
    );

    if (
      dayjs(dateTo).subtract(index, "days").format("YYYY-MM-DD") ===
      dayjs(dateTo)
        .subtract(index, "days")
        .startOf("week")
        .add(1, "days")
        .format("YYYY-MM-DD")
      //     .format("YYYY-MM-DD") ||
      // dayjs().subtract(index, "days").format("YYYY-MM-DD") ===
      //   dayjs().subtract(index, "days").startOf("month").format("YYYY-MM-DD")
    ) {
      dayClosures && weekArray.push(...dayClosures);

      if (
        weekArray[0] &&
        dayjs(weekArray[0].value.log.createdDate)
          .subtract(1, "days")
          .endOf("week")
          .add(1, "days")
          .isAfter(dayjs())
      ) {
        incompleteWeek = parseInt(
          dayjs(weekArray[0].value.log.createdDate).format("d")
        );
      }
      if (
        weekArray[0] &&
        dayjs(weekArray[0].value.log.createdDate)
          .subtract(1, "days")
          .endOf("week")
          .format("YYYY-MM-DD") ===
          dayjs()
            .subtract(1, "days")
            .endOf("week")
            .subtract(1, "week")
            .format("YYYY-MM-DD")
      ) {
        isIncomplete = true;

        // filter up to the current day

        arrayTaxedIncompleteWeek = countSales(
          weekArray.filter(
            (element) =>
              parseInt(dayjs(element.value.log.createdDate).format("d")) > 0 &&
              parseInt(dayjs(element.value.log.createdDate).format("d")) <=
                incompleteWeek + 1
          )
        );
      }

      const daySales = weekArray && countSales(weekArray);
      const { quantity } = weekArray && countQuantity(weekArray);
      const { getMediumReceipt, getMediumPotetoesReceipt } = countMediumReceipt(
        daySales,
        weekArray
      );
      const totalMediumPotetoesReceipt =
        dayClosures && dayClosures.length > 0
          ? formatNumber(daySales.taxedValue / getMediumPotetoesReceipt)
          : 0;
      const totalmediumReceipt =
        dayClosures && dayClosures.length > 0
          ? formatNumber(daySales.taxedValue / getMediumReceipt)
          : 0;

      // ----------------- //
      // FILTER WEEK
      // const arrayWeeks = getWeekDays(weekArray.length - 1, weekArray);
      // ----------------- //

      dayClosures &&
        array.push({
          date: `${dayjs(dateTo)
            .subtract(index, "days")
            .format("YYYY-MM-DD")}/${dayjs(dateTo)
            .subtract(index, "days")
            .endOf("week")
            .add(1, "days")
            .format("YYYY-MM-DD")}`,
          sales: {
            netValue: Number(daySales.netValue.toFixed(2)),
            taxedValue: Number(daySales.taxedValue.toFixed(2)),
            taxedValueForIncompleteWeek: isIncomplete
              ? arrayTaxedIncompleteWeek
              : undefined,
            quantity,
          },

          totalmediumReceipt,
          totalMediumPotetoesReceipt,

          //   closures: arrayWeeks,
          //   numberClosures: weekArray.length,
        });
      weekArray = [];
    } else {
      dayClosures && weekArray.push(...dayClosures);
    }
  }

  return array;
};
