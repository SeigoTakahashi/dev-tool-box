import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseTemplate from "../common/components/BaseTemplate";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "../common/context/ThemeContext";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { theme } = useTheme(); 

  return (
    <BaseTemplate>
      <Box
        sx={{
          py: { xs: 8, sm: 12, md: 16 },
          px: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            {/* 404の巨大文字 */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: "900",
                fontSize: { xs: "5rem", sm: "8rem", md: "10rem" },
                lineHeight: 1,
                mb: 2,
                // テーマのモードに応じて自動で色が変わるように指定
                background: theme.palette.mode === 'dark'
                  ? "linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)"
                  : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 0.8,
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                // palette.text.primary を使えば自動で白/黒が切り替わる
                color: "text.primary",
              }}
            >
              ページが見つかりませんでした
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary", // 自動で薄いグレー/明るいグレーに
                maxWidth: "500px",
                mx: "auto",
                mb: 6,
                lineHeight: 1.8,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              お探しのツールは移動したか、削除された可能性があります。
              上の検索窓からツールを探すか、ホーム画面に戻って他のツールをお試しください。
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
                // グラデーションもMUIのメインカラーを参照するようにするとより統一感が出ます
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                boxShadow: theme.palette.mode === 'dark' 
                  ? "0 4px 20px rgba(0, 0, 0, 0.5)" 
                  : "0 4px 20px rgba(33, 150, 243, 0.3)",
                '&:hover': {
                  opacity: 0.9,
                }
              }}
            >
              ホームへ戻る
            </Button>
          </Box>
        </Container>
      </Box>
    </BaseTemplate>
  );
}