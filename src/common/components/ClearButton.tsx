import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type ClearButtonProps = {
  handleClear: () => void;
  disabled?: boolean;
};

// クリア用ボタンコンポーネント
const ClearButton = ({ handleClear, disabled = false }: ClearButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteOutlineIcon />}
      onClick={() => handleClear()}
      disabled={disabled}
    >
      クリア
    </Button>
  );
};

export default ClearButton;
