import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

const BoardCreationPopup: React.FC = () => {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Typography color="blue-gray" className="mr-auto font-normal">
          新規ボード作成
        </Typography>
      </PopoverHandler>
      <PopoverContent className="w-96">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          新しくボードを作成します
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-bold"
        >
          ボードタイトル
        </Typography>
        <div className="flex gap-2">
          <Input
            size="lg"
            placeholder="日程調整"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}          />
          <Button variant="gradient" className="flex-shrink-0">
            作成
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default BoardCreationPopup;