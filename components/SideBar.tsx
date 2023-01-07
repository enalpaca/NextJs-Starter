import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from "@emotion/styled";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import UserList from './UserList'
import { useState } from 'react';
import { auth, db } from '@src/firebase/firebaseConfigs';
import { collection, addDoc, getDocs, serverTimestamp, limit, orderBy, query, onSnapshot } from "firebase/firestore";



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
`
const StyledListUserButton = styled(Button)`
width:100%;
border-top:1px solid whitesmoke;
border-bottom: 1px solid whitesmoke
`
const SideBar = () => {
    const [loggedInUser, _loading] = useState(auth)
    const [isOpenNewConversationDialog, setisOpenNewConversationDialog] = useState(false)
    const [recipientMessage, setrecipientMessage] = useState('')
    const toggleNewConversationDialog = (isOpen: boolean) => {
        setisOpenNewConversationDialog(isOpen)
        if (!isOpen) setrecipientMessage('')
    }
    const closeNewConversationDialog = () => (
        toggleNewConversationDialog(false)
    )

    // const isInvitedSelf =recipientMessage===loggedInUser?.email kiem tra xem co tu nhap mail chinhh minh hay khong
    const createdConversation = async () => {
        // neu la email hop le va khong tu nhan cho chinh minh
        await addDoc(collection(db, 'conversations'), {
            users: [loggedInUser?.email, recipientMessage]
        });
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
            <UserList></UserList>
        </StyleContainer>
    )
}
export default SideBar
