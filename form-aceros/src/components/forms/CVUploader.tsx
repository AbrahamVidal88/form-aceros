import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import './Form.css';

const CVUploader: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      className="cv-uploader"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Typography variant="h5" className="cv-title">
        Sube tu CV
      </Typography>
      <Typography variant="body2" className="cv-subtitle">
        Arrastra tu archivo aquí o haz clic para seleccionar
      </Typography>
      <Typography variant="body2" className="cv-note">
        Solo archivos PDF, máximo 10MB
      </Typography>
      <input
        id="cv"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="cv">
        <Button variant="contained" component="span" className="cv-button">
          Seleccionar Archivo
        </Button>
      </label>
      {fileName && (
        <Typography variant="body2" className="cv-file-name">
          Archivo seleccionado: {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default CVUploader;