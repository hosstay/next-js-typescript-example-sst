import { ApiHandler } from "sst/node/api";

export const fn = ApiHandler(async (_evt) => {
  console.log("in test function");

  return {
    statusCode: 200,
    body: "Tested",
  };
});