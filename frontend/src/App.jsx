import { Routes, Route } from "react-router-dom";
import Example_AGreaterThan1 from "./components/Math/QuadraticEquation/Example_AGreaterThan1";
import Example_AEquals1 from "./components/Math/QuadraticEquation/Example_AEquals1";
import Example_DiffSquares from "./components/Math/QuadraticEquation/Example_DiffSquares";
import Questions_DiffSquares from "./components/Math/QuadraticEquation/Questions_DiffSquares";
import Questions_AEquals1 from "./components/Math/QuadraticEquation/Questions_AEquals1";
import Questions_AGreaterThan1 from "./components/Math/QuadraticEquation/Questions_AGreaterThan1";
import LinearEquation from "./components/Math/LinearEquation/LinerEquation";
import Example_AddSub from "./components/Math/LinearEquation/Example_AddSub";
import Example_FracMult from "./components/Math/LinearEquation/Example_FracMult";
import Example_Multi from "./components/Math/LinearEquation/Example_Multi";
import Example_Div from "./components/Math/LinearEquation/Example_Div";
import Example_Combined from "./components/Math/LinearEquation/Example_Combined";
import Questions_AddSub from "./components/Math/LinearEquation/Questions_AddSub";
import Questions_Divide from "./components/Math/LinearEquation/Questions_Divide";
import Questions_Multiply from "./components/Math/LinearEquation/Questions_Multiply";
import Questions_FractionMultiply from "./components/Math/LinearEquation/Questions_FractionMultiply";
import Questions_Multi from "./components/Math/LinearEquation/Questions_Multi";
import QuadraticEquation from "./components/Math/QuadraticEquation/QuadraticEquation";
import MathTickets from "./components/Math/MathTickets";
import ArabicTickets from "./components/Arabic/ArabicTickets";
import PhysicsTickets from "./components/Physics/physicsTickets";
import ChemistryTickets from "./components/Chemistry/ChemistryTickets";
import Example_Rect from "./components/Math/Areas/Example_Rect";
import Example_Circle from "./components/Math/Areas/Example_Circle";
import Example_Triangle from "./components/Math/Areas/Example_Triangle";
import Example_Trapezoid from "./components/Math/Areas/Example_Trapezoid";
import Questions_Rect from "./components/Math/Areas/Questions_Rect";
import Questions_Triangle from "./components/Math/Areas/Questions_Triangle";
import Questions_Trapezoid from "./components/Math/Areas/Questions_Trapezoid";
import Questions_Circle from "./components/Math/Areas/Questions_Circle";
import PhysicsQuantities from "./components/Physics/PhysicsQuantities/PhysicsQuantities";
import Questions_Acceleration from "./components/Physics/PhysicsQuantities/Questions_Acceleration";
import Questions_Density from "./components/Physics/PhysicsQuantities/Questions_Density";
import Questions_Weight from "./components/Physics/PhysicsQuantities/Questions_Weight";
import Questions_Volume from "./components/Physics/PhysicsQuantities/Questions_Volume";
import Questions_Speed from "./components/Physics/PhysicsQuantities/Questions_Speed";
import Questions_Mass from "./components/Physics/PhysicsQuantities/Questions_Mass";
import Example_Weight from "./components/Physics/PhysicsQuantities/Example_Weight";
import Example_Volume from "./components/Physics/PhysicsQuantities/Example_Volume";
import Example_Speed from "./components/Physics/PhysicsQuantities/Example_Speed";
import Example_Mass from "./components/Physics/PhysicsQuantities/Example_Mass";
import Example_Density from "./components/Physics/PhysicsQuantities/Example_Density";
import Example_Acceleration from "./components/Physics/PhysicsQuantities/Example_Acceleration";
import NewtonsLaws from "./components/Physics/NewtonsLaws/NewtonsLaws";
import Example_FirstLaw from "./components/Physics/NewtonsLaws/Example_FirstLaw";
import Example_SecondLaw from "./components/Physics/NewtonsLaws/Example_SecondLaw";
import Example_ThirdLaw from "./components/Physics/NewtonsLaws/Example_ThirdLaw";
import Questions_ThirdLaw from "./components/Physics/NewtonsLaws/Questions_ThirdLaw";
import Questions_SecondLaw from "./components/Physics/NewtonsLaws/Questions_SecondLaw";
import Questions_FirstLaw from "./components/Physics/NewtonsLaws/Questions_FirstLaw";
import Areas from "./components/Math/Areas/Areas";
import VictorsTickets from "./components/physics/Vectors/VictorsTickets";

import Questions_VerticalComponent from "./components/physics/Vectors/Questions_VerticalComponent";
import Questions_ResultantComponent from "./components/physics/Vectors/Questions_ResultantComponent";
import Questions_HorizantalComponent from "./components/physics/Vectors/Questions_HorizantalComponent";
import Example_VerticalComponent from "./components/physics/Vectors/Example_VerticalComponent";
import Example_ResultantComponent from "./components/physics/Vectors/Example_ResultantComponent";
import Example_HorizantalComponent from "./components/physics/Vectors/Example_HorizantalComponent";



import FrontPage from "./components/frontPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      {/* */}
      <Route path="/vectors" element={<VictorsTickets />} />
      <Route path="/questionsVerticalComponent" element={<Questions_VerticalComponent />} />
      <Route path="/questionsResultantComponent" element={<Questions_ResultantComponent />} />
      <Route path="/questionsHorizantalComponent" element={<Questions_HorizantalComponent />} />
      <Route path="/exampleVerticalComponent" element={<Example_VerticalComponent />} />
      <Route path="/exampleResultantComponent" element={<Example_ResultantComponent />} />
      <Route path="/exampleHorizantalComponent" element={<Example_HorizantalComponent />} />

      {/* */}
      <Route path="/newtonsLaws" element={<NewtonsLaws />} />
      <Route path="/exampleFirstLaw" element={<Example_FirstLaw />} />
      <Route path="/exampleSecondLaw" element={<Example_SecondLaw />} />
      <Route path="/exampleThirdLaw" element={<Example_ThirdLaw />} />
      <Route path="/questionsThirdLaw" element={<Questions_ThirdLaw />} />
      <Route path="/questionsSecondLaw" element={<Questions_SecondLaw />} />
      <Route path="/questionsFirstLaw" element={<Questions_FirstLaw />} />

      {/* */}
      <Route path="/physicsQuantities" element={<PhysicsQuantities />} />
      <Route
        path="/questionsAcceleration"
        element={<Questions_Acceleration />}
      />
      <Route path="/questionsDensity" element={<Questions_Density />} />
      <Route path="/questionsWeight" element={<Questions_Weight />} />
      <Route path="/questionsVolume" element={<Questions_Volume />} />
      <Route path="/questionsSpeed" element={<Questions_Speed />} />
      <Route path="/questionsMass" element={<Questions_Mass />} />
      <Route path="/exampleWeight" element={<Example_Weight />} />
      <Route path="/exampleVolume" element={<Example_Volume />} />
      <Route path="/exampleSpeed" element={<Example_Speed />} />
      <Route path="/exampleMass" element={<Example_Mass />} />
      <Route path="/exampleDensity" element={<Example_Density />} />
      <Route path="/exampleAcceleration" element={<Example_Acceleration />} />
      {/* */}
      <Route path="/areas" element={<Areas />} />
      <Route path="/questionsRect" element={<Questions_Rect />} />
      <Route path="/questionsTriangle" element={<Questions_Triangle />} />
      <Route path="/questionsTrapezoid" element={<Questions_Trapezoid />} />
      <Route path="/questionsCircle" element={<Questions_Circle />} />
      <Route path="/exampleRect" element={<Example_Rect />} />
      <Route path="/exampleTriangle" element={<Example_Triangle />} />
      <Route path="/exampleTrapezoid" element={<Example_Trapezoid />} />
      <Route path="/exampleCircle" element={<Example_Circle />} />
      {/* */}
      <Route path="/linearEquation" element={<LinearEquation />} />
      <Route path="/exampleDiv" element={<Example_Div />} />
      <Route path="/exampleAddSub" element={<Example_AddSub />} />
      <Route path="/exampleMulti" element={<Example_Multi />} />
      <Route path="/exampleFracMult" element={<Example_FracMult />} />
      <Route path="/exampleCombined" element={<Example_Combined />} />
      <Route path="/questionsAddSub" element={<Questions_AddSub />} />
      <Route path="/questionsDivide" element={<Questions_Divide />} />
      <Route path="/questionsMultiply" element={<Questions_Multiply />} />
      <Route
        path="/questionsFractionMultiply"
        element={<Questions_FractionMultiply />}
      />
      <Route path="/questionsMulti" element={<Questions_Multi />} />

      {/* */}
      <Route path="/exampleAGreaterThan1" element={<Example_AGreaterThan1 />} />
      <Route path="/exampleAEquals1" element={<Example_AEquals1 />} />
      <Route path="/exampleDiffSquares" element={<Example_DiffSquares />} />
      <Route path="/questionsDiffSquares" element={<Questions_DiffSquares />} />
      <Route
        path="/questionsAGreaterThan1"
        element={<Questions_AGreaterThan1 />}
      />
      <Route path="/questionsAEquals1" element={<Questions_AEquals1 />} />
      <Route path="/quadraticEquation" element={<QuadraticEquation />} />

      {/* */}
      <Route path="/mathtickets" element={<MathTickets />} />
      <Route path="/arabicTickets" element={<ArabicTickets />} />
      <Route path="/physicsTickets" element={<PhysicsTickets />} />
      <Route path="/chemistryTickets" element={<ChemistryTickets />} />
    </Routes>
  );
}

export default App;
