import { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  FormGroup,
  Grid,
  Alert,
} from "@mui/material";
import CopyButton from "../../../common/components/CopyButton";
import { DAY_LABELS } from "../const";
import { generateCron } from "../utils/cron-generator";
import type { Frequency } from "../types";


// Cron式生成コンポーネント
const CronGenerator = () => {
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [dayOfWeek, setDayOfWeek] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: false,
    sunday: false,
  });
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [customCron, setCustomCron] = useState("");

  // 実行頻度変更処理
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(e.target.value as Frequency);
  };

  // 曜日選択変更処理
  const handleDayOfWeekChange = (day: keyof typeof dayOfWeek) => {
    setDayOfWeek((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  // Cron式生成処理
  const result = useMemo(() => {
    return generateCron({
      frequency,
      hour,
      minute,
      dayOfWeek,
      dayOfMonth,
      customCron,
    });
  }, [frequency, hour, minute, dayOfWeek, dayOfMonth, customCron]);

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        {/* 実行頻度の選択 */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            実行頻度を選択
          </Typography>
          <RadioGroup value={frequency} onChange={handleFrequencyChange}>
            <FormControlLabel
              value="every-minute"
              control={<Radio />}
              label="毎分"
            />
            <FormControlLabel value="hourly" control={<Radio />} label="毎時" />
            <FormControlLabel value="daily" control={<Radio />} label="毎日" />
            <FormControlLabel value="weekly" control={<Radio />} label="毎週" />
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label="毎月"
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="カスタム"
            />
          </RadioGroup>
        </Paper>

        {/* 詳細設定 */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            詳細設定
          </Typography>

          {/* 毎時 */}
          {frequency === "hourly" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">毎時</Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 59 }}
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                sx={{ width: 60 }}
                size="small"
              />
              <Typography variant="body2">分に実行</Typography>
            </Box>
          )}

          {/* 毎日 */}
          {frequency === "daily" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">毎日</Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 23 }}
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                sx={{ width: 60 }}
                size="small"
              />
              <Typography variant="body2">時</Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 59 }}
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                sx={{ width: 60 }}
                size="small"
              />
              <Typography variant="body2">分に実行</Typography>
            </Box>
          )}

          {/* 毎週 */}
          {frequency === "weekly" && (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                毎週:
              </Typography>
              <FormGroup row sx={{ mb: 2, justifyContent: "center" }}>
                {(Object.keys(dayOfWeek) as Array<keyof typeof dayOfWeek>).map(
                  (day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={dayOfWeek[day]}
                          onChange={() => handleDayOfWeekChange(day)}
                        />
                      }
                      label={DAY_LABELS[day]}
                    />
                  )
                )}
              </FormGroup>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <TextField
                  type="number"
                  inputProps={{ min: 0, max: 23 }}
                  value={hour}
                  onChange={(e) => setHour(Number(e.target.value))}
                  sx={{ width: 60 }}
                  size="small"
                />
                <Typography variant="body2">時</Typography>
                <TextField
                  type="number"
                  inputProps={{ min: 0, max: 59 }}
                  value={minute}
                  onChange={(e) => setMinute(Number(e.target.value))}
                  sx={{ width: 60 }}
                  size="small"
                />
                <Typography variant="body2">分</Typography>
              </Box>
            </Box>
          )}

          {/* 毎月 */}
          {frequency === "monthly" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">毎月</Typography>
              <TextField
                type="number"
                inputProps={{ min: 1, max: 31 }}
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(Number(e.target.value))}
                sx={{ width: 60 }}
                size="small"
              />
              <Typography variant="body2">日</Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 23 }}
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                sx={{ width: 60 }}
                size="small"
              />
              <Typography variant="body2">時</Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 59 }}
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                sx={{ width: 60 }}
                size="small"
              />
              <Typography variant="body2">分</Typography>
            </Box>
          )}

          {/* 毎分 */}
          {frequency === "every-minute" && (
            <Typography variant="body2" color="text.secondary">
              毎分実行されます（設定なし）
            </Typography>
          )}

          {/* カスタム */}
          {frequency === "custom" && (
            <TextField
              fullWidth
              placeholder="Cron式を入力（例：0 0 * * *）"
              value={customCron}
              onChange={(e) => setCustomCron(e.target.value)}
              variant="outlined"
            />
          )}
        </Paper>

        {/* 生成されたCron式 */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            生成された Cron式
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 9 }}>
              <TextField
                fullWidth
                value={result.ok ? result.value.cron : ""}
                variant="outlined"
                inputProps={{ readOnly: true }}
                sx={{ fontFamily: "monospace" }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <CopyButton text={result.ok ? result.value.cron : ""} />
            </Grid>
          </Grid>

          {/* 実行タイミングの説明 */}
          {result.ok ? (
            <Box sx={{ p: 2, borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {result.value.description}
              </Typography>
            </Box>
          ) : (
            /* エラーメッセージ表示 */
            <Alert severity="error">{result.error}</Alert>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CronGenerator;
