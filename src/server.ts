//Define server start

import app from "./config/app";
import { dataSource } from "./database/data-source";

const PORT = process.env.PORT || 4000;
dataSource.initialize()
    .then(()=>{
        app.listen(PORT,()=>console.log(`🚀 Server running on port ${PORT}`));
        console.log(`Data source initialized`);
        
    }).catch((error)=>{
        console.log(error);
        process.exit(1);
        
    })

