import express from 'express'
import {
	createSiteMapping,
	updateSiteMapping,
	deleteSiteMapping,
	getSiteMap,
	getAllSiteMaps
} from '../controllers/siteMapping'
import { isAdmin } from './../middlewares/index'

const siteMapRoute = express.Router()

siteMapRoute.post('/site-map/create', createSiteMapping)
siteMapRoute.put('/site-map/update/:id', updateSiteMapping)
siteMapRoute.delete('/site-map/delete/:id', isAdmin, deleteSiteMapping)
siteMapRoute.get('/site-map/get/:id', getSiteMap)
siteMapRoute.get('/site-map/get-all', isAdmin, getAllSiteMaps)

export { siteMapRoute }
