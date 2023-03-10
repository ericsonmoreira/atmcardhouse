import { yupResolver } from "@hookform/resolvers/yup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useTournaments from "../../../hooks/useTournaments";
import AutocompletePlayers from "../../AutocompletePlayers";
import AvatarPlayer from "../../AvatarPlayer";
import ControlledTextField from "../../textfields/ControlledTextField";
import schema from "./schema ";

type UpdateTournamentDialogProps = {
  title: string;
  subTitle: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentToUpdate: UpdateTournamentDialogFormData;
};

export type UpdateTournamentDialogFormData = {
  id: string;
  name: string;
  format: TournamentFormat;
  rounds: number;
  selectedPlayers: Player[];
};

const formatValues = [
  {
    value: "pioneer",
    label: "Pioneer",
  },
  {
    value: "selado",
    label: "Selado",
  },
  {
    value: "draft",
    label: "Draft",
  },
];

const UpdateTournamentDialog: React.FC<
  UpdateTournamentDialogProps & DialogProps
> = ({ title, subTitle, setOpen, tournamentToUpdate, ...rest }) => {
  const { id, format, name, rounds } = tournamentToUpdate;

  const { control, handleSubmit, setValue } =
    useForm<UpdateTournamentDialogFormData>({
      resolver: yupResolver(schema),
    });

  const { addTournament, findTournament } = useTournaments();

  const { data: findTournamentData } = findTournament(id);

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const handleConfirmAction = ({
    name,
    format,
    rounds,
  }: UpdateTournamentDialogFormData) => {
    addTournament({
      name,
      data: JSON.stringify({
        players: selectedPlayers,
        rounds,
        name,
        format,
        ratings: [],
      }),
      format,
      rounds: Number(rounds),
      state: "not-started",
    });

    toast.success("Torneiro adicionado com sucesso");

    setOpen(false);
  };

  const handleCancelAction = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (findTournamentData) {
      setValue("id", id);
      setValue("name", name);
      setValue("format", format);
      setValue("rounds", rounds);
      setSelectedPlayers(JSON.parse(findTournamentData.data).players);
    }
  }, [tournamentToUpdate, findTournamentData]);

  return (
    <Dialog fullWidth maxWidth="md" {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subTitle}</DialogContentText>
        <Grid container spacing={2} sx={{ width: "100%", marginTop: 1 }}>
          <Grid item xs={12}>
            <Typography variant="body1">Informa????es do Torneio</Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name="name"
              control={control}
              textFieldProps={{
                variant: "outlined",
                size: "small",
                label: "Nome",
                fullWidth: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name="format"
              control={control}
              textFieldProps={{
                variant: "outlined",
                size: "small",
                label: "Formato",
                fullWidth: true,
                select: true,
                children: formatValues.map(({ value, label }) => (
                  <MenuItem key={label} value={value}>
                    {label}
                  </MenuItem>
                )),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name="rounds"
              control={control}
              textFieldProps={{
                type: "number",
                variant: "outlined",
                size: "small",
                label: "Rounds",
                fullWidth: true,
                inputProps: {
                  min: 1,
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ width: "100%", marginTop: 1 }}
          component="form"
        >
          <Grid item xs={12}>
            <Typography variant="body1">Jogadores</Typography>
          </Grid>
          <Grid item xs={12}>
            <AutocompletePlayers
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1">Jogadores selecionados</Typography>
              <Typography variant="body1">
                Total: {selectedPlayers.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "inline-block", alignItems: "center" }}>
              {selectedPlayers.map(({ id, name, email, avatarImgUrl }) => (
                <Chip
                  key={id}
                  variant="outlined"
                  label={name}
                  avatar={
                    <AvatarPlayer player={{ id, name, email, avatarImgUrl }} />
                  }
                  onDelete={() => {
                    setSelectedPlayers((old) =>
                      old.filter((player) => player.id !== id)
                    );
                  }}
                  deleteIcon={<PersonRemoveIcon />}
                  sx={{ marginRight: 1, marginBottom: 1 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          disableElevation
          onClick={handleCancelAction}
        >
          Cancelar
        </Button>
        <Button onClick={handleSubmit(handleConfirmAction)} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTournamentDialog;
