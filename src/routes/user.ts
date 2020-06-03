import { Router } from 'express'
const router = Router();

// Controllers
import { getAllUser, findUser, upUserPopularity} from '../controllers/user.controller';

// Routes

router.get('/', getAllUser);
router.get('/:prefix?', findUser)
router.post('/set', upUserPopularity)

export default router;