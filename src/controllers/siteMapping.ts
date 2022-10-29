import { Request, Response } from 'express'
import {
	create,
	updateById,
	deleteById,
	getById,
	getAll
} from '../helpers/crud'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'

export const createSiteMapping = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { name, siteId, userId } = req.body
		const data = {
			name,
			siteId: +siteId,
			userId: +userId
		}
		await create(prisma.siteMapping, data)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site Mapped successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to map site!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Site Mapping API Called!`)
	}
}

export const updateSiteMapping = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		await updateById(
			prisma.siteMapping,
			req.body,
			'id',
			req.params.id && +req.params.id
		)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Sitemap updated successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to update sitemap!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Update Site Mapping API Called!`)
	}
}

export const deleteSiteMapping = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		await deleteById(prisma.siteMapping, 'id', req.params.id && +req.params.id)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site map deleted successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to delete site map in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Delete Site Map API Called!`)
	}
}

export const getSiteMap = async (req: Request, res: Response): Promise<any> => {
	try {
		await getById(prisma.siteMapping, 'id', req.params.id && +req.params.id)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Site map fetched successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch site map!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Site Map API Called!`)
	}
}

export const getAllSiteMaps = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.siteMapping, take, skip)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'All Sites map fetched successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch all site maps!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Site Maps API Called!`)
	}
}
