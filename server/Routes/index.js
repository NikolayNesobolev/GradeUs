const Router = require("express")
const router = new Router()
const userRouter = require("./userRouter")
const roleRouter = require("./roleRouter")
const labGroupRouter = require("./labGroupRouter")
const projectRouter = require("./projectRouter")
const gradeRouter = require("./gradeRouter")

router.use("/user", userRouter)
router.use("/role", roleRouter)
router.use("/lab_group", labGroupRouter)
router.use("/project", projectRouter)
router.use("/grade", gradeRouter)

module.exports = router
