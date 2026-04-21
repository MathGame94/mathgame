import { useEffect, useState } from "react";
import "./LongOperation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DivisionTool = ({ num1, num2 }) => {
  // ✅ guard numbers
  const digits1 = (num1 ?? 0).toString().split("");
  const digits2 = (num2 ?? 0).toString().split("");
  const maxNum = Math.max(num1, num2);
  const minNum = Math.min(num1, num2);
  const [topValue1, setTopValue1] = useState("");
  const [topValue2, setTopValue2] = useState("");
  const [topValue3, setTopValue3] = useState("");
  const [topValue4, setTopValue4] = useState("");
  const [topValue5, setTopValue5] = useState("");
  const [botValue1, setBotValue1] = useState("");
  const [botValue2, setBotValue2] = useState("");
  const [botValue3, setBotValue3] = useState("");
  const [botValue4, setBotValue4] = useState("");
  const [botValue5, setBotValue5] = useState("");
  const [botValue6, setBotValue6] = useState("");
  const [botValue7, setBotValue7] = useState("");
  const [botValue8, setBotValue8] = useState("");
  const [botValue9, setBotValue9] = useState("");
  const [botValue10, setBotValue10] = useState("");
  const [botValue11, setBotValue11] = useState("");
  const [botValue12, setBotValue12] = useState("");
  const [botValue13, setBotValue13] = useState("");
  const [botValue14, setBotValue14] = useState("");
  const [botValue15, setBotValue15] = useState("");
  const [botValue16, setBotValue16] = useState("");
  const [botValue17, setBotValue17] = useState("");
  const [firstzero, setFirstzero] = useState("");
  const [extraNum1, setExtraNum1] = useState("");
  const [seondzero, setSecondzero] = useState("");
  const [extraNum2, setExtraNum2] = useState("");
  const [extraNum3, setExtraNum3] = useState("");
  const handleClear = () => {
    setExtraNum1("");
    setExtraNum2("");
    setExtraNum3("");
    setFirstzero("");
    setSecondzero("");
    setTopValue1("");
    setTopValue2("");
    setTopValue3("");
    setTopValue4("");
    setTopValue5("");
    setBotValue1("");
    setBotValue2("");
    setBotValue3("");
    setBotValue4("");
    setBotValue5("");
    setBotValue6("");
    setBotValue7("");
    setBotValue8("");
    setBotValue9("");
    setBotValue10("");
    setBotValue11("");
    setBotValue12("");
    setBotValue13("");
    setBotValue14("");
    setBotValue15("");
    setBotValue16("");
    setBotValue17("");
  };

  const checkTop1 = () => {
    let topValue1_copy = topValue1;
    if (digits1[0] <= digits2[0]) {
      if (
        Math.floor(maxNum.toString()[0] / minNum.toString()[0]) !==
        Number(topValue1_copy)
      ) {
        toast.error("Failed to create course. Try again.");
        setTopValue1("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (Math.floor(maxNum / minNum) !== Number(topValue1_copy)) {
        toast.error("Failed to create course. Try again.");
        setTopValue1("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };
  const checkBot1_2 = () => {
    let topValue1_copy = topValue1;
    if (digits1[0] <= digits2[0]) {
      if (
        (
          Number(topValue1_copy) * Number(minNum.toString()[0])
        ).toString()[0] !== botValue1
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue1("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (
        (Number(topValue1_copy) * Number(minNum)).toString()[0] !== botValue1 ||
        (Number(topValue1_copy) * Number(minNum)).toString()[1] !== botValue2
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue1("");
        setBotValue2("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkBot3_4 = () => {
    if (digits1[0] <= digits2[0]) {
      if (
        Number(maxNum.toString()[0]) - Number(botValue1) !==
        Number(botValue3)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue3("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (
        botValue3 !== "0" ||
        Number(maxNum) - (Number(botValue1) * 10 + Number(botValue2)) !==
          Number(botValue4)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue4("");
        setBotValue3("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkFirstZero = () => {
    if (digits1[0] <= digits2[0]) {
      if (botValue4 !== maxNum.toString()[1]) {
        toast.error("Failed to create course. Try again.");
        setBotValue4("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (firstzero !== "0") {
        toast.error("Failed to create course. Try again.");
        setFirstzero("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };
  const checkTop2 = () => {
    if (digits1[0] <= digits2[0]) {
      if (
        Math.floor((Number(botValue3) * 10 + Number(botValue4)) / minNum) !==
        Number(topValue2)
      ) {
        toast.error("Failed to create course. Try again.");
        setTopValue2("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (topValue2 !== ".") {
        toast.error("Failed to create course. Try again.");
        setTopValue2("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkTop3 = () => {
    if (digits1[0] <= digits2[0]) {
      let topValue3_copy = topValue3;
      if (topValue3_copy !== ".") {
        toast.error("Failed to create course. Try again.");
        setTopValue3("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      let topValue3_copy = topValue3;
      if (
        Math.floor((Number(botValue4) * 10 + Number(firstzero)) / minNum) !==
        Number(topValue3_copy)
      ) {
        toast.error("Failed to create course. Try again.");
        setTopValue3("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkBot6_extra1 = () => {
    if (digits1[0] <= digits2[0]) {
      let topValue2_copy = topValue2;
      if (Number(topValue2_copy) * Number(minNum) < 10) {
        if (
          botValue5 !== "0" ||
          (Number(topValue2_copy) * Number(minNum)).toString()[0] !== botValue6
        ) {
          toast.error("Failed to create course. Try again.");
          setBotValue6("");
          setBotValue5("");
        } else {
          toast.success("sucess to create course");
        }
      } else {
        if (
          (Number(topValue2_copy) * Number(minNum)).toString()[0] !==
            botValue5 ||
          (Number(topValue2_copy) * Number(minNum)).toString()[1] !== botValue6
        ) {
          toast.error("Failed to create course. Try again.");
          setBotValue6("");
          setBotValue5("");
        } else {
          toast.success("sucess to create course");
        }
      }
    } else {
      let topValue3_copy = topValue3;
      if (Number(topValue3_copy) * Number(minNum) < 10) {
        if (
          botValue6 !== "0" ||
          (Number(topValue3_copy) * Number(minNum)).toString()[0] !== extraNum1
        ) {
          toast.error("Failed to create course. Try again.");
          setBotValue6("");
          setExtraNum1("");
        } else {
          toast.success("sucess to create course");
        }
      } else {
        if (
          (Number(topValue3_copy) * Number(minNum)).toString()[0] !==
            botValue6 ||
          (Number(topValue3_copy) * Number(minNum)).toString()[1] !== extraNum1
        ) {
          toast.error("Failed to create course. Try again.");
          setBotValue6("");
          setExtraNum1("");
        } else {
          toast.success("sucess to create course");
        }
      }
    }
  };

  const checkBot8_extra2 = () => {
    if (digits1[0] <= digits2[0]) {
      if (
        botValue7 !== "0" ||
        Number(botValue3) * 10 +
          Number(botValue4) -
          (Number(botValue5) * 10 + Number(botValue6)) !==
          Number(botValue8)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue5("");
        setBotValue6("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (
        botValue8 !== "0" ||
        Number(botValue4) * 10 -
          (Number(botValue6) * 10 + Number(extraNum1)) !==
          Number(extraNum2)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue8("");
        setExtraNum2("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkSecondZero = () => {
    if (digits1[0] <= digits2[0]) {
      if (extraNum2 !== "0") {
        toast.error("Failed to create course. Try again.");
        setExtraNum2("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (seondzero !== "0") {
        toast.error("Failed to create course. Try again.");
        setSecondzero("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };
  const checkTop4 = () => {
    if (digits1[0] <= digits2[0]) {
      let topValue4_copy = topValue4;
      if (
        Math.floor((Number(botValue8) * 10 + Number(extraNum2)) / minNum) !==
        Number(topValue4_copy)
      ) {
        toast.error("Failed to create course. Try again.");
        setTopValue4("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      let topValue4_copy = topValue4;
      if (
        Math.floor((Number(extraNum2) * 10 + Number(seondzero)) / minNum) !==
        Number(topValue4_copy)
      ) {
        toast.error("Failed to create course. Try again.");
        setTopValue4("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };
  const checkBot10_extra3 = () => {
    if (digits1[0] <= digits2[0]) {
      let topValue4_copy = topValue4;
      if (Number(topValue4_copy) * Number(minNum) < 10) {
         if (
          botValue9 !== "0" ||
          (Number(topValue4_copy) * Number(minNum)).toString()[0] !== botValue10
        ) {
          toast.error("Failed to create course. Try again.");
          setBotValue9("");
          setBotValue10("");
        } else {
          toast.success("sucess to create course");
        }
      }else {
      if (
        (Number(topValue4_copy) * Number(minNum)).toString()[0] !== botValue9 ||
        (Number(topValue4_copy) * Number(minNum)).toString()[1] !== botValue10
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue10("");
        setBotValue9("");
      } else {
        toast.success("sucess to create course");
      }
    }
    } else {
      let topValue4_copy = topValue4;
        if (Number(topValue4_copy) * Number(minNum) < 10) {
         if (
          botValue10 !== "0" ||
          (Number(topValue4_copy) * Number(minNum)).toString()[0] !== extraNum3
        ) {
          toast.error("Failed to create course. Try again.");
          setBotValue10("");
          setExtraNum3("");
        } else {
          toast.success("sucess to create course");
        }
      }
      else {
      if (
        (Number(topValue4_copy) * Number(minNum)).toString()[0] !==
          botValue10 ||
        (Number(topValue4_copy) * Number(minNum)).toString()[1] !== extraNum3
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue10("");
        setExtraNum3("");
      } else {
        toast.success("sucess to create course");
      }
    }
  }
  };

  const checkBot11_12 = () => {
    if (digits1[0] <= digits2[0]) {
      if (
        botValue11 !== "0" ||
        Number(botValue8) * 10 +
          Number(extraNum2) -
          (Number(botValue9) * 10 + Number(botValue10)) !==
          Number(botValue12)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue11("");
        setBotValue12("");
      } else {
        toast.success("sucess to create course");
      }
    } else {
      if (
        botValue11 !== "0" ||
        Number(extraNum2) * 10 -
          (Number(botValue10) * 10 + Number(extraNum3)) !==
          Number(botValue12)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue11("");
        setBotValue12("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkBot13 = () => {
    if (botValue13 !== "0") {
      toast.error("Failed to create course. Try again.");
      setBotValue13("");
    } else {
      toast.success("sucess to create course");
    }
  };
  const checkTop5 = () => {
    if (digits1[0] <= digits2[0]) {
      let topValue5_copy = topValue5;
      if (
        Math.floor((Number(botValue12) * 10 + Number(botValue13)) / minNum) !==
        Number(topValue5_copy)
      ) {
        toast.error("Failed to create course. Try again.");
        setTopValue5("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkBot14_15 = () => {
    if (digits1[0] <= digits2[0]) {
      let topValue5_copy = topValue5;
      if (
        (Number(topValue5_copy) * Number(minNum)).toString()[0] !==
          botValue14 ||
        (Number(topValue5_copy) * Number(minNum)).toString()[1] !== botValue15
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue14("");
        setBotValue15("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  const checkBot16_17 = () => {
    if (digits1[0] <= digits2[0]) {
      if (
        botValue16 !== "0" ||
        Number(botValue12) * 10 +
          Number(botValue13) -
          (Number(botValue14) * 10 + Number(botValue15)) !==
          Number(botValue17)
      ) {
        toast.error("Failed to create course. Try again.");
        setBotValue16("");
        setBotValue17("");
      } else {
        toast.success("sucess to create course");
      }
    }
  };

  useEffect(() => {
    if (topValue1) {
      checkTop1();
    }
  }, [topValue1]);

  useEffect(() => {
    if (topValue4) {
      checkTop4();
    }
  }, [topValue4]);
useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (botValue1) checkBot1_2();
  } else {
    if (botValue1 && botValue2) checkBot1_2();
  }
}, [botValue1, botValue2]);


useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (botValue3) checkBot3_4();
  } else {
    if (botValue3 && botValue4) checkBot3_4();
  }
}, [botValue3, botValue4]);


useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (botValue4) checkFirstZero();
  } else {
    if (firstzero) checkFirstZero();
  }
}, [botValue4, firstzero]);


useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (extraNum2) checkSecondZero();
  } else {
    if (seondzero) checkSecondZero();
  }
}, [extraNum2, seondzero]);

  useEffect(() => {
    if (topValue2) {
      checkTop2();
    }
  }, [topValue2]);

  useEffect(() => {
    if (topValue3) {
      checkTop3();
    }
  }, [topValue3]);

useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (botValue5 && botValue6) checkBot6_extra1();
  } else {
    if (botValue6 && extraNum1) checkBot6_extra1();
  }
}, [botValue5, botValue6, extraNum1]);


useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (botValue7 && botValue8) checkBot8_extra2();
  } else {
    if (botValue8 && extraNum2) checkBot8_extra2();
  }
}, [botValue7, botValue8, extraNum2]);


useEffect(() => {
  if (digits1[0] <= digits2[0]) {
    if (botValue9 && botValue10) checkBot10_extra3();
  } else {
    if (botValue10 && extraNum3) checkBot10_extra3();
  }
}, [botValue9, botValue10, extraNum3]);


  useEffect(() => {
    if (botValue11 && botValue12) {
      checkBot11_12();
    }
  }, [botValue11, botValue12]);

  useEffect(() => {
    if (botValue13) {
      checkBot13();
    }
  }, [botValue13]);

  useEffect(() => {
    if (topValue5) {
      checkTop5();
    }
  }, [topValue5]);
  useEffect(() => {
    if (botValue14 && botValue15) {
      checkBot14_15();
    }
  }, [botValue14, botValue15]);

  useEffect(() => {
    if (botValue16 && botValue17) {
      checkBot16_17();
    }
  }, [botValue16, botValue17]);

  if (digits1[0] <= digits2[0]) {
    return (
      <div className="long-op">
        <div className="inputdivtop">
          <input
            type="text"
            className="cellinput result"
            value={topValue1 || ""}
            onChange={(e) => setTopValue1(e.target.value)}
          />

          <input
            type="text"
            className="cellinput result"
            value={topValue2 || ""}
            onChange={(e) => setTopValue2(e.target.value)}
          />

          {Number(botValue8) > 0 ? (
            <input
              type="text"
              className="cellinput result"
              value={topValue3 || ""}
              onChange={(e) => setTopValue3(e.target.value)}
            />
          ) : (
            <input
              disabled
              readOnly
              value=""
              style={{
                width: "20px",
                border: "0px",
                backgroundColor: "#f6f4ff",
              }}
            />
          )}

          {Number(botValue8) > 0 ? (
            <input
              type="text"
              className="cellinput result"
              value={topValue4 || ""}
              onChange={(e) => setTopValue4(e.target.value)}
            />
          ) : (
            <input
              disabled
              readOnly
              value=""
              style={{
                width: "20px",
                border: "0px",
                backgroundColor: "#f6f4ff",
              }}
            />
          )}

          {Number(botValue12) > 0 ? (
            <input
              type="text"
              className="cellinput result"
              value={topValue5 || ""}
              onChange={(e) => setTopValue5(e.target.value)}
            />
          ) : (
            <input
              disabled
              readOnly
              value=""
              style={{
                width: "20px",
                border: "0px",
                backgroundColor: "#f6f4ff",
              }}
            />
          )}
        </div>

        {/* خطوات القسمة */}
        <div className="rowdiv">
          <div className="cell2 " placeholder="المقسوم">
            {digits1[0]}
          </div>
          <div className="cell1 " placeholder="المقسوم">
            <span className="sp_1">{digits2[0]}</span>
            <span>{digits2[1]}</span>
          </div>
        </div>
        {topValue1 && <div className="operation1">➖</div>}
        {topValue1 && (
          <div className="inputdivbottom">
            <input
              type="text"
              className="cellinput result"
              value={botValue1 || ""}
              onChange={(e) => setBotValue1(e.target.value)}
            />
            <input
              disabled
              style={{ backgroundColor: "#f6f4ff" }}
              type="text"
              className="cellinput result"
              value={botValue2 || ""}
              onChange={(e) => setBotValue2(e.target.value)}
            />
          </div>
        )}
        {topValue1 && <hr style={{ width: "120px", marginLeft: "180px" }} />}
        {(botValue2 || botValue1) && (
          <div className="inputdivbottom">
            {Number(digits1[0]) * Number(topValue1) > Number(digits2[0]) && (
              <p style={{ width: "50px" }}></p>
            )}
            <input
              type="text"
              className="cellinput result"
              value={botValue3 || ""}
              style={
                firstzero === "0" ? { textDecoration: "line-through" } : {}
              }
              onChange={(e) => setBotValue3(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue4 || ""}
              onChange={(e) => setBotValue4(e.target.value)}
            />
            {Number(digits1[0]) * Number(topValue1 || 0) >
              Number(digits2[0]) && (
              <input
                disabled
                type="text"
                className="cellinput result"
                value={firstzero || ""}
                onChange={(e) => setFirstzero(e.target.value)}
              />
            )}
          </div>
        )}
        {topValue2 && <div className="operation1">➖</div>}
        {topValue2 && (
          <div className="inputdivbottom">
            <input
              type="text"
              className="cellinput result"
              value={botValue5 || ""}
              onChange={(e) => setBotValue5(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue6 || ""}
              onChange={(e) => setBotValue6(e.target.value)}
            />
          </div>
        )}
        {topValue2 && <hr style={{ width: "120px", marginLeft: "180px" }} />}
        {(botValue5 || botValue6) && (
          <div className="inputdivbottom1">
            {Number(botValue8) > 0 && <p style={{ width: "50px" }}></p>}
            <input
              style={
                seondzero === "0" ? { textDecoration: "line-through" } : {}
              }
              type="text"
              className="cellinput result"
              value={botValue7 || ""}
              onChange={(e) => setBotValue7(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue8 || ""}
              onChange={(e) => setBotValue8(e.target.value)}
            />
            {Number(botValue8) > 0 && (
              <input
                type="text"
                className="cellinput result"
                value={extraNum2}
                onChange={(e) => setExtraNum2(e.target.value)}
              />
            )}
            {Number(botValue8) > 0 && (
              <input
                disabled
                style={{ backgroundColor: "#f6f4ff" }}
                type="text"
                className="cellinput result"
                value={seondzero || ""}
                onChange={(e) => {
                  setSecondzero(e.target.value);
                }}
              />
            )}
          </div>
        )}
        {topValue4 && (
          <div className="operation1" style={{ width: "300px" }}>
            ➖
          </div>
        )}
        {topValue4 && (
          <div className="inputdivbottom1">
            <p style={{ width: "50px" }}></p>
            <input
              disabled
              type="text"
              style={{ backgroundColor: "#f6f4ff" }}
              className="cellinput result"
              value=""
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue9 || ""}
              onChange={(e) => setBotValue9(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue10 || ""}
              onChange={(e) => setBotValue10(e.target.value)}
            />
            <input
              disabled
              type="text"
              className="cellinput result"
              value={extraNum3 || ""}
              onChange={(e) => setExtraNum3(e.target.value)}
            />
          </div>
        )}
        {topValue4 && <hr style={{ width: "120px", marginLeft: "180px" }} />}
        {(botValue9 || botValue10) && (
          <div className="inputdivbottom1">
            <p style={{ width: "50px" }}></p>
            <p style={{ width: "50px" }}></p>
            <input
              type="text"
              className="cellinput result"
              value={botValue11 || ""}
              onChange={(e) => setBotValue11(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue12 || ""}
              onChange={(e) => setBotValue12(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue13 || ""}
              onChange={(e) => setBotValue13(e.target.value)}
            />
          </div>
        )}

        {topValue5 && (
          <div className="operation1" style={{ width: "320px" }}>
            ➖
          </div>
        )}
        {topValue5 && (
          <div className="inputdivbottom1">
            <p style={{ width: "50px" }}></p>
            <input
              disabled
              type="text"
              style={{ backgroundColor: "#f6f4ff" }}
              className="cellinput result"
              value=""
            />
            <input
              disabled
              type="text"
              className="cellinput result"
              style={{ backgroundColor: "#f6f4ff" }}
              value=""
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue14 || ""}
              onChange={(e) => setBotValue14(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue15}
              onChange={(e) => setBotValue15(e.target.value)}
            />
          </div>
        )}
        {topValue5 && <hr style={{ width: "120px", marginLeft: "180px" }} />}
        {(botValue14 || botValue15) && (
          <div className="inputdivbottom1">
            <p style={{ width: "50px" }}></p>
            <p style={{ width: "50px" }}></p>
            <input
              disabled
              style={{ backgroundColor: "#f6f4ff" }}
              type="text"
              className="cellinput result"
              value=""
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue16 || ""}
              onChange={(e) => setBotValue16(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue17}
              onChange={(e) => setBotValue17(e.target.value)}
            />
          </div>
        )}
        <button className="clearBTN" onClick={handleClear}>
          clear
        </button>
 <ToastContainer   position="top-right"
  style={{ top: "50%", transform: "translateY(-50%)" }}
 autoClose={2000} />      </div>
    );
  } else {
    return (
      <div className="long-op">
        <div className="inputdivtop">
          <input
            type="text"
            className="cellinput result"
            value={topValue1 || ""}
            onChange={(e) => setTopValue1(e.target.value)}
          />

          <input
            type="text"
            className="cellinput result"
            value={topValue2 || ""}
            onChange={(e) => setTopValue2(e.target.value)}
          />

          {Number(digits1[0]) * Number(topValue1 || 0) > Number(digits2[0]) ? (
            <input
              type="text"
              className="cellinput result"
              value={topValue3 || ""}
              onChange={(e) => setTopValue3(e.target.value)}
            />
          ) : (
            <input
              disabled
              readOnly
              value=""
              style={{
                width: "20px",
                border: "0px",
                backgroundColor: "#f6f4ff",
              }}
            />
          )}

          {Number(digits1[0]) * Number(topValue1 || 0) > Number(digits2[0]) &&
          topValue3 ? (
            <input
              type="text"
              className="cellinput result"
              value={topValue4 || ""}
              onChange={(e) => setTopValue4(e.target.value)}
            />
          ) : (
            <input
              disabled
              readOnly
              value=""
              style={{
                width: "20px",
                border: "0px",
                backgroundColor: "#f6f4ff",
              }}
            />
          )}

          {Number(digits1[0]) * Number(topValue1 || 0) > Number(digits2[0]) &&
          topValue4 ? (
            <input
              disabled
              type="text"
              className="cellinput result"
              value={topValue5 || ""}
              onChange={(e) => setTopValue5(e.target.value)}
            />
          ) : (
            <input
              disabled
              readOnly
              value=""
              style={{
                width: "20px",
                border: "0px",
                backgroundColor: "#f6f4ff",
              }}
            />
          )}
        </div>

        {/* خطوات القسمة */}
        <div className="rowdiv">
          <div className="cell2 " placeholder="المقسوم">
            {digits1[0]}
          </div>
          <div className="cell1 " placeholder="المقسوم">
            <span className="sp_1">{digits2[0]}</span>
            <span>{digits2[1]}</span>
          </div>
        </div>

        {topValue1 && <div className="operation1">➖</div>}

        {topValue1 && (
          <div className="inputdivbottom">
            <input
              type="text"
              className="cellinput result"
              value={botValue1 || ""}
              onChange={(e) => setBotValue1(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue2 || ""}
              onChange={(e) => setBotValue2(e.target.value)}
            />
          </div>
        )}

        {topValue1 && <hr style={{ width: "120px", marginLeft: "180px" }} />}

        {(botValue2 || botValue1) && (
          <div className="inputdivbottom">
            {Number(digits1[0]) * Number(topValue1) > Number(digits2[0]) && (
              <p style={{ width: "50px" }}></p>
            )}

            <input
              type="text"
              className="cellinput result"
              value={botValue3 || ""}
              style={
                firstzero === "0" ? { textDecoration: "line-through" } : {}
              }
              onChange={(e) => setBotValue3(e.target.value)}
            />

            <input
              type="text"
              className="cellinput result"
              value={botValue4 || ""}
              onChange={(e) => setBotValue4(e.target.value)}
            />

            {Number(digits1[0]) * Number(topValue1 || 0) >
              Number(digits2[0]) && (
              <input
                type="text"
                className="cellinput result"
                value={firstzero || ""}
                onChange={(e) => setFirstzero(e.target.value)}
              />
            )}
          </div>
        )}

        {topValue3 &&
          Number(digits1[0]) * Number(topValue1 || 0) > Number(digits2[0]) && (
            <div style={{ width: "300px" }} className="operation1">
              ➖
            </div>
          )}

        {topValue3 &&
          Number(digits1[0]) * Number(topValue1 || 0) < Number(digits2[0]) && (
            <div className="operation1">➖</div>
          )}

        {topValue3 && (
          <div className="inputdivbottom">
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <p style={{ width: "50px" }}></p>
            )}
            <input
              disabled
              type="text"
              className="cellinput result"
              value={botValue5}
              onChange={(e) => setBotValue5(e.target.value)}
            />
            <input
              type="text"
              className="cellinput result"
              value={botValue6}
              onChange={(e) => setBotValue6(e.target.value)}
            />
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <input
                type="text"
                className="cellinput result"
                value={extraNum1}
                onChange={(e) => setExtraNum1(e.target.value)}
              />
            )}
          </div>
        )}
        {topValue3 && <hr style={{ width: "120px", marginLeft: "180px" }} />}
        {botValue5 ||
          (extraNum1 && (
            <div className="inputdivbottom1">
              {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
                <p style={{ width: "50px" }}></p>
              )}
              {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
                <p style={{ width: "50px" }}></p>
              )}
              <input
                disabled
                type="text"
                className="cellinput result"
                value={botValue7}
                onChange={(e) => setBotValue7(e.target.value)}
              />
              <input
                style={
                  seondzero === "0" ? { textDecoration: "line-through" } : {}
                }
                type="text"
                className="cellinput result"
                value={botValue8}
                onChange={(e) => setBotValue8(e.target.value)}
              />
              {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
                <input
                  type="text"
                  className="cellinput result"
                  value={extraNum2}
                  onChange={(e) => setExtraNum2(e.target.value)}
                />
              )}
              {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
                <input
                  type="text"
                  className="cellinput result"
                  value={seondzero}
                  onChange={(e) => {
                    setSecondzero(e.target.value);
                  }}
                />
              )}
            </div>
          ))}

        {topValue4 && (
          <div
            className="operation1"
            style={
              Number(digits1[0]) * Number(topValue1 || 0) > Number(digits2[0])
                ? { width: "330px" }
                : {}
            }
          >
            ➖
          </div>
        )}

        {topValue4 && (
          <div className="inputdivbottom1">
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <p style={{ width: "50px" }}></p>
            )}
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <p style={{ width: "50px" }}></p>
            )}
            <input
              disabled
              type="text"
              className="cellinput result"
              value={botValue5}
              onChange={(e) => setBotValue5(e.target.value)}
            />
            <input
              disabled
              type="text"
              className="cellinput result"
              value={botValue9}
              onChange={(e) => setBotValue9(e.target.value)}
            />
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <input
                type="text"
                className="cellinput result"
                value={botValue10}
                onChange={(e) => setBotValue10(e.target.value)}
              />
            )}
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <input
                type="text"
                className="cellinput result"
                value={extraNum3}
                onChange={(e) => setExtraNum3(e.target.value)}
              />
            )}
          </div>
        )}
        {topValue4 && <hr style={{ width: "120px", marginLeft: "180px" }} />}
        {(extraNum3 || botValue10) && (
          <div className="inputdivbottom1">
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <p style={{ width: "50px" }}></p>
            )}
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <p style={{ width: "50px" }}></p>
            )}
            <input disabled type="text" className="cellinput result" value="" />
            <input disabled type="text" className="cellinput result" value="" />
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <input
                type="text"
                className="cellinput result"
                value={botValue11}
                onChange={(e) => setBotValue11(e.target.value)}
              />
            )}
            {Number(digits1[0]) * Number(topValue1) > digits2[0] && (
              <input
                type="text"
                className="cellinput result"
                value={botValue12}
                onChange={(e) => setBotValue12(e.target.value)}
              />
            )}
          </div>
        )}
        <button className="clearBTN" onClick={handleClear}>
          clear
        </button>
 <ToastContainer   position="top-right"
  style={{ top: "50%", transform: "translateY(-50%)" }}
 autoClose={2000} />      </div>
    );
  }
};

export default DivisionTool;
