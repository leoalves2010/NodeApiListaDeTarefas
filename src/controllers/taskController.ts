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
            res.json({tasks}).status(200);
        } catch (error) {
            res.json({error}).status(500);
        }
    }else{
        res.json({
            tasks: {
                msg: "There are no tasks to show."
            },
            links: [
                {
                    type: "POST",
                    rel: "add_tasks",
                    uri: 'http://localhost:4000/task'
                }
            ]
        }).status(404);
    }
}

export const getOneTask = async (req: Request, res: Response) => {
    
}

export const createTask = async (req: Request, res: Response) => {
    
}

export const updateTask = async (req: Request, res: Response) => {
    
}

export const deleteTask = async (req: Request, res: Response) => {
    
}