const express = require('express');
const router = express.Router();
const tasks = require("../models/taskSchema");
const mongoose = require('mongoose');
router.use(express.json()); // Add this line to parse JSON request bodies

//post API
router.post("/AddTask", async (req, res) => {
    console.log('new payload============>',req.body,);
    const { title, description, mark } = req.body;
    console.log('title, des', title, description,mark);

    if (!title || !description) {
        return res.status(400).json({ error: "Please fill in both title and description." });
    }

    try {
        const pretask = await tasks.findOne({ description: description });
        if (pretask) {
            return res.status(400).json({ error: "This task is already present." });
        } else {
            const addtask = new tasks({ title, description, mark });
            const savedTask = await addtask.save();
            console.log(savedTask);
            return res.status(201).json(savedTask);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
});
//   router.get('/AllTasks',async (req, res) => {
//     console.log("req.body",req.body);
//     try{
//         const getTasks=await tasks.find();
//         console.log("getTaks***",getTasks);
//         // Send the tasks as JSON response
//         res.json(getTasks);
//     }
//     catch(error)
//     {
//         console.error('Error retrieving tasks:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }

//   });

router.get('/AllTasks', async (req, res) => {
    try {
        const { taskId } = req.query;
        console.log('i got my task id', taskId)

        if (taskId) {
            const task = await tasks.findById(taskId)
            if (!task) {
                // Handle the case where the requested task is not found
                return res.status(404).json({ error: 'Task not found' });
            }

            // Send the specific task as a JSON response
            return res.json(task);
        } else {
            // If taskId is not provided, return all tasks
            const allTasks = await tasks.find();
            return res.json(allTasks);
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

// Add a new route for deleting a task by ID
router.delete('/DeleteTask', async (req, res) => {
    try {

        const { taskId } = req.query;
        console.log('taskId---', taskId)
        // Check if the provided taskId is valid
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }

        // Attempt to find and delete the task by its ID
        const deletedTask = await tasks.findByIdAndDelete(taskId);

        // Check if the task was found and deleted
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // If the task was successfully deleted, send a success response
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/UpdateTask', async (req, res) => {
    try {
        const { taskId } = req.query;
        console.log('i got my task id---', taskId)

        if (taskId) {
            const task = await tasks.findById(taskId)
            if (!task) {
                // Handle the case where the requested task is not found
                return res.status(404).json({ error: 'Task not found' });
            }

            // Send the specific task as a JSON response
            return res.json(task);
        } else {
            // If taskId is not provided, return all tasks
            const allTasks = await tasks.find();
            return res.json(allTasks);
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});


// Update a task by ID
router.put('/UpdateTask/:taskId', async (req, res) => {
    console.log("alloowww")
    try {
        const { taskId } = req.params;
        const updatedTaskData = req.body; // The updated task data from the request body
        console.log(taskId)

        // Use Mongoose to find and update the task by its ID
        const updatedTask = await tasks.findByIdAndUpdate(taskId, updatedTaskData);

        if (!updatedTask) {
            // Handle the case where the task is not found
            return res.status(404).json({ error: 'Task not found' });
        }

        // Send the updated task as a JSON response
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
