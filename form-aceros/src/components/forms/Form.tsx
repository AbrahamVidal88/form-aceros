import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import './Form.css';

interface FormData {
  nombre: string;
  apellido: string;
  ciudad: string;
  estado: string;
  telefono: string;
  correo: string;
  cv: string;
}

const Formulario: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    apellido: '',
    ciudad: '',
    estado: '',
    telefono: '',
    correo: '',
    cv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'edad' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', form);
  };

  return (
    <div className="form-container">
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <label className="label">Nombre *</label>
      <TextField
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <label className="label">Apellidos *</label>
      <TextField
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        required
      />
      <label className="label">Ciudad *</label>
      <TextField
        name="ciudad"
        value={form.ciudad}
        onChange={handleChange}
        required
      />
      <label className="label">Estado/Provincia *</label>
      <TextField
        name="estado"
        value={form.estado}
        onChange={handleChange}
        required
      />
      <label className="label">Telefono de Contacto *</label>
      <TextField
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <label className="label">Correo Electrónico *</label>
      <TextField
        name="correo"
        type="email"
        value={form.correo}
        onChange={handleChange}
        required
      />
      <label className="label">Adjunte su cv *</label>
      <TextField
        name="cv"
        type="file"
        value={form.cv}
        onChange={handleChange}
        required
      />
      <p>Tamaño maximo del archivo: 10 MB</p>
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
    </div>
  );
};

export default Formulario;
