import { useEffect, useState } from "react";
import "./LongOperation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SubtractionTool = ({ num1, num2 }) => {
  const digits1 = num1.toString().split("");
  const digits2 = num2.toString().split("");
  const maxLength = Math.max(digits1.length, digits2.length);
  const [topValue1, setTopValue1] = useState("");
  const [topValue2, setTopValue2] = useState("");
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const biggerNum = Math.max(num1,num2);
  const smallerNum = Math.min(num1,num2)
  const handleClear = () => {
    setTopValue1("");
    setTopValue2("")
    setResult1("");
    setResult2("");
    setResult3("");
  };


     const checkResult3 = () => {
    if(biggerNum.toString()[1] >= smallerNum.toString()[1]){
if (result3 !== (Number(biggerNum.toString()[1]) - Number(smallerNum.toString()[1])).toString()) {
      toast.error(`الرقم ${result3} خطأ`);
      setResult3("");
    } else {
      toast.success(`الرقم ${result3} صح`);
    }
    }else if(biggerNum.toString()[1] < smallerNum.toString()[1]){
    if (Number(result3) !== Number(biggerNum.toString()[1])+10 -Number(smallerNum.toString()[1]) ) {
      toast.error(`الرقم ${result3} خطأ`);
      setResult3("");
    } else {      
      toast.success(`الرقم ${result3} صح`);
    }
  }
  };

    const checkResult2 = () => {
    if(biggerNum.toString()[1] >= smallerNum.toString()[1]){
if (result2 !== (Number(biggerNum.toString()[0]) - Number(smallerNum.toString()[0])).toString()) {
      toast.error(`الرقم ${result2} خطأ`);
      setResult2("");
    } else {
      toast.success(`الرقم ${result2} صح`);
    }
    }else if(biggerNum.toString()[1] < smallerNum.toString()[1]) {
    if (Number(result2) !== (Number(biggerNum.toString()[0])-1 - Number(smallerNum.toString()[0]))) {
      toast.error(`الرقم ${result2} خطأ`);
      setResult2("");
    } else {      
      toast.success(`الرقم ${result2} صح`);
    }
  }
  };
   useEffect(() => {
    if ( biggerNum.toString()[1] >= smallerNum.toString()[1] && result3) {
      checkResult3();
    }else {
       if ( biggerNum.toString()[1] < smallerNum.toString()[1] && result3 && topValue2){
        checkResult3()  
       }
    }
  }, [result3 , topValue2]);

   useEffect(() => {
    if ( biggerNum.toString()[1] >= smallerNum.toString()[1] && result2) {
      checkResult2();
    }else {
       if ( biggerNum.toString()[1] < smallerNum.toString()[1] && result2 && topValue1){
        checkResult2()  
       }
    }
  }, [result2]);

  console.log( Number(biggerNum.toString()[1])+10 -Number(smallerNum.toString()[1]));
  
  return (
    <div className="long-op">
      {digits1[0]>digits2[0] && digits1[1] < digits2[1] && (
        <div className="row">
          <input
            type="text"
            className="cell result"
            value={topValue1}
            onChange={(e) => setTopValue1(e.target.value)}
          />
          <input
            type="text"
            className="cell result"
            value={topValue2}
            onChange={(e) => setTopValue2(e.target.value)}
          />{" "}
        </div>
      )}
      {digits2[0]>digits1[0] && digits2[1] < digits1[1] && (
        <div className="row">
          <input
            type="text"
            className="cell result"
            value={topValue1}
            onChange={(e) => setTopValue1(e.target.value)}
          />
          <input
            type="text"
            className="cell result"
            value={topValue2}
            onChange={(e) => setTopValue2(e.target.value)}
          />{" "}
        </div>
      )}
      <div style={Number(topValue1)>0 || Number (topValue2)>0  ?{"textDecoration":"line-through"}: {} } className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2[0] >= digits1[0]
              ? digits2[i - (maxLength - digits1.length)] || ""
              : digits1[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <div className="operation">➖</div>
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
        disabled
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

export default SubtractionTool;
