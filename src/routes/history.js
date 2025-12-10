import express, { raw } from 'express';
import supabase from '../config/db.js'
import history from "../functions/historyFunctions.js"
import player from '../functions/playerFunctions.js'
const router = express.Router();


// GET /history : 전체 보여주기(역대 전체 
// router.get('/all', async(req, res)=>{
//     const data= await history.getGameHistories();
//     console.log(data);
//     res.send(data);
// })

router.get('/form', async (req, res)=>{
    try{
        const players = await player.getPlayersList();
        res.status(200).render('history-form', { players });
    }catch(error){
        console.error(error);
        res.status(500).render('500');
    }
});


router.get('/dates', async(req, res)=>{
    try{
        const dates = await history.getHistoryDates();
        console.log(dates)
        res.status(200).render('dates', {dates});
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }

})

router.get('/:pageNo', async(req, res)=>{
    const rawPageNo = parseInt(req.params.pageNo);
    const pageNo = Number.isNaN(rawPageNo) ? 0 :(rawPageNo-1) * 10;

    try{
        const histories = await history.getGameHistories(pageNo);

        const totalCount = await history.getHistoryCount();
        const totalPage = Math.ceil(totalCount / 10);
        
        const pagination = {
            pageNo : rawPageNo,
            totalPage :totalPage,
            totalCount : totalCount
        }
        console.log(pagination);
        
        const rateAndEarnings = await history.getWinRateAndEarning();

        res.status(200).render('history', {histories, rateAndEarnings, pagination})
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
})



// // 전적 목록 보기
// router.post('/search', async (req, res)=>{
//     const body = req.body;

//     try{
//         const {data, error} = await supabase.rpc('get_game_history').throwOnError();

//         console.log(data);

//         res.status(200).render("history", data);
//     }catch(error){
//         console.error(error);
//         res.status(500).json(error);
//     }   
// })




// 새로운 전적 기록
router.post('/', async(req, res)=>{
    const body = req.body;


    const toBigIntOrNull = (value) => {
        if (value === undefined || value === null || value === '') return null;
        return parseInt(value);
    };

    const blue1 = toBigIntOrNull(body['blue_1']);
    const blue2 = toBigIntOrNull(body['blue_2']);
    const blue3 = toBigIntOrNull(body['blue_3']);
    const blue4 = toBigIntOrNull(body['blue_4']);
    const blue5 = toBigIntOrNull(body['blue_5']);
    const red1 = toBigIntOrNull(body['red_1']);
    const red2 = toBigIntOrNull(body['red_2']);
    const red3 = toBigIntOrNull(body['red_3']);
    const red4 = toBigIntOrNull(body['red_4']);
    const red5 = toBigIntOrNull(body['red_5']);
    const win = body['win'];
    const stake = toBigIntOrNull(body['stake']);


    try{
        const {data} = await supabase.rpc('create_game_history', {
            win,
            stake,
            b1 : blue1, b2 : blue2, b3 : blue3, b4 : blue4, b5 : blue5,
            r1 : red1, r2 : red2, r3 : red3, r4 : red4, r5 : red5
        }).throwOnError();

        console.log('✅ 새 전적 등록 완료');
        res.status(200).redirect('/history/1')
    }catch(error){
        console.error('❌ 전적 등록 중 에러 발생', error);
        res.status(500).render('500', {error});
    }
})

// 전적 삭제
router.delete('/:historyId', async(req, res)=>{
    const id = req.params.historyId;
    
    try{
        const result = await history.deleteHistory(id);

        res.status(200).json({ok : true});
    }catch(error){
        console.error(error);
        res.status(500).render('500', {error});
    }  
})

export default router;
