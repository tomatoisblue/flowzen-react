import BoardForm from "./BoardForm";

interface BoardEditFormProps {
  open: boolean
  handleOpen: () => void
}
const BoardEditForm: React.FC<BoardEditFormProps> = ({open, handleOpen}) => {
  return (
    <BoardForm open={open} mode={"edit"} handleOpen={handleOpen} />
  )

}

export default BoardEditForm;