
import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();


router.get('/heroes', ( req: Request, res: Response ) => {

    const query = `
        SELECT * 
        FROM heroes`;
    
    MySQL.ejecutarQuery(query, (error:any, heroes:Object[]) => {
        if ( error ) {
            res.status(400).json({
                ok: false,
                error
             }); 
        } else {
            res.status(400).json({
                ok: true,
                heroes
             }); 
        }
    });
});

router.get('/heroe/:id', ( req: Request, res: Response ) => {
    
    const id = MySQL.instance.cnn.escape(req.params.id) ;
    const query = `SELECT * FROM heroes where id=${id}`;

MySQL.ejecutarQuery(query, (error:any, heroes:Object[]) => {
    if ( error ) {
        res.status(400).json({
            ok: false,
            error
         }); 
    } else {
        res.status(400).json({
            ok: true,
            heroe:heroes[0]
         }); 
    }
});
});


export default router;