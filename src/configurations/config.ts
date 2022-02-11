import { Types } from "./../module/types";
import { User } from "../typings/user";

export const PATH: string = "https://apicb.ipraticocloud.com/api/public";
export const xApiKey: string = "13548:568916d1-fbbc-4470-9971-dc8bb45fb8fb";
export const types: Types = { array: "array", string: "string" };

const urlIPratico = {
  prod: "https://apicb.ipraticocloud.com/api/public",
  test: "https://apicbdev.ipraticocloud.com/api/public",
} as const;

export const credentials: Array<User> = [
  {
    email: "admin@ripiene.it",
    password: "m07CWaJGS1Q",
    tokenIPratico: "13548:568916d1-fbbc-4470-9971-dc8bb45fb8fb",
    urlIPratico: urlIPratico.prod,
  },
  {
    email: "stage@ripiene.it",
    password: "m07CWaJGS1Q",
    tokenIPratico: "12640:ea684e0c-1842-441a-b2d5-61aa533a8cee",
    urlIPratico: urlIPratico.test,
  },
];

export const typeCryptographyJwt = "shhhhh";
