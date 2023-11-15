import Button from "@material-tailwind/react/components/Button";
import Card, { CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import Dialog from "@material-tailwind/react/components/Dialog";
import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";
import Select, { Option } from "@material-tailwind/react/components/Select";
import { useTaskForm } from "../hooks/useTaskForm";
import { taskFormFields } from "../constants/taskFormField";
import TaskFormHeader from "./TaskFormHeader";
import { TaskStatus } from "../types/TaskStatus";
import { useAppSelector } from "../hooks";
import Task from "../types/Task";

interface TaskFormProps {
  taskStatus?: TaskStatus,
  handleOpen: () => void,
  mode: "create" | "edit",
  open: boolean
}

const TaskForm: React.FC<TaskFormProps> = ({taskStatus, handleOpen, mode, open}: TaskFormProps) => {
  const [{ handleChange, handleStatusChange, handleSubmit }] = useTaskForm();
  const currentTask: Task = useAppSelector((state) => state.task.currentTask);
  console.log("TaskForm")

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[40rem]">
          <CardBody className="flex flex-col gap-1">
            <div className="flex h-10 w-full">
              <TaskFormHeader mode={mode} handleOpen={handleOpen} />
            </div>
            {taskFormFields.map((field) =>
              <>
                <Typography
                  className="mb-1 font-normal"
                  color="gray">
                  {field.labelText}
                </Typography>
                {field.id !== "status" &&(
                  <Input
                    onChange={handleChange}
                    id={field.id}
                    value={currentTask?.[field.name as keyof Task] as string || ""}
                    label={""}
                    name={field.name}
                    type={field.type}
                    required={field.isRequired}
                    crossOrigin={undefined}/>
                )}
                {field.id === "status" && (
                  <div>
                    <Select id={field.id} name={field.name} onChange={handleStatusChange} value={mode === "create" ? taskStatus : currentTask?.[field.name as keyof Task] as string}>
                      <Option value="TODO">未着手</Option>
                      <Option value="IN_PROGRESS">進行中</Option>
                      <Option value="DONE">完了</Option>
                    </Select>
                  </div>
                )}
              </>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            {/* <Button variant="gradient" onClick={handleSubmit} fullWidth disabled={isFormValid === true ? false : true}> */}
            <Button variant="gradient" onClick={() => handleSubmit(mode, handleOpen)} fullWidth >
              {mode === "create" ? "作成" : "編集"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  ); //
}

export default TaskForm;