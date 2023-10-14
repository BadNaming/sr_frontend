import styles from "./select-element.module.css";
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { getAdvPlatform } from '../../store/auth/selectors'
import {
  TYPE_FILTER_CAMPAIGN,
  TYPE_FILTER_GROUPING,
  TYPE_FILTER_OFFICES,
  TYPE_FILTER_DATA_REPORT,
  TYPE_FILTER_METRICS,
  TYPE_ICON_FILLED_HELP,
  TEXT_FILTER_DATA_REPORT,
  TEXT_FILTER_CAMPAIGN,
  TEXT_FILTER_GROUPING,
  TEXT_FILTER_OFFICES,
  TEXT_FILTER_DATA_START,
  TEXT_FILTER_DATA_FINISH,
  OFFICES,
  GROUPING,
  METRICS,
} from "../../utils/constants";
import IconInfo from "../icon-info/icon-info";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { set } from "date-fns";


const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const SelectElement = ({ type, handleSelect, data }) => {

  const advPlatforms = useSelector(getAdvPlatform)
  const [textTitle, setTextTitle] = useState("");
  const [menu, setMenu] = useState([]); //список всех вариантов для выбора
  const [personName, setPersonName] = useState([]); //список выбранных вариантов
  const [dates, setDates] = useState({
    startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  })
  const [campaigns, setCampaigns] = useState(data);
  const [renderMetric, setRenderMetric] = useState([]); //список выбранных метрик для отрисовки
  const [widthElement, setWidthElement] = useState("289px");

  useEffect(() => {
    if (advPlatforms) {
      setCampaigns(advPlatforms.map((item) => {
        return item.ad_plan_name
      }))
    }
  }, [advPlatforms])

  useEffect(() => {
    if (handleSelect && type === TYPE_FILTER_DATA_REPORT) {
      handleSelect(dates)
    }
  }, [dates])


  /** значение по ключу name из массива метрик  */
  const handleArrayMetrics = (arr) => {
    return arr.map((item) => item.name);
  };

  /** установить список метрик по умолчанию */
  const handleMetricsDefault = () => {
    const arr = METRICS.filter((item) => item.show_start === true);
    setPersonName(handleArrayMetrics(arr));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (type === TYPE_FILTER_METRICS) {
      handleSelect(value.map((item) => { return METRICS.find((metric) => metric.name === item).nameEn }))
    }
    if (type === TYPE_FILTER_CAMPAIGN) {
      handleSelect(value.map((item) => { return advPlatforms.find((platform) => platform.ad_plan_name === item).ad_plan_id }))
    }
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleStyleFilter = () => {
    switch (type) {
      case TYPE_FILTER_CAMPAIGN:
        setTextTitle(TEXT_FILTER_CAMPAIGN);
        setMenu(campaigns);
        setPersonName([]);
        break;
      case TYPE_FILTER_GROUPING:
        setTextTitle(TEXT_FILTER_GROUPING);
        setMenu(GROUPING);
        setPersonName([]);
        setWidthElement("186px");
        break;
      case TYPE_FILTER_OFFICES:
        setTextTitle(TEXT_FILTER_OFFICES);
        setMenu(OFFICES);
        setPersonName([]);
        break;
      case TYPE_FILTER_DATA_REPORT:
        setTextTitle(TEXT_FILTER_DATA_REPORT);
        setMenu("");
        setPersonName([]);
        break;
      case TYPE_FILTER_METRICS:
        setTextTitle("");
        setMenu(handleArrayMetrics(METRICS));
        handleMetricsDefault();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    handleStyleFilter();
  }, [type]);

  /** рендер списка метрик при изменении списка выбранных */
  useEffect(() => {
    type === TYPE_FILTER_METRICS &&
      setRenderMetric(personName.map((item) => { return METRICS.find((metric) => metric.name === item) }))
  }, [personName, type]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className={styles.content}>
        <article className={styles.container}>
          <h4 className={styles.title}>{textTitle}</h4>
          {menu ? (
            <div className={styles.menu}>
              <FormControl sx={{ width: `${widthElement}` }} size="small">
                <InputLabel id="demo-multiple-checkbox-label">{type}</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-select-small"
                  multiple
                  value={personName}
                  onChange={(e) => handleChange(e)}
                  input={<OutlinedInput label={type} />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {menu.map((item) =>
                    type !== TYPE_FILTER_GROUPING ? (
                      <MenuItem key={item} value={item}>
                        <Checkbox checked={personName.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                      </MenuItem>
                    ) : (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>
          ) : (
            <div className={styles.group_data}>
              <DatePicker
                disableFuture={true}
                label={TEXT_FILTER_DATA_START}
                value={dates.startDate}
                onChange={(date) => setDates({ ...dates, startDate: date })}
                slotProps={{ textField: { size: "small" } }}
                sx={{ width: 191 }}
              />
              <DatePicker
                label={TEXT_FILTER_DATA_FINISH}
                value={dates.endDate}
                onChange={(date) => setDates({ ...dates, endDate: date })}
                slotProps={{ textField: { size: "small" } }}
                sx={{ width: 191 }}
              />
            </div>
          )}
        </article>
        {type === TYPE_FILTER_METRICS &&
          renderMetric.map((item) => (
            <span key={item.name} className={styles.span}>
              {item.name}
              {item.text_info && (
                <IconInfo type={TYPE_ICON_FILLED_HELP} text={item.text_info} />
              )}
            </span>
          ))}
      </section>
    </LocalizationProvider>
  );
};

export default SelectElement;
