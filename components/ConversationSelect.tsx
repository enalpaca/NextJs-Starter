import styled from "@emotion/styled";
import { Conversation } from "../pages";
import { useRouter } from 'next/router'
import { useRecipient } from '../hooks/useRecipient'
import RecipientAvatar from './RecipientAvatar'
import { CssBaseline, List, ListItem } from "@mui/material";
import React from "react";
const StyledContainer = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-all;
:hover {
    background-color: #e9eaeb;
}
`
const ConversationSelect = ({
    id,
    conversationUsers
}: {
    id: string;
    conversationUsers: Conversation['users']
}) => {
    const { recipient, recipientEmail } = useRecipient(conversationUsers)

    const router = useRouter()

    const onSelectConversation = () => {
        router.push(`/conversations/${id}`)
    }
    return (

        <React.Fragment>
            <CssBaseline />
            <List sx={{
                width: '100%', maxWidth: "100%", bgcolor: 'background.paper', position: 'relative',
                overflow: 'auto',
                maxHeight: 475,
                '& ul': { padding: 0 }
            }}

                onClick={onSelectConversation}>
                <React.Fragment>
                    <ListItem>
                        <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
                        <span>{recipientEmail}</span>
                    </ListItem>
                </React.Fragment>

            </List>
        </React.Fragment>
    )
}
export default ConversationSelect