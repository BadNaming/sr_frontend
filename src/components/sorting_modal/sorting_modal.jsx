import React from 'react'
import SelectInput from '../../pages/cabinet/select'
import styles from './sorting_modal.module.css'

const SortingModal = ({ onChange, column, isSortingVisible }) => {
  if (column === isSortingVisible) {
    return (
      <div className={styles.report_modal}>
        <SelectInput onChange={onChange} />
      </div>
    )
  }
  return null
}
export default SortingModal;
