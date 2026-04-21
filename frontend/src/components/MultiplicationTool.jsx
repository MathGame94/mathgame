import { useEffect, useState } from "react";
import "./LongOperation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MultiplicationTool = ({ num1, num2 }) => {
  const digits1 = num1.toString().split("");
  const digits2 = num2.toString().split("");
  const maxLength = Math.max(digits1.length, digits2.length);
  const [topValue1, setTopValue1] = useState("");
  const [topValue2, setTopValue2] = useState("");
  const [topValue3, setTopValue3] = useState("");
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [result4, setResult4] = useState("");
  const [result5, setResult5] = useState("");
  const [result6, setResult6] = useState("");
  const [result7, setResult7] = useState("");
  const [result8, setResult8] = useState("");
  const [result9, setResult9] = useState("");
  const [result10, setResult10] = useState("");
  const [result11, setResult11] = useState("");
  const [result12, setResult12] = useState("");
  const maxNum = Math.max(num1, num2);
  const minNum = Math.min(num1, num2);
  const handleClear = () => {
    setTopValue1("");
    setTopValue2("");
    setTopValue3("");
    setResult1("");
    setResult2("");
    setResult3("");
    setResult4("");
    setResult5("");
    setResult6("");
    setResult7("");
    setResult8("");
    setResult9("");
    setResult10("");
    setResult11("");
    setResult12("");
  };
  const checkRes8 = () => {
    if (result8 !== "0") {
      toast.error(`الرقم ${result8} خطأ`);
      setResult8("");
    } else {
      toast.success(`الرقم ${result8} صح`);
    }
  };

  const checkResult1 = () => {
    if (result12 !== (Number(result4) + Number(result8)).toString()) {
      toast.error(`الرقم ${result12} خطأ`);
      setResult12("");
    } else {
      toast.success(`الرقم ${result12} صح`);
    }
  };
  const checkResult2 = () => {
    let topValue2_copy = topValue2;
    if(Number(result3) + Number(result7)>=10){
    if (
      result11 !== (Number(result3) + Number(result7)).toString()[1] ||
      topValue2_copy !== (Number(result3) + Number(result7)).toString()[0]
    ) {
      toast.error(`الرقم ${topValue2_copy}${result11} خطأ`);
      setResult11("");
      setTopValue2("");
    } else {
      toast.success(`الرقم ${topValue2_copy}${result11} صح`);
    }}else if (Number(result3) + Number(result7)<10){
    if (
      result11 !== (Number(result3) + Number(result7)).toString()
    ) {
      toast.error(`الرقم ${result11} خطأ`);
      setResult11("");
      setTopValue2("");
    } else {
      toast.success(`الرقم ${result11} صح`);
    }}
  };
  const checkResult3 = () => {
    let topValue2_copy = topValue2;
    if( Number((Number(result2) + Number(result6))) +
        Number(topValue2_copy) >=
      10){
    let comResult3 = 0;
    let topValue3_copy = 0;
    let pluse1 = 0;
    if((Number(result2) + Number(result6)>=10)){
if (
      Number((Number(result2) + Number(result6)).toString()[1]) +
        Number(topValue2_copy) >=
      10
    ) {
      pluse1 = 1;
      comResult3 = (
        Number((Number(result2) + Number(result6)).toString()[1]) +
        Number(topValue2_copy)
      ).toString()[1];
    } else {
      comResult3 =
        Number((Number(result2) + Number(result6)).toString()[1]) +
        Number(topValue2_copy);
    }
    topValue3_copy = (
          Number((Number(result2) + Number(result6)).toString()[0]) + pluse1
        ).toString()
    } else if ((Number(result2) + Number(result6)<10)){
      if((Number(result2) + Number(result6)<10)){
              comResult3 =(Number(Number(result2) + Number(result6)) +
        Number(topValue2_copy)).toString()[1];

        topValue3_copy = (Number(Number(result2) + Number(result6)) +
        Number(topValue2_copy)).toString()[0];
      }
    }
    if (
      result10 !== comResult3.toString() ||
      topValue3 !== topValue3_copy
    ) {
      toast.error(`الرقم ${topValue3}${result10} خطأ`);
      setResult10("");
      setTopValue3("");
    } else {
      toast.success(`الرقم ${topValue3}${result10} صح`);
    }}else if ( Number((Number(result2) + Number(result6))) +
        Number(topValue2_copy) <
      10){
         if (
      result10 !==  (Number((Number(result2) + Number(result6))) +
        Number(topValue2_copy)).toString() 
    ) {
      toast.error(`الرقم ${result10} خطأ`);
      setResult10("");
      setTopValue3("");
    } else {
      toast.success(`الرقم ${result10} صح`);
      }}
  };

  const checkResult4 = () => {
    if(Number(result9) !== Number(topValue3) + Number(result5)){
      toast.error(`الرقم ${result9} خطأ`);
      setResult9("")
    } else {
      toast.success(`الرقم ${result9} صح`);
      }
  }
  const check1 = () => {
    let topValue1_copy = topValue1;
    if (maxNum.toString()[1] * minNum.toString()[1] >= 10) {
      if (
        result4 !==
          (maxNum.toString()[1] * minNum.toString()[1]).toString()[1] ||
        topValue1_copy !==
          (maxNum.toString()[1] * minNum.toString()[1]).toString()[0]
      ) {
        toast.error(`الرقم ${topValue1_copy}${result4} خطأ`);
        setResult4("");
        setTopValue1("");
      } else {
        toast.success(`الرقم ${topValue1_copy}${result4} صح`);
      }
    } else {
      if (
        result4 !== (maxNum.toString()[1] * minNum.toString()[1]).toString()
      ) {
        toast.error(`الرقم ${result4} خطأ`);
        setResult4("");
        setTopValue1("");
      } else {
        toast.success(`الرقم ${result4} صح`);
      }
    }
  };
  const check2 = () => {
    let topValue1_copy = topValue1;
    if (
      Number(maxNum.toString()[0] * minNum.toString()[1]) +
        Number(topValue1_copy) >=
      10
    ) {
      let comResult3 =
        Number((maxNum.toString()[0] * minNum.toString()[1]).toString()[1]) +
        Number(topValue1_copy);
      console.log(
        comResult3,
        Number((maxNum.toString()[0] * minNum.toString()[1]).toString()[1]),
        Number(topValue1_copy),
      );

      let pluse1 = 0;
      if (
        Number((maxNum.toString()[0] * minNum.toString()[1]).toString()[1]) +
          Number(topValue1_copy) >=
        10
      ) {
        pluse1 = 1;
        comResult3 = (
          Number((maxNum.toString()[0] * minNum.toString()[1]).toString()[1]) +
          Number(topValue1_copy)
        ).toString()[1];
      }
      console.log(
        comResult3,
        result3,
        result2,
        (
          Number((maxNum.toString()[0] * minNum.toString()[1]).toString()[0]) +
          pluse1
        ).toString(),
      );

       if (
        result3 !== comResult3.toString() ||
        result2 !==
          (
            Number(
              (maxNum.toString()[0] * minNum.toString()[1]).toString()[0],
            ) + pluse1
          ).toString()
      ) {
        toast.error(`الرقم ${result2}${result3} خطأ`);
        setResult2("");
        setResult3("");
      } else {
        toast.success(`الرقم ${result2}${result3} صح`);
      }
    } else if (
      Number(maxNum.toString()[0] * minNum.toString()[1]) +
        Number(topValue1_copy) <
      10
    ) {
      if (
        result3 !==
        Number(maxNum.toString()[0] * minNum.toString()[1]).toString()
      ) {
        toast.error(`الرقم ${result3} خطأ`);
        setResult2("");
        setResult3("");
      } else {
        toast.success(`الرقم ${result3} صح`);
      }
    }
  };
  const check3 = () => {
    let topValue1_copy = topValue1;
    if (
      Number(maxNum.toString()[1] * minNum.toString()[0]) +
        Number(topValue1_copy) >=
      10
    ) {
      if (
        result7 !==
          (maxNum.toString()[1] * minNum.toString()[0]).toString()[1] ||
        topValue1_copy !==
          (maxNum.toString()[1] * minNum.toString()[0]).toString()[0]
      ) {
        toast.error(`الرقم ${topValue1_copy}${result7} خطأ`);
        setResult7("");
        setTopValue1("");
      } else {
        toast.success(`الرقم ${topValue1_copy}${result7} صح`);
      }
    } else if (
      Number(maxNum.toString()[1] * minNum.toString()[0]) +
        Number(topValue1_copy) <
      10
    ) {
      if (
        result7 !== (maxNum.toString()[1] * minNum.toString()[0]).toString()
      ) {
        toast.error(`الرقم ${result7} خطأ`);
        setResult7("");
        setTopValue1("");
      } else {
        toast.success(`الرقم ${result7} صح`);
      }
    }
  };
  const check4 = () => {
    let topValue1_copy = topValue1;
    if (
      Number(maxNum.toString()[0]) * Number(minNum.toString()[0]) +
        Number(topValue1_copy) >=
      10
    ) {
      let comResult3 =
        Number((maxNum.toString()[0] * minNum.toString()[0]).toString()[1]) +
        Number(topValue1_copy);
      console.log(
        comResult3,
        Number((maxNum.toString()[0] * minNum.toString()[0]).toString()[1]),
        Number(topValue1_copy),
      );

      let pluse1 = 0;
      if (
        Number((maxNum.toString()[0] * minNum.toString()[0]).toString()[1]) +
          Number(topValue1_copy) >=
        10
      ) {
        pluse1 = 1;
        comResult3 = (
          Number((maxNum.toString()[0] * minNum.toString()[0]).toString()[1]) +
          Number(topValue1_copy)
        ).toString()[1];
        console.log("hi");
      }
      console.log(
        comResult3,
        result6,
        result5,
        (
          Number((maxNum.toString()[0] * minNum.toString()[0]).toString()[0]) +
          pluse1
        ).toString(),
      );

      if (
        result6 !== comResult3.toString() ||
        result5 !==
          (
            Number(
              (maxNum.toString()[0] * minNum.toString()[0]).toString()[0],
            ) + pluse1
          ).toString()
      ) {
        toast.error(`الرقم ${result5}${result6} خطأ`);
        setResult6("");
        setResult5("");
      } else {
        toast.success(`الرقم ${result5}${result6} صح`);
      }
    } else if (
      Number(maxNum.toString()[0]) * Number(minNum.toString()[0]) +
        Number(topValue1) < 10
    ) {
           if (
        result6 !==  (Number(maxNum.toString()[0]) * Number(minNum.toString()[0]) +
        Number(topValue1)).toString()
      ) {
        toast.error(`الرقم ${result6} خطأ`);
        setResult6("");
        setResult5("");
      } else {
        toast.success(`الرقم ${result6} صح`);
      }
    }
  };
  useEffect(() => {
    if (result12) {
      checkResult1();
    }
  }, [result12]);
  useEffect(() => {
    if (Number(result3) + Number(result7)>=10 && result11 && topValue2) {
      checkResult2();
    }else if (Number(result3) + Number(result7)<9 && result11){
      checkResult2()
    }
  }, [result11, topValue2]);


  useEffect(() => {
    if ( Number((Number(result2) + Number(result6))) +
        Number(topValue3) >=10 && result10 && topValue3) {
      checkResult3();
    }else if ( Number((Number(result2) + Number(result6))) +
        Number(topValue2) <10 && result10){
        checkResult3()}
  }, [result10, topValue3]);

 useEffect(() => {
    if (result9 ) {
      checkResult4();
    }
  }, [result9, result8,topValue3]); 


  useEffect(() => {
    if (
      maxNum.toString()[1] * minNum.toString()[1] >= 10 &&
      result4 &&
      topValue1 &&
      result8 !== "0"
    ) {
      check1();
    } else if (
      maxNum.toString()[1] * minNum.toString()[1] < 10 &&
      result4 &&
      result8 !== "0"
    ) {
      check1();
    }
  }, [result4, topValue1]);
  useEffect(() => {
    if (result8) {
      checkRes8();
    }
  }, [result8]);
  useEffect(() => {
    if (
      Number(maxNum.toString()[1] * minNum.toString()[0]) >= 10 &&
      result7 &&
      topValue1 &&
      result8 === "0"
    ) {
      check3();
    } else if (
      Number(maxNum.toString()[1] * minNum.toString()[0]) < 10 &&
      result7 &&
      result8
    ) {
      check3();
    }
  }, [result7, topValue1]);

  useEffect(() => {
    if (
      Number(minNum.toString()[1]) * Number(maxNum.toString()[0]) +
        Number(topValue1) >
        9 &&
      result2 &&
      result3 &&
      result8 !== "0"
    ) {
      check2();
    } else if (
      Number(minNum.toString()[1]) * Number(maxNum.toString()[0]) +
        Number(topValue1) <=
        9 &&
      result3 &&
      result8 !== "0"
    ) {
      check2();
    }
  }, [result2, result3, topValue1]);
  useEffect(() => {
    if (
      Number(maxNum.toString()[0]) * Number(minNum.toString()[0]) +
        Number(topValue1) >=
        10 &&
      result8 === "0" &&
      result6 &&
      result5
    ) {
      check4();
    } else if (
      Number(maxNum.toString()[0]) * Number(minNum.toString()[0]) +
        Number(topValue1) <
        10 &&
      result8 === "0" &&
      result6
    ) {
      check4();
    }
  }, [result6, result5, topValue1]);
  return (
    <div className="long-op">
      {(Number(maxNum.toString()[1]) * Number(minNum.toString()[1]) >= 10 ||
        (Number(maxNum.toString()[1]) * Number(minNum.toString()[0]) >= 10 &&
          result3 &&
          result4) ||
        result2 ||
        "") && (
        <div className="row">
          <input
            type="text"
            className="cell result"
            value={topValue1}
            onChange={(e) => setTopValue1(e.target.value)}
          />
          <p className="cell result"></p>
        </div>
      )}
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2 > digits1
              ? digits2[i - (maxLength - digits1.length)] || ""
              : digits1[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <div className="operation">✖️</div>
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2 > digits1
              ? digits1[i - (maxLength - digits1.length)] || ""
              : digits2[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <hr />
      {Number(result3) + Number(result7) >= 10 && result12 && (
        <div className="row">
          {Number(result2) + Number(result6) + Number(topValue2) >= 10 ? (
            <input
              type="text"
              className="cell result"
              value={topValue3}
              onChange={(e) => setTopValue3(e.target.value)}
            />
          ) : (
            <p className="cell result"></p>
          )}
          <input
            type="text"
            className="cell result"
            value={topValue2}
            onChange={(e) => setTopValue2(e.target.value)}
          />
          <p className="cell result"></p>
          <p className="cell result"></p>
          <p className="cell result"></p>
          <p className="cell result"></p>
        </div>
      )}
      {Number(result2) + Number(result6) + Number(topValue2) >= 10 &&
        Number(result3) + Number(result7) < 10 &&
        result12 && (
          <div className="row">
            {Number(result2) + Number(result6) >= 10 ? (
              <input
                type="text"
                className="cell result"
                value={topValue3}
                onChange={(e) => setTopValue3(e.target.value)}
              />
            ) : (
              <p className="cell result"></p>
            )}
            <p className="cell result"></p>
            <p className="cell result"></p>
            <p className="cell result"></p>
            <p className="cell result"></p>
            <p className="cell result"></p>
          </div>
        )}
      <div className="row">
        <p className="cell result"></p>
        {Number(minNum.toString()[1]) * Number(maxNum.toString()[0]) +
          Number(topValue1)  >
        9  ? (
          <input
            className="cell result"
            value={result2}
            onChange={(e) => {
              setResult2(e.target.value);
            }}
          />
        ) : (
          <p className="cell result"></p>
        )}{" "}
        <input
          className="cell result"
          value={result3}
          onChange={(e) => {
            setResult3(e.target.value);
          }}
        />
        <input
          className="cell result"
          value={result4}
          onChange={(e) => {
            setResult4(e.target.value);
          }}
        />
        <p className="cell result"></p>
        <p className="cell result"></p>
      </div>
      {((result3 && result4) || result2) && <div className="operation">➕</div>}
      {((result3 && result4) || result2) && (
        <div className="row">
          {Number(maxNum.toString()[0]) * Number(minNum.toString()[0]) +
            Number(topValue1) >=
            10 && result8 === "0" ? (
            <input
              className="cell result"
              value={result5}
              onChange={(e) => {
                setResult5(e.target.value);
              }}
            />
          ) : (
            <p className="cell result"></p>
          )}

          <input
            className="cell result"
            value={result6}
            onChange={(e) => {
              setResult6(e.target.value);
            }}
          />
          <input
            className="cell result"
            value={result7}
            onChange={(e) => {
              setResult7(e.target.value);
            }}
          />

          <input
            className="cell result"
            value={result8}
            onChange={(e) => {
              setResult8(e.target.value);
              setTopValue1("");
            }}
          />
          <p className="cell result"></p>
          <p className="cell result"></p>
        </div>
      )}
      {((result3 && result4) || result2) && <hr />}
      {((result6 && result7 && result8) || result5) && (
        <div className="row">
          <input
            className="cell result"
            value={result9}
            onChange={(e) => {
              setResult9(e.target.value);
            }}
          />

          <input
            className="cell result"
            value={result10}
            onChange={(e) => {
              setResult10(e.target.value);
            }}
          />
          <input
            className="cell result"
            value={result11}
            onChange={(e) => {
              setResult11(e.target.value);
            }}
          />
          <input
            className="cell result"
            value={result12}
            onChange={(e) => {
              setResult12(e.target.value);
            }}
          />
          <p className="cell result"></p>
          <p className="cell result"></p>
        </div>
      )}
      <button className="clearBTN" onClick={handleClear}>
        clear
      </button>
      <ToastContainer   position="top-right"
  style={{ top: "50%", transform: "translateY(-50%)" }}
 autoClose={2000} />
    </div>
  );
};

export default MultiplicationTool;
