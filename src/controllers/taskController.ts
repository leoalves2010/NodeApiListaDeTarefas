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
    
}

export const deleteTask = async (req: Request, res: Response) => {
    
}