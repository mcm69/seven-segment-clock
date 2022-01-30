import "./styles.css";
import Number from "./Number";
import Clock from "./Clock";

export default function App() {
  return (
    <div className="App">
      <Clock />
      <Number value="0123456789" />
    </div>
  );
}
