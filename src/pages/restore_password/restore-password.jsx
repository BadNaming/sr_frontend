import globalStyles from '../../components/global-styles.module.css';
import InputElement from '../../components/input-element/input-element';
import ButtonElement from '../../components/button-element/button-element';
import { TYPE_INPUT_EMAIL, TYPE_BTN_RESTORE } from '../../utils/constants';
import { useState } from 'react';

const RestorePassword = () => {

  const handleRestorePassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className={globalStyles.form} onClick={handleRestorePassword}>
        <fieldset className={globalStyles.fieldset}>
          <InputElement type={TYPE_INPUT_EMAIL} />
        </fieldset>
        <ButtonElement type={TYPE_BTN_RESTORE}/>
      </form>
    </>
  )
};

export default RestorePassword;
