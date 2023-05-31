import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.middleware.js';
import {
    startGetCoupon,
    startCreateCoupon,
    startUpdateCoupon,
    startDeleteCoupon
} from '../controllers/coupon.controller.js';
import { USER_ROLES } from '../interfaces/user.interface.js';
import { expressValidator } from '../middlewares/expressValidator.middleware.js';
import { couponValidations } from '../validations/couponValidations.js';

const router = Router();
/* -------------------------------------------------------------------------- */
/*                                CREATE COUPON                               */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [
        checkAuth,
        checkRoleAuth([USER_ROLES.ADMIN]),
        ...couponValidations,
        expressValidator
    ],
    startCreateCoupon
);

router
    .route('/:id')
    /* -------------------------------------------------------------------------- */
    /*                                 GET COUPON                                 */
    /* -------------------------------------------------------------------------- */
    .get(
        checkAuth,
        checkRoleAuth([USER_ROLES.SALESMAN, USER_ROLES.ADMIN]),
        startGetCoupon
    )
    /* -------------------------------------------------------------------------- */
    /*                                UPDATE COUPON                               */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkAuth,
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...couponValidations,
            expressValidator
        ],
        startUpdateCoupon
    )
    /* -------------------------------------------------------------------------- */
    /*                                DELETE COUPON                               */
    /* -------------------------------------------------------------------------- */
    .delete(checkAuth, checkRoleAuth([USER_ROLES.ADMIN]), startDeleteCoupon);

export default router;