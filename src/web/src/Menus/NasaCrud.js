// src/Menus/NasaCrud.js
import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const NasaCrud = () => {
    const [records, setRecords] = useState([]);
    const [form, setForm] = useState({
        name: '',
        nametype: '',
        recclass: '',
        mass: '',
        fall: '',
        year: '',
        reclat: '',
        reclong: '',
        geolocation: {
            type: '',
            coordinates: ''
        }
    });
    const [editingRecord, setEditingRecord] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await fetch("http://localhost:8080/nasa");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleGeolocationChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, geolocation: { ...form.geolocation, [name]: value } });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Converta os campos para o tipo correto
      const data = {
          ...form,
          mass: parseFloat(form.mass), // Convertendo para número
          reclat: parseFloat(form.reclat), // Convertendo para número
          reclong: parseFloat(form.reclong), // Convertendo para número
          year: new Date(form.year).toISOString(), // Certifique-se de que o formato de ano esteja correto
      };
  
      try {
          const response = await fetch(editingRecord ? `http://localhost:8080/nasa/${editingRecord.nasa_id}` : "http://localhost:8080/nasa", {
              method: editingRecord ? "PUT" : "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });
  
          if (response.ok) {
              setForm({
                  name: '',
                  nametype: '',
                  recclass: '',
                  mass: '',
                  fall: '',
                  year: '',
                  reclat: '',
                  reclong: '',
                  geolocation: {
                      type: '',
                      coordinates: ''
                  }
              });
              setEditingRecord(null);
              fetchRecords();
              setMessageType("success");
              setMessage(editingRecord ? "Record updated successfully" : "Record created successfully");
          } else {
              setMessageType("error");
              setMessage("Failed to send data to the server");
          }
      } catch (error) {
          setMessageType("error");
          setMessage("Error sending data to the server");
          console.error("Error sending data to the server:", error);
      }
  };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/nasa/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchRecords();
                setMessageType("success");
                setMessage("Record deleted successfully");
            } else {
                setMessageType("error");
                setMessage("Failed to delete record");
            }
        } catch (error) {
            setMessageType("error");
            setMessage("Error deleting record");
            console.error("Error deleting record:", error);
        }
    };

    const handleEdit = (record) => {
        setForm({
            ...record,
            year: new Date(record.year).toISOString().substring(0, 10)
        });
        setEditingRecord(record);
    };

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    {editingRecord ? "Edit Record" : "Create Record"}
                </Typography>
                {message && (
                    <Alert severity={messageType} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: "100%", mt: 3 }}
                >
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="nametype">Name Type</InputLabel>
                        <Input
                            id="nametype"
                            name="nametype"
                            type="text"
                            value={form.nametype}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="recclass">Rec Class</InputLabel>
                        <Input
                            id="recclass"
                            name="recclass"
                            type="text"
                            value={form.recclass}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="mass">Mass</InputLabel>
                        <Input
                            id="mass"
                            name="mass"
                            type="number"
                            value={form.mass}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="fall">Fall</InputLabel>
                        <Input
                            id="fall"
                            name="fall"
                            type="text"
                            value={form.fall}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="year">Year</InputLabel>
                        <Input
                            id="year"
                            name="year"
                            type="date"
                            value={form.year}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="reclat">Reclat</InputLabel>
                        <Input
                            id="reclat"
                            name="reclat"
                            type="number"
                            value={form.reclat}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="reclong">Reclong</InputLabel>
                        <Input
                            id="reclong"
                            name="reclong"
                            type="number"
                            value={form.reclong}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="type">Geolocation Type</InputLabel>
                        <Input
                            id="type"
                            name="type"
                            type="text"
                            value={form.geolocation.type}
                            onChange={handleGeolocationChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="coordinates">Geolocation Coordinates</InputLabel>
                        <Input
                            id="coordinates"
                            name="coordinates"
                            type="text"
                            value={form.geolocation.coordinates}
                            onChange={handleGeolocationChange}
                            required
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {editingRecord ? "Save Changes" : "Create"}
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.length > 0 ? (
                                records.map((record) => (
                                    <TableRow key={record.nasa_id}>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{new Date(record.year).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(record)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(record.nasa_id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>No records found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default NasaCrud;
