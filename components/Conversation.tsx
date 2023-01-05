import { useEffect, useRef, useState } from "react";
import { formatRelative } from "date-fns";
import { collection, addDoc, getDocs, serverTimestamp, limit, orderBy, query, onSnapshot } from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "@emotion/styled";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

const StyledMessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 15vh;
    `
const ariaLabel = { 'aria-label': 'description' };
export default function Conversation(props: any) {

    const db = props.db;
    const { uid, displayName, photoURL } = props.user;

    const dummySpace = useRef() as any;

    const [newMessage, setNewMessage] = useState("");

    function getMessages(callback: any) {
        return onSnapshot(
            query(
                collection(db, "messages"),
                orderBy("createdAt", "desc"),
                limit(10)
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

            const doc = await addDoc(collection(db, "messages"), {
                text: newMessage,
                createdAt: serverTimestamp(),
                uid,
                displayName,
                photoURL,
            });
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
    }, []);


    return (
        <main id="conversation">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {messages.map((message: any) => (
                    <ListItem alignItems="flex-start">
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
                                    <div style={{ marginBottom: "30px" }} ref={endOfMessagesRef}> </div>
                                </>
                            }
                        />
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
        </main>
    );
}

function limitToLast(arg0: number): import("@firebase/firestore").QueryConstraint {
    throw new Error("Function not implemented.");
}
function limitToFirst(arg0: number): import("@firebase/firestore").QueryConstraint {
    throw new Error("Function not implemented.");
}

