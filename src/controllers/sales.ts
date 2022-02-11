import axios, { AxiosRequestConfig } from "axios";
import { Request, Response } from "express";
import { Closure } from "../module/closures";
import { AxiosOption } from "../module/types";
import { ObjectReduce } from "../module/types";
import { countSales, countSalesRealTime } from "../utils/functions";
import { PaymentSession } from "../module/paymentSession";
import dayjs from "dayjs";
import { User } from "../typings/user";
export const salesController = {
  hello: async (
    { query: { dataFrom } }: Request<{}, {}, {}, { dataFrom: string }>,
    res: Response<{ message: string } | { sales: ObjectReduce }>
  ) => {
    // const {locals:{user:{urlIPratico}}} = res;
   res.status(200).json({message: 'ciao'})
  },

};
