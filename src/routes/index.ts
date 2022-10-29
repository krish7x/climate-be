import { Application } from 'express'
import { authRoute } from './auth'
import { userRoute } from './user'
import { companyRoute } from './company'
import { siteRoute } from './site'
import { siteMapRoute } from './siteMapping'

export const routes = (app: Application) => {
	app.use('/api', authRoute)
	app.use('/api', userRoute)
	app.use('/api', companyRoute)
	app.use('/api', siteRoute)
	app.use('/api', siteMapRoute)

	return app
}
