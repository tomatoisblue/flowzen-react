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
import BoardCreationForm from "./BoardCreationForm";
import { addAllBoards, deleteAllBoards, setCurrentBoardID } from "../features/boardSlice";
import deleteBoard from "./deleteBoard";
import { useAppDispatch, useAppSelector } from "../hooks";


const GeneralSidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<number>(1);
  const [boardFormOpen, setBoardFormOpen] = useState(false);
  const boards: Board[] = useAppSelector((state) => state.board.boards);
  const currentBoardID: number = useAppSelector((state) => state.board.currentBoardID);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, [])

  useEffect(() => {
    if (boards.length > 0) {
      const firstBoardID = boards[0].boardId;
      dispatch(setCurrentBoardID(firstBoardID))
    }

  }, [boards])


  const fetchBoards = async () => {
    const fetchedBoards: Board[] = await getAllBoards();
    dispatch(addAllBoards(fetchedBoards));
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
    dispatch(deleteAllBoards())
    navigate("/");
  }

  const handleBoardFormOpen = () => {
    setBoardFormOpen(!boardFormOpen);
  }

  const handleSidebarOpen = (value: number) => {
    setSidebarOpen(sidebarOpen === value ? 0 : value);
  }

  const handleDeleteBoard = async (boardID: number) => {
    const result = await deleteBoard(boardID);
    if (result) {
      dispatch(setCurrentBoardID(-1))
      fetchBoards()
    }
  }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
      <BoardCreationForm open={boardFormOpen} handleOpen={handleBoardFormOpen} refresh={fetchBoards}/>
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
            <AccordionHeader onClick={() => handleSidebarOpen(1)} className="border-b-0 p-3">
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
                              onClick={() => dispatch(setCurrentBoardID(board.boardId))}
                              className={`border-${board.boardId === currentBoardID ? '2' : '0'}`}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      {board.title}
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteBoard(board.boardId)}>
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
        <ListItem onClick={handleBoardFormOpen}>
          <ListItemPrefix>
            <DocumentPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
            新規ボード作成
            {/* <BoardCreationForm open={boardFormOpen} handleOpen={handleBoardFormOpen} refresh={fetchBoards}/> */}
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          ログアウト
        </ListItem>
      </List>
    </Card>
  );
}

export default GeneralSidebar;