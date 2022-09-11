import { Application } from 'express'
import { authRoute } from './auth'
import { userRoute } from './user'

export const routes = (app: Application) => {
	app.use('/api', authRoute)
	app.use('/api', userRoute)

	return app
}
