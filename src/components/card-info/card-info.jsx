import styles from './card-info.module.css';

const CardInfo = ({card}) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{card.title}</h2>
      <p className={styles.subtitle}>{card.subtitle}</p>
    </article>
  )
};

export default CardInfo;
