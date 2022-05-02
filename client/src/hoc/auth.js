import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  // null => 아무나 출입이 가능
  // true => 로그인한 유저만
  // false => 로그인한 유저는 불가

  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !response.playload.isAdmin) {
            // admin이 아닌 유저가 admin 페이지를 들어가려고 할때
            navigate("/");
          } else {
            if (option == false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
