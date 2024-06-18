import { SSTConfig } from "sst";
// import { Data } from "./stacks/DataStack";
// import { Auth } from "./stacks/AuthStack";
import { Api } from "./stacks/ApiStack";
import { Site } from "./stacks/FrontendStack";
// import { Websocket } from "./stacks/WebsocketStack";
// import { Table } from "./stacks/TableStack";
// import { AfterDeploy } from "./stacks/AfterDeployStack";
// import { Events } from "./stacks/EventStack";
// import { Storage } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "next-js-typescript-trpc-sst-example",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app
      // .stack(Data)
      // .stack(Table)
      // .stack(Events)
      // .stack(Storage)
      // .stack(Auth)
      // .stack(Websocket)
      .stack(Api)
      .stack(Site)
      // .stack(AfterDeploy);
  }
} satisfies SSTConfig;
