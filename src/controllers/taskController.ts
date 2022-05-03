import { Request, Response } from 'express';
import { Task } from '../models/Task';

export const getAllTasks = async (req: Request, res: Response) => {
    let tasksList = await Task.findAll();
    if(tasksList.length > 0){
        try {
            let tasks = [];
            for (let i = 0; i < tasksList.length; i++) {
                tasks.push({
                    id: tasksList[i].id,
                    title: tasksList[i].title,
                    done: tasksList[i].done,
                    links: [
                        {
                            type: "GET",
                            rel: "get_one_task_by_id",
                            uri: `http://localhost:4000/task/${tasksList[i].id}`
                        },
                        {
                            type: "PUT",
                            rel: "update_task",
                            uri: `http://localhost:4000/task/${tasksList[i].id}`
                        },
                        {
                            type: "DELETE",
                            rel: "delete_task",
                            uri: `http://localhost:4000/task/${tasksList[i].id}`
                        }
                    ]
                })
            }
            res.status(200).json({tasks});
        } catch (error) {
            res.status(500).json({error});
        }
    }else{
        res.status(404).json({
            tasks: {
                msg: "There are no tasks to show."
            },
            links: [
                {
                    type: "POST",
                    rel: "add_task",
                    uri: 'http://localhost:4000/task'
                }
            ]
        });
    }
}

export const getOneTask = async (req: Request, res: Response) => {
    
}

export const createTask = async (req: Request, res: Response) => {
    if(req.body.title){
        try {
            let newTask = await Task.create({
                title: req.body.title,
                done: req.body.done ? 1 : 0
            });
            res.status(201).json({
                msg: "Task created successfully.",
                newTask,
                links: [
                    {
                        type: "GET",
                        rel: "get_one_task_by_id",
                        uri: `http://localhost:4000/task/${newTask.id}`
                    },
                    {
                        type: "PUT",
                        rel: "update_task",
                        uri: `http://localhost:4000/task/${newTask.id}`
                    },
                    {
                        type: "DELETE",
                        rel: "delete_task",
                        uri: `http://localhost:4000/task/${newTask.id}`
                    }
                ]
            });
        } catch (error) {
            res.status(500).json({error});
        }
    }else{
        res.status(422).json({
            tasks: {
                msg: "Error. Fill in the data correctly."
            },
            links: [
                {
                    type: "POST",
                    rel: "add_task",
                    uri: 'http://localhost:4000/task'
                }
            ]
        });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    if(req.params.id){
        let task = await Task.findByPk(req.params.id);

        if(task){
            if(req.body.title){
                task.title = req.body.title;
            }

            if(req.body.done){
                switch(req.body.done.toLowerCase()) {
                    case 'true':
                    case '1':
                        task.done = 1;
                        break;
                    case 'false':
                    case '0':
                        task.done = 0;
                        break;       
                }
            }
            await task.save();
            res.status(200).json({
                msg: "Task updated successfully.",
                task,
                links: [
                    {
                        type: "GET",
                        rel: "get_one_task_by_id",
                        uri: `http://localhost:4000/task/${task.id}`
                    },
                    {
                        type: "PUT",
                        rel: "update_task",
                        uri: `http://localhost:4000/task/${task.id}`
                    },
                    {
                        type: "DELETE",
                        rel: "delete_task",
                        uri: `http://localhost:4000/task/${task.id}`
                    }
                ]
            });
        }else{
            res.status(404).json({
                msg: "Task not found in database."
            });
        }
    }else{
        res.status(422).json({
            msg: "The 'id' parameter is incorrect and/or not sent in the request."
        });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    
}