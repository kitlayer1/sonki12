import { title } from "process";
import { DATA } from "~/const/path";


export const getMetaData = async (link:any) => {
    const response = await fetch(`${DATA}/metaTags.json`);
    const data = await response.json();
    if(link && data&& data.success){
        const meta = data.success[link];
        return meta ? {success:meta,fail:false}  : {success: {
            title: "KitLayer - AI Powered Logo Maker",
            description: "Create stunning logos effortlessly with KitLayer's AI-powered logo maker. Perfect for businesses of all sizes.",
        }
        }
    }else{
        return {success: {
            title: "KitLayer - AI Powered Logo Maker",
            description: "Create stunning logos effortlessly with KitLayer's AI-powered logo maker. Perfect for businesses of all sizes.",
        }};
    }
}

export const getCreateDetailPageData = async (params: string) => {
    const response = await fetch(`${DATA}/createDetail.json`);
    
    const data = await response.json();
    if(params && data&& data.success){
        const detailData = data.success[params];
        return detailData ? {success:detailData,fail:false}  : {success: false, fail:true, message: "Detail not found"};
    }else{
        return {success: false, fail:true, message: "Invalid parameters or data"};
    }
}