import { styled } from "@mui/material/styles";
import {
  AppBar,
  AppBarProps,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

type DashboardNavbarProps = {
  onSidebarOpen(): void;
};

const DashboardNavbar: React.FC<DashboardNavbarProps & AppBarProps> = ({
  onSidebarOpen,
  ...rest
}) => {
  return (
    <DashboardNavbarRoot
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: "calc(100% - 280px)",
        },
      }}
      {...rest}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;