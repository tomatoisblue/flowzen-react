import Button from "@material-tailwind/react/components/Button";
import Card, { CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import Dialog from "@material-tailwind/react/components/Dialog";
import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";
import { useEffect, useState } from "react";
import createBoard from "./createBoard";

interface Props {
  open: boolean
  handleOpen: () => void
  refresh: () => void
}

const BoardCreationForm: React.FC<Props> = ({ open, handleOpen, refresh }) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setTitle("");
    }

    return () => {
      setTitle("");
    }
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleSubmit = async () => {
    const res: boolean = await createBoard(title);
    if (res) {
      refresh();
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
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              新規ボード作成
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              新しく作成するボードのタイトルを入力してください。
            </Typography>
            {/* <Typography className="-mb-2" variant="h6">
              タイトル
            </Typography> */}
            <Input onChange={handleChange} value={title} label="タイトル" size="lg" crossOrigin={undefined} />
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

export default BoardCreationForm;