import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { collection, addDoc, getDocs, serverTimestamp, limit, orderBy, query, onSnapshot } from "firebase/firestore";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MessageIcon from '@mui/icons-material/Message'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from "@emotion/styled";
import { Button, Typography } from '@mui/material';
import UserList from './UserList'

const StyleContainer = styled.div`
height: 100vh;
min-width: 300px;
max-width:350px;
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
    return (
        <StyleContainer>
            <StyledHeader>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Chats
                </Typography>
                <div>
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
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