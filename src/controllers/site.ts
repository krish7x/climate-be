import { Request, Response } from 'express'
import {
	create,
	deleteById,
	updateById,
	getById,
	getAll
} from '../helpers/crud'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'

export const createSite = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, companyId, geoLocation } = req.body
		const data = {
			name,
			companyId,
			geoLocation
		}
		await create(prisma.site, data)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site created successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to add site in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Site API Called!`)
	}
}

export const updateSite = async (req: Request, res: Response): Promise<any> => {
	try {
		await updateById(
			prisma.site,
			req.body,
			'id',
			req.params.id && +req.params.id
		)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site updated successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to update Site in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Update Site API Called!`)
	}
}

export const deleteSite = async (req: Request, res: Response): Promise<any> => {
	try {
		await deleteById(prisma.site, 'id', req.params.id && +req.params.id)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site deleted successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to delete site in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Delete Site API Called!`)
	}
}

export const getSite = async (req: Request, res: Response): Promise<any> => {
	try {
		await getById(prisma.site, 'id', req.params.id && +req.params.id)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site fetched successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch site!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Site API Called!`)
	}
}

export const getAllSites = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.site, take, skip)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'All Sites fetched successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch all sites!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Sites API Called!`)
	}
}
