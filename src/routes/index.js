import express from 'express';
import historyRoutes from './history.js';
import playerRoutes from './player.js';

const router = express.Router();


router.get('/', (req, res)=>{
    res.status(200).render('home');
})
router.use('/history', historyRoutes )
router.use('/player', playerRoutes);


export default router;