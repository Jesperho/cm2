const express = require("express")

const router = express.Router()


const {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    getJob
} = require("../controllers/jobControllers")


router.post("/", createJob)
router.get("/", getAllJobs)
router.patch("/:jobId", updateJob)
router.delete("/:jobId", deleteJob)
router.get("/:jobId", getJob)




module.exports = router