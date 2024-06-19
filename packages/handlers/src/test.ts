import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (_evt) => {
  console.log("in test function");

  if (_evt.rawPath == "/endpoint/test") {
    console.log("in endpoint test function");
  }

  return {
    statusCode: 200,
    body: "Tested",
  };
});