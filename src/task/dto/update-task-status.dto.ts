import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateTaskStatusDto {
    @ApiProperty(
        {
        enum: TaskStatus
        }
    )
    @IsEnum(TaskStatus)
    status: TaskStatus;
}