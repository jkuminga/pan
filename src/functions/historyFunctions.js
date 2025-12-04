import supabase from "../config/db.js";

export default {
    getGameHistories :  async()=>{
        try{
            const {data} = await supabase.rpc('get_game_history').throwOnError();
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
    }
}
