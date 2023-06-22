import React, { useState } from 'react'
import styles from './select.module.css'

const SelectInput = ({ visible, onChange }) => {
  const [chosen, setChosen] = useState(null)
  if (visible) {
    return (
      <div className={styles.sorting_container}>
        <div
          onClick={() => {
            setChosen('DESC')
            onChange(chosen)
          }}
        >
          По убыванию
        </div>
        <div
          onClick={() => {
            setChosen('ASC')
            onChange(chosen)
          }}
        >
          По возрастанию
        </div>
        <div
          onClick={() => {
            setChosen(null)
            onChange(chosen)
          }}
        >
          Без сортировки
        </div>
      </div>
    )
  }
  return null
}

export default SelectInput
