import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
  SvgIcon,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export type HomeCardProps = {
  title: string;
  subheader: string;
  icon: typeof SvgIcon;
  amount?: number;
  to: string;
};

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  subheader,
  amount,
  icon: Icon,
  to,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Card elevation={0}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 50,
          }}
        >
          <Icon fontSize="inherit" color="secondary" />
          <Typography fontSize="inherit"># {amount}</Typography>
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          borderTop: 1,
          borderTopColor: theme.palette.divider,
          justifyContent: "end",
        }}
      >
        <Button
          variant="text"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(to)}
        >
          Acessar
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomeCard;