import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtController.js';
// /api/applications
router.route('/').get(getThoughts).post(createThought);
// /api/applications/:applicationId
router
    .route('/:thoughtId') // /api/applications/:applicationId
    .get(getSingleThought) // get a single thought
    .put(updateThought) // update a thought
    .delete(deleteThought); // delete a thought
// /api/applications/:applicationId/tags
router.route('/:thoughtId/reactions').post(addReaction);
// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);
export default router;
