import { Box, Container, Typography } from "@mui/material";
import BaseTemplate from "../common/components/BaseTemplate";

export default function HomePage() {
  return (
    <BaseTemplate>
      <Box
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3 },
          minHeight: "20vh",
        }}
      >
        <Container maxWidth="lg">
          {/* ヘッダーセクション */}
          <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, textAlign: "center" }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.75rem" },
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DevToolBox
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#666",
                mb: { xs: 2, sm: 3, md: 4 },
                fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              開発者のための総合ツールボックス
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#999",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                px: { xs: 2, sm: 3, md: 0 },
              }}
            >
              DevToolBoxは、Web開発やテキスト処理、データ変換など、日常的な開発業務をサポートする多彩なツールを集めたアプリケーションです。
              複数のツールをワンプレイスで利用でき、効率的な開発ワークフローを実現します。
            </Typography>
          </Box>
        </Container>
      </Box>
    </BaseTemplate>
  );
}
