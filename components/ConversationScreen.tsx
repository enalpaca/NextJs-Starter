import { useEffect, useRef, useState } from "react";
import { formatRelative } from "date-fns";
import { doc, collection, addDoc, updateDoc, getDocs, serverTimestamp, limit, orderBy, query, onSnapshot } from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "@emotion/styled";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from "@mui/material";
import React from "react";
import { auth, db, provider, signInWithPopup } from "src/firebase/firebaseConfigs";
import InfoIcon from '@mui/icons-material/Info';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import VideocamSharpIcon from '@mui/icons-material/VideocamSharp';

const StyledMessageContainer = styled.div`
	padding: 0px;
	background-color: white;
    `
const StyledHeader = styled.div`
display: flex;

	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 1;
`
// function limitToLast(arg0: number): import("@firebase/firestore").QueryConstraint {
//     throw new Error("Function not implemented.");
// }
// function limitToFirst(arg0: number): import("@firebase/firestore").QueryConstraint {
//     throw new Error("Function not implemented.");
// }

const ariaLabel = { 'aria-label': 'description' };
export default function ConversationScreen(props: any) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const [user, setUser] = useState(() => auth.currentUser);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);
    const db = props.db;
    const { uid, displayName, photoURL, email } = props.user;
    const { conversationId } = props

    const dummySpace = useRef() as any;

    const [newMessage, setNewMessage] = useState("");

    function getMessages(callback: any) {
        return onSnapshot(
            query(
                collection(db, "conversations", conversationId, "messages"),
                orderBy("createdAt", "desc"),
                limit(20)
            ),
            (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                callback(messages.reverse());
                scrollToBottom();
            }
        );
    }

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();

            await addDoc(collection(db, "conversations", conversationId, "messages"), {
                text: newMessage,
                createdAt: serverTimestamp(),
                uid,
                displayName,
                photoURL,
                senderEmail: email
            });

            const docRef = doc(db, "conversations", conversationId);
            await updateDoc(docRef, {
                latestMsg: {
                    text: newMessage,
                    createdAt: serverTimestamp(),
                    uid,
                    displayName,
                    photoURL,
                    senderEmail: email
                }
            })
            setNewMessage('')
            // scroll down the chat

        } catch (error) {
            console.log(error)
        }

    };


    const endOfMessagesRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = getMessages(setMessages);
        return unsubscribe;
    }, [conversationId]);


    return (
        <StyledMessageContainer>
            <StyledHeader> Avatar and name header of conversation

                <div>
                    {/* {"Avatar and name of user"} */}
                </div>

                <div>


                    <IconButton title="Start a voice call" >
                        <CallSharpIcon />
                    </IconButton>
                    <IconButton title="Start a video call">
                        <VideocamSharpIcon />
                    </IconButton>
                    <IconButton title="Conversation information">
                        <InfoIcon />
                    </IconButton>
                </div>
            </StyledHeader>
            <List sx={{
                width: '100%', maxWidth: "100%", bgcolor: 'background.paper', position: 'relative',
                overflow: 'auto',
                maxHeight: 513,
                '& ul': { padding: 0 }
            }}   >
                {messages.map((message: any, index) => (
                    <ListItem alignItems="flex-start" key={index}>
                        <ListItemAvatar>
                            <Avatar alt={message.displayName || ""} src={message.photoURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message.displayName}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {message.text}

                                    </Typography>
                                    <br></br>
                                    {message.createdAt?.seconds ? (
                                        <Typography
                                            // sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {formatRelative(
                                                new Date(message.createdAt.seconds * 1000),
                                                new Date()
                                            )}
                                        </Typography>
                                    ) : null}

                                </>
                            }
                        />
                        <div style={{ marginBottom: "2px" }} ref={endOfMessagesRef}> </div>
                    </ListItem>

                ))}


            </List>

            <form onSubmit={handleSubmit}>
                <OutlinedInput
                    inputProps={ariaLabel}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."

                />
                <Button type="submit" disabled={!newMessage}>
                    <SendIcon />   {/* Send*/}
                </Button>
            </form>
        </StyledMessageContainer>
    );
}


