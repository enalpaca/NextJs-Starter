import { Container, Box, FormControl, InputLabel, Input, InputAdornment, TextField, Grid, IconButton, Typography } from "@mui/material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import KeyIcon from '@mui/icons-material/Key';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };
  // function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
  //   // throw new Error("Function not implemented.");
  //   console.log(
  //     'Handle Submit'
  //   )
  //   console.log(
  //     'username', username
  //   )
  //   console.log(
  //     'password', password
  //   )
  // }
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="center"> Đăng nhập</Typography>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Phone number:
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                placeholder="Please enter phone enter"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Password:
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                placeholder="Please enter password"
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

        </Grid >

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        </Grid>

      </Box >
    </Container >
  );
  // <div>
  //   <div className="alert alert-primary" role="alert">
  //     A simple primary alert—check it out!
  //   </div>
  //   <form onSubmit={(e) => handleSubmit(e)} action="/api/sendatalogin" method="get">
  //     <h1 className="h3 mb-3 fw-normal">Đăng nhập</h1>
  //     <label htmlFor="username"> Username </label>
  //     <hr />
  //     <input
  //       type="text"
  //       name="username"
  //       id="username"
  //       onChange={(e) => setUsername(e.target.value)}
  //     />

  //     <hr />
  //     <label htmlFor="password"> Password</label>
  //     <hr />
  //     <input
  //       type="text"
  //       name="password"
  //       id="password"
  //       onChange={(e) => setPassword(e.target.value)}
  //     />

  //     <hr />
  //     <button type="submit"> Log in </button>
  //   </form>
  // </div>
  // <div className="container">
  //   <div className="row">
  //     <div className="col-3"></div>
  //     <div className="col-6">
  //       <h2>Đăng Nhập</h2>
  //       <form action="#">
  //         {/* So dien thoai */}
  //         <div>
  //           iconphone
  //         </div>
  //         <div>
  //           <label htmlFor="#">Số điện thoại</label>
  //           <input type="text" />
  //         </div>

  //         {/* Nhap mat khau */}
  //         <div>
  //           <div>
  //             iconkey
  //           </div>
  //           <div>
  //             <label htmlFor="#">Mật khẩu</label>
  //             <input type="password" />
  //             iconeye-to-hidden-or-show-password
  //           </div>
  //         </div>

  //         <h5>Quên mật khẩu?</h5>

  //         <button> Đăng nhập </button>

  //         <span>hoặc</span>

  //         <div>
  //           iconfacebook-
  //           <span>Facebook</span>
  //           icongoogle-
  //           <span>Google</span>
  //         </div>
  //       </form>

  //       <hr />

  //       <p> Bạn chưa có tài khoản?<a href="#">Đăng ký ngay</a></p>
  //     </div>
  //     <div className="col-3"></div>
  //   </div>
  // </div >

}

// function handleGetUser(): void {
//   throw new Error("Function not implemented.");
// }

// function handleLogOut(): void {
//   throw new Error("Function not implemented.");
// }

