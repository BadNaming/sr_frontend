import React, { useState } from 'react'
import styles from './select.module.css'

const SelectInput = ({ onChange }) => {
  const [chosen, setChosen] = useState(null)

  const handleSelectionChange = (value) => {
    setChosen(value)
    onChange(value)
  }

  return (
    <div className={styles.sorting_container}>
      <div
        className={styles.sorting_item}
        onClick={() => handleSelectionChange('DESC')}
      >
        <div className={styles.icon_container}>
          <div className={styles.north}></div>
        </div>
        <div>По убыванию</div>
      </div>
      <div
        className={styles.sorting_item}
        onClick={() => handleSelectionChange('ASC')}
      >
        <div className={styles.icon_container}>
          <div className={styles.south}></div>
        </div>
        <div>По возрастанию</div>
      </div>
      <div
        className={styles.sorting_item}
        onClick={() => handleSelectionChange(null)}
      >
        <div className={styles.icon_container}></div>
        <div>Без сортировки</div>
      </div>
    </div>
  )
}

export default SelectInput
