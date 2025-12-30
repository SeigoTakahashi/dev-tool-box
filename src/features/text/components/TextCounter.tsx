import { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import CopyButton from "../../../common/components/CopyButton";
import ClearButton from "../../../common/components/ClearButton";

import {
  charCounter,
  charCounterWithoutNewlines,
  charCounterNoSpace,
  lineCounter,
  utf8ByteCounter,
  utf16ByteCounter,
} from "../utils/text-counter";

// テキストカウンターコンポーネント
const TextCounter = () => {
  const [text, setText] = useState("");

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={12}
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
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: "flex", justifyContent: "center", mb: 4 }}
      >
        <CopyButton text={text} />
        <ClearButton handleClear={() => setText("")} disabled={!text} />
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary" variant="caption" display="block">
              文字数
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {charCounter(text)}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              display="inline"
            >
              文字
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary" variant="caption" display="block">
              改行除く
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {charCounterWithoutNewlines(text)}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              display="inline"
            >
              文字
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary" variant="caption" display="block">
              改行・空白除く
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {charCounterNoSpace(text)}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              display="inline"
            >
              文字
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary" variant="caption" display="block">
              行数
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {lineCounter(text)}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              display="inline"
            >
              行
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary" variant="caption" display="block">
              UTF-8
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {utf8ByteCounter(text)}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              display="inline"
            >
              バイト
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography color="textSecondary" variant="caption" display="block">
              UTF-16
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {utf16ByteCounter(text)}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              display="inline"
            >
              バイト
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TextCounter;
