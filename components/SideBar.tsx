import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from "@emotion/styled";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import UserList from './UserList'
import { useState } from 'react';
import { auth, db } from '@src/firebase/firebaseConfigs';
import { collection, addDoc, getDocs, serverTimestamp, limit, orderBy, query, onSnapshot, where } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import * as EmailValidator from 'email-validator'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Conversation } from 'pages';
import ConversationSelect from './ConversationSelect';
const StyleContainer = styled.div`
min-width: 0px;
max-width:400px;
padding-left:2px;
padding-right:0px;
overflow-y:scoll;
border-right:1px solid whitesmoke;
/* Hide scrollbar for Chrome, Safari and Opera */
	::-webkit-scrollbar {
		display: none;
	}
    /* Hide scrollbar for IE, Edge and Firefox */
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

// height: 100vh;
// 	min-width: 300px;
// 	max-width: 350px;
// 	overflow-y: scroll;
// 	border-right: 1px solid whitesmoke;
// 	/* Hide scrollbar for Chrome, Safari and Opera */
// 	::-webkit-scrollbar {
// 		display: none;
// 	}
// 	/* Hide scrollbar for IE, Edge and Firefox */
// 	-ms-overflow-style: none; /* IE and Edge */
// 	scrollbar-width: none; /* Firefox */

// `

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
const StyleSearchInput = styled.input`
outline: none;
border:none;

flex:1;
`
const StyledSearch = styled.div`
display: flex;
align-items:center;
padding: 15px;
border-radius:2px;
position: sticky;
`

const StyledListUserButton = styled(Button)`
width:100%;
position: sticky;
border-top:1px solid whitesmoke;
border-bottom: 1px solid whitesmoke
`
const SideBar = () => {
    const [loggedInUser, _loading] = useAuthState(auth)
    const [isOpenNewConversationDialog, setisOpenNewConversationDialog] = useState(false)
    const [recipientMessage, setrecipientMessage] = useState('')
    const toggleNewConversationDialog = (isOpen: boolean) => {
        setisOpenNewConversationDialog(isOpen)
        if (!isOpen) setrecipientMessage('')
    }
    const closeNewConversationDialog = () => (
        toggleNewConversationDialog(false)
    )
    //check if conservation already exists between the current logged in user and recipient
    // console.log('loggedInUser', loggedInUser)
    const queryGetConversationForCurrentUSer = query(collection(db, 'conversations'), where('users', 'array-contains', loggedInUser?.email))

    const [conversationsSnapshot] = useCollection(queryGetConversationForCurrentUSer);
    // console.log(conversationsSnapshot?.docs)

    const isConversationAtreadyExists = (recipientMessage: string) => {
        return conversationsSnapshot?.docs.find(conversation => (conversation.data() as Conversation).users.includes(recipientMessage))
    }
    const isInvitingSelf = recipientMessage === loggedInUser?.email
    const createdConversation = async () => {
        if (!recipientMessage) return
        if (EmailValidator.validate(recipientMessage) && !isInvitingSelf && !isConversationAtreadyExists(recipientMessage)) {
            //Add conversation user to db "conversation" collection
            //A conversation is between the currently loogged in user and the user invited
            await addDoc(collection(db, 'conversations'), {
                users: [loggedInUser?.email, recipientMessage]
            })
        }
        closeNewConversationDialog()
    }

    return (
        <StyleContainer>
            <StyledHeader>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Chats
                </Typography>
                <div>

                    <IconButton onClick={() => {
                        toggleNewConversationDialog(true)
                    }}>
                        <MessageIcon />
                    </IconButton>
                    <Dialog open={isOpenNewConversationDialog} onClose={closeNewConversationDialog}>
                        <DialogTitle>Start a new conversation</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enteremail address here
                            </DialogContentText>
                            <TextField
                                autoFocus
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={recipientMessage}
                                onChange={event =>
                                    setrecipientMessage(event.target.value)
                                }
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeNewConversationDialog}>Cancel</Button>
                            <Button disabled={!recipientMessage} onClick={createdConversation}>Start</Button>
                        </DialogActions>
                    </Dialog>

                    <IconButton>
                        <VideoCallIcon />
                    </IconButton>
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </StyledHeader>

            <StyledSearch>
                <SearchIcon />
                <StyleSearchInput placeholder="Search in conversations"></StyleSearchInput>
            </StyledSearch>
            <StyledListUserButton>
                Start a new conversation
            </StyledListUserButton>
            {/* List of Conversation */}

            {/* {conversationsSnapshot?.docs.map(conversation => (
                <ConversationSelect
                    key={conversation.id}
                    id={conversation.id}
                    conversationUsers={(conversation.data() as Conversation).users}
                ></ConversationSelect>
            ))} */}
            <UserList></UserList>
        </StyleContainer>
    )
}
export default SideBar
