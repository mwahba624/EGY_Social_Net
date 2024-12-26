import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, removeFriend, addFriend } from '../../controllers/userController.js';

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser) 
    .delete(deleteUser);

// /api/users/:userId
router.route('/:userId/friends/:friendId').delete(removeFriend);
router.route('/:userId/friends/:friendId').post(addFriend);

export default router;
