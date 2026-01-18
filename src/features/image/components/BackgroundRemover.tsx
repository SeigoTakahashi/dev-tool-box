import { useState, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { readFileFromInput } from "../../../common/utils/readFileFromInput";
import { removeBackground } from "../utils/background-remover";

// 背景除去コンポーネント
const BackgroundRemover = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [backgroundRemovedFileUrl, setBackgroundRemovedFileUrl] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイル選択ハンドラ
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = await readFileFromInput<ArrayBuffer>(event, "arrayBuffer");
    setInputFile(file);
    const removerdResult = data ? await removeBackground(data, file.type) : null;
    if (removerdResult && removerdResult.ok) {
      setBackgroundRemovedFileUrl(removerdResult.value);
    } else if (removerdResult && !removerdResult.ok) {
      setError(removerdResult.error);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
        {/* 画像ファイル読み込みボタン */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => fileInputRef.current?.click()}
          >
            <AddIcon sx={{ mr: 1 }} />
            画像ファイルを選択
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </Box>
        {/* 背景画像除去エリア */}
        <Box>
          {inputFile && (
            <>
              {backgroundRemovedFileUrl && (
                <>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {inputFile.name}
                  </Typography>
                  <Box
                    component="img"
                    src={backgroundRemovedFileUrl}
                    alt="Background Removed"
                    sx={{
                      display: "block",
                      maxWidth: "100%",
                      height: "auto",
                      mx: "auto",
                      mt: 2,
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      display: "block",
                      mx: "auto",
                      width: "fit-content",
                    }}
                    href={backgroundRemovedFileUrl}
                    download={inputFile.name.replace(/\.[^/.]+$/, "_no_bg.png")}
                    color="success"
                  >
                    <DownloadIcon sx={{ mr: 1 }} />
                    背景画像をダウンロード
                  </Button>
                </>
              )}

              {!backgroundRemovedFileUrl && !error && (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center" }}
                >
                  背景画像を除去中...
                </Typography>
              )}

              {error && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", color: "red" }}
                  >
                    エラー: {error}
                  </Typography>
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default BackgroundRemover;
