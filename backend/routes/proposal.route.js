const express = require ('express');
const {createProposal  ,getProposalByServiceId , getProposalsByUserId, deleteProposal ,acceptProposal } =require ('../controllers/proposal.controller');
const router = express.Router();


router.post('/create', createProposal);
router.get('/service/:id', getProposalByServiceId);
router.get('/my/:id', getProposalsByUserId );
router.put('/:id', acceptProposal);
router.delete('/:id', deleteProposal);

module.exports= router;