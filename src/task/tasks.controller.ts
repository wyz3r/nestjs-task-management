import { Body, Controller, Get, Param, Post, Delete, Patch, Query, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { ApiHeaderOptions, ApiHeaders, ApiTags,  } from '@nestjs/swagger';


const r: ApiHeaderOptions[] = [
    {name: 'name',
    description: 'name of the user'
}, {name: 'token',
description: 'name of the user'
}
  ]


@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}
    @ApiHeaders(r)
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto, @Req() req: any): Task[]{
        console.log(req)
        if(Object.keys(filterDto).length){
            //.. 
            return this.taskService.getTasksWithFilter(filterDto)
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getAllTaskById(@Param('id') id:string  ): Task{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto :CreateTaskDto):Task {

        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id : string):void{
        return this.taskService.deleteTask(id)

    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto ): Task{
        const {status} = updateTaskStatusDto
        return this.taskService.updateTaskStatus(id,status)
    }

}
 