import Button from "@material-tailwind/react/components/Button";
import Card, { CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import Dialog from "@material-tailwind/react/components/Dialog";
import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskCreationFields } from "../constants/taskFormField";
import Task from "../types/Task";
import stringToTaskStatus from "./stringToTaskStatus";
import Select, { Option } from "@material-tailwind/react/components/Select";
import getAllTasksByBoardID from "./getAllTasksByBoardID";
import { addAllTasks } from "../features/taskSlice";
import updateTask from "./updateTask";
import deleteTask from "./deleteTask";

interface Props {
  open: boolean
  handleOpen: () => void
}

type Fields = { [key: string]: string | Date | null}

const fields = taskCreationFields;
let fieldsState: Fields = {};
fields.forEach(field => fieldsState[field.id]="");

const TaskEditForm: React.FC<Props> = ({ open, handleOpen }) => {
  const allTasks = useSelector((state: any) => state.task.tasks);
  const currentTaskID: number = useSelector((state: any) => state.task.currentTaskID);
  const currentTask = allTasks.find((task: Task) => task.taskId === currentTaskID)!;

  console.log("currentTask")
  console.log(JSON.stringify(currentTask))
  console.log(JSON.stringify(currentTask?.title))

  const [taskState, setTaskState] = useState<Fields>(fieldsState);

  useEffect(() => {
    setTaskState({
      "title": currentTask?.title,
      "status": currentTask?.status,
      "description": currentTask?.description,
      "expiration-date": currentTask?.expirationDate,
      "url": currentTask?.url
    })
  }, [currentTaskID])

  useEffect(() => {
    console.log("task state changed ...")
    console.log(JSON.stringify(taskState))

  }, [taskState])



  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);
  const dispatch = useDispatch();

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
      title: taskState["title"] as string,
      status: stringToTaskStatus(taskState["status"] as string)! ,
      description: taskState["description"] as string,
      expirationDate: new Date(taskState["expiration-date"] as string),
      url: taskState["url"] as string
    }
    const res: boolean = await updateTask(task, currentBoardID, currentTaskID);
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

  const handleDeleteTask = async (taskID: number) => {
    const result: boolean = await deleteTask(taskID, currentBoardID);
    if(result) {
      fetchTasksByBoardID();
      handleOpen();
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
            <div className="flex h-10">
              <Typography variant="h4" color="blue-gray">
                タスク編集
              </Typography>
              <div className="place-items-end">
                <Button  onClick={() => handleDeleteTask(currentTaskID)}
                        className="text-sm font-small text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <Typography  color="blue-gray">
                    削除
                  </Typography>
                </Button>

              </div>
            </div>
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
                    value={taskState[fields[index].id] as string}
                    label={""}
                    name={field.name}
                    type={field.type}
                    required={field.isRequired}
                    crossOrigin={undefined}/>
                )}
                {fields[index].id === "status" && (
                  <div>
                    <Select id={field.id} name={field.name} onChange={handleStatusChange}>
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
              編集
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default TaskEditForm;