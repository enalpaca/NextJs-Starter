import { Container, Box, FormControl, InputLabel, Input, InputAdornment, Grid, IconButton, Typography, Button, Link, Divider, } from "@mui/material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import KeyIcon from '@mui/icons-material/Key';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
export default function Signin() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    return (
        <>
            <Box sx={{
                marginTop: 9,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
                <Container component="main" maxWidth="xs">
                    <Box component="form" action="api/sendatalogin" method="post">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                            <Grid item xs={12} style={{ textAlign: 'center' }} sx={{ m: 1 }}>
                                <Typography component="h1" variant="h4" align="center"> Đăng nhập</Typography>
                            </Grid>
                            {/* Phone Number */}
                            <Grid item xs={12} style={{ textAlign: 'center' }} >
                                <FormControl variant="standard" margin="normal" fullWidth >
                                    <InputLabel htmlFor="input-with-icon-adornment" >
                                        {/* Phone number: */}
                                    </InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        name="username"
                                        placeholder="Số điện thoại"
                                        startAdornment={
                                            <InputAdornment position="start" >
                                                <PhoneAndroidIcon />
                                            </InputAdornment>
                                        }

                                    />
                                </FormControl>
                            </Grid>


                            {/* Password */}
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <FormControl variant="standard" margin="normal" fullWidth>
                                    <InputLabel htmlFor="input-with-icon-adornment" >
                                        {/* Password: */}
                                    </InputLabel>
                                    <Input
                                        name="password"
                                        id="input-with-icon-adornment"
                                        placeholder="Mật khẩu"
                                        type={showPassword === true ? "text" : "password"}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <KeyIcon />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword}>
                                                    {showPassword === true ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>


                            {/* Forgot password */}
                            <Grid item xs={12}>
                                <Grid item xs>
                                    <Link href="#" variant="body2" > Quên mật khẩu? </Link>
                                </Grid>
                            </Grid>


                            {/* Button sign in */}
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                    Đăng nhập
                                </Button>
                            </Grid>


                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Divider >hoặc</Divider>
                                </div>
                            </Grid>

                            {/* Sing in with Facebook or Google */}
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={6}>
                                        <Button type="submit" fullWidth variant="outlined" href="#as-link"><FacebookOutlinedIcon style={{ color: '#0543ad' }} />Facebook </Button>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Button type="submit" fullWidth variant="outlined" href="#as-link" ><GoogleIcon style={{ color: 'red' }} />Google</Button>
                                    </Grid>
                                </Grid>
                            </Grid>


                            {/* Horizonal */}
                            <Grid item xs={12} style={{ textAlign: 'center' }} >
                                <Divider />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                Bạn chưa có tài khoản? <Link href="#" variant="body2">Đăng ký ngay.</Link>
                            </Grid>
                        </Grid >


                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        </Grid>
                    </Box>
                </Container>
            </Box >
        </>
    );
}