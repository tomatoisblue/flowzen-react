import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react"
import { deleteAccount } from "./deleteAccount"

interface AccountDeleteDialogProps {
  open: boolean
  handleOpen: () => void
  handleLogout: () => void
}

const AccountDeleteDialog: React.FC<AccountDeleteDialogProps> = ({ open, handleOpen, handleLogout }) => {
  const handleClick = async() => {
    const result = await deleteAccount();
    if (result) {
      console.log("Account Successfully Deleted")
      handleLogout();
    }
  }
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
      >
        <DialogHeader>
          <Typography
            variant="h5"
            color="red"
          >
            本当に削除しますか？
          </Typography>
        </DialogHeader>
        <DialogBody>
          一度削除されたアカウントは二度と回復できません。
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            キャンセル
          </Button>
          <Button variant="text" color="red" onClick={handleClick}>
            アカウントを削除
          </Button>
        </DialogFooter>

      </Dialog>

    </>
  )
}

export default AccountDeleteDialog;