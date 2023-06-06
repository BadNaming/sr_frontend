import styles from './card-info.module.css';

const CardInfo = ({card}) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.subtitle}>{card.subtitle}</p>
    </article>
  )
};

export default CardInfo;
