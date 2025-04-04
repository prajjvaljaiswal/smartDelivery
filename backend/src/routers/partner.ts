import express from 'express';
import Partner from '../models/partner.js';
import { createPartner, getPartners, updatePartner, deletePartner, viewPartner } from '../controllers/partnerController.js';

export const partnerRouter = express.Router();

partnerRouter.post('/create', createPartner);
partnerRouter.get('/get', getPartners);
partnerRouter.get('/view/:id', viewPartner)
partnerRouter.put('/update/:id', updatePartner);
partnerRouter.delete('/delete/:id', deletePartner)