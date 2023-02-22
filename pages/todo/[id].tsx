import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { auth, db } from "@src/firebase/firebaseConfigs";
import {
  collection,
  onSnapshot,
  query,
  where,
  documentId,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import React from "react";
import { formatRelative } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import ToDoAppBar from "components/ToDoAppBar";
const CreateTodo = (props: any) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const router = useRouter();
  const TodoId = router.query.id;
  const [newToDo, setNewToDo] = useState("");
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      await addDoc(collection(db, "TodoList", TodoId + "", "Tasks"), {
        text: newToDo,
        createdAt: serverTimestamp(),
      });
      //   const docRef = doc(db, "TodoList", TodoId + "");
      //   await updateDoc(docRef, {
      //     latestMsg: {},
      //   });
      setNewToDo("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      //   const docRef = doc(db, "TodoList", TodoId + "", "Tasks", id);
      //   await updateDoc(docRef, {
      //     status: "deleted",
      //   });
      await deleteDoc(doc(db, "TodoList", TodoId + "", "Tasks", id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckbox = async (id: any, status: any) => {
    try {
      const docRef = doc(db, "TodoList", TodoId + "", "Tasks", id);
      await updateDoc(docRef, {
        status: status === null || status === undefined ? "done" : null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [loggedInUser, _loading] = useAuthState(auth);
  const [todoList, setTodoList] = useState<any>(null);

  function getTodoList(callback: any) {
    return onSnapshot(
      query(
        collection(db, "TodoList"),
        where(documentId(), "==", TodoId || "")
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
        callback(TodoList.length > 0 ? TodoList[0] : null);
      }
    );
  }
  function getTask(callback: any) {
    return onSnapshot(
      query(collection(db, "TodoList", TodoId + "", "Tasks")),
      (querySnapshot) => {
        const Tasks = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        callback(Tasks);
      }
    );
  }
  const [task, setTask] = useState([]);
  useEffect(() => {
    const unsubscribe = getTask(setTask);
    return unsubscribe;
  }, [TodoId]);
  useEffect(() => {
    if (TodoId) {
      const unsubscribe = getTodoList(setTodoList);
      return unsubscribe;
    }
  }, [_loading]);
  return (
    <Box sx={{ flexGrow: 2 }}>
      <ToDoAppBar></ToDoAppBar>
      <Grid container spacing={0}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {todoList && (
            <Typography gutterBottom variant="h5" component="div">
              {todoList?.title}
            </Typography>
          )}
          {todoList && (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <TextField
                  autoFocus
                  label="Task"
                  type="text"
                  fullWidth
                  variant="standard"
                  placeholder="Type a task and press enter"
                  value={newToDo}
                  onChange={(e) => setNewToDo(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleSubmit}>
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item xs={6}>
                {task.map((task: any, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemText
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {task.text}
                          </Typography>
                          <br></br>
                          {task.createdAt?.seconds
                            ? formatRelative(
                                new Date(task.createdAt?.seconds * 1000),
                                new Date()
                              )
                            : "unknown"}
                        </>
                      }
                    />
                    <Checkbox
                      {...label}
                      checked={task.status === "done" ? true : false}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      onClick={() => handleCheckbox(task.id, task.status)}
                    />
                    <IconButton
                      aria-label="settings"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};
export default CreateTodo;
