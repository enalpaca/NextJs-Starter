import styles from "../../styles/Home.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import NextLink from "next/link";
import { formatRelative } from "date-fns";
import { faker } from "@faker-js/faker";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Avatar,
  Box,
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
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Tab,
  Tabs,
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
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@src/firebase/firebaseConfigs";
import { useAuthState } from "react-firebase-hooks/auth";
import { red } from "@mui/material/colors";
import ToDoAppBar from "components/ToDoAppBar";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CheckIcon from "@mui/icons-material/Check";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: 900 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const TodoApp = () => {
  const [loggedInUser, _loading] = useAuthState(auth);
  const [todoList, setTodoList] = useState([]);
  const [userId, setUserId] = useState(loggedInUser?.uid);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [value, setValue] = React.useState(0);
  const [todoListDeleted, settodoListDeleted] = useState([]);
  const [todoListAtrived, settodoListAtrived] = useState([]);
  const [addLabel, setaddLabel] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleClickAddLabel = () => {
    setaddLabel(!addLabel);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleDeleteTodo = async (id: any) => {
    try {
      const docRef = doc(db, "TodoList", id);
      await updateDoc(docRef, { status: "deleted" });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAtrivedTodo = async (id: any) => {
    try {
      const docRef = doc(db, "TodoList", id);
      await updateDoc(docRef, { status: "atrived" });
    } catch (error) {
      console.error(error);
    }
  };
  const handleRestore = async (id: any) => {
    try {
      const docRef = doc(db, "TodoList", id);
      await updateDoc(docRef, { status: "new" });
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateTodoList = async () => {
    let dataTodoList = {
      title: title,
      userId: loggedInUser?.uid,
      createdAt: serverTimestamp(),
      photoUrl: faker.image.imageUrl(600, 400),
      status: "new",
    };

    await addDoc(collection(db, "TodoList"), dataTodoList);

    // goij firebase
    setTitle("");
    setOpen(false);
  };
  const handleCreateNewLabel = async () => {
    let dataNewLabel = {
      title: title,
      userId: loggedInUser?.uid,
      createdAt: serverTimestamp(),
      photoUrl: faker.image.imageUrl(600, 400),
      status: "new",
    };

    await addDoc(collection(db, "Label"), dataNewLabel);

    // goij firebase
    setTitle("");
    // setOpen(false);
  };
  const handleUpdateLabel = async (id: any) => {
    let dataUpdateLabel = {
      title: titleEdit,
    };
    const docRef = doc(db, "Label", id);

    await updateDoc(docRef, dataUpdateLabel);
  };
  const handleActiveEditLabel = (id: any) => {
    try {
      let temp = [].concat(labels);
      for (let i = 0; i < temp.length; i++) {
        if (id === labels[i].id) {
          temp[i].editLabel = true;
        } else {
          temp[i].editLabel = false;
        }
      }
      setLabels(temp);
    } catch (error) {}
  };

  const handleDeleteLabel = async (id: any) => {
    try {
      await deleteDoc(doc(db, "Label", id));
    } catch (error) {
      console.error(error);
    }
  };
  function getTodoList(userId: string, callback: any) {
    return onSnapshot(
      query(
        collection(db, "TodoList"),
        where("userId", "==", userId || ""),
        where("status", "==", "new")
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
  function getTodoListDeleted(userId: string, callback: any) {
    return onSnapshot(
      query(
        collection(db, "TodoList"),
        where("userId", "==", userId || ""),
        where("status", "==", "deleted")
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
  function getTodoListAtrived(userId: string, callback: any) {
    return onSnapshot(
      query(
        collection(db, "TodoList"),
        where("userId", "==", userId || ""),
        where("status", "==", "atrived")
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
  function getLabel(userId: string, callback: any) {
    return onSnapshot(
      query(
        collection(db, "Label"),
        where("userId", "==", userId || ""),
        where("status", "==", "new")
      ),
      (querySnapshot) => {
        const Label = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        callback(Label.reverse());
      }
    );
  }
  useEffect(() => {
    const unsubscribe = getTodoListDeleted(
      loggedInUser?.uid || "",
      settodoListDeleted
    );
    return unsubscribe;
  }, [_loading]);
  useEffect(() => {
    const unsubscribe = getTodoListAtrived(
      loggedInUser?.uid || "",
      settodoListAtrived
    );
    return unsubscribe;
  }, [_loading]);
  useEffect(() => {
    const unsubscribe = getTodoList(loggedInUser?.uid || "", setTodoList);
    return unsubscribe;
  }, [_loading]);
  useEffect(() => {
    const unsubscribe = getLabel(loggedInUser?.uid || "", setLabels);
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
        <ToDoAppBar activeTab={value}></ToDoAppBar>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            spacing: 4,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab icon={<LightbulbIcon />} label="Ghi chú" {...a11yProps(0)} />
            <Tab
              icon={<CircleNotificationsIcon />}
              label=" Lời nhắc"
              {...a11yProps(1)}
            />
            <Tab icon={<LabelIcon />} label="Nhãn" {...a11yProps(2)} />
            <Tab
              icon={<EditIcon />}
              label="Chỉnh sửa nhãn"
              {...a11yProps(3)}
              onClick={handleClickOpen}
            />
            <Tab
              icon={<SystemUpdateAltIcon />}
              label="Lưu trữ"
              {...a11yProps(4)}
            />
            <Tab icon={<DeleteIcon />} label="Thùng rác" {...a11yProps(5)} />
          </Tabs>
          <TabPanel value={value} index={0}>
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
            <Grid container spacing={1}>
              {todoList &&
                todoList.map((message: any, index) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <Card sx={{ maxWidth: 345 }}>
                        <NextLink
                          href={"todo/" + message.id}
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={message.photoUrl}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                            <div>
                              <IconButton
                                aria-label="settings"
                                onClick={() => handleDeleteTodo(message.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                aria-label="settings"
                                onClick={() => handleAtrivedTodo(message.id)}
                              >
                                <SystemUpdateAltIcon />
                              </IconButton>
                            </div>
                          }
                          subheader={
                            message.createdAt?.seconds
                              ? formatRelative(
                                  new Date(message.createdAt?.seconds * 1000),
                                  new Date()
                                )
                              : "unknown"
                          }
                        />
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Button variant="contained" onClick={handleClickOpen}>
              Thêm nhắc nhở
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
              <DialogTitle>Tạo Nhắc Nhở</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <TextField
                  autoFocus
                  label="Title"
                  type="text"
                  fullWidth
                  variant="standard"
                  placeholder="Tiêu đề"
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
            <Grid container spacing={1}>
              {todoList &&
                todoList.map((message: any, index) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <Card sx={{ maxWidth: 345 }}>
                        <NextLink
                          href={"todo/" + message.id}
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={message.photoUrl}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                            <IconButton
                              aria-label="settings"
                              onClick={() => handleDeleteTodo(message.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                          subheader={
                            message.createdAt?.seconds
                              ? formatRelative(
                                  new Date(message.createdAt?.seconds * 1000),
                                  new Date()
                                )
                              : "unknown"
                          }
                        />
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Nhãn
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Dialog open={open} maxWidth={"xs"} fullWidth>
              <DialogTitle>Chỉnh sửa nhãn</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                {/* <TextField
                  autoFocus
                  label="Title"
                  type="text"
                  fullWidth
                  variant="standard"
                  placeholder="Tạo nhãn mới"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                /> */}
                <FormControl variant="standard" margin="normal" fullWidth>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    {/* nhãn: */}
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    placeholder="Tiêu đề nhãn"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type={addLabel === true ? "text" : "label"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton onClick={handleClickAddLabel}>
                          {addLabel === true ? <AddIcon /> : <ClearIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={handleCreateNewLabel}>
                          <CheckIcon />
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div>
                  {labels &&
                    labels.map((label: any, index) => {
                      return (
                        <FormControl
                          variant="standard"
                          margin="normal"
                          fullWidth
                        >
                          <Input
                            id="outlined-controlled"
                            defaultValue={label.title}
                            disableUnderline={
                              label.editLabel === true ? false : true
                            }
                            onChange={(e) => setTitleEdit(e.target.value)}
                            onClick={() => handleActiveEditLabel(label.id)}
                            endAdornment={
                              <InputAdornment position="end">
                                <Button
                                  onClick={() =>
                                    handleActiveEditLabel(label.id)
                                  }
                                >
                                  {label.editLabel === true ? (
                                    <CheckIcon
                                      onClick={() =>
                                        handleUpdateLabel(label.id)
                                      }
                                    />
                                  ) : (
                                    <EditIcon />
                                  )}
                                </Button>
                                <IconButton
                                  aria-label="settings"
                                  onClick={() => handleDeleteLabel(label.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />

                          {/* <Typography gutterBottom variant="h5" component="div">
                            {message.title}
                          </Typography> */}
                        </FormControl>
                      );
                    })}
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCancelTodoList}
                  variant="contained"
                  color="success"
                >
                  Đóng
                </Button>
              </DialogActions>
            </Dialog>
          </TabPanel>
          <TabPanel value={value} index={4}>
            {todoListAtrived &&
              todoListAtrived.map((message: any, index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <NextLink
                        href={"todo/" + message.id}
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={message.photoUrl}
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
                          <IconButton
                            aria-label="settings"
                            onClick={() => handleRestore(message.id)}
                          >
                            <DriveFolderUploadIcon />
                          </IconButton>
                        }
                        subheader={
                          message.createdAt?.seconds
                            ? formatRelative(
                                new Date(message.createdAt?.seconds * 1000),
                                new Date()
                              )
                            : "unknown"
                        }
                      />
                    </Card>
                  </Grid>
                );
              })}
          </TabPanel>
          <TabPanel value={value} index={5}>
            {todoListDeleted &&
              todoListDeleted.map((message: any, index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={message.photoUrl}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {message.title}
                        </Typography>
                      </CardContent>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            src={loggedInUser?.photoURL || ""}
                          ></Avatar>
                        }
                        action={
                          <IconButton
                            aria-label="settings"
                            onClick={() => handleRestore(message.id)}
                          >
                            <RestoreFromTrashIcon />
                          </IconButton>
                        }
                        subheader={
                          message.createdAt?.seconds
                            ? formatRelative(
                                new Date(message.createdAt?.seconds * 1000),
                                new Date()
                              )
                            : "unknown"
                        }
                      />
                    </Card>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Không thể chỉnh sửa trong thùng rác!
                      </Alert>
                    </Snackbar>
                  </Grid>
                );
              })}
          </TabPanel>
        </Box>
        {/* <Button variant="contained" onClick={handleClickOpen}>
          CREAT A TODO
        </Button> */}
        {/* <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
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
        </Dialog> */}

        {/* <Grid container spacing={2}>
          {todoList &&
            todoList.map((message: any, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <NextLink
                      href={"todo/" + message.id}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={message.photoUrl}
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
                        <IconButton
                          aria-label="settings"
                          onClick={() => handleDeleteTodo(message.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      subheader={
                        message.createdAt?.seconds
                          ? formatRelative(
                              new Date(message.createdAt?.seconds * 1000),
                              new Date()
                            )
                          : "unknown"
                      }
                    />
                  </Card>
                </Grid>
              );
            })}
        </Grid> */}
      </div>
    </div>
  );
};

export default TodoApp;
