import expressJwt from 'express-jwt'
import { Response, NextFunction } from 'express'
import { prisma } from '../prisma'
import { statusCode as SC } from '../utils/statusCode'
import { loggerUtil as logger } from '../utils/logger'
import { Roles } from '../@types/enum'

export const isSignedIn = expressJwt({
	secret: process.env.SECRET || '',
	algorithms: ['HS256', 'RS256'],
	userProperty: 'auth'
})

export const isValidToken = (err: any, res: Response, next: NextFunction) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(SC.UNAUTHORIZED).json({ error: 'Authentication Failed!' })
	}
	return next()
}

export const isAuthenticated = (
	req: any,
	res: Response,
	next: NextFunction
) => {
	const checker = req.profile && req.auth && req.profile.id == req.auth.id
	if (!checker) {
		return res.status(SC.FORBIDDEN).json({
			error: 'ACCESS DENIED!'
		})
	}
	return next()
}

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
	const authId = req.auth._id

	if (authId) {
		await prisma.user
			.findFirst({
				where: {
					id: authId
				}
			})
			.then(user => {
				if (!user) {
					return res.status(SC.NOT_FOUND).json({
						error: 'No user was found in DB!'
					})
				}
				if (user.role === Roles.ADMIN) {
					return next()
				}
				return res.status(SC.UNAUTHORIZED).json({
					error: 'Not an admin!'
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
			})
	}
}

export const isDMTeam = async (req: any, res: Response, next: NextFunction) => {
	const authId = req.auth._id

	if (authId) {
		await prisma.user
			.findFirst({
				where: {
					id: authId
				}
			})
			.then(user => {
				if (!user) {
					return res.status(SC.NOT_FOUND).json({
						error: 'No user was found in DB!'
					})
				}
				if (user.role === Roles.DM_TEAM) {
					return next()
				}
				return res.status(SC.UNAUTHORIZED).json({
					error: 'Not a DM Team user!'
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
			})
	}
}
