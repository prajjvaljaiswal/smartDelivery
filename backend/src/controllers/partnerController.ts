import { Request, Response } from "express";
import Partner from "../models/partner.js";

//TODO: input validation

// Get all partners
export const getPartners = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find();
    if (partners.length === 0) res.status(404).json({error: "Partner not found"});
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
};

export const viewPartner = async( req:Request, res: Response)=>{
    try {
        const {id} = req.params
        const partner =await Partner.findById(id);
        if(!partner)
            res.status(404).json({error: "Partner not found"});
        res.status(200).json(partner)
    } catch (error: Error|any) {
        res.status(500).json({ error: error.message});
    }
}

// Create a new partner
export const createPartner = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findOne({email: req.body.email})
    if(partner){
      res.status(500).json({ error: "Partner already exist" })
    }
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ error: "Failed to create partner" });
  }
};

// Update a partner
export const updatePartner = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findOne({email: req.params.id});
    const {name, area , phone, shift } = req.body
    const updatedPartner = await Partner.updateOne({_id: partner?._id},{name, area, phone, shift})
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ error: "Failed to update partner" });
  }
};

// Delete a partner
export const deletePartner = async (req: Request, res: Response) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete partner" });
  }
};
