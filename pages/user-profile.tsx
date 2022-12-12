import { Container, Box, FormControl, InputLabel, Input, InputAdornment, TextField, Grid, IconButton, Typography, Button, Link, Paper, Divider, } from "@mui/material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { styled } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { error } from "console";
export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    function handleSubmit(): void {
        // throw new Error("Function not implemented.");
        console.log(
            'Handle Submit'
        )
        console.log(
            'username', username
        )
        console.log(
            'password', password
        )
        // const res = await fetch('https://.../data')
        const res = fetch('http://localhost:3000/api/sendatalogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(
                {
                    username, //key=value
                    password
                }
            )
        }).then((response) => response.json()).then((res) => {//res= lấy về data, 
            console.log(
                'res', res
            )
        }).catch((err) => {//bắt lỗi
            console.log(
                'Error', err
            )
        })
    }

    // Khởi tạo
    // var Car = {
    //   type: "",
    //   model: "",
    //   color: ""
    // };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const myComponentStyle = {
        height: 30,
        paddingTop: 10,
        backgroundColor: "green",
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }

    return (
        <>
            <Box sx={{
                marginTop: 9,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }} >
                <Container component="main" maxWidth="xs">
                    <Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                            <Grid item xs={12} style={{ textAlign: 'center' }} sx={{ m: 1 }}>
                                <Typography component="h1" variant="h4" align="center"> User Profile</Typography>
                            </Grid>
                            {/* UserName */}
                            <Grid item xs={12} style={{ textAlign: 'left' }}>
                                <FormControl variant="standard" margin="normal" fullWidth>
                                    <Typography>
                                        UserName
                                    </Typography>
                                </FormControl>
                            </Grid>
                            {/* First-Last Name */}
                            <Grid item xs={12} style={{ textAlign: 'left' }} >
                                <FormControl variant="standard" margin="normal" fullWidth >
                                    <Typography>
                                        First name + last name
                                    </Typography>
                                </FormControl>
                            </Grid>


                            {/* Phone Number */}
                            <Grid item xs={12} style={{ textAlign: 'left' }}>
                                <FormControl variant="standard" margin="normal" fullWidth>
                                    <Typography>
                                        Phone number
                                    </Typography>
                                </FormControl>
                            </Grid>
                            {/* Chỉnh sửa thông tin */}
                            <Grid item xs={12}>
                                <Grid item xs>
                                    <Link href="#" variant="body2" > Chỉnh sửa </Link>
                                </Grid>
                            </Grid>

                            {/* Horizonal */}
                            <Grid item xs={12} style={{ textAlign: 'center' }} >
                                <Divider />
                            </Grid>

                            {/*Link to Facebook or Google */}
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                Liên kết tài khoản <Link href="#" variant="body2"><GoogleIcon style={{ color: 'red' }} />Google<FacebookOutlinedIcon style={{ color: '#0543ad' }} />Facebook </Link>
                            </Grid>
                        </Grid >
                        {/* Logout */}
                        <Grid item xs={12}>
                            <Grid item xs>
                                <Link href="#" variant="body2" > Đăng xuất </Link>
                            </Grid>
                        </Grid>


                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        </Grid>
                    </Box>
                </Container>


            </Box >
        </>
    );
}
