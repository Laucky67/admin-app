const env = import.meta.env.MODE || "prod"

const EnvConfig = {
    development:{
        baseapi:"/api",
        mockapi:"/api",
    },
    test:{
        baseapi:"",
        mockapi:"",
    },
    prod:{
        baseapi:"",
        mockapi:"",
    },
}

export default {
    env,
    ...EnvConfig[env],
    mock:true,
}