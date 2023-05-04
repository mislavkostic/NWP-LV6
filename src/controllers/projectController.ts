import { NextFunction, Request, Response } from "express";
import ProjectRepository from "../db/repositories/projectRepository";

class ProjectController{
    //method or getting all projects from db
   static async getAllProjects(req: Request, res:Response, next: NextFunction){
        try{
            //getting projects
            const projects = await ProjectRepository.getAllProjects();
            //rendering view with fetched data
            res.render('index', {projects, title:'All projects'});
        }catch(error){
            //if there is an error, show it in console
            console.log(error);
        }
    }
    //method for getting single project by id
    static async getProject(req: Request, res: Response, next: NextFunction){
        
        try{
            //getting project
            const project = await ProjectRepository.getProjectById(req.params.id);
            //rendering view with fetched data
            res.render('project', {project, title:'Project details'});
        }catch(error){
            console.log(error);
        }
        
    }
    //method for rendering view that contains form for adding new project
    static getProjectForm(req: Request, res: Response){
        return res.render('addProject', {title:'Add project'});
    }
    //method for adding new project to database
    static async addProject(req: Request, res: Response, next: NextFunction){
        //data sent via request
        const data = req.body;
      
        try{
            //saving data
          await ProjectRepository.save(data);
          //redirecting to home page(page that shows all projects)
          return res.redirect('/');
        }catch(error: any){
            //if there is an error, send it
            res.status(error.statusCode).send(error.message); 
        }
    }
    //method for deleting project by Id
    static async deleteProject(req: Request, res: Response, next: NextFunction){
        //getting id from query parameters
        const {id} = req.params;
        try{
            //deleteing project
            await ProjectRepository.delete(id);
            res.json({redirect: '/'});
        }catch(error){
            console.log(error);
        }
    }
     //method for rendering view that contains form for updating project
    static async getUpdateForm(req: Request, res: Response){
        //getting id from query parameters
        const {id}= req.params;

        try{
            //getting project data so we can render it in the view
            const project = await ProjectRepository.getProjectById(id);
            // rendering data to the view
            res.render('updateProject', {project, title:'Update project'});
        }catch(error){
            console.log(error);
        }
    }
    //method for updating project
    static async updateProject(req: Request, res: Response){
        //getting id from query parameters
        const {id} = req.params;
        //data sent via request
        const data = req.body;

        try{
            //updating project with provided data
            await ProjectRepository.update(id, data);
            //redirecting
            res.redirect('/');
        }catch(error){
            console.log(error);
        }
    }
}

export = ProjectController;