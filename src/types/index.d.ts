import { TokenData } from "./type";

declare global {

    //Express

    namespace Express {
        export interface Request{
            tokenData: TokenData
        }

    }

}