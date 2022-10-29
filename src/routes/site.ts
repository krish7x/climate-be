import express from 'express'
import {
	createSite,
	updateSite,
	deleteSite,
	getSite,
	getAllSites
} from '../controllers/site'
import { isAdmin } from './../middlewares/index'

const siteRoute = express.Router()

siteRoute.post('/site/create', createSite)
siteRoute.put('/site/update/:id', updateSite)
siteRoute.delete('/site/delete/:id', isAdmin, deleteSite)
siteRoute.get('/site/get/:id', getSite)
siteRoute.get('/site/get-all', isAdmin, getAllSites)

export { siteRoute }
