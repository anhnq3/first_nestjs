import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  // getAllTasks(): Task[] {
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // If we have any filter defined, call taskService.getTaskWithFilters
    // ortherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      // If we have any filter
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  // When a request come in nestJS will takes all request body and sign in to body (red) parameters
  createTasks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTasks(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Patch('/:id/description')
  updateTaskDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.updateTaskDesciption(id, description);
  }

  @Patch('/:id/title')
  updateTaskTitle(@Param('id') id: string, @Body('title') title: string): Task {
    return this.tasksService.updateTaskTitle(id, title);
  }

  // @Post()
  // // When a request come in nestJS will takes all request body and sign in to body (red) parameters
  // createTasks(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.tasksService.createTasks(title, description);
  // }
}
