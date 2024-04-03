const whitelist = ['https://www.mysite.com', 'http://127.0.0.1:2000','http://localhost:2000'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by cors"));
        }
    },
    optionSuccessStatus: 200
}