import { Container, Box, FormControl, InputLabel, Input, InputAdornment, TextField, Grid, IconButton, Typography, Button, Link, Paper, Divider, Modal, } from "@mui/material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { styled } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from "@src/firebase/firebaseConfigs";
import { signInWithPopup } from "firebase/auth";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

      if (res.message === 'Fail') {
        alert("Login fail!")
      }
      else {
        // alert("Say hello" + " " + res.currentUser.firstname + " " + res.currentUser.lastname)
        setOpen(true)
        setCurrentUser(res.currentUser)
      }

    }).catch((err) => {//bắt lỗi
      console.log(
        'Error', err
      )
    })
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentUser, setCurrentUser: any] = useState();
  // Khởi tạo object
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
  const signInWithGoogle = async () => {
    // const provider = new auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      const { user } = await signInWithPopup(auth, provider);

      return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Say hello: {currentUser?.firstname + currentUser?.lastname}
          </Typography>
          <Typography>
            Phone number: {currentUser?.numberphone}
          </Typography>
        </Box>
      </Modal>
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
                    placeholder="Số điện thoại"
                    startAdornment={
                      <InputAdornment position="start" >
                        <PhoneAndroidIcon />
                      </InputAdornment>
                    }
                    onChange={(event) => setUsername(event.target.value)}

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
                    onChange={(event) => setPassword(event.target.value)}
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
                <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => handleSubmit()}>
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
                    <Button type="submit" fullWidth variant="outlined" href="#as-link" onClick={signInWithGoogle} ><GoogleIcon style={{ color: 'red' }} />Google</Button>
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


        // <div className="container">
        //     <div className="container">
        //         <PrimaryAppBar></PrimaryAppBar>
        //     </div>
        //     <div className="container">
        //         {fullname}
        //         {user ? (
        //             <>
        //                 <nav id="sign_out">
        //                     <h2>Chat With Friends</h2>
        //                     <button onClick={signOut}>Sign Out</button>
        //                 </nav>
        //             </>
        //         ) : (
        //             <StyledContainer>
        //                 <StyledLoginContainer>
        //                     <section id="sign_in">
        //                         <h1>Welcome to Chat Room</h1>
        //                         <button onClick={signInWithGoogle}>Sign In With Google</button>
        //                     </section>
        //                 </StyledLoginContainer>
        //             </StyledContainer>
        //         )}
        //         {user ? (

        //         ) :
        //             (
        //                 <div></div>
        //             )}
        //     </div>

        // </div>


