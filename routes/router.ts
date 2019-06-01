import { Router, Request, Response } from 'express';

const router =  Router();

router.get('/mensajes', ( req: Request, res: Response ) => {
  res.json({ok: true, message: 'todo ok'});
});

router.post('/mensajes', ( req: Request, res: Response ) => {
  const { cuerpo = '', de = '' } = req.body || {};
  res.json({ ok: true, cuerpo, de });
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {
  const { cuerpo = '', de = '' } = req.body || {};
  const { id = '' } = req.params || {};
  res.json({ ok: true, cuerpo, de, id });
});

export default router;