import { Configuration, ManageApi, MiscApi, QuoraApi } from "@/utils/api/zykj";

class Api{
    public manageApi = new ManageApi();
    public miscApi = new MiscApi();
    public quoraApi = new QuoraApi();
    public mistakeApi = new ManageApi();

    public updateToken = (token: string) => {
        const config = new Configuration({
            accessToken: token
        })
        
        this.manageApi = new ManageApi(config);
        this.miscApi = new MiscApi(config);
        this.quoraApi = new QuoraApi(config);
        this.mistakeApi = new ManageApi(config);
    }
}

export const api = new Api();