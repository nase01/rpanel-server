import express from 'express'

// Controllers
import { authAdmin, authCurrentAdmin, signOutAdmin } from '../controllers/authentication/admin.js'
import { adminAccountUpdate, adminAccountChangePW } from '../controllers/account/admin.js'

import { passwordReset } from '../controllers/account/passwordReset.js'

import { adminCreate } from '../controllers/admin/create.js'
import { adminCount, adminFetch, adminFetchMany } from '../controllers/admin/read.js'
import { adminUpdate } from '../controllers/admin/update.js'
import { adminDelete } from '../controllers/admin/delete.js'
import { adminLogCount, adminLogFetchMany } from '../controllers/logs/admin-log/read.js'

// Middleware
import { adminAuthenticated, userAuthorized, superAdminAuthorized } from '../middleware/auth/admin.js'

const routerAdmin = express.Router()

// Admin Dashboard Authentication
routerAdmin.get('/admin/auth/user', adminAuthenticated, authCurrentAdmin)
routerAdmin.post('/admin/auth/signin', authAdmin)
routerAdmin.post('/admin/auth/signout', signOutAdmin)

// Admin Account Management
routerAdmin.put('/admin/account/update', adminAuthenticated, adminAccountUpdate)
routerAdmin.put('/admin/account/pwchange', adminAuthenticated, adminAccountChangePW)
routerAdmin.put('/admin/account/pwreset', passwordReset)


// Admin User Management
routerAdmin.get('/admin/admins/count', adminAuthenticated, userAuthorized, superAdminAuthorized, adminCount)
routerAdmin.get('/admin/admins/:id', adminAuthenticated, userAuthorized, superAdminAuthorized, adminFetch)
routerAdmin.get('/admin/admins', adminAuthenticated, userAuthorized, superAdminAuthorized, adminFetchMany)
routerAdmin.post('/admin/admins', adminAuthenticated, userAuthorized, superAdminAuthorized, adminCreate)
routerAdmin.put('/admin/admins/:id', adminAuthenticated, userAuthorized, superAdminAuthorized, adminUpdate)
routerAdmin.delete('/admin/admins', adminAuthenticated, userAuthorized, superAdminAuthorized, adminDelete)

// Logs
routerAdmin.get('/admin/logs/admins/count', adminAuthenticated, userAuthorized, superAdminAuthorized, adminLogCount)
routerAdmin.get('/admin/logs/admins', adminAuthenticated, userAuthorized, superAdminAuthorized, adminLogFetchMany)

export { routerAdmin }
