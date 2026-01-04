import { useState, useMemo } from "react";
import {
  Box,
  TextField,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { FLAG_DESCRIPTIONS, REGEX_PATTERNS } from "../const";
import { testRegex } from "../utils/regex-tester";

// 正規表現テスターコンポーネント
const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({
    g: false,
    i: false,
    s: false,
    m: false,
  });
  const [targetText, setTargetText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleFlagChange = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const result = useMemo(() => {
    return testRegex(pattern, targetText, flags);
  }, [pattern, targetText, flags]);

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Tooltip title="正規表現パターンチートシート">
          <IconButton
            size="small"
            onClick={() => setOpenDialog(true)}
            sx={{ p: 0.5, top: 170, right: 50, position: "fixed" }}
          >
            <HelpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {/* 一段目：パターンとフラグ */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* 左：正規表現パターン */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                正規表現パターン
              </Typography>
              <TextField
                fullWidth
                placeholder="/パターン/"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
              />
            </Paper>
          </Grid>

          {/* 右：フラグ */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                フラグ
              </Typography>
              <FormGroup>
                <Tooltip title={FLAG_DESCRIPTIONS.g}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={flags.g}
                        onChange={() => handleFlagChange("g")}
                      />
                    }
                    label="g（グローバル）"
                  />
                </Tooltip>
                <Tooltip title={FLAG_DESCRIPTIONS.i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={flags.i}
                        onChange={() => handleFlagChange("i")}
                      />
                    }
                    label="i（大文字小文字区別しない）"
                  />
                </Tooltip>
                <Tooltip title={FLAG_DESCRIPTIONS.s}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={flags.s}
                        onChange={() => handleFlagChange("s")}
                      />
                    }
                    label="s（ドット全文字）"
                  />
                </Tooltip>
                <Tooltip title={FLAG_DESCRIPTIONS.m}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={flags.m}
                        onChange={() => handleFlagChange("m")}
                      />
                    }
                    label="m（複数行）"
                  />
                </Tooltip>
              </FormGroup>
            </Paper>
          </Grid>
        </Grid>

        {/* 二段目：対象文字列と結果 */}
        <Grid container spacing={3}>
          {/* 左：対象の文字列 */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                対象の文字列
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                placeholder="ここにテキストを入力"
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
                variant="outlined"
              />
            </Paper>
          </Grid>

          {/* 右：実行結果 */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                maxHeight: 350,
                overflowY: "auto",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                実行結果
              </Typography>

              {/* 結果表示 */}
              {result.ok ? (
                <>
                  {result.matches.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>
                              マッチ
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              インデックス
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {result.matches.map((match, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{match.match}</TableCell>
                              <TableCell>{match.index}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      マッチするパターンがありません
                    </Typography>
                  )}
                </>
              ) : (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {result.error}
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* 正規表現パターンチートシートダイアログ */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>正規表現パターンチートシート</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>パターン</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>説明</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {REGEX_PATTERNS.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell
                          sx={{ fontFamily: "monospace", fontSize: 12 }}
                        >
                          {item.pattern}
                        </TableCell>
                        <TableCell sx={{ fontSize: 12 }}>
                          {item.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>閉じる</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default RegexTester;
