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

export const createCompany = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { name, email, address } = req.body
		const data = {
			name,
			email,
			address
		}
		await create(prisma.company, data)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Company created successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to add company in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Company API Called!`)
	}
}

export const updateCompany = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		await updateById(
			prisma.company,
			req.body,
			'id',
			req.params.id && +req.params.id
		)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Company updated successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to update company in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Update Company API Called!`)
	}
}

export const deleteCompany = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		await deleteById(prisma.company, 'id', req.params.id && +req.params.id)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Company deleted successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to delete company in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Delete Company API Called!`)
	}
}

export const getCompany = async (req: Request, res: Response): Promise<any> => {
	try {
		await getById(prisma.company, 'id', req.params.id && +req.params.id)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'Company fetched successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch company!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Company API Called!`)
	}
}

export const getAllCompanies = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.company, take, skip)
			.then(value => {
				return res.status(SC.OK).json({
					message: 'All Companies fetched successfully!',
					data: value
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch all companies!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Companies API Called!`)
	}
}
