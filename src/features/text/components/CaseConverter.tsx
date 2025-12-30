import { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import CopyButton from "../../../common/components/CopyButton";
import {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
  toConstantCase,
  toDotCase,
  toPathCase,
} from "../utils/case-converter";

// 命名規則変換コンポーネント
const CaseConverter = () => {
  const [text, setText] = useState("");

  const cases = [
    { name: "キャメルケース", convert: toCamelCase, key: "camelCase" },
    { name: "スネークケース", convert: toSnakeCase, key: "snake_case" },
    { name: "ケバブケース", convert: toKebabCase, key: "kebab-case" },
    { name: "パスカルケース", convert: toPascalCase, key: "PascalCase" },
    {
      name: "コンスタントケース",
      convert: toConstantCase,
      key: "CONSTANT_CASE",
    },
    { name: "ドットケース", convert: toDotCase, key: "dot.case" },
    { name: "パスケース", convert: toPathCase, key: "path/case" },
  ];

  return (
    <Container maxWidth="md">
      {/* 入力エリア */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={8}
          placeholder="ここにテキストを入力してください..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "16px",
            },
          }}
        />
      </Box>

      {/* 変換結果表示 */}
      <Grid container spacing={2}>
        {cases.map(({ name, convert, key }) => {
          const result = text ? convert(text) : "";
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  color="textSecondary"
                  variant="caption"
                  display="block"
                >
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, mb: 1, wordBreak: "break-all", flexGrow: 1 }}
                >
                  {result || "入力してください"}
                </Typography>
                {result && <CopyButton text={result} small={true} />}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CaseConverter;
