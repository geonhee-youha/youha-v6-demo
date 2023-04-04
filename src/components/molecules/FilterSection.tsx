import { Box, ButtonBase, Slider, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { ChangeEvent, useState } from "react";
import { FilterProps } from "../../constants";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";
import CheckItem from "./CheckItem";
import ChipItem from "./ChipItem";
import RadioItem from "./RadioItem";

export type FilterSectionProps = {
  show?: boolean;
  type: string;
  title: string;
  subtitle?: string;
  description?: string;
  value: string | any[];
  onChangeValue?: (value: string) => void;
  onChangeSlider?:
    | ((event: Event, value: number | number[], activeThumb: number) => void)
    | undefined;
  valueText?: React.ReactNode;
  valueTexts?: React.ReactNode[];
  max?: number;
  step?: number;
  link?: {
    title: string;
    onClick: (e: any) => void;
  };
  list?: FilterProps[];
};

export default function FilterSection({
  item,
  mobile,
}: {
  item: FilterSectionProps;
  mobile?: boolean;
}) {
  const {
    show,
    type,
    title,
    subtitle,
    description,
    value,
    onChangeValue,
    onChangeSlider,
    valueText,
    valueTexts,
    max,
    step,
    link,
    list,
  } = item;
  const mcn = title === "소속 MCN";
  const [inputValue, setInputValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  return show === false ? null : (
    <Box
      sx={{
        p: theme.spacing(2),
      }}
      className="FilterSection"
    >
      <Box
        sx={{
          display: "flex",
          "@media(max-width: 480px)": {
            display: "block",
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                m: theme.spacing(0, 1, 0, 0),
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: "24px",
                  fontWeight: "700",
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  sx={{
                    m: theme.spacing(0, 0, 0, 1),
                    fontSize: 14,
                    lineHeight: "24px",
                    color: youhaGrey[600],
                    display: "none",
                    "@media(max-width: 480px)": {
                      display: "flex",
                    },
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            {valueText && (
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "24px",
                  color: youhaBlue[500],
                }}
              >
                {valueText}
              </Typography>
            )}
          </Box>
          {description && (
            <Typography
              sx={{
                m: theme.spacing(0.5, 0, 1, 0),
                fontSize: 14,
                lineHeight: "16px",
                color: youhaGrey[600],
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {mcn && (
          <>
            <Input
              placeholder="찾으시는 MCN 이름을 입력하세요."
              inputValue={inputValue}
              onChange={onChange}
              sx={{
                p: theme.spacing(1, 0, 1, 0),
                display: "none",
                "@media(max-width: 480px)": {
                  display: "block",
                },
              }}
              searchIcon
            />
            <Input
              size="sm"
              placeholder="찾으시는 MCN 이름을 입력하세요."
              inputValue={inputValue}
              onChange={onChange}
              sx={{
                width: 240,
                p: theme.spacing(1, 0, 1, 0),
                "@media(max-width: 480px)": {
                  display: "none",
                },
              }}
              searchIcon
            />
          </>
        )}
      </Box>
      {typeof value === "string" || type === "array" ? (
        <Box
          sx={
            mcn
              ? {
                  p: theme.spacing(1, 0, 0, 0),
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gridAutoRows: "1fr",
                  gridTemplateRows: "auto auto",
                  "@media(max-width: 480px)": {
                    display: "flex",
                    flexWrap: "wrap",
                  },
                }
              : {
                  p: theme.spacing(1, 0, 0, 0),
                  "@media(max-width: 480px)": {
                    display: "flex",
                    flexWrap: "wrap",
                  },
                }
          }
        >
          {list &&
            list.map((item, index) => {
              const { title, value: itemValue } = item;
              const unFocused =
                !mcn || itemValue === ""
                  ? false
                  : inputValue !== "" && !title.includes(inputValue);
              const focused =
                typeof value === "string"
                  ? value === itemValue
                  : itemValue === ""
                  ? value.length === 0 ||
                    (value.length !== 0 && value[0] === "")
                  : value.includes(itemValue);
              const onClick = () => {
                if (onChangeValue !== undefined) onChangeValue(itemValue);
              };
              const newItem =
                !mcn || itemValue === ""
                  ? item
                  : {
                      ...item,
                      title: (
                        <>
                          {inputValue !== "" && title.includes(inputValue) ? (
                            <>
                              {title.split(inputValue)[0]}
                              <span style={{ color: pink[500] }}>
                                {inputValue}
                              </span>
                              {title.split(inputValue)[1]}
                            </>
                          ) : (
                            title
                          )}
                        </>
                      ),
                    };
              return mobile ? (
                <ChipItem
                  key={index}
                  unFocused={unFocused}
                  focused={focused}
                  item={newItem}
                  onClick={onClick}
                />
              ) : type === "radio" ? (
                <RadioItem
                  key={index}
                  unFocused={unFocused}
                  focused={focused}
                  item={newItem}
                  onClick={onClick}
                />
              ) : (
                <CheckItem
                  key={index}
                  unFocused={unFocused}
                  focused={focused}
                  item={newItem}
                  onClick={onClick}
                />
              );
            })}
        </Box>
      ) : (
        <Box
          sx={{
            m: theme.spacing(2, -0.5, 0, -0.5),
          }}
        >
          <Box
            sx={{
              height: 20,
              p: theme.spacing(0, 2, 0, 2),
            }}
          >
            <Slider
              value={value}
              onChange={onChangeSlider}
              max={max}
              step={step}
              sx={{
                height: 20,
                position: "relative",
                m: `0 !important`,
                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                "& .MuiSlider-rail": {
                  opacity: 1,
                  // backgroundColor: youhaBlue[500],
                  backgroundColor: youhaGrey[200],
                  height: 4,
                },
                "& .MuiSlider-track": {
                  height: 4,
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 20,
                  height: 20,
                  backgroundColor: "#ffffff",
                  boxShadow: `none !important`,
                  zIndex: 99,
                },
                "& .MuiSlider-thumb::before": {
                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                },
                "& .MuiSlider-valueLabel": {
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  p: theme.spacing(0.5, 1),
                  backgroundColor: youhaGrey[900],
                  "& *": {
                    background: "transparent",
                  },
                },
              }}
            />
          </Box>
          {valueTexts && (
            <Box
              sx={{
                width: "100%",
                position: "relative",
                height: 28,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 32,
                }}
              >
                <Box
                  sx={{
                    width: `1px`,
                    height: `6px`,
                    backgroundColor: youhaGrey[300],
                    m: theme.spacing(0, 0, 0.5, 0),
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: youhaGrey[500],
                  }}
                >
                  {valueTexts[0]}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: "translateX(-50%)",
                }}
              >
                <Box
                  sx={{
                    width: `1px`,
                    height: `6px`,
                    backgroundColor: youhaGrey[300],
                    m: theme.spacing(0, 0, 0.5, 0),
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: youhaGrey[500],
                  }}
                >
                  {valueTexts[1]}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 32,
                }}
              >
                <Box
                  sx={{
                    width: `1px`,
                    height: `6px`,
                    backgroundColor: youhaGrey[300],
                    m: theme.spacing(0, 0, 0.5, 0),
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: youhaGrey[500],
                  }}
                >
                  {valueTexts[2]}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {link && (
        <ButtonBase
          sx={{
            m: theme.spacing(1.5, 0, 0, 0),
            alignItems: "center",
          }}
          disableRipple
          onClick={link.onClick}
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaBlue[500],
            }}
          >
            {link.title}
          </Typography>
          <Icon
            size={16}
            name="chevron-right"
            color={youhaBlue[500]}
            sx={{
              m: theme.spacing(0, 0, 0, 0.25),
            }}
          />
        </ButtonBase>
      )}
    </Box>
  );
}
