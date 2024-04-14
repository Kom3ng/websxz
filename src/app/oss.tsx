import OSS from 'ali-oss'
import {GeneratorToken200ResponseResult} from "@/utils/api/zykj";

type OssInfo = GeneratorToken200ResponseResult;

let oss: OSS;

const getOss = () => {
    if (!oss) {
        return oss;
    }
}
