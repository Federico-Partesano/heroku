import axios, { AxiosRequestConfig } from "axios";
import { Request, Response } from "express";
import { ObjectReduce } from "../module/types";
export const salesController = {
  hello: async (
    { query: { dataFrom } }: Request<{}, {}, {}, { dataFrom: string }>,
    res: Response<{ message: string } | { sales: ObjectReduce }>
  ) => {
    // const {locals:{user:{urlIPratico}}} = res;
   res.json({message: 'ciao'})
  },

};
