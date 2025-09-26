const jobModel = require("../models/jobModel")
const mongoose = require("mongoose")


const createJob = async (req, res) => {
    try {
        const newJob = await jobModel.create({ ...req.body })
        res.status(201).json(newJob)

    } catch (error) {
        res.status(400).json({ message: "Error creating message" })
    }
}


const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find({}).sort({ createdAt: -1 })
        res.status(200).json(jobs)
    } catch (error) {
        res.status(400).json({ message: "Error retrieving jobs" })

    }
}

const updateJob = async (req, res) => {
    const { jobId } = req.params

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(404).json({ message: "Invalid id" })
    }


    try {
        const updatedJob = await jobModel.findOneAndUpdate(
            { _id: jobId },
            { ...req.body },
            { new: true }
        )

        if (updatedJob) {
            res.status(200).json(updatedJob)
        } else {
            res.status(400).json({ message: "Couldnt find the job" })
        }

    } catch (error) {
        res.status(500).json({ message: "Failed updating job" })
    }
}

const deleteJob = async (req, res) => {
    const { jobId } = req.params

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(404).json({ message: "Invalid id" })
    }

    try {
        const deletedJob = await jobModel.findOneAndDelete(jobId)
        res.status(200).json({ message: "Deleted job" })

    } catch (error) {
        res.status(400).json({ message: "Couldnt delete job" })
    }
}

















module.exports = {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob

}