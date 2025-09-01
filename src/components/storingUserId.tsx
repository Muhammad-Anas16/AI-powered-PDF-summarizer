"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setUserId, clearUserId } from "@/redux/slices/userSlice";

interface MyTokenPayload {
  id: string;
}

const StoringUserId = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token"); // Get JWT from cookie

    if (token) {
      try {
        const decoded = jwtDecode<MyTokenPayload>(token);
        // console.log("User token found in cookies");
        // console.log("Decoded token:", decoded);

        if (decoded?.id) {
        //   console.log("Decoded User ID:", decoded.id);
          dispatch(setUserId(decoded.id));
        } else {
          dispatch(clearUserId());
        }
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
        dispatch(clearUserId());
      }
    } else {
      console.log("⚠️ No user token found in cookies");
      dispatch(clearUserId());
    }
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default StoringUserId;
