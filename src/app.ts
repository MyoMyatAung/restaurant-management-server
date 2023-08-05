import config from "config";
import createServer from "./server";
import log from "./utils/logger";
import connect from "./utils/connect";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  log.info(`Application is running on PORT: ${port}`);
  await connect();
});
