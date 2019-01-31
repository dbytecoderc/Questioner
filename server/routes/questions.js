/* eslint-disable eol-last */
/* eslint-disable import/first */
import express from 'express';

const router = express.Router();

import questionsController from '../controller/questions';
import validate from '../middleware/validatequestion';
import tryCatch from '../utilities/trycatch';


router.post('/', validate.validateQuestion, tryCatch(questionsController.createQuestion));
router.patch('/:id/upvote', tryCatch(questionsController.upvote));
router.patch('/:id/downvote', tryCatch(questionsController.downvote));

export default router;