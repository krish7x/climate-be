import express from 'express'
import { check } from 'express-validator'
import { signup, signin, signout } from '../controllers/auth'

const authRoute = express.Router()

authRoute.post(
	'/signup',
	[
		check('name')
			.isLength({
				min: 3
			})
			.withMessage('Please provide a name with a minimum length of 3'),
		check('email').isEmail().withMessage('Please provide a valid E-Mail!'),
		check('password')
			.isLength({ min: 6 })
			.withMessage('Password length should be minimum of 6 characters')
	],
	signup
)
authRoute.post(
	'/signin',
	[
		check('email').isEmail().withMessage('Please provide a valid E-Mail!'),
		check('password')
			.isLength({ min: 6 })
			.withMessage('Password length should be minimum of 6 characters')
	],
	signin
)
authRoute.get('/signout', signout)

export { authRoute }
