import styles from "./Container.module.css";

export default function Container(props) {
  const containerStyle = {
    paddingTop: props.pt || props.py,
    paddingBottom: props.pb || props.py,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my,
  };
  return (
    <div
      className={`col-11 mx-auto m-0 ${props.className} ${styles.container} `}
      style={containerStyle}
    >
      {props.children}
    </div>
  );
}
