import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, } from '../../controllers/thoughtController.js';
// /api/applications
router.route('/').get(getThoughts).post(createThought);
// /api/applications/:applicationId
router
    .route('/:thoughtId')
    .get(getSingleThought);
/*
.put(updateThought)
.delete(deleteThought);

// /api/applications/:applicationId/tags
router.route('/:thoughtId/reactions').post(addReaction);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);
*/
export default router;
/*
updateThought, deleteThought, addReaction, deleteReaction
*/ 
