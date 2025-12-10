import supabase from "../config/db.js";

export default {
    getGameHistories :  async(pageNo)=>{
        try{
            const {data} = await supabase.rpc('get_game_history', {page_no : pageNo}).throwOnError();
            return data;
        }catch(error){
            console.error(error);
            throw error;
        }   
    },

    getHistoryDates : async()=>{
        try{
            const {data} = await supabase.rpc('get_history_dates').throwOnError();
            return data;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    getWinRateAndEarning : async(histories)=>{
        try{
            const {data} = await supabase.rpc('get_rate_and_earnings').throwOnError();
            return data;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    getHistoryCount : async()=>{
        try{
            const {data} = await supabase.rpc('get_pagination_info').throwOnError();

            return data;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    deleteHistory : async (id)=>{
        try{
            await supabase.from('history').delete().eq('id', id);

            console.log('삭제 완료')

            return true;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
