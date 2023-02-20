import styles from "../../styles/Home.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import NextLink from "next/link";
import { formatRelative } from "date-fns";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  limit,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth, db } from "@src/firebase/firebaseConfigs";
import { useAuthState } from "react-firebase-hooks/auth";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateTodo from "./[id]";
const TodoApp = () => {
  const [loggedInUser, _loading] = useAuthState(auth);
  const [todoList, setTodoList] = useState([]);
  const [userId, setUserId] = useState(loggedInUser?.uid);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTodoList = async () => {
    console.log("goij firebse taoj todolist");
    //
    //
    //
    //
    //

    let dataTodoList = {
      title: title,
      userId: loggedInUser?.uid,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "TodoList"), dataTodoList);

    // goij firebase
    setTitle("");
    setOpen(false);
  };
  function getTodoList(userId: string, callback: any) {
    return onSnapshot(
      query(
        collection(db, "TodoList"),
        where("userId", "==", userId || "")
        // orderBy("createdAt", "desc"),
        // limit(20)
      ),
      (querySnapshot) => {
        const TodoList = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        callback(TodoList.reverse());
      }
    );
  }

  useEffect(() => {
    const unsubscribe = getTodoList(loggedInUser?.uid || "", setTodoList);
    return unsubscribe;
  }, [_loading]);

  const handleCancelTodoList = () => {
    setTitle("");
    setOpen(false);
  };
  if (_loading!) {
    return null;
  }

  return (
    <div>
      <div>
        <span>Todo: </span>
        <Button variant="contained" onClick={handleClickOpen}>
          CREAT A TODO
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
          <DialogTitle>Create a Todo list</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Title of you list"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCreateTodoList}
              variant="contained"
              color="secondary"
            >
              Create
            </Button>
            <Button
              onClick={handleCancelTodoList}
              variant="outlined"
              color="warning"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2}>
          {todoList &&
            todoList.map((message: any, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    {/* <CardActionArea> */}
                    <NextLink
                      href={"todo/" + message.id}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {message.title}
                        </Typography>
                      </CardContent>
                    </NextLink>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          aria-label="recipe"
                          src={loggedInUser?.photoURL || ""}
                        ></Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <DeleteIcon />
                        </IconButton>
                        // <DeleteIcon />
                      }
                      // title="Shrimp and Chorizo Paella"
                      subheader={
                        message.createdAt?.seconds
                          ? formatRelative(
                              new Date(message.createdAt?.seconds * 1000),
                              new Date()
                            )
                          : "unknown"
                      }
                    />
                    {/* </CardActionArea> */}
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default TodoApp;
