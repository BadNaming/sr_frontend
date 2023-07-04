import React from 'react'
import SelectInput from '../../pages/cabinet/select'
import styles from './sorting_modal.module.css'

const SortingModal = ({ isVisible, onChange, leftPosition, width }) => {
  if (isVisible) {
    return (
      <div
        className={styles.report_modal}
        style={{ left: leftPosition, width }}
      >
        <SelectInput onChange={onChange} />
      </div>
    )
  }
  return null
}
export default SortingModal
