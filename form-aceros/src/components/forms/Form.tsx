import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './Form.css';
// import CVUploader from './CVUploader';
import Card from './Card';
import { agregarEntrevista } from '../../services/vacantes';

interface FormData {
  userId: string,
  nombres: string;
  apellidos: string;
  ciudad: string;
  estado: string;
  telefono: string;
  correo: string;
  archivoImagen: string;
}

const Formulario: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    userId: '',
    nombres: '',
    apellidos: '',
    ciudad: '',
    estado: '',
    telefono: '',
    correo: '',
    archivoImagen: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'edad' ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCvError(false);
    } else {
      setFile(null);
      setCvError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if(!captchaToken) {
      setCaptchaError(true);
      return;
    }else {
      setCaptchaError(false);
    }

    const newErrors: Partial<FormData> = {};
    if (!form.nombres) newErrors.nombres = 'El nombre es obligatorio';
    if (!form.apellidos) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!form.ciudad) newErrors.ciudad = 'La ciudad es obligatoria';
    if (!form.estado) newErrors.estado = 'El estado es obligatorio';
    if (!form.telefono) newErrors.telefono = 'El teléfono es obligatorio';
    if (!form.correo) newErrors.correo = 'El correo es obligatorio';
    if (!file) setCvError(true);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && file) {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('archivoImagen', file);
      formData.append('captchaToken', captchaToken);

      try {
        const response = await agregarEntrevista(formData);
        console.log('Respuesta del servidor:', response);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
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
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.nombres}
              helperText={errors.nombres}
            />
          </Grid>
          {/* Apellidos */}
          <Grid size={{ xs:12, sm:4}}>
            <label className="label">Apellidos *</label>
            <TextField
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.apellidos}
              helperText={errors.apellidos}
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
            <label className="label">CV *</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg"
              onChange={handleFileChange}
              style={{ marginTop: 8, marginBottom: 8 }}
              name="archivoImagen"
            />
            {hasSubmitted && cvError && (
              <span className="error-text">El CV es obligatorio</span>
            )}
          </Grid>
          <Grid size={12} style={{ textAlign: 'center' }}>
            <HCaptcha
              sitekey="41ead7f2-9158-4fa0-9540-11d204327562"
            onVerify={(token) => {
              setCaptchaToken(token);
              setCaptchaError(false);
            }}
            onExpire={() => {
              setCaptchaToken(null);
            }}
            onError={() => {
              setCaptchaToken(null);
              setCaptchaError(true);
            }}
          />
          {hasSubmitted && captchaError && (
            <span className="error-text">Por favor resuelve el captcha antes de enviar.</span>
          )}
          </Grid>
          <Grid size={12} style={{ textAlign: 'center' }}>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Formulario;