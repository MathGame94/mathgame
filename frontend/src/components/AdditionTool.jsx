import { useEffect, useState } from "react";
import "./LongOperation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdditionTool = ({ num1, num2 }) => {
  const digits1 = num1.toString().split("");
  const digits2 = num2.toString().split("");
  const maxLength = Math.max(digits1.length, digits2.length);
  const [topValue, setTopValue] = useState("");
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");

  const handleClear = () => {
    setTopValue("");
    setResult1("");
    setResult2("");
    setResult3("");
  };
   const checkResult3 = () => {
    if(Number(digits1[1]) + Number(digits2[1])>=10){
if (result3 !== (Number(digits1[1]) + Number(digits2[1])).toString()[1]|| topValue !== (Number(digits1[1]) + Number(digits2[1])).toString()[0]) {
      toast.error(`الرقم ${topValue}${result3} خطأ`);
      setTopValue("");
      setResult3("");
    } else {
      toast.success(`الرقم ${topValue}${result3} صح`);
    }
    }else if(Number(digits1[1]) + Number(digits2[1])<10) {
    if (result3 !== (Number(digits1[1]) + Number(digits2[1])).toString()) {
      toast.error(`الرقم ${result3} خطأ`);
      setResult3("");
    } else {      
      toast.success(`الرقم ${result3} صح`);
    }
  }
  };
     const checkResult1$2 = () => {
      if(Number(digits1[1]) + Number(digits2[1])>=10){
        if(Number(digits1[0]) + Number(digits2[0])>=10){
      if (result1 !== (Number(digits1[0]) + Number(digits2[0])).toString()[0] || result2 !== (Number((Number(digits1[0]) + Number(digits2[0])).toString()[1])+Number(topValue)).toString()) {
      toast.error(`الرقم ${result1}${result2} خطأ`);
      setResult1("");
      setResult2("");
    } else {
      toast.success(`الرقم ${result1}${result2} صح`);
    } 
      }
      else {
        if(Number(digits1[0]) + Number(digits2[0])+Number(topValue)>=10){
        if (result1 !== (Number(digits1[0]) + Number(digits2[0])+Number(topValue)).toString()[0] || result2 !== (Number((Number(digits1[0]) + Number(digits2[0])+ Number(topValue)).toString()[1]))) {
      toast.error(`الرقم ${result1}${result2} خطأ`);
      setResult1("");
      setResult2("");
    } else {
      toast.success(`الرقم ${result1}${result2} صح`);
    }     
        }else {
  if (result2 !== (Number(digits1[0]) + Number(digits2[0])+Number(topValue)).toString()) {
      toast.error(`الرقم ${result2} خطأ`);
      setResult1("");
      setResult2("");
    } else {
      toast.success(`الرقم ${result2} صح`);
    } 
        }
      }
    }else if(Number(digits1[1]) + Number(digits2[1])<10){
              if(Number(digits1[0]) + Number(digits2[0])>=10){
    if (result1 !== (Number(digits1[0]) + Number(digits2[0])).toString()[0] || result2 !== (Number(digits1[0]) + Number(digits2[0])).toString()[1]) {
      toast.error(`الرقم ${result1}${result2} خطأ`);
      setResult1("");
      setResult2("");
    } else {
      toast.success(`الرقم ${result1}${result2} صح`);
    }
  }else { if (result2 !== (Number(digits1[0]) + Number(digits2[0])).toString()) {
      toast.error(`الرقم ${result2} خطأ`);
      setResult1("");
      setResult2("");
    } else {
      toast.success(`الرقم ${result2} صح`);
    } 
        }
}
  };
 useEffect(() => {
    if (Number(digits1[1]) + Number(digits2[1])>=10 && result3 && topValue) {
      checkResult3();
    }else if (Number(digits1[1]) + Number(digits2[1])<10 && result3){
      checkResult3()
    }
  }, [result3, topValue]);
  
     useEffect(() => {
      if(Number(digits1[1]) + Number(digits2[1])>=10 &&result1&&result2 && topValue) {
        checkResult1$2();
      } else if(Number(digits1[1]) + Number(digits2[1])<10 &&result1&&result2){
        checkResult1$2();
      }
    }, [result1 , result2 , topValue ]);


    console.log(result1 , (Number(digits1[0]) + Number(digits2[0])).toString()[0] , result2 , (Number((Number(digits1[0]) + Number(digits2[0])).toString()[1])+Number(topValue))) 
  return (
    <div className="long-op">
      {Number(digits1[1]) + Number(digits2[1]) >= 10 && (
        <div className="row">
          <input
            type="text"
            className="cell result"
            value={topValue}
            onChange={(e) => setTopValue(e.target.value)}
          />
          <p className="cell result"></p>
        </div>
      )}
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2[0] > digits1[0]
              ? digits2[i - (maxLength - digits1.length)] || ""
              : digits1[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <div className="operation">➕</div>
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2[0] > digits1[0]
              ? digits1[i - (maxLength - digits1.length)] || ""
              : digits2[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <hr />
      <div className="row">
        <input
          className="cell result"
          value={result1}
          onChange={(e) => {
          setResult1(e.target.value);
          }}
        />
        <input
          className="cell result"
          value={result2}
          onChange={(e) => {
            setResult2(e.target.value);
          }}
        />
        <input
          className="cell result"
          value={result3}
          onChange={(e) => {
            setResult3(e.target.value);
          }}
        />
        <p className="cell result"></p>
      </div>
      <button className="clearBTN" onClick={handleClear}>
        clear
      </button>
         <ToastContainer   position="bottom-center"
  style={{ bottom: "20%", transform: "translateY(-50%)" }}
 autoClose={1000} />
    </div>
  );
};

export default AdditionTool;
