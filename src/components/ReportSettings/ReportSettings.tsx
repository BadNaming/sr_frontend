import platformHint from '../../images/platformHint.png';

import { ChangeEvent, ChangeEventHandler, FocusEvent, useState } from 'react';

const ReportSettings = () => {
  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);
  const [isOfficesOpen, setIsOfficesOpen] = useState(false);
  const [isStartDateFocus, setIsStartDateFocus] = useState(false);
  const [isEndDateFocus, setIsEndDateFocus] = useState(false);
  const [officesChecks, setOfficesChecks] = useState<string[]>([]);
  const [campaignsChecks, setCampaignsChecks] = useState<string[]>([]);
  const [campaigns, setCampaings] = useState<string[]>([]);

  const handleFocusedDate = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.type = 'date';
    if (e.target.name === 'end-date') {
      setIsEndDateFocus(!isEndDateFocus);
    } else if (e.target.name === 'start-date') {
      setIsStartDateFocus(!isStartDateFocus);
    }
  }

  const handleBlurDate = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.type = 'text';
    if (e.target.name === 'end-date') {
      setIsEndDateFocus(!isEndDateFocus);
    } else if (e.target.name === 'start-date') {
      setIsStartDateFocus(!isStartDateFocus);
    }
  }

  const handleCampaignsCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      e.target.closest('.settings__checkbox-label')!.classList.add('settings__checkbox-label_type_checked');
      const newCampaignsChecks = [...campaignsChecks, e.target.value];
      setCampaignsChecks(newCampaignsChecks);
    } else {
      e.target.closest('.settings__checkbox-label')!.classList.remove('settings__checkbox-label_type_checked');
      const newCampaignsChecks = campaignsChecks.filter(campaign => campaign !== e.target.value);
      setCampaignsChecks(newCampaignsChecks);
    }
  }

  const handleOfficesCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      e.target.closest('.settings__checkbox-label')!.classList.add('settings__checkbox-label_type_checked');
      const newOfficesChecks = [...officesChecks, e.target.value];
      setCampaignsChecks(newOfficesChecks);
    } else {
      e.target.closest('.settings__checkbox-label')!.classList.remove('settings__checkbox-label_type_checked');
      const newOfficesChecks = officesChecks.filter(office => office !== e.target.value);
      setCampaignsChecks(newOfficesChecks);
    }
  }

  const handleChooseCampaign = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue: string = e.target.value;
    const isMetricInArr = campaigns.includes(selectValue);
    if (isMetricInArr) {
      return
    } else {
      setCampaings([...campaigns, selectValue]);
    }
  }

  return (
    <section className="section report-settings">
      <h1 className="report-settings__title page__title">
        Формирование отчета
      </h1>
      <div className="platform">
        <h2 className="platform__title page__subtitle">
          Подключите и выберите рекламную платформу
        </h2>
        <ul className="platform__cards page__list">
          <li className="platform__card">
            <div className="platform__container">
              <h3 className="platform__card-title page__subtitle_type_blue">
                ВКонтакте
              </h3>
              <img src={platformHint} alt="Подсказка" className="platform__card-image" />
            </div>
            <button className="platform__card-button page__button"></button>
          </li>
          <li className="platform__card">
            <div className="platform__container">
              <h3 className="platform__card-title page__subtitle_type_blue">
                MyTarget
              </h3>
              <img src={platformHint} alt="Подсказка" className="platform__card-image" />
            </div>
            <button className="platform__card-button page__button"></button>
          </li>
        </ul>
      </div>
      <form className="form settings">
        <div className="settings__container">
          <div className="settings__header">
            <div className="settings__label page__subtitle">
              Выберите кабинеты
              <div className="settings__details page__text_type_gray">
                <span className={`settings__details-hint ${isOfficesOpen ? 'settings__details-hint_type_active' : ''}`}>
                  Кабинеты
                </span>
                <button type='button' onClick={() => setIsOfficesOpen(!isOfficesOpen)} className={`settings__details-button page__text_type_gray settings__details-button_type_offices ${isOfficesOpen ? 'settings__details-button_type_active' : ''}`}>Кабинеты</button>
                <div className={`settings__checkboxes-container ${isOfficesOpen ? 'settings__checkboxes-container_type_visible' : ''}`}>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleOfficesCheck} name="offices" type="checkbox" className="settings__checkbox" />
                    Вебинар
                  </label>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleOfficesCheck} name="offices" type="checkbox" className="settings__checkbox" />
                    Промоакция
                  </label>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleOfficesCheck} name="offices" type="checkbox" className="settings__checkbox" />
                    Наружная реклама
                  </label>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleOfficesCheck} name="offices" type="checkbox" className="settings__checkbox" />
                    E-mail рассылки
                  </label>
                </div>
              </div>
            </div>
            <div className="settings__label page__subtitle">
              Выберите кампании
              <div className="settings__details page__text_type_gray">
                <span className={`settings__details-hint ${isCampaignsOpen ? 'settings__details-hint_type_active' : ''}`}>
                  Кампании
                </span>
                <button type='button' onClick={() => setIsCampaignsOpen(!isCampaignsOpen)} className={`settings__details-button page__text_type_gray settings__details-button_type_campaign ${isCampaignsOpen ? 'settings__details-button_type_active' : ''}`}>Кампании</button>
                <div className={`settings__checkboxes-container ${isCampaignsOpen ? 'settings__checkboxes-container_type_visible' : ''}`}>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleCampaignsCheck} name="campaigns" type="checkbox" className="settings__checkbox" />
                    Вебинар
                  </label>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleCampaignsCheck} name="campaigns" type="checkbox" className="settings__checkbox" />
                    Промоакция
                  </label>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleCampaignsCheck} name="campaigns" type="checkbox" className="settings__checkbox" />
                    Наружная реклама
                  </label>
                  <label className="settings__checkbox-label page__text_type_gray">
                    <input onChange={handleCampaignsCheck} name="campaigns" type="checkbox" className="settings__checkbox" />
                    E-mail рассылки
                  </label>
                </div>
              </div>
            </div>
            <label className="settings__label page__subtitle">
              Задайте период формирования отчёта
              <div className="settings__dates">
                <div className="settings__date-container">
                  <span className={`settings__date-hint ${isStartDateFocus ? 'settings__date-hint_type_active' : ''}`}>
                    Начало периода
                  </span>
                  <input onFocus={handleFocusedDate} onBlur={handleBlurDate} placeholder='Начало периода' type="text" className="settings__date page__text_type_gray" name='start-date' />
                </div>
                <div className="settings__date-container">
                  <span className={`settings__date-hint ${isEndDateFocus ? 'settings__date-hint_type_active' : ''}`}>
                    Конец периода
                  </span>
                  <input onFocus={handleFocusedDate} onBlur={handleBlurDate} placeholder='Конец периода' type="text" className="settings__date page__text_type_gray" name='end-date' />
                </div>
              </div>
            </label>
            <label className="settings__label page__subtitle">
              Тип группировки
              <select className="settings__select page__text_type_gray">
                <option className="settings__select-option page__text" value="За всё время">За всё время</option>
                <option className="settings__select-option page__text" value="Выбор 2">Выбор 2</option>
              </select>
            </label>
          </div>
          <div className="settings__footer">
            <div className="settings__footer-container">
              <h3 className="settings__title page__subtitle">
                Выберите метрики в том порядке, в каком они должны отобразиться в отчёте
              </h3>
              <label className="settings__footer-label">
                <input type="checkbox" className="settings__footer-checkbox" />
                Добавить разбивку по объявлениям
              </label>
            </div>
            <div className="settings__metrics">
              <div className="settings__metric page__text_type_gray">
                <h4 className="settings__metric-title page__text_type_gray">
                  Кампания
                </h4>
              </div>
              <>
                {
                  campaigns.map((campaign) => {
                    return (
                    <div className="settings__metric page__text_type_gray">
                      <h5 className="page__text_type_gray settings__metric-name">
                        {campaign}
                      </h5>
                    </div>
                    )
                  })
                }
              </>
              <label className="settings__metrics-container">
                <select onChange={handleChooseCampaign} className="settings__add-metrics">
                  <option value="Кампания" className="settings__add-metric">
                    Кампания
                  </option>
                  <option value="Клики" className="settings__add-metric">
                    Клики
                  </option>
                  <option value="CTR" className="settings__add-metric">
                    CTR
                  </option>
                  <option value="CPC" className="settings__add-metric">
                    CPC
                  </option>
                  <option value="CR% Подписчики" className="settings__add-metric">
                    CR% Подписчики
                  </option>
                  <option value="CPF" className="settings__add-metric">
                    CPF
                  </option>
                  <option value="Лиды" className="settings__add-metric">
                    Лиды
                  </option>
                  <option value="CR% Лиды" className="settings__add-metric">
                    CR% Лиды
                  </option>
                  <option value="CPL" className="settings__add-metric">
                    CPL
                  </option>
                  <option value="Потрачено" className="settings__add-metric">
                    Потрачено
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="settings__buttons">
          <button type="button" className="settings__button page__button settings__button_type_disabled">Перейти к отчёту</button>
          <button type="button" className="settings__button page__button">Сформировать отчёт</button>
        </div>
      </form>
    </section>
  )
};

export default ReportSettings;