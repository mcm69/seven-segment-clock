import Digit from "./Digit";

const Number = (props) => (
  <span>
    {Array.from(props.value).map((n, i) => (
      <Digit key={i} value={n} animate={props.animate} />
    ))}
  </span>
);

export default Number;
