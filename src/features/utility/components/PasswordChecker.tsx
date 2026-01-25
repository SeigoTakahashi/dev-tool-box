import { useState } from "react";
import {
  TextField,
  LinearProgress,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import zxcvbn from "zxcvbn";

// パスワード強度チェッカーコンポーネント
const PasswordChecker = () => {
  const [password, setPassword] = useState("");

  // zxcvbnでパスワードを評価
  const result = zxcvbn(password);

  // スコアに応じた色とラベルの定義
  const getScoreConfig = (score: number) => {
    switch (score) {
      case 0:
        return { color: "error", label: "非常に弱い", val: 10 };
      case 1:
        return { color: "error", label: "弱い", val: 25 };
      case 2:
        return { color: "warning", label: "やや弱い", val: 50 };
      case 3:
        return { color: "info", label: "普通", val: 75 };
      case 4:
        return { color: "success", label: "強い", val: 100 };
      default:
        return { color: "inherit", label: "", val: 0 };
    }
  };

  const config = getScoreConfig(result.score);

  return (
    <Box className="max-w-md p-6 space-y-4 mx-auto">
      <TextField
        fullWidth
        type="password"
        label="パスワード"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        focused
      />

      {password && (
        <div className="space-y-3 transition-all duration-500 mt-3">
          {/* 強度ゲージ */}
          <Box className="flex items-center gap-4">
            <Box className="flex-1">
              <LinearProgress
                variant="determinate"
                value={config.val}
                color={config.color as
                  | "primary"
                  | "secondary"
                  | "error"
                  | "info"
                  | "success"
                  | "warning"
                }
                sx={{ height: 10, borderRadius: 5 }}
                className="h-2 rounded-full"
              />
            </Box>
            <Typography variant="body2" className="font-bold min-w-[70px]">
              {config.label}
            </Typography>
          </Box>

          {/* クラック時間 (オンライン攻撃の目安) */}
          <Box className="flex items-center gap-2">
            <Typography variant="caption" color="textSecondary">
              推定解読時間:
            </Typography>
            <Chip
              label={
                result.crack_times_display.online_no_throttling_10_per_second
              }
              size="small"
              variant="outlined"
            />
          </Box>
        </div>
      )}
    </Box>
  );
};

export default PasswordChecker;
