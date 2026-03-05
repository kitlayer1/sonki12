import { getCreateDetailPageData } from "~/services/services";

class CreateDetailPageService{
    async getData(url: string): Promise<any>{

        let result:any = {};
       
       await getCreateDetailPageData(url).then((data)=>{
            result = data.success ? data.success : false;
            }).catch((error)=>{
                result = false
            });

        return result;
    }


}

export default CreateDetailPageService;