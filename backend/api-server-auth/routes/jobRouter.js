const express = require("express")
const requireAuth = require("../middleware/requireAuth");
const router = express.Router()


const {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    getJob
} = require("../controllers/jobControllers")

router.get("/", getAllJobs)
router.get("/:jobId", getJob)

router.use(requireAuth);
router.post("/", createJob)
router.patch("/:jobId", updateJob)
router.delete("/:jobId", deleteJob)





module.exports = router