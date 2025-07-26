import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import HCaptcha from '@hcaptcha/react-hcaptcha';
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
    <Box className="form-box" onSubmit={handleSubmit}>
      <h2 className="form-title">Información Personal</h2>
      <Grid container spacing={6}>
  {/* Nombre */}
  <Grid size={{xs:12, sm: 6}}>
    <label className="label">Nombre *</label>
    <TextField
      name="nombre"
      value={form.nombre}
      onChange={handleChange}
      fullWidth
      required
    />
  </Grid>
  {/* Apellidos */}
  <Grid size={{ xs:12, sm:6}}>
    <label className="label">Apellidos *</label>
    <TextField
      name="apellido"
      value={form.apellido}
      onChange={handleChange}
      fullWidth
      required
    />
  </Grid>
  {/* Ciudad */}
  <Grid size={{ xs: 12, sm: 6}}>
    <label className="label">Ciudad *</label>
    <TextField
      name="ciudad"
      value={form.ciudad}
      onChange={handleChange}
      fullWidth
      required
    />
  </Grid>
  {/* Estado */}
  <Grid size={{ xs: 12, sm: 6}}>
    <label className="label">Estado/Provincia *</label>
    <TextField
      name="estado"
      value={form.estado}
      onChange={handleChange}
      fullWidth
      required
    />
  </Grid>
  {/* Teléfono */}
  <Grid size={{ xs: 12, sm: 6}}>
    <label className="label">Teléfono de Contacto *</label>
    <TextField
      name="telefono"
      type="tel"
      value={form.telefono}
      onChange={handleChange}
      fullWidth
      required
    />
  </Grid>
  {/* Correo */}
  <Grid size={{ xs: 12, sm: 6}}>
    <label className="label">Correo Electrónico *</label>
    <TextField
      name="correo"
      type="email"
      value={form.correo}
      onChange={handleChange}
      fullWidth
      required
    />
  </Grid>
  {/* CV */}
  <Grid size={12}>
    <label className="label">Adjuntar CV (PDF, DOC, DOCX) *</label>
    <input
      id="cv"
      type="file"
      value={form.cv}
      style={{ display: 'none' }}
      onChange={handleChange}
      required
    />
    <label htmlFor="cv">
      <Button variant="contained" component="span">
        Seleccionar Archivo
      </Button>
    </label>
    <span className="file-name">{form.cv || 'No se ha seleccionado ningún archivo'}</span>
  </Grid>
  <Grid size={12} style={{ textAlign: 'center' }}>
    <HCaptcha
      sitekey="your-site-key"
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
