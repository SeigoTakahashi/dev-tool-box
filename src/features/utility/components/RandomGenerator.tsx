import { useState } from "react";
import { Box, Button } from "@mui/material";
import CopyButton from "../../../common/components/CopyButton";
import {
  generateUUID,
  generateSecurePassword,
} from "../utils/random-generator";

// ランダム生成コンポーネント
const RandomGenerator = () => {
  const [uuid, setUuid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        sx={{ m: 2, width: 200 }}
        onClick={() => setUuid(generateUUID())}
      >
        UUID生成
      </Button>
      {uuid && (
        <>
          <Box sx={{ wordBreak: "break-all" }} className="uuid-display">{uuid}</Box>
          <CopyButton text={uuid} />
        </>
      )}
      <Button
        variant="contained"
        sx={{ m: 2, width: 200 }}
        onClick={() => setPassword(generateSecurePassword())}
      >
        パスワード生成
      </Button>
      {password && (
        <>
          <Box sx={{ wordBreak: "break-all" }} className="password-display">{password}</Box>
          <CopyButton text={password} />
        </>
      )}
    </Box>
  );
};

export default RandomGenerator;
