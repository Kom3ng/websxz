'use client'
import { Configuration, ManageApi, MiscApi, MistakeApi, QuoraApi, TaskApi } from "@/utils/api/zykj";

class Api{
    public manageApi = new ManageApi();
    public miscApi = new MiscApi();
    public quoraApi = new QuoraApi();
    public mistakeApi = new MistakeApi();
    public taskApi = new TaskApi();

    public updateToken = (token: string) => {
        const config = new Configuration({
            accessToken: token
        })
        
        this.manageApi = new ManageApi(config);
        this.miscApi = new MiscApi(config);
        this.quoraApi = new QuoraApi(config);
        this.mistakeApi = new MistakeApi(config);
        this.taskApi = new TaskApi(config);
    }
}

export const api = new Api();