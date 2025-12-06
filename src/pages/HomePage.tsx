import { Box, Container, Typography } from "@mui/material";
import BaseTemplate from "../common/components/BaseTemplate";

export default function HomePage() {
  return (
    <BaseTemplate>
      <Box sx={{ py: 8, minHeight: "20vh" }}>
        <Container maxWidth="lg">
          {/* ヘッダーセクション */}
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DevToolBox
            </Typography>
            <Typography variant="h5" sx={{ color: "#666", mb: 4 }}>
              開発者のための総合ツールボックス
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#999",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.8,
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
