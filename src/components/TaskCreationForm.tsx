import Button from "@material-tailwind/react/components/Button";
import Card, { CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import Dialog from "@material-tailwind/react/components/Dialog";
import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";
import { useEffect, useState } from "react";
import { TaskStatus } from "../types/TaskStatus";
import { useDispatch, useSelector } from "react-redux";
import { taskCreationFields } from "../constants/taskFormField";
import createTask from "./createTask";
import Task from "../types/Task";
import stringToTaskStatus from "./stringToTaskStatus";
import Select, { Option } from "@material-tailwind/react/components/Select";
import getAllTasksByBoardID from "./getAllTasksByBoardID";
import { addAllTasks } from "../features/taskSlice";

interface Props {
  open: boolean
  handleOpen: () => void
  taskStatus: TaskStatus
}

type Fields = { [key: string]: string }


const TaskCreationForm: React.FC<Props> = ({ open, handleOpen, taskStatus}) => {
  const fields = taskCreationFields;
  let fieldsState: Fields = {};
  fields.forEach(field => fieldsState[field.id]="");

  const [taskState, setTaskState] = useState<Fields>(fieldsState);
  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskState({...taskState, ["status"]: taskStatus})
  }, [])


  useEffect(() => {
    if (!open) {
    }

    return () => {
    }
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskState({...taskState, [e.target.id]: e.target.value});
    console.log(e.target.value)
    console.log("title: " + taskState["title"] + "\nstatus: " + taskState["status"] + "\ndesc: " + taskState["description"] + "\nexp: " + taskState["expiration-date"] + "\nurl: " + taskState["url"])
  }

  const handleStatusChange = (e) => {
    setTaskState({...taskState, ["status"]: e})
    console.log(e)
    console.log("title: " + taskState["title"] + "\nstatus: " + taskState["status"] + "\ndesc: " + taskState["description"] + "\nexp: " + taskState["expiration-date"] + "\nurl: " + taskState["url"])
  }

  const handleSubmit = async () => {
    const task : Task = {
      title: taskState["title"],
      status: stringToTaskStatus(taskState["status"])!,
      description: taskState["description"],
      expirationDate: new Date(taskState["expiration-date"]),
      url: taskState["url"]
    }
    const res: boolean = await createTask(task, currentBoardID);
    if (res) {
      fetchTasksByBoardID();
      handleOpen();
    }
  }

  const fetchTasksByBoardID = async () => {
    console.log("fetchTasksByBoardID...");
    if (currentBoardID > 0) {
      console.log("currentBoardId is valid")
      const fetchedTasks: Task[] = await getAllTasksByBoardID(currentBoardID);
      dispatch(addAllTasks(fetchedTasks));
    }
  }


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
            <Typography variant="h4" color="blue-gray">
              新規タスク作成
            </Typography>
            {fields.map((field, index) =>
              <>
                <Typography
                  className="mb-1 font-normal"
                  color="gray">
                  {field.labelText}
                </Typography>
                {fields[index].id !== "status" &&(
                  <Input
                    onChange={handleChange}
                    id={field.id}
                    value={taskState[fields[index].id]}
                    label={""}
                    name={field.name}
                    type={field.type}
                    required={field.isRequired}
                    crossOrigin={undefined}/>
                )}
                {fields[index].id === "status" && (
                  <div>
                    <Select id={field.id} name={field.name} onChange={handleStatusChange} >
                      <Option value="TODO">やるべきこと</Option>
                      <Option value="IN_PROGRESS">進行中</Option>
                      <Option value="DONE">完了</Option>
                    </Select>
                  </div>
                )}
              </>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              作成
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default TaskCreationForm;