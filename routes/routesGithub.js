import express from 'express'

import { fetchLatest, fetchReleases } from '../controllers/github/read.js'

const routerGithub = express.Router()

routerGithub.get('/:repo/v', fetchLatest)
routerGithub.get('/:repo/releases', fetchReleases)

export { routerGithub }


