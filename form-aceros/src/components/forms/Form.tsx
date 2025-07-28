import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid } from '@mui/material';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './Form.css';
import CVUploader from './CVUploader';
import Card from './Card';

interface FormData {
  nombre: string;
  apellido: string;
  ciudad: string;
  estado: string;
  telefono: string;
  correo: string;
}

const Formulario: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    apellido: '',
    ciudad: '',
    estado: '',
    telefono: '',
    correo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'edad' ? Number(value) : value,
    });
  };

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [cvError, setCvError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasSubmitted(true);

    const newErrors: Partial<FormData> = {};
    if (!form.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.apellido) newErrors.apellido = 'Los apellidos son obligatorios';
    if (!form.ciudad) newErrors.ciudad = 'La ciudad es obligatoria';
    if (!form.estado) newErrors.estado = 'El estado es obligatorio';
    if (!form.telefono) newErrors.telefono = 'El teléfono es obligatorio';
    if (!form.correo) newErrors.correo = 'El correo es obligatorio';

    setErrors(newErrors);

  // Si no hay errores, enviar el formulario
  if (Object.keys(newErrors).length === 0) {
    console.log('Datos enviados:', form);
  }
  };

  return (
    <div className="form-container">
      
    <Box component="form"
    sx={{ '& .MuiTextField-root': { m: 0} }}
      noValidate
    className="form-box" onSubmit={handleSubmit}>
      <Card />
      <h2 className="form-title">Información Personal</h2>
      <Grid container spacing={2}>
  {/* Nombre */}
  <Grid size={{xs:12, sm: 4}}>
    <label className="label">Nombre *</label>
    <TextField
    name="nombre"
    value={form.nombre}
    onChange={handleChange}
    fullWidth
    required
    error={!!errors.nombre}
    helperText={errors.nombre} 
    />
  </Grid>
  {/* Apellidos */}
  <Grid size={{ xs:12, sm:4}}>
    <label className="label">Apellidos *</label>
    <TextField
      name="apellido"
      value={form.apellido}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.apellido}
      helperText={errors.apellido}
    />
  </Grid>
  {/* Ciudad */}
  <Grid size={{ xs: 12, sm: 4}}>
    <label className="label">Ciudad *</label>
    <TextField
      name="ciudad"
      value={form.ciudad}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.ciudad}
      helperText={errors.ciudad}
    />
  </Grid>
  {/* Estado */}
  <Grid size={{ xs: 12, sm: 4}}>
    <label className="label">Estado/Provincia *</label>
    <TextField
      name="estado"
      value={form.estado}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.estado}
      helperText={errors.estado}
    />
  </Grid>
  {/* Teléfono */}
  <Grid size={{ xs: 12, sm: 4}}>
    <label className="label">Teléfono de Contacto *</label>
    <TextField
      name="telefono"
      type="tel"
      value={form.telefono}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.telefono}
      helperText={errors.telefono}
    />
  </Grid>
  {/* Correo */}
  <Grid size={{ xs: 12, sm: 4}}>
    <label className="label">Correo Electrónico *</label>
    <TextField
      name="correo"
      type="email"
      value={form.correo}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.correo}
      helperText={errors.correo}
    />
  </Grid>
  {/* CV */}
  <Grid size={12}>
   <CVUploader onError={setCvError} />
            {hasSubmitted && cvError && (
              <span className="error-text">El CV es obligatorio</span>
            )}
  </Grid>
  <Grid size={12} style={{ textAlign: 'center' }}>
    <HCaptcha
      sitekey="41ead7f2-9158-4fa0-9540-11d204327562"
      onVerify={(token) => console.log('Captcha token:', token)}
      onExpire={() => console.log('Captcha expired')}
      onError={(error) => console.error('Captcha error:', error)}
    />
  </Grid>
  <Grid size={12} style={{ textAlign: 'center' }}>
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
      </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Formulario;
