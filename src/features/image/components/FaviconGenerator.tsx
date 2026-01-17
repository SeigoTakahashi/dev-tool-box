import { useState, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { readFileFromInput } from "../../../common/utils/readFileFromInput";
import { generateFavicon } from "../utils/favicon-generator";

// Favicon生成コンポーネント
const FaviconGenerator = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイル選択ハンドラ
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = await readFileFromInput<ArrayBuffer>(event, "arrayBuffer");
    setInputFile(new File([data], event.target.files?.[0].name || "input"));
    const faviconResult = data
      ? await generateFavicon(data, event.target.files?.[0].name || "input")
      : null;
    if (faviconResult && faviconResult.ok) {
      setFaviconFile(faviconResult.value);
    } else if (faviconResult && !faviconResult.ok) {
      setError(faviconResult.error);
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
        {/* Favicon生成エリア */}
        <Box>
          {inputFile && (
            <>
              {faviconFile && (
                <>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {faviconFile.name}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      display: "block",
                      mx: "auto",
                      width: "fit-content",
                    }}
                    href={URL.createObjectURL(faviconFile)}
                    download={faviconFile.name}
                    color="success"
                  >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Faviconをダウンロード
                  </Button>
                </>
              )}

              {!faviconFile && !error && (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", color: "blue" }}
                >
                  Faviconを生成中...
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

export default FaviconGenerator;
