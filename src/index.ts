import { httpServer } from "./http_server";
import { HTTP_PORT } from "./consts";

httpServer.listen(HTTP_PORT, () => console.log(`Start static http server on the ${HTTP_PORT} port!`));
