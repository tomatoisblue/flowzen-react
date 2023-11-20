import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import {
  PowerIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";

import { ChevronRightIcon, ChevronDownIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../features/authSlice";
import Board from "../types/Board";
import getAllBoards from "./getAllBoards";
import { addAllBoards, deleteAllBoards, fetchAllBoards, resetBoardFormValidations, resetCurrentBoard, setCurrentBoard, setCurrentBoardID } from "../features/boardSlice";
import deleteBoard from "./deleteBoard";
import { useAppDispatch, useAppSelector } from "../hooks";
import BoardCreateForm from "./BoardCreateForm";
import BoardEditForm from "./BoardEditForm";
import AccountDeleteDialog from "./AccountDeleteDialog";


const GeneralSidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<number>(1);
  const [boardCreateFormOpen, setBoardCreateFormOpen] = useState<boolean>(false);
  const [boardEditFormOpen, setBoardEditFormOpen] = useState<boolean>(false);
  const [accountDeleteDialogOpen, setAccountDeleteDialogOpen] = useState<boolean>(false);
  const boards: Board[] = useAppSelector((state) => state.board.boards);
  const currentBoardID: number = useAppSelector((state) => state.board.currentBoardID);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [])

  useEffect(() => {
    if (boards.length > 0) {
      const firstBoardID = boards[0].boardId;
      dispatch(setCurrentBoardID(firstBoardID!))
    }

  }, [boards])


  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
    dispatch(deleteAllBoards())
    navigate("/");
  }

  const handleBoardCreateFormOpen = () => {
    setBoardCreateFormOpen(!boardCreateFormOpen);
  }

  const handleBoardEditFormOpen = () => {
    setBoardEditFormOpen(!boardEditFormOpen);
  }

  const handleAccountDeleteDialogOpen = () => {
    setAccountDeleteDialogOpen(!accountDeleteDialogOpen);
  }

  const handleClick = () => {
    dispatch(resetCurrentBoard());
    const board: Board = {title: ""};
    dispatch(setCurrentBoard(board));
    handleBoardCreateFormOpen();
  }

  const handleSidebarOpen = (value: number) => {
    setSidebarOpen(sidebarOpen === value ? 0 : value);
  }

  const handleEditClick = (boardId: number) => {
    console.log("handleEditClick")
    dispatch(setCurrentBoardID(boardId));
    dispatch(resetBoardFormValidations());
    handleBoardEditFormOpen();
  }

  const handleDeleteBoard = async (boardID: number) => {
    const result = await deleteBoard(boardID);
    if (!result) { return }

    if (boardID === currentBoardID && boards.length > 1) {
      const firstBoard = boards.find((board) => board.boardId !== currentBoardID)!;
      dispatch(setCurrentBoardID(firstBoard.boardId!));
    } else if (boardID === currentBoardID) {
      dispatch(resetCurrentBoard());
    }

    await dispatch(fetchAllBoards());
  }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
      <BoardCreateForm open={boardCreateFormOpen} handleOpen={handleBoardCreateFormOpen} />
      <BoardEditForm open={boardEditFormOpen} handleOpen={handleBoardEditFormOpen} />
      <AccountDeleteDialog open={accountDeleteDialogOpen} handleOpen={handleAccountDeleteDialogOpen} handleLogout={handleLogout} />
      <List>
        <Accordion
          open={sidebarOpen === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${sidebarOpen === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={sidebarOpen === 1}>
            <AccordionHeader onClick={() => handleSidebarOpen(1)} className="border-b-0 p-3 bg-pink-100">
              <ListItemPrefix>
                <RectangleStackIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                ボード
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {
                boards.length > 0 && boards.map((board: Board) =>
                  <>
                    <ListItem key={board.boardId}
                              onClick={() => dispatch(setCurrentBoardID(board.boardId!))}
                              className={`flex ${board.boardId === currentBoardID && 'bg-pink-50'}`}>
                      <ListItemPrefix className="w-1/6">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      <div className="w-1/2">
                        {board.title}
                      </div>
                      <ListItemSuffix className="w-1/3 flex">
                        <IconButton variant="text" color="blue-gray" onClick={() => handleEditClick(board.boardId!)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                        </IconButton>
                        <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteBoard(board.boardId!)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  </>
                )
              }
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem onClick={handleClick}>
          <ListItemPrefix>
            <DocumentPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
            新規ボード作成
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          ログアウト
        </ListItem>
        <ListItem
          onClick={handleAccountDeleteDialogOpen}
          className="bg-red-300 hover:bg-red-600"
        >
          <ListItemPrefix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </ListItemPrefix>
          アカウント削除
        </ListItem>
      </List>
    </Card>
  );
}

export default GeneralSidebar;