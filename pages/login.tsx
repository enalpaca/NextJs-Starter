
import React, { useState } from "react";
export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mainDivStyle = {
    padding: "1em",
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
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2>Đăng Nhập</h2>
          <form action="#">
            {/* So dien thoai */}
            <div>
              iconphone
            </div>
            <div>
              <label htmlFor="#">Số điện thoại</label>
              <input type="text" />
            </div>

            {/* Nhap mat khau */}
            <div>
              <div>
                iconkey
              </div>
              <div>
                <label htmlFor="#">Mật khẩu</label>
                <input type="password" />
                iconeye-to-hidden-or-show-password
              </div>
            </div>

            <h5>Quên mật khẩu?</h5>

            <button> Đăng nhập </button>

            <span>hoặc</span>

            <div>
              iconfacebook-
              <span>Facebook</span>
              icongoogle-
              <span>Google</span>
            </div>
          </form>

          <hr />

          <p> Bạn chưa có tài khoản?<a href="#">Đăng ký ngay</a></p>
        </div>
        <div className="col-3"></div>
      </div>
    </div >

  );
}

// function handleGetUser(): void {
//   throw new Error("Function not implemented.");
// }

// function handleLogOut(): void {
//   throw new Error("Function not implemented.");
// }

