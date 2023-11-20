import BoardForm from "./BoardForm"

interface BoardCreateFormProps {
  open: boolean
  handleOpen: () => void
}
const BoardCreateForm: React.FC<BoardCreateFormProps> = ({open, handleOpen}) => {
  return (
    <BoardForm open={open} mode={"create"} handleOpen={handleOpen} />
  )
}

export default BoardCreateForm;