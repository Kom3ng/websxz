import OSS from 'ali-oss'
import { GeneratorToken200ResponseResult } from "@/utils/api/zykj";
import { api } from '@/utils/api/zykj/apiInstance';

type OssInfo = GeneratorToken200ResponseResult;

let oss: OSS;

const getOss = async () => {
    if (oss) {
        return oss;
    }

    const resp = await api.manageApi.generatorToken()

    const result = resp.data.result;
    if (result) {
        oss = new OSS({
            region: result.region,
            accessKeyId: result.accessKeyId ?? '',
            accessKeySecret: result.accessKeySecret ?? '',
            bucket: result.bucket,
            stsToken: result.securityToken,
            refreshSTSToken: async () => {
                const resp = await api.manageApi.generatorToken()
                const result = resp.data.result;

                return {
                    accessKeyId: result?.accessKeyId ?? '',
                    accessKeySecret: result?.accessKeySecret ?? '',
                    stsToken: result?.securityToken ?? ''
                }

            }
        });
    }

    return oss;
}

export default getOss;
