import { useState, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { readFileFromInput } from "../../../common/utils/readFileFromInput";
import { compressorImage } from "../utils/image-compressor";

// 画像圧縮コンポーネント
const ImageCompressor = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイル選択ハンドラ
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const content = await readFileFromInput<File>(event, "file");
    setInputFile(content);
    const compressedResult = content ? await compressorImage(content) : null;
    if (compressedResult && compressedResult.ok) {
      setCompressedFile(compressedResult.value);
    } else if (compressedResult && !compressedResult.ok) {
      setError(compressedResult.error);
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
        {/* 画像情報表示エリア */}
        <Box>
          {inputFile && (
            <>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                元画像のサイズ：{(inputFile.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
              {compressedFile && (
                <>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    圧縮率：
                    {(
                      ((inputFile.size - compressedFile.size) /
                        inputFile.size) *
                      100
                    ).toFixed(2)}
                    %
                  </Typography>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    圧縮した画像のサイズ：
                    {(compressedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2, display: "block", mx: "auto", width: "fit-content" }}
                    href={URL.createObjectURL(compressedFile)}
                    download={`compressed_${inputFile.name}`}
                    color="success"
                  >
                    <DownloadIcon sx={{ mr: 1 }} />
                    圧縮画像をダウンロード
                  </Button>
                </>
              )}

              {!compressedFile && !error && (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", color: "blue" }}
                >
                  画像を圧縮中...
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

export default ImageCompressor;
