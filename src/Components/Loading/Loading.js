import styles from './Loading.module.css';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Loading({ loading }) {
  return (
    <div className={styles.container}>
      <ScaleLoader
        color="black"
        height={35}
        width={10}
        radius={2}
        margin={2}
        loading={loading}
        speedMultiplier={1}
      />
    </div>
  );
}
