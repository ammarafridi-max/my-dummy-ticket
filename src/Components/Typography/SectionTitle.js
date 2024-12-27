import styles from './SectionTitle.module.css';

export default function SectionTitle({
  subtitle,
  children,
  textAlign = 'left',
  fontSize,
  color = 'black',
  textTransform = 'capitalize',
  fontWeight = '500',
  pt,
  pb,
  py,
  pl,
  pr,
  px,
  mt,
  mb,
  my,
  type,
}) {
  const divStyling = {
    paddingTop: pt || py,
    paddingBottom: pb || py,
    paddingLeft: pl || px,
    paddingRight: pr || px,
    marginTop: mt || my,
    marginBottom: mb || my,
  };

  const titleStyle = {
    textAlign: textAlign,
    textTransform: textTransform,
    fontWeight: fontWeight,
    fontSize:
      fontSize === 'xlarge'
        ? '40px'
        : fontSize === 'large'
        ? '36px'
        : fontSize === 'small'
        ? '28px'
        : fontSize === 'xsmall'
        ? '24px'
        : fontSize === 'xxsmall'
        ? '1.25rem'
        : '36px',
    color: color,
  };

  return (
    <div className={styles.container} style={divStyling}>
      {subtitle && (
        <p
          className={`${styles.subtitle} ${type === 'secondary' && styles.secondary}`}
          style={{ textAlign: textAlign }}
        >
          {subtitle}
        </p>
      )}
      <h2
        style={titleStyle}
        className={`${styles.title} ${type === 'secondary' && styles.secondary}`}
      >
        {children}
      </h2>
    </div>
  );
}
