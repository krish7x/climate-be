import express from 'express'
import {
	createCompany,
	updateCompany,
	deleteCompany,
	getCompany,
	getAllCompanies
} from '../controllers/company'
import { isAdmin } from './../middlewares/index'

const companyRoute = express.Router()

companyRoute.post('/company/create', createCompany)
companyRoute.put('/company/update/:id', updateCompany)
companyRoute.delete('/company/delete/:id', isAdmin, deleteCompany)
companyRoute.get('/company/get/:id', getCompany)
companyRoute.get('/company/get-all', isAdmin, getAllCompanies)

export { companyRoute }
