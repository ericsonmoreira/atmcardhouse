import { Box, IconButton, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type DataGridPlaysersRowData = {
  id: string;
  name: string;
  email: string;
  actions: {
    handleUpdate(): void;
    handledelete(): void;
  };
};

type DataGridPlaysersProps = {
  rows: DataGridPlaysersRowData[];
  loading?: boolean;
};

const columns: GridColDef[] = [
  { field: "name", headerName: "Nome", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "actions",
    headerName: "Ações",
    width: 150,
    align: "right",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (
      params: GridRenderCellParams<{
        handleUpdate(): void;
        handledelete(): void;
      }>
    ) => (
      <Box>
        <Tooltip title="Deletar">
          <IconButton color="error" onClick={params.value?.handledelete}>
            <RemoveCircleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton color="info" onClick={params.value?.handleUpdate}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

const DataGridPlaysers: React.FC<DataGridPlaysersProps> = ({
  rows,
  loading,
}) => {
  return (
    <DataGrid
      rows={rows}
      density="compact"
      columns={columns}
      disableColumnMenu={false}
      components={{ Toolbar: GridToolbar }}
      disableSelectionOnClick
      loading={loading}
    />
  );
};

export default DataGridPlaysers;