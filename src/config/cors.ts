/*mechanism for requesting restricted resources on a web page 
from a domain different from the domain that served the first resource.​*/
import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};