import { StackContext, NextjsSite, use } from "sst/constructs";
// import { Auth } from "./AuthStack";
import { Api } from "./ApiStack";
// import { Data } from "./DataStack";
// import { Websocket } from "./WebsocketStack";
// import { Storage } from "./StorageStack";
// import { Events } from "./EventStack";

export function Site({ stack }: StackContext) {
  // const { auth } = use(Auth);
  // const { cluster } = use(Data);
  // const { cluster, bucket, topics, table, websocket } = use(Data);
  // const { bucket } = use(Storage);
  const { api } = use(Api);
  // const { topics } = use(Events);
  // const { websocket } = use(Websocket);

  const site = new NextjsSite(stack, "frontend", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    // bind: [
    //   auth,
    //   cluster,
    //   bucket,
    //   websocket,
    //   table,
    //   ...topics,
    //   table,
    // ],
    environment: {
      API_URL: api.url,
      // USER_POOL_ID: auth.userPoolId,
      // USER_POOL_CLIENT_ID: auth.userPoolClientId,
      // NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_API_URL: api.url,
    },
  });

  // site.attachPermissions([
  //   "cognito-idp:ListUsers"
  // ]);

  stack.addOutputs({
    SiteUrl: site.url,
  });

  return { site };
}
