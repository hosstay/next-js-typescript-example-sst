import { StackContext, Api as ApiConstruct, use } from "sst/constructs";
// import { Auth } from "./AuthStack";
// import { Data } from "./DataStack";
// import { Websocket } from "./WebsocketStack";
// import { Table } from "./TableStack";
// import { Events } from "./EventStack";

export function Api({ stack }: StackContext) {
  // const { topics } = use(Events);
  // const { auth } = use(Auth);
  // const { cluster, topics, table, websocket } = use(Data);
  // const { table } = use(Table);
  // const { websocket } = use(Websocket);
  // const { table } = use(Table);

  const api = new ApiConstruct(stack, "api", {
    cors: {
      allowOrigins: [
        "http://localhost:3000",
        "https://localhost:3000",
      ],
      allowCredentials: true,
      allowHeaders: ["*"],
      allowMethods: ["ANY"],
    },
    // authorizers: {
    //   jwt: {
    //     type: "user_pool",
    //     userPool: {
    //       id: auth.userPoolId,
    //       clientIds: [auth.userPoolClientId],
    //     },
    //   },
    // },
    // defaults: {
    //   authorizer: "jwt",
    //   function: {
    //     environment: {
    //       USER_POOL_ID: auth.userPoolId,
    //       USER_POOL_CLIENT_ID: auth.userPoolClientId,
    //     },
    //     bind: [
    //       ...topics,
    //       cluster,
    //       table,
    //       websocket,
    //     ],
    //     permissions: [
    //       "dynamodb:*"
    //     ]
    //   },
    // },
    routes: {
      // Test
      "GET /": {
        function: "packages/handlers/src/test.handler",
        authorizer: "none",
      },
      // "GET /log/create": {
      //   function: "packages/handlers/src/test.handler",
      //   authorizer: "none",
      // },
      // "GET /log/get": {
      //   function: "packages/handlers/src/test.handler",
      //   authorizer: "none",
      // },
      // "GET /private": "packages/handlers/src/test.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
