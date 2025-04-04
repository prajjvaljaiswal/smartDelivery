import express from 'express';
import { createPartner, getPartners, updatePartner, deletePartner, viewPartner } from '../controllers/partnerController.js';

export const partnerRouter = express.Router();

partnerRouter.post('/', createPartner);
partnerRouter.get('/', getPartners);
partnerRouter.get('/:id', viewPartner)
partnerRouter.put('/:id', updatePartner);
partnerRouter.delete('/:id', deletePartner)