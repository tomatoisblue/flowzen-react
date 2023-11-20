import Button from "@material-tailwind/react/components/Button";
import Card, { CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import Dialog from "@material-tailwind/react/components/Dialog";
import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";
import { BoardFormMode, BoardFormValidation } from "../features/boardSlice";
import { useBoardForm } from "./useBoardForm";
import { useAppSelector } from "../hooks";
import Board from "../types/Board";
import { boardValidationErrorMessages } from "../constants/boardValidationErrorMessages";

interface Props {
  open: boolean
  mode: BoardFormMode
  handleOpen: () => void
}

const BoardForm: React.FC<Props> = ({ open, mode, handleOpen }) => {
  const [{ handleChange, handleSubmit }] = useBoardForm();
  const currentBoard: Board = useAppSelector((state) => state.board.currentBoard);
  const boardFormValidations: BoardFormValidation = useAppSelector((state) => state.board.boardFormValidations);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {mode === "create" ? "新規ボード作成" : "ボード編集"}
            </Typography>
            <Typography
              className="my-1 font-normal"
              variant="paragraph"
              color="gray"
            >
              {mode === "create" ? "新しく作成" : "編集"}するボードのタイトルを入力してください。
            </Typography>
            {/* <Typography className="-mb-2" variant="h6">
              タイトル
            </Typography> */}
            { boardFormValidations.title === false && (
              <Typography
                className="mx-2 my-1 font-normal font-xs"
                color="red">
                {"※" + boardValidationErrorMessages["title"]}
              </Typography>
            )}
            <Input
              onChange={handleChange}
              value={currentBoard?.title as string || ""}
              id={"title"}
              label="タイトル"
              size="lg"
              crossOrigin={undefined} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => handleSubmit(mode, handleOpen)} fullWidth>
              {mode === "create" ? "作成" : "編集"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default BoardForm;