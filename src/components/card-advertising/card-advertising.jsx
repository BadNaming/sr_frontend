import IconInfo from '../icon-info/icon-info'
import ButtonElement from '../button-element/button-element'
import styles from './card-advertising.module.css'
import {
  TYPE_ICON_FILLED,
  TYPE_BTN_ADD,
  PATH_CABINET
} from '../../utils/constants'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addAdvPlatform } from '../../store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isAdvCabinetSuccess, getAdvPlatform } from '../../store/auth/selectors'

const CardAdvertising = ({ card }) => {
  const [typeBtn] = useState(TYPE_BTN_ADD);
  const [classCard, setClassCard] = useState(`${styles.card}`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdvCabinet = useSelector(isAdvCabinetSuccess);
  const AdvPlatform = useSelector(getAdvPlatform)

  useEffect(() => {
    if (AdvPlatform && isAdvCabinet) {
      card.company_id === AdvPlatform.company_id ? setClassCard(`${styles.card_hidden}`) : setClassCard(`${styles.card}`)
    } else {
      setClassCard(`${styles.card}`)
    }
  }, [AdvPlatform, isAdvCabinet, card.company_id])

  /** перейти в личный кабинет */
  const handleRedirectCabinet = useCallback((e) => {
    setClassCard(`${styles.card_hidden}`)
    navigate(PATH_CABINET);
    dispatch(addAdvPlatform(card))
  }, [])

  return (
    <>
      <article className={classCard}>
        <div className={styles.caption}>
          <h3 className={styles.title}>{card.company}</h3>
          <IconInfo type={TYPE_ICON_FILLED} />
        </div>
        <ButtonElement type={typeBtn} onClick={handleRedirectCabinet} />
      </article>
    </>
  )
}

export default CardAdvertising
