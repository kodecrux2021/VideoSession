import React, { useEffect, useState, useLayoutEffect } from "react";
import { Result, Button } from "antd";
import { Spin } from "antd";
import { Redirect, useHistory } from "react-router";

const PaymentSucess = () => {
  const orderID = localStorage.getItem("pay_id");

  const history = useHistory();
  useLayoutEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("refresh")) {
      history.goBack();
    }
    return () => {
      localStorage.removeItem("pay_id");
    };
  });

  const [Redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRedirecting(true);
    }, 2000);

    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, []);

  return (
    localStorage.getItem("pay_id") !== null && (
      <div className="Payment_sucess">
        {Redirecting ? (
          <div className="spinn">
            <Spin />
            Redirecting ...
          </div>
        ) : (
          <Result
            status="success"
            title="Payment SucessFull"
            //   subTitle={`${orderID} `}
          />
        )}
      </div>
    )
  );
};

export default PaymentSucess;
