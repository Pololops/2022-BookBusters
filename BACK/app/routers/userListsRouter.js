const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const { verifyToken } = require('../middlewares/tokenVerifier');
const userBooksController = require('../controllers/userListsController');

router
    .route('/user/:id(\\d+)/:list')
    /**
     * GET /v1/user/{id}/{list}
     * @summary Get all books in user's lists (library, favorites, alerts) by the user ID, and order by title
     * @tags USER
     * @security BearerAuth
     * @param {number} id.path.required - user identifier
     * @param {string} list.path.required - list name (library, favorites, alerts)
     * @return {BookRelation} 200 - success response - application/json
     */
    .get(controllerHandler(verifyToken), controllerHandler(userBooksController.getAllBooksInList));

router
    .route('/donation/:token')
    /**
     * GET /v1/book/{book_id_&_user_id_in_a_token}
     * @summary Update the donation date to now
     * @param {number} book_id.path.required - book identifier
     * @param {number} user_id.path.required - user identifier
     * @tags BOOK
     * @return {Book} 200 - success response - application/json
     */
    .get(
        controllerHandler(userBooksController.updateDonationDate),
    );
module.exports = router;
