import express from 'express';
import supabase from '../config/db.js';
const router = express.Router();


// 새로운 플레이어 등록 폼 화면 랜더링
router.get('/', (req, res)=>{
    
})

router.get('/form', (req, res)=>{
    res.render('player-form');
})

// 새로운 플레이어 등록
router.post('/', async(req, res)=>{
    const body = req.body;
    
    try{
        await supabase.from('players').insert({"name" : body.name, "nickname" : body.nickname });

        res.status(200).redirect('/history/form');
    }catch(error){
        console.error(error);
        res.status(500).render(500, {error})
    }
})

// 플레이어 이름 변경
router.patch('/', (req, res)=>{

})

export default router;