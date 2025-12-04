import supabase from "../config/db.js"

export default {
    getPlayersList:  async()=>{
        try{
            const {data} = await supabase.from('players').select('*').throwOnError();
            console.log(data);
            return data;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}