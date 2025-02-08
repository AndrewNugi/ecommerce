import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserByID } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/register').post(createUser)

router.post('/auth', loginUser);

router.post('/logout', logoutCurrentUser)

router.route('/profile').get(authenticate, getCurrentUserProfile)
.put(authenticate, updateCurrentUserProfile)

//Admin Routes
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
.put(authenticate, authorizeAdmin, updateUserByID)

router.route('/')
  .get(authenticate, authorizeAdmin, getAllUsers);  // Add 

export default router;