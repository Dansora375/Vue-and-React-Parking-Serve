import express from 'express';
import {authUser, authRole, setUser} from '../../middleWares/auth/auth';
import { ROLES } from '../../middleWares/auth/Roles';

const router = express.Router();

router.get('/', setUser, authRole(ROLES.GUARDA), (req, res) => {
  res.send(req.userData);
});


module.exports = router