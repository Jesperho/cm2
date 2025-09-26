const express = require("express")

const router = express.Router()


const {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob
} = require("../controllers/jobControllers")


router.post("/", createJob)
router.get("/", getAllJobs)
router.patch("/:jobId", updateJob)
router.delete("/:jobId", deleteJob)




module.exports = router